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
   Extracts {badge text} from callout titles and renders them
   as pill badges.  Works on all callout types.
   Syntax:  > [!example]- Title here {23-30%} {19 Concepts}
   =========================================================== */

(function () {
  'use strict';

  const BADGES_RE = /\{([^}]+)\}/g;
  const PCT_RE = /\d+.*%/;

  function injectBadges() {
    document.querySelectorAll('.callout .callout-title-inner').forEach(inner => {
      // Skip if already processed
      if (inner.parentElement.querySelector('.callout-badge')) return;

      const text = inner.textContent;
      const matches = [...text.matchAll(BADGES_RE)];
      if (!matches.length) return;

      // Strip all {…} from the visible title text
      inner.textContent = text.replace(BADGES_RE, '').trimEnd();

      matches.forEach(match => {
        const badge = document.createElement('span');
        const isPct = PCT_RE.test(match[1]);
        badge.className = 'callout-badge' + (isPct ? ' callout-badge--pct' : ' callout-concept-count');
        badge.textContent = match[1];
        inner.parentElement.appendChild(badge);
      });
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


/* ===========================================================
   QUESTION BROWSER
   Adds a "?" button to each definition embed that opens a
   modal for browsing questions across exams and concepts.

   Questions are parsed from concept pages under ## Questions,
   formatted as > [!example]- callouts.
   =========================================================== */

(function () {
  'use strict';

  /* ---- Configuration ---- */
  const EXAMS = [
    { key: 'P',  name: 'Exam P-1 (Probability)',            path: 'Exam P-1 (SOA)' },
    { key: 'FM', name: 'Exam FM-2 (Financial Mathematics)',  path: 'Exam FM-2 (SOA)' },
  ];

  /* ---- Cache ---- */
  const conceptsCache  = {};   // examKey  -> [conceptName, …]
  const questionsCache = {};   // conceptName -> [{ title, category, difficulty, level }, …]

  /* ---- DOM references ---- */
  let overlayEl  = null;
  let browserEl  = null;

  /* ---- Init ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 250));
  } else {
    setTimeout(init, 250);
  }

  function init() {
    createModal();
    injectButtons();
    observePageChanges();
  }

  /* -----------------------------------------------------------
     OBSERVE PAGE CHANGES (SPA navigation / DOM mutations)
     ----------------------------------------------------------- */
  function observePageChanges() {
    window.addEventListener('popstate', () => setTimeout(injectButtons, 250));

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(injectButtons, 300);
          setTimeout(injectButtons, 600);
        }
      }
    });

    const root = document.querySelector('.site-body-center-column, .markdown-rendered, main');
    if (root) {
      const mo = new MutationObserver(() => {
        clearTimeout(window._qbInjectTimeout);
        window._qbInjectTimeout = setTimeout(injectButtons, 300);
      });
      mo.observe(root, { childList: true, subtree: true });
    }
  }

  /* -----------------------------------------------------------
     INJECT "?" BUTTONS into definition embeds
     ----------------------------------------------------------- */
  function injectButtons() {
    document.querySelectorAll('.internal-embed').forEach(embed => {
      if (embed.querySelector('.concept-question-btn')) return;

      const src = embed.getAttribute('src') || embed.getAttribute('data-src') || '';
      if (!src.includes('#Definition')) return;

      const conceptName = src.split('#')[0].replace(/^Concepts\//, '').trim();
      if (!conceptName) return;

      const btn = document.createElement('button');
      btn.className = 'concept-question-btn';
      btn.type = 'button';
      btn.textContent = '?';
      btn.title = 'Browse questions – ' + conceptName;
      btn.dataset.concept = conceptName;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openBrowser(conceptName);
      });

      embed.appendChild(btn);
    });
  }

  /* -----------------------------------------------------------
     CREATE MODAL (once)
     ----------------------------------------------------------- */
  function createModal() {
    if (document.querySelector('.question-browser-overlay')) return;

    overlayEl = document.createElement('div');
    overlayEl.className = 'question-browser-overlay';
    overlayEl.addEventListener('click', closeBrowser);

    browserEl = document.createElement('div');
    browserEl.className = 'question-browser';
    browserEl.innerHTML = [
      '<div class="question-browser__header">',
      '  <span class="question-browser__title">Question Browser</span>',
      '  <button class="question-browser__close" type="button">&times;</button>',
      '</div>',
      '<div class="question-browser__selectors">',
      '  <select class="question-browser__select" id="qb-exam-select">',
      '    <option value="">Select Exam</option>',
           EXAMS.map(e => '<option value="' + e.key + '">' + e.name + '</option>').join(''),
      '  </select>',
      '  <select class="question-browser__select" id="qb-concept-select" disabled>',
      '    <option value="">Select Concept</option>',
      '  </select>',
      '</div>',
      '<div class="question-browser__questions" id="qb-questions">',
      '  <div class="question-browser__empty">Select an exam and concept to browse questions.</div>',
      '</div>',
    ].join('\n');

    browserEl.querySelector('.question-browser__close').addEventListener('click', closeBrowser);
    browserEl.querySelector('#qb-exam-select').addEventListener('change', handleExamChange);
    browserEl.querySelector('#qb-concept-select').addEventListener('change', handleConceptChange);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeBrowser();
    });

    document.body.appendChild(overlayEl);
    document.body.appendChild(browserEl);
  }

  /* -----------------------------------------------------------
     OPEN / CLOSE
     ----------------------------------------------------------- */
  function openBrowser(conceptName) {
    if (!overlayEl || !browserEl) createModal();

    overlayEl.classList.add('is-visible');
    browserEl.classList.add('is-visible');

    // Auto-select the current exam then the concept
    const examKey = detectCurrentExam();
    const examSelect = browserEl.querySelector('#qb-exam-select');

    if (examKey) {
      examSelect.value = examKey;
      handleExamChange().then(() => {
        if (conceptName) {
          const conceptSelect = browserEl.querySelector('#qb-concept-select');
          conceptSelect.value = conceptName;
          handleConceptChange();
        }
      });
    }
  }

  function closeBrowser() {
    if (overlayEl) overlayEl.classList.remove('is-visible');
    if (browserEl) browserEl.classList.remove('is-visible');
  }

  /* -----------------------------------------------------------
     DETECT CURRENT EXAM from page context
     ----------------------------------------------------------- */
  function detectCurrentExam() {
    // Check exam-nav component
    const nav = document.querySelector('.exam-nav[data-current]');
    if (nav) {
      const current = nav.dataset.current || '';
      for (const exam of EXAMS) {
        if (current.startsWith(exam.key)) return exam.key;
      }
    }
    // Check page title / URL
    const url = window.location.pathname;
    const title = document.querySelector('.page-header, .publish-article-heading, h1');
    const text = (title ? title.textContent : '') + ' ' + decodeURIComponent(url);
    for (const exam of EXAMS) {
      if (text.includes(exam.path)) return exam.key;
    }
    return EXAMS[0] ? EXAMS[0].key : '';
  }

  /* -----------------------------------------------------------
     HANDLE EXAM CHANGE — populate concept dropdown
     ----------------------------------------------------------- */
  async function handleExamChange() {
    const examKey = browserEl.querySelector('#qb-exam-select').value;
    const conceptSelect = browserEl.querySelector('#qb-concept-select');
    const questionsEl = browserEl.querySelector('#qb-questions');

    // Reset
    conceptSelect.innerHTML = '<option value="">Select Concept</option>';
    conceptSelect.disabled = true;
    questionsEl.innerHTML = '<div class="question-browser__empty">Select a concept to view questions.</div>';

    if (!examKey) return;

    const concepts = await getConceptsForExam(examKey);

    concepts.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      conceptSelect.appendChild(opt);
    });

    conceptSelect.disabled = concepts.length === 0;

    if (concepts.length === 0) {
      questionsEl.innerHTML = '<div class="question-browser__empty">No concepts found for this exam.</div>';
    }
  }

  /* -----------------------------------------------------------
     HANDLE CONCEPT CHANGE — fetch & display questions
     ----------------------------------------------------------- */
  async function handleConceptChange() {
    const conceptName = browserEl.querySelector('#qb-concept-select').value;
    const questionsEl = browserEl.querySelector('#qb-questions');

    if (!conceptName) {
      questionsEl.innerHTML = '<div class="question-browser__empty">Select a concept to view questions.</div>';
      return;
    }

    questionsEl.innerHTML = '<div class="question-browser__loading">Loading questions\u2026</div>';

    var questions = await getQuestionsForConcept(conceptName);

    if (questions.length === 0) {
      questionsEl.innerHTML = '<div class="question-browser__empty">No questions available for this concept yet.</div>';
      return;
    }

    renderQuestions(questionsEl, questions);
  }

  /* -----------------------------------------------------------
     RENDER QUESTIONS grouped by category (expandable rows)
     ----------------------------------------------------------- */
  function renderQuestions(container, questions) {
    container.innerHTML = '';

    // Group by category
    var groups = {};
    var order = [];
    questions.forEach(function (q) {
      var cat = q.category || 'General';
      if (!groups[cat]) { groups[cat] = []; order.push(cat); }
      groups[cat].push(q);
    });

    var num = 1;
    order.forEach(function (cat) {
      var header = document.createElement('div');
      header.className = 'question-browser__category';
      header.textContent = cat;
      container.appendChild(header);

      groups[cat].forEach(function (q) {
        var wrapper = document.createElement('div');
        wrapper.className = 'question-browser__question-wrapper';

        // Header row (clickable)
        var row = document.createElement('div');
        row.className = 'question-browser__question-item';

        var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        chevron.setAttribute('class', 'question-browser__chevron');
        chevron.setAttribute('viewBox', '0 0 24 24');
        chevron.setAttribute('fill', 'none');
        chevron.setAttribute('stroke', 'currentColor');
        chevron.setAttribute('stroke-width', '2.5');
        chevron.innerHTML = '<polyline points="9 6 15 12 9 18"/>';

        var numEl = document.createElement('span');
        numEl.className = 'question-browser__question-number';
        numEl.textContent = num++;

        var titleEl = document.createElement('span');
        titleEl.className = 'question-browser__question-title';
        titleEl.textContent = q.title;

        row.appendChild(chevron);
        row.appendChild(numEl);
        row.appendChild(titleEl);

        if (q.difficulty) {
          var badge = document.createElement('span');
          badge.className = 'question-browser__question-badge';
          badge.textContent = q.difficulty;
          badge.setAttribute('data-level', q.level || '0');
          row.appendChild(badge);
        }

        // Expand area (hidden by default)
        var expand = document.createElement('div');
        expand.className = 'question-browser__expand';

        // Click to toggle expand
        row.addEventListener('click', function () {
          var isOpen = wrapper.classList.contains('is-expanded');
          // Close all others
          container.querySelectorAll('.question-browser__question-wrapper.is-expanded').forEach(function (w) {
            if (w !== wrapper) w.classList.remove('is-expanded');
          });
          wrapper.classList.toggle('is-expanded', !isOpen);
          // Load content on first expand
          if (!isOpen && !expand.dataset.loaded) {
            loadExpandedContent(expand, q);
          }
        });

        wrapper.appendChild(row);
        wrapper.appendChild(expand);
        container.appendChild(wrapper);
      });
    });
  }

  /* -----------------------------------------------------------
     LOAD EXPANDED CONTENT for a question
     Fetches the referenced file and renders a quiz UI.
     ----------------------------------------------------------- */
  async function loadExpandedContent(expand, q) {
    expand.dataset.loaded = '1';
    expand.innerHTML = '<div class="question-browser__expand-loading">Loading\u2026</div>';

    var fileMd = null;

    // If we have an embed reference, fetch the file
    if (q.embedRef) {
      var fileName = q.embedRef.split('#')[0].trim();
      fileMd = await fetchFileMarkdown(fileName);
    }

    // Fallback: if inline content exists, try to parse that
    if (!fileMd && q.inlineContent) {
      fileMd = q.inlineContent;
    }

    if (!fileMd) {
      expand.innerHTML = '<div class="question-browser__expand-loading">Could not load question content.</div>';
      return;
    }

    // Parse the question file into structured quiz data
    var quiz = parseQuestionFile(fileMd);

    if (!quiz.question) {
      expand.innerHTML = '<div class="question-browser__expand-loading">Could not parse question.</div>';
      return;
    }

    // Render the interactive quiz
    expand.innerHTML = '';
    renderQuiz(expand, quiz);
    triggerMathRender(expand);
  }

  /* -----------------------------------------------------------
     PARSE QUESTION FILE into structured quiz data
     Handles the format:
       # Question
       <text>
       > [!question]- Answer Choices
       > (A) ...
       > [!solution]- Solution
       > <text>
       > **Answer: (X)**
     ----------------------------------------------------------- */
  function parseQuestionFile(md) {
    var result = { question: null, choices: [], correctAnswer: null, solution: null };

    // Normalise line endings
    md = md.replace(/\r\n/g, '\n');

    // --- Extract question text ---
    // Everything after "# Question" until the first callout or next heading
    var qMatch = md.match(/^#\s+Question\s*\n([\s\S]*?)(?=\n>\s*\[!|\n#\s|$)/m);
    if (qMatch) {
      result.question = qMatch[1].trim();
    } else {
      // Fallback: everything before the first callout
      var fallback = md.match(/^([\s\S]*?)(?=\n>\s*\[!|$)/);
      if (fallback) {
        var fb = fallback[1].replace(/^#.*\n/, '').trim();
        if (fb) result.question = fb;
      }
    }

    // --- Extract answer choices from [!question] callout ---
    var choiceBlock = md.match(/>\s*\[!question\][+-]?[^\n]*\n([\s\S]*?)(?=\n>\s*\[!(?!question)|(?:\n[^>\s])|\n\n(?!>)|$)/);
    if (choiceBlock) {
      var choiceText = choiceBlock[1];
      var choiceRe = /\(([A-E])\)\s*(.+)/g;
      var cm;
      while ((cm = choiceRe.exec(choiceText)) !== null) {
        result.choices.push({ letter: cm[1], text: cm[2].trim() });
      }
    }

    // --- Extract solution from [!solution] callout ---
    var solBlock = md.match(/>\s*\[!solution\][+-]?[^\n]*\n([\s\S]*?)$/);
    if (solBlock) {
      var solLines = solBlock[1].replace(/^>\s?/gm, '').trim();

      // Extract correct answer: **Answer: (X)**
      var ansMatch = solLines.match(/\*\*Answer:\s*\(([A-E])\)\*\*/);
      if (ansMatch) result.correctAnswer = ansMatch[1];

      result.solution = solLines;
    }

    return result;
  }

  /* -----------------------------------------------------------
     RENDER INTERACTIVE QUIZ
     ----------------------------------------------------------- */
  function renderQuiz(container, quiz) {
    // Question text
    var qBlock = document.createElement('div');
    qBlock.className = 'qb-quiz__question';
    qBlock.innerHTML = renderMarkdown(quiz.question);
    container.appendChild(qBlock);

    // Answer choices
    var choicesEl = document.createElement('div');
    choicesEl.className = 'qb-quiz__choices';
    var answered = false;

    quiz.choices.forEach(function (choice) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'qb-quiz__choice';
      btn.setAttribute('data-letter', choice.letter);

      var letterSpan = document.createElement('span');
      letterSpan.className = 'qb-quiz__choice-letter';
      letterSpan.textContent = choice.letter;

      var textSpan = document.createElement('span');
      textSpan.className = 'qb-quiz__choice-text';
      textSpan.innerHTML = renderMarkdown(choice.text);

      btn.appendChild(letterSpan);
      btn.appendChild(textSpan);

      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        var selected = choice.letter;
        var correct = quiz.correctAnswer;

        // Mark all choices
        choicesEl.querySelectorAll('.qb-quiz__choice').forEach(function (c) {
          c.classList.add('is-locked');
          var l = c.getAttribute('data-letter');
          if (l === correct) c.classList.add('is-correct');
          if (l === selected && l !== correct) c.classList.add('is-wrong');
        });

        // Show result banner
        var banner = document.createElement('div');
        if (selected === correct) {
          banner.className = 'qb-quiz__result is-correct';
          banner.textContent = 'Correct!';
        } else {
          banner.className = 'qb-quiz__result is-wrong';
          banner.textContent = 'Incorrect \u2014 the answer is (' + correct + ')';
        }
        container.insertBefore(banner, solWrap);

        // Reveal solution
        solWrap.classList.add('is-visible');
        triggerMathRender(container);
      });

      choicesEl.appendChild(btn);
    });
    container.appendChild(choicesEl);

    // Solution section (hidden until answered)
    var solWrap = document.createElement('div');
    solWrap.className = 'qb-quiz__solution';

    if (quiz.solution) {
      var solLabel = document.createElement('div');
      solLabel.className = 'qb-quiz__solution-label';
      solLabel.textContent = 'Explanation';

      var solBody = document.createElement('div');
      solBody.className = 'qb-quiz__solution-body';
      solBody.innerHTML = renderMarkdown(quiz.solution);

      solWrap.appendChild(solLabel);
      solWrap.appendChild(solBody);
    }
    container.appendChild(solWrap);
  }

  /* -----------------------------------------------------------
     FETCH RAW MARKDOWN for any file in the vault
     ----------------------------------------------------------- */
  var fileCache = {};
  async function fetchFileMarkdown(fileName) {
    var baseName = fileName.replace(/\.md$/, '');

    if (fileCache[baseName] !== undefined) return fileCache[baseName];

    // Strategy 1: Obsidian internal cache (fastest)
    var md = tryObsidianCacheFile(baseName);
    if (md) { fileCache[baseName] = md; return md; }

    // Strategy 2: Fetch page from site — try many path variations
    var tryPaths = [
      baseName,
      'Questions/' + baseName,
      'Concepts/' + baseName,
      'Concepts/Questions/' + baseName,
    ];
    for (var i = 0; i < tryPaths.length; i++) {
      try {
        var url = '/' + tryPaths[i].split('/').map(encodeURIComponent).join('/');
        var resp = await fetch(url);
        if (!resp.ok) continue;
        var text = await resp.text();

        // Check if it looks like markdown (has headings or callouts)
        if (looksLikeMarkdown(text)) {
          fileCache[baseName] = text;
          return text;
        }

        // Try extracting markdown from the HTML response
        var mdContent = extractMarkdownFromResponse(text);
        if (mdContent) { fileCache[baseName] = mdContent; return mdContent; }
      } catch (e) { continue; }
    }

    // Strategy 3: Obsidian Publish content API
    var siteId = extractSiteId();
    if (siteId) {
      var apiPaths = [
        baseName + '.md',
        'Questions/' + baseName + '.md',
        'Concepts/' + baseName + '.md',
        'Concepts/Questions/' + baseName + '.md',
      ];
      for (var j = 0; j < apiPaths.length; j++) {
        try {
          var apiUrl = 'https://publish-01.obsidian.md/access/' + siteId + '/' + encodeURIComponent(apiPaths[j]);
          var resp2 = await fetch(apiUrl);
          if (!resp2.ok) continue;
          var md2 = await resp2.text();
          if (md2 && looksLikeMarkdown(md2)) {
            fileCache[baseName] = md2;
            return md2;
          }
        } catch (e) { continue; }
      }
    }

    fileCache[baseName] = null;
    return null;
  }

  /** Quick check: does this text look like raw markdown? */
  function looksLikeMarkdown(text) {
    if (!text || text.indexOf('<!DOCTYPE') !== -1) return false;
    // Has a heading or a callout
    return /^#\s/m.test(text) || />\s*\[!/m.test(text);
  }

  /** Try getting a file from Obsidian's internal cache */
  function tryObsidianCacheFile(baseName) {
    try {
      var siteFiles = null;
      if (window.publish && window.publish.vault) {
        siteFiles = window.publish.vault.fileMap || window.publish.vault.files;
      }
      if (!siteFiles && window.app && window.app.vault) {
        siteFiles = window.app.vault.fileMap || window.app.vault.files;
      }
      if (!siteFiles && window.publish && window.publish.site) {
        siteFiles = window.publish.site.cache || window.publish.site.files;
      }
      if (!siteFiles) return null;

      var candidates = [
        baseName + '.md',
        'Questions/' + baseName + '.md',
        'Concepts/' + baseName + '.md',
        'Concepts/Questions/' + baseName + '.md',
        baseName,
        'Questions/' + baseName,
        'Concepts/' + baseName,
      ];
      for (var k = 0; k < candidates.length; k++) {
        var entry = siteFiles[candidates[k]];
        if (!entry) continue;
        var md = typeof entry === 'string' ? entry :
                 (entry.content || entry.markdown || entry.data || '');
        if (md) return md;
      }
    } catch (e) {}
    return null;
  }

  /** Try extracting markdown content from an HTML response */
  function extractMarkdownFromResponse(html) {
    try {
      var doc = new DOMParser().parseFromString(html, 'text/html');

      // Look for rendered markdown containers
      var content = doc.querySelector('.markdown-preview-view, .markdown-rendered, .publish-renderer');
      if (content && content.textContent.trim().length > 20) {
        return content.innerHTML;
      }

      // Look for raw markdown in data attributes or script tags
      var pageData = doc.querySelector('[data-page-content], [data-markdown]');
      if (pageData) {
        var raw = pageData.getAttribute('data-page-content') || pageData.getAttribute('data-markdown') || '';
        if (raw && looksLikeMarkdown(raw)) return raw;
      }
    } catch (e) {}
    return null;
  }

  /* -----------------------------------------------------------
     RENDER MARKDOWN to basic HTML
     Handles paragraphs, bold, italic, code, LaTeX, answer choices
     ----------------------------------------------------------- */
  function renderMarkdown(md) {
    if (!md) return '';

    // Normalize line endings
    md = md.replace(/\r\n/g, '\n');

    // Block-level LaTeX: $$...$$ → display math
    md = md.replace(/\$\$([\s\S]*?)\$\$/g, function (_, tex) {
      return '\n<div class="qb-math-block">\\[' + tex.trim() + '\\]</div>\n';
    });

    // Inline LaTeX: $...$ → inline math (avoid matching $$ or currency)
    md = md.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g, function (_, tex) {
      return '<span class="qb-math-inline">\\(' + tex + '\\)</span>';
    });

    // Split into paragraphs
    var blocks = md.split(/\n{2,}/);
    var html = blocks.map(function (block) {
      block = block.trim();
      if (!block) return '';

      // Already wrapped in HTML (math block, etc.)
      if (block.startsWith('<div') || block.startsWith('<span')) return block;

      // Bold
      block = block.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Italic
      block = block.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
      // Inline code
      block = block.replace(/`([^`]+)`/g, '<code>$1</code>');
      // Highlight ==text==
      block = block.replace(/==(.+?)==/g, '<mark>$1</mark>');

      // Answer choices: lines starting with **A.** **B.** etc.
      block = block.replace(/^(\*\*[A-E]\.\*\*\s*.+)$/gm, '<span class="qb-choice">$1</span>');

      // Line breaks within a block
      block = block.replace(/\n/g, '<br>');

      return '<p>' + block + '</p>';
    }).join('');

    return html;
  }

  /* -----------------------------------------------------------
     TRIGGER MATH RENDERING if MathJax or KaTeX is available
     ----------------------------------------------------------- */
  function triggerMathRender(element) {
    try {
      if (window.MathJax) {
        if (MathJax.typeset) {
          MathJax.typeset([element]);
        } else if (MathJax.Hub && MathJax.Hub.Queue) {
          MathJax.Hub.Queue(['Typeset', MathJax.Hub, element]);
        }
      }
      if (window.renderMathInElement) {
        renderMathInElement(element, {
          delimiters: [
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
          ],
        });
      }
    } catch (e) {}
  }

  /* -----------------------------------------------------------
     DATA: Get concepts for an exam
     ----------------------------------------------------------- */
  async function getConceptsForExam(examKey) {
    if (conceptsCache[examKey]) return conceptsCache[examKey];

    var exam = EXAMS.find(function (e) { return e.key === examKey; });
    if (!exam) return [];

    // 1. Try parsing from current page DOM (fast, no fetch)
    var nav = document.querySelector('.exam-nav[data-current]');
    if (nav) {
      var cur = nav.dataset.current || '';
      if (cur.startsWith(examKey)) {
        var concepts = parseConceptsFromDOM();
        if (concepts.length > 0) {
          conceptsCache[examKey] = concepts;
          return concepts;
        }
      }
    }

    // 2. Fetch the exam page HTML and parse
    try {
      var url = '/' + exam.path.split('/').map(encodeURIComponent).join('/');
      var resp = await fetch(url);
      if (resp.ok) {
        var html = await resp.text();
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var concepts = parseConceptsFromDoc(doc);
        if (concepts.length > 0) {
          conceptsCache[examKey] = concepts;
          return concepts;
        }
      }
    } catch (e) {
      // Fetch failed — fall through
    }

    return [];
  }

  /** Parse concept names from the current page's embed elements */
  function parseConceptsFromDOM() {
    var concepts = [];
    document.querySelectorAll('.internal-embed').forEach(function (embed) {
      var src = embed.getAttribute('src') || embed.getAttribute('data-src') || '';
      if (!src.includes('#Definition')) return;
      var name = src.split('#')[0].replace(/^Concepts\//, '').trim();
      if (name && concepts.indexOf(name) === -1) concepts.push(name);
    });
    return concepts;
  }

  /** Parse concept names from a fetched HTML document */
  function parseConceptsFromDoc(doc) {
    var concepts = [];
    // Try embed sources first
    doc.querySelectorAll('.internal-embed[src*="#Definition"]').forEach(function (embed) {
      var src = embed.getAttribute('src') || '';
      var name = src.split('#')[0].replace(/^Concepts\//, '').trim();
      if (name && concepts.indexOf(name) === -1) concepts.push(name);
    });
    // Fallback: h6 headings (used as invisible concept anchors)
    if (concepts.length === 0) {
      doc.querySelectorAll('h6').forEach(function (h6) {
        var text = h6.textContent.trim();
        if (text && concepts.indexOf(text) === -1) concepts.push(text);
      });
    }
    return concepts;
  }

  /* -----------------------------------------------------------
     DATA: Get questions for a concept
     Uses multiple strategies since Obsidian Publish is a SPA
     and fetch() may return the app shell without content.
     ----------------------------------------------------------- */
  async function getQuestionsForConcept(conceptName) {
    if (questionsCache[conceptName]) return questionsCache[conceptName];

    var questions = [];

    // Strategy 1: Obsidian Publish internal cache (fastest, most reliable)
    questions = tryObsidianCache(conceptName);
    if (questions.length > 0) {
      questionsCache[conceptName] = questions;
      return questions;
    }

    // Strategy 2: Fetch concept page and try multiple parsing methods
    var fetchPaths = [
      'Concepts/' + conceptName,
      conceptName,
    ];

    for (var i = 0; i < fetchPaths.length; i++) {
      if (questions.length > 0) break;
      try {
        var url = '/' + fetchPaths[i].split('/').map(encodeURIComponent).join('/');
        var resp = await fetch(url);
        if (!resp.ok) continue;

        var text = await resp.text();

        // 2a: Parse rendered HTML for callout elements (works if SSR)
        var doc = new DOMParser().parseFromString(text, 'text/html');
        questions = parseQuestionsFromHTML(doc);
        if (questions.length > 0) break;

        // 2b: Parse raw text for markdown [!example] patterns
        //     (works even if response is SPA shell with embedded data)
        questions = parseQuestionsFromMarkdown(text);
        if (questions.length > 0) break;
      } catch (e) {
        // Try next path
      }
    }

    // Strategy 3: Try the Obsidian Publish content API directly
    if (questions.length === 0) {
      questions = await tryPublishAPI(conceptName);
    }

    questionsCache[conceptName] = questions;
    return questions;
  }

  /* -----------------------------------------------------------
     Strategy 1: Access Obsidian Publish's in-memory file cache
     ----------------------------------------------------------- */
  function tryObsidianCache(conceptName) {
    try {
      // Obsidian Publish exposes the site object on window
      var siteFiles = null;

      // Try known Obsidian Publish internal structures
      if (window.publish && window.publish.vault) {
        siteFiles = window.publish.vault.fileMap || window.publish.vault.files;
      }
      if (!siteFiles && window.app && window.app.vault) {
        siteFiles = window.app.vault.fileMap || window.app.vault.files;
      }
      if (!siteFiles && window.publish && window.publish.site) {
        siteFiles = window.publish.site.cache || window.publish.site.files;
      }

      if (siteFiles) {
        var filePaths = [
          'Concepts/' + conceptName + '.md',
          conceptName + '.md',
          'Concepts/' + conceptName,
          conceptName,
        ];
        for (var j = 0; j < filePaths.length; j++) {
          var entry = siteFiles[filePaths[j]];
          if (!entry) continue;

          // The entry could be a string (raw md) or an object
          var md = typeof entry === 'string' ? entry :
                   (entry.content || entry.markdown || entry.data || '');
          if (md) {
            var q = parseQuestionsFromMarkdown(md);
            if (q.length > 0) return q;
          }
        }
      }
    } catch (e) {
      // Internal API not available — fall through
    }
    return [];
  }

  /* -----------------------------------------------------------
     Strategy 3: Try Obsidian Publish content API
     The API serves raw markdown at /access/<siteId>/<path>
     ----------------------------------------------------------- */
  async function tryPublishAPI(conceptName) {
    try {
      // Extract the site ID from the page
      var siteId = extractSiteId();
      if (!siteId) return [];

      var filePaths = [
        'Concepts/' + conceptName + '.md',
        conceptName + '.md',
      ];

      for (var j = 0; j < filePaths.length; j++) {
        try {
          var apiUrl = 'https://publish-01.obsidian.md/access/' + siteId + '/' + encodeURIComponent(filePaths[j]);
          var resp = await fetch(apiUrl);
          if (!resp.ok) continue;
          var md = await resp.text();
          var q = parseQuestionsFromMarkdown(md);
          if (q.length > 0) return q;
        } catch (e) { continue; }
      }
    } catch (e) {
      // API not available
    }
    return [];
  }

  /** Try to find the Obsidian Publish site ID from the page */
  function extractSiteId() {
    try {
      // Check for publish site properties
      if (window.publish && window.publish.siteId) return window.publish.siteId;
      if (window.publish && window.publish.site && window.publish.site.id) return window.publish.site.id;

      // Check <link> and <script> tags for publish-01.obsidian.md references
      var els = document.querySelectorAll('link[href*="publish-01.obsidian.md"], script[src*="publish-01.obsidian.md"]');
      for (var i = 0; i < els.length; i++) {
        var attr = els[i].getAttribute('href') || els[i].getAttribute('src') || '';
        var m = attr.match(/publish-01\.obsidian\.md\/access\/([a-f0-9]+)/);
        if (m) return m[1];
      }

      // Check meta tags
      var meta = document.querySelector('meta[name="publish-site-id"], meta[property="publish-site-id"]');
      if (meta) return meta.content;
    } catch (e) {}
    return null;
  }

  /* -----------------------------------------------------------
     PARSE QUESTIONS from rendered HTML (SSR callout elements)
     ----------------------------------------------------------- */
  function parseQuestionsFromHTML(doc) {
    var questions = [];

    var callouts = doc.querySelectorAll('.callout[data-callout="example"]');
    if (callouts.length === 0) callouts = doc.querySelectorAll('[data-callout="example"]');
    if (callouts.length === 0) callouts = doc.querySelectorAll('.callout-example');

    callouts.forEach(function (callout) {
      var titleEl = callout.querySelector('.callout-title-inner') ||
                    callout.querySelector('.callout-title');
      if (!titleEl) return;

      var raw = titleEl.textContent.trim();

      // Try to find embed references in the callout content
      var embedRef = null;
      var contentEl = callout.querySelector('.callout-content');
      if (contentEl) {
        var embedLink = contentEl.querySelector('.internal-embed');
        if (embedLink) {
          embedRef = embedLink.getAttribute('src') || embedLink.getAttribute('data-src') || null;
        }
      }

      addParsedQuestion(questions, raw, embedRef, null);
    });

    return questions;
  }

  /* -----------------------------------------------------------
     PARSE QUESTIONS from raw markdown / text
     Multi-line parser: captures title, embed refs, inline content
     ----------------------------------------------------------- */
  function parseQuestionsFromMarkdown(text) {
    var questions = [];
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var titleMatch = lines[i].match(/^>\s*\[!example\][+-]?\s*(.+)/);
      if (!titleMatch) continue;

      var titleRaw = titleMatch[1].replace(/<[^>]+>/g, '').trim();

      // Collect subsequent > continuation lines (callout body)
      var bodyLines = [];
      var j = i + 1;
      while (j < lines.length && /^>/.test(lines[j])) {
        bodyLines.push(lines[j].replace(/^>\s?/, ''));
        j++;
      }
      var body = bodyLines.join('\n').trim();

      // Check for embed reference: ![[filename#section]]
      var embedRef = null;
      var inlineContent = null;
      var embedMatch = body.match(/!\[\[([^\]]+)\]\]/);
      if (embedMatch) {
        embedRef = embedMatch[1];
      } else if (body) {
        inlineContent = body;
      }

      addParsedQuestion(questions, titleRaw, embedRef, inlineContent);
      i = j - 1; // skip body lines
    }

    return questions;
  }

  /* -----------------------------------------------------------
     SHARED: Build a question object from parsed data
     ----------------------------------------------------------- */
  function addParsedQuestion(questions, raw, embedRef, inlineContent) {
    raw = raw.replace(/<[^>]+>/g, '').trim();
    if (!raw) return;

    // Match pattern: "Question (Category, Difficulty-Level)"
    var m = raw.match(/Question\s*\(([^,]+),\s*([^)]+)\)/i);

    var category = m ? m[1].trim() : '';
    var difficulty = m ? m[2].trim() : '';
    var level = '0';
    var levelMatch = difficulty.match(/(\d)/);
    if (levelMatch) level = levelMatch[1];

    var title = raw;
    if (m) {
      title = category + ', ' + difficulty;
    }

    questions.push({
      title: title,
      category: category,
      difficulty: difficulty,
      level: level,
      embedRef: embedRef || null,
      inlineContent: inlineContent || null,
    });
  }

})();
