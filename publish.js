/* ===========================================================
   FLOATING TABLE OF CONTENTS - JavaScript
   Self-contained navigation for Obsidian Publish
   
   Add this to your publish.js file
   =========================================================== */

(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    headingLevels: ['h2', 'h3', 'h4'],
    minHeadings: 2,
    scrollThreshold: 400,
    scrollOffset: 80,
    contentSelector: '.markdown-rendered, .markdown-preview-view, .page-content',
    // Obsidian Publish uses various scroll containers depending on layout
    scrollContainerSelectors: [
      '.site-body-center-column',
      '.site-body',
      '.markdown-preview-view',
      'main',
      'html'
    ],
    showNumbers: false,
    storageKey: 'toc-collapsed',
  };

  // State
  let currentHeadings = [];
  let scrollHandler = null;
  let scrollContainer = null;

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setTimeout(() => {
      buildTOC();
      observePageChanges();
    }, 100);
  }

  /* -----------------------------------------------------------
     FIND SCROLL CONTAINER
     Obsidian Publish may use different scroll containers
     ----------------------------------------------------------- */
  function getScrollContainer() {
    // Check each potential container to find the one that actually scrolls
    for (const selector of CONFIG.scrollContainerSelectors) {
      const el = document.querySelector(selector);
      if (el) {
        // Check if this element is scrollable
        const style = getComputedStyle(el);
        const isScrollable = (
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight
        );
        if (isScrollable) {
          return el;
        }
      }
    }
    // Fallback: check if document/window scrolls
    if (document.documentElement.scrollHeight > window.innerHeight) {
      return null; // null means use window
    }
    return null;
  }

  /* -----------------------------------------------------------
     SCROLL TO ELEMENT
     Works with both window scroll and container scroll
     ----------------------------------------------------------- */
  function scrollToElement(target) {
    if (!target) return;
    
    // Try multiple scroll methods for maximum compatibility
    
    // Method 1: Native scrollIntoView (most reliable)
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
    
    // Method 2: After scrollIntoView, adjust for offset
    setTimeout(() => {
      const container = getScrollContainer();
      if (container) {
        container.scrollBy({ top: -CONFIG.scrollOffset, behavior: 'smooth' });
      } else {
        window.scrollBy({ top: -CONFIG.scrollOffset, behavior: 'smooth' });
      }
    }, 50);
  }

  /* -----------------------------------------------------------
     GET CURRENT SCROLL POSITION
     ----------------------------------------------------------- */
  function getScrollPosition() {
    const container = getScrollContainer();
    if (container) {
      return container.scrollTop;
    }
    return window.scrollY || document.documentElement.scrollTop;
  }

  /* -----------------------------------------------------------
     SCROLL TO TOP
     ----------------------------------------------------------- */
  function scrollToTop() {
    const container = getScrollContainer();
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /* -----------------------------------------------------------
     STATE PERSISTENCE
     ----------------------------------------------------------- */
  function getCollapsedState() {
    try {
      return localStorage.getItem(CONFIG.storageKey) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setCollapsedState(collapsed) {
    try {
      localStorage.setItem(CONFIG.storageKey, collapsed ? 'true' : 'false');
    } catch (e) {
      // localStorage not available
    }
  }

  /* -----------------------------------------------------------
     OBSERVE PAGE CHANGES
     ----------------------------------------------------------- */
  function observePageChanges() {
    // URL changes
    window.addEventListener('popstate', () => setTimeout(buildTOC, 100));

    // Link clicks (for SPA navigation)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        const href = link.getAttribute('href');
        // Only rebuild for page navigation, not anchor links
        if (href && !href.startsWith('#')) {
          setTimeout(buildTOC, 150);
          setTimeout(buildTOC, 400);
        }
      }
    });

    // MutationObserver for content changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          clearTimeout(window._tocRebuildTimeout);
          window._tocRebuildTimeout = setTimeout(buildTOC, 200);
          break;
        }
      }
    });

    const container = document.querySelector('.site-body-center-column, .markdown-rendered, main');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  /* -----------------------------------------------------------
     BUILD TOC
     ----------------------------------------------------------- */
  function buildTOC() {
    const headings = getHeadings();
    
    // Check if changed
    const newIds = headings.map(h => h.id).join(',');
    const oldIds = currentHeadings.map(h => h.id).join(',');
    
    if (newIds === oldIds && document.querySelector('.floating-toc')) {
      return;
    }
    
    currentHeadings = headings;
    
    // Remove existing elements
    document.querySelectorAll('.floating-toc, .floating-toc-backdrop, .floating-toc-mobile-toggle').forEach(el => el.remove());
    
    // Remove old scroll listeners
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', scrollHandler);
      }
      scrollHandler = null;
      scrollContainer = null;
    }
    
    if (headings.length >= CONFIG.minHeadings) {
      createFloatingTOC(headings);
      initScrollTracking(headings);
    }
  }

  /* -----------------------------------------------------------
     GET HEADINGS
     ----------------------------------------------------------- */
  function getHeadings() {
    const content = document.querySelector(CONFIG.contentSelector);
    if (!content) return [];

    const elements = content.querySelectorAll(CONFIG.headingLevels.join(', '));
    const headings = [];

    elements.forEach((el, index) => {
      // Skip hidden headings
      if (el.offsetParent === null && !el.closest('details')) return;
      
      // Ensure ID exists
      if (!el.id) {
        el.id = el.textContent
          .trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50) || `heading-${index}`;
      }

      headings.push({
        id: el.id,
        text: el.textContent.trim(),
        level: parseInt(el.tagName.charAt(1)),
        element: el,
      });
    });

    return headings;
  }

  /* -----------------------------------------------------------
     CREATE TOC
     ----------------------------------------------------------- */
  function createFloatingTOC(headings) {
    const toc = document.createElement('nav');
    toc.className = 'floating-toc';
    toc.setAttribute('aria-label', 'Table of contents');
    
    // Restore collapsed state
    if (getCollapsedState()) {
      toc.classList.add('is-collapsed');
    }

    // Header (collapse button only)
    const header = document.createElement('div');
    header.className = 'floating-toc__header';
    header.innerHTML = `
      <button class="floating-toc__toggle" aria-label="Collapse">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    `;

    // Progress bar
    const progress = document.createElement('div');
    progress.className = 'floating-toc__progress';
    progress.innerHTML = '<div class="floating-toc__progress-bar"></div>';

    // List
    const list = document.createElement('ul');
    list.className = 'floating-toc__list';

    headings.forEach((heading, index) => {
      const item = document.createElement('li');
      item.className = 'floating-toc__item';
      item.setAttribute('data-level', heading.level);

      // Use a button instead of anchor to avoid browser/Obsidian intercepting
      const link = document.createElement('button');
      link.type = 'button';
      link.className = 'floating-toc__link';
      link.textContent = CONFIG.showNumbers ? `${index + 1}. ${heading.text}` : heading.text;
      link.setAttribute('data-heading-id', heading.id);

      // Click handler
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const headingId = this.getAttribute('data-heading-id');
        const target = document.getElementById(headingId);
        const isMobile = window.innerWidth <= 768;
        const clickedLink = this;
        
        if (!target) return false;
        
        // Update active state immediately
        document.querySelectorAll('.floating-toc__link').forEach(l => {
          l.classList.toggle('is-active', l === clickedLink);
        });
        
        // Close mobile menu if open
        if (isMobile) {
          closeMobileTOC();
        }
        
        // Perform scroll using the most compatible method
        // On mobile Safari/iOS, we need to be more careful
        if (isMobile) {
          // Use location.hash - the most native approach
          // Temporarily remove smooth scroll to avoid conflicts
          const html = document.documentElement;
          const originalBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';
          
          // Set hash to trigger native scroll
          window.location.hash = '';
          window.location.hash = headingId;
          
          // Restore smooth scroll after a tick
          setTimeout(() => {
            html.style.scrollBehavior = originalBehavior;
          }, 50);
        } else {
          // Desktop - use scrollIntoView
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          history.replaceState(null, '', '#' + headingId);
        }
        
        // Visual feedback - highlight the heading
        setTimeout(() => {
          target.style.transition = 'background-color 0.3s ease';
          target.style.backgroundColor = 'rgba(43, 149, 255, 0.25)';
          target.style.borderRadius = '4px';
          setTimeout(() => {
            target.style.backgroundColor = '';
            setTimeout(() => {
              target.style.transition = '';
              target.style.borderRadius = '';
            }, 300);
          }, 1500);
        }, 100);
        
        return false;
      }, true); // Use capture phase

      item.appendChild(link);
      list.appendChild(item);
    });

    // Assemble
    toc.appendChild(header);
    toc.appendChild(progress);
    toc.appendChild(list);

    // Collapse toggle
    const toggleBtn = header.querySelector('.floating-toc__toggle');
    toggleBtn.onclick = function(e) {
      e.stopPropagation();
      
      // On mobile when open, close the modal
      if (window.innerWidth <= 768 && toc.classList.contains('is-mobile-open')) {
        closeMobileTOC();
        return;
      }
      
      // On desktop, toggle collapse and persist state
      const willCollapse = !toc.classList.contains('is-collapsed');
      toc.classList.toggle('is-collapsed');
      setCollapsedState(willCollapse);
    };

    document.body.appendChild(toc);
    createMobileElements(toc);
  }

  /* -----------------------------------------------------------
     MOBILE ELEMENTS
     ----------------------------------------------------------- */
  function createMobileElements(toc) {
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'floating-toc-backdrop';
    backdrop.onclick = closeMobileTOC;
    document.body.appendChild(backdrop);

    // Toggle button
    const toggle = document.createElement('button');
    toggle.className = 'floating-toc-mobile-toggle';
    toggle.setAttribute('aria-label', 'Open table of contents');
    toggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="15" y2="12"></line>
        <line x1="3" y1="18" x2="18" y2="18"></line>
      </svg>
    `;
    toggle.onclick = function(e) {
      e.stopPropagation();
      if (toc.classList.contains('is-mobile-open')) {
        closeMobileTOC();
      } else {
        toc.classList.add('is-mobile-open');
        toc.classList.remove('is-collapsed');
        backdrop.classList.add('is-visible');
        // Don't set overflow:hidden on body - it breaks Obsidian's scroll container
      }
    };
    document.body.appendChild(toggle);

    // Store references
    window._tocElements = { toc, backdrop, toggle };

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileTOC();
    });
  }

  function closeMobileTOC() {
    const { toc, backdrop } = window._tocElements || {};
    if (toc) toc.classList.remove('is-mobile-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    // Don't touch body overflow - let Obsidian manage it
  }

  /* -----------------------------------------------------------
     SCROLL TRACKING
     ----------------------------------------------------------- */
  function initScrollTracking(headings) {
    const tocLinks = document.querySelectorAll('.floating-toc__link');
    const progressBar = document.querySelector('.floating-toc__progress-bar');
    
    let ticking = false;
    let activeId = null;

    // Determine which container to listen to
    scrollContainer = getScrollContainer();

    function update() {
      // Find current heading using getBoundingClientRect for accuracy
      let currentId = null;
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i].element;
        if (!el || !document.body.contains(el)) continue;
        
        const rect = el.getBoundingClientRect();
        if (rect.top <= CONFIG.scrollOffset + 20) {
          currentId = headings[i].id;
          break;
        }
      }

      // Update active states
      if (currentId !== activeId) {
        activeId = currentId;
        tocLinks.forEach(link => {
          const isActive = link.getAttribute('data-heading-id') === currentId;
          link.classList.toggle('is-active', isActive);
        });
      }

      // Update progress bar
      if (progressBar) {
        let progress = 0;
        if (scrollContainer) {
          const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          progress = scrollHeight > 0 ? (scrollContainer.scrollTop / scrollHeight) * 100 : 0;
        } else {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        }
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }

      ticking = false;
    }

    scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Attach scroll listener to the right element
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', scrollHandler, { passive: true });
    }
    // Always also listen to window in case the scroll container changes
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    update();
  }

  /* -----------------------------------------------------------
     BACK TO TOP - REMOVED
     ----------------------------------------------------------- */
  // Back to top button removed for now

})();





/* ===========================================================
   EXAM NAVIGATION COMPONENT - JavaScript
   Add to your publish.js
   
   Usage in your notes (HTML):
   
   <div class="exam-nav"
        data-color="#8b5cf6"
        data-prev="Exam P|Probability|/exams/p"
        data-current="Exam FM|Financial Mathematics"
        data-next="Exam FAM|Fundamentals of Actuarial Mathematics|/exams/fam|SOA,Exam MAS-I|Modern Actuarial Statistics I|/exams/mas-i|CAS"
        data-reqs="ACAS,ASA">
   </div>
   
   Format:
   - data-color: Hex color for the exam theme (optional, defaults to --brand)
   - data-prev: "Name|Full Name|URL" (optional)
   - data-current: "Name|Full Name" (required)
   - data-next: "Name|Full|URL|Org,Name2|Full2|URL2|Org2" (comma-separated, optional)
   - data-reqs: "REQ1,REQ2" (comma-separated, optional)
   =========================================================== */

(function() {
  'use strict';

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExamNav);
  } else {
    initExamNav();
  }

  // Re-init on page changes (Obsidian SPA navigation)
  function initExamNav() {
    setTimeout(buildAllExamNavs, 100);
    observePageChanges();
  }

  function observePageChanges() {
    // URL changes
    window.addEventListener('popstate', () => setTimeout(buildAllExamNavs, 150));

    // Link clicks (for SPA navigation)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(buildAllExamNavs, 200);
          setTimeout(buildAllExamNavs, 500);
        }
      }
    });

    // MutationObserver for content changes
    const observer = new MutationObserver(() => {
      clearTimeout(window._examNavRebuildTimeout);
      window._examNavRebuildTimeout = setTimeout(buildAllExamNavs, 200);
    });

    const container = document.querySelector('.site-body-center-column, .markdown-rendered, main');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  function buildAllExamNavs() {
    document.querySelectorAll('.exam-nav[data-current]').forEach(nav => {
      // Skip if already built
      if (nav.dataset.built === 'true') return;
      
      buildExamNav(nav);
      nav.dataset.built = 'true';
    });
  }

  function buildExamNav(container) {
    // Parse data attributes
    const customColor = container.dataset.color;
    const prevData = parseExamData(container.dataset.prev);
    const currentData = parseExamData(container.dataset.current);
    const nextData = parseNextExams(container.dataset.next);
    const reqs = container.dataset.reqs ? container.dataset.reqs.split(',').map(r => r.trim()) : [];

    // Apply custom color if provided
    if (customColor) {
      container.style.setProperty('--nav-color', customColor);
      // Create a slightly lighter version for hover
      container.style.setProperty('--nav-color-hover', customColor);
    }

    // Clear container
    container.innerHTML = '';

    // Previous exam button
    if (prevData) {
      const prevLink = document.createElement('a');
      prevLink.className = 'exam-nav__btn';
      prevLink.href = prevData.url || '#';
      prevLink.innerHTML = `<span>${prevData.name}</span>`;
      if (prevData.url) {
        prevLink.classList.add('internal-link');
      }
      container.appendChild(prevLink);

      // Arrow
      const arrow1 = document.createElement('span');
      arrow1.className = 'exam-nav__arrow';
      arrow1.textContent = '→';
      container.appendChild(arrow1);
    }

    // Current exam wrapper (button + requirements below)
    const currentWrapper = document.createElement('div');
    currentWrapper.className = 'exam-nav__current';

    // Current exam button
    const currentBtn = document.createElement('span');
    currentBtn.className = 'exam-nav__btn exam-nav__btn--current';
    currentBtn.textContent = currentData.name;
    currentWrapper.appendChild(currentBtn);

    // Requirements text below current exam
    if (reqs.length > 0) {
      const reqsText = document.createElement('span');
      reqsText.className = 'exam-nav__reqs';
      reqsText.textContent = `Required for ${reqs.join(', ')}`;
      currentWrapper.appendChild(reqsText);
    }

    container.appendChild(currentWrapper);

    // Next exam(s)
    if (nextData.length > 0) {
      // Arrow
      const arrow2 = document.createElement('span');
      arrow2.className = 'exam-nav__arrow';
      arrow2.textContent = '→';
      container.appendChild(arrow2);

      if (nextData.length === 1) {
        // Single next exam - just a button
        const nextLink = document.createElement('a');
        nextLink.className = 'exam-nav__btn exam-nav__btn--next';
        nextLink.href = nextData[0].url || '#';
        nextLink.textContent = nextData[0].name;
        if (nextData[0].url) {
          nextLink.classList.add('internal-link');
        }
        container.appendChild(nextLink);
      } else {
        // Multiple next exams - dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'exam-nav__dropdown';

        // Dropdown trigger button
        const triggerBtn = document.createElement('button');
        triggerBtn.className = 'exam-nav__btn exam-nav__btn--next';
        triggerBtn.type = 'button';
        triggerBtn.innerHTML = `
          <span>${nextData.map(e => e.name.replace('Exam ', '')).join(' / ')}</span>
          <svg class="exam-nav__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        `;

        // Dropdown menu
        const menu = document.createElement('div');
        menu.className = 'exam-nav__menu';
        menu.innerHTML = `<div class="exam-nav__menu-header">Choose your path</div>`;

        nextData.forEach(exam => {
          const item = document.createElement('a');
          item.className = 'exam-nav__menu-item';
          item.href = exam.url || '#';
          if (exam.url) {
            item.classList.add('internal-link');
          }

          const orgClass = exam.org ? `exam-nav__org--${exam.org.toLowerCase()}` : '';
          
          item.innerHTML = `
            <div class="exam-nav__menu-item-info">
              <span class="exam-nav__menu-item-name">${exam.name}</span>
              ${exam.fullName ? `<span class="exam-nav__menu-item-full">${exam.fullName}</span>` : ''}
            </div>
            ${exam.org ? `<span class="exam-nav__org ${orgClass}">${exam.org}</span>` : ''}
          `;

          // Close dropdown on item click
          item.addEventListener('click', () => {
            dropdown.classList.remove('is-open');
            hideBackdrop();
          });

          menu.appendChild(item);
        });

        // Toggle dropdown
        triggerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = dropdown.classList.contains('is-open');
          
          // Close all other dropdowns first
          document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          
          if (!isOpen) {
            dropdown.classList.add('is-open');
            showBackdrop();
          } else {
            hideBackdrop();
          }
        });

        dropdown.appendChild(triggerBtn);
        dropdown.appendChild(menu);
        container.appendChild(dropdown);
      }
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.exam-nav__dropdown')) {
        document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        hideBackdrop();
      }
    });

    // ESC key closes dropdown
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        hideBackdrop();
      }
    });
  }

  // Parse "Name|Full Name|URL" format
  function parseExamData(str) {
    if (!str) return null;
    const parts = str.split('|').map(p => p.trim());
    return {
      name: parts[0] || '',
      fullName: parts[1] || '',
      url: parts[2] || ''
    };
  }

  // Parse multiple exams: "Name|Full|URL|Org,Name2|Full2|URL2|Org2"
  function parseNextExams(str) {
    if (!str) return [];
    return str.split(',').map(exam => {
      const parts = exam.split('|').map(p => p.trim());
      return {
        name: parts[0] || '',
        fullName: parts[1] || '',
        url: parts[2] || '',
        org: parts[3] || ''
      };
    });
  }

  // Mobile backdrop helpers
  function showBackdrop() {
    let backdrop = document.querySelector('.exam-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'exam-nav-backdrop';
      backdrop.addEventListener('click', () => {
        document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        hideBackdrop();
      });
      document.body.appendChild(backdrop);
    }
    // Only show backdrop on mobile
    if (window.innerWidth <= 540) {
      backdrop.classList.add('is-visible');
    }
  }

  function hideBackdrop() {
    const backdrop = document.querySelector('.exam-nav-backdrop');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
    }
  }

})();


/* ===========================================================
   CALLOUT BADGES
   Extracts {badge text} from callout titles and renders it as
   a pill badge.  Works on all callout types.
   Syntax:  > [!example]- Title here {badge text}
   =========================================================== */

(function () {
  'use strict';

  const BADGE_RE = /\{([^}]+)\}\s*$/;

  function injectBadges() {
    document.querySelectorAll('.callout .callout-title-inner').forEach(inner => {
      // Skip if already processed
      if (inner.parentElement.querySelector('.callout-concept-count')) return;

      const text = inner.textContent;
      const match = text.match(BADGE_RE);
      if (!match) return;

      // Strip the {…} from the visible title text
      inner.textContent = text.replace(BADGE_RE, '').trimEnd();

      const badge = document.createElement('span');
      badge.className = 'callout-concept-count';
      badge.textContent = match[1];

      inner.parentElement.appendChild(badge);
    });
  }

  function observePageChanges() {
    window.addEventListener('popstate', () => setTimeout(injectBadges, 300));

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(injectBadges, 400);
          setTimeout(injectBadges, 800);
        }
      }
    });

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          clearTimeout(window._badgeTimeout);
          window._badgeTimeout = setTimeout(injectBadges, 300);
          break;
        }
      }
    });

    const container = document.querySelector('.site-body-center-column, .markdown-rendered, main');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(injectBadges, 200);
      observePageChanges();
    });
  } else {
    setTimeout(injectBadges, 200);
    observePageChanges();
  }

})();
