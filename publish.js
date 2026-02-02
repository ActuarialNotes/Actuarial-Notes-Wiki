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
   BATTLE QUIZ SYSTEM v4 - JavaScript
   Interactive learning system for Obsidian Publish
   
   Reads questions from embedded ![[question]] files
   - First 3 embeds = Battle questions (learn concept)
   - Additional embeds = Refresher pool (for future spaced repetition)
   
   KEY FIX: Waits for embeds to fully load before hiding/parsing
   
   Add this to your publish.js file
   =========================================================== */

(function() {
    'use strict';

    // =========================================================================
    // Configuration
    // =========================================================================

    const CONFIG = {
        // Number of questions per battle
        questionsPerBattle: 3,
        // Storage key for learned concepts
        storageKey: 'battle-learned-concepts',
        // Storage key for question history (for future spaced repetition)
        historyStorageKey: 'battle-question-history',
        // Selector for concept embeds (embeds inside exam/syllabus pages)
        conceptEmbedSelector: '.markdown-embed, .internal-embed',
        // Selector for the embed title
        embedTitleSelector: '.markdown-embed-title, .embed-title',
        // Class to mark question containers (applied AFTER loading)
        questionContainerClass: 'battle-question-embed',
        // How to identify question embeds by their title/src
        // Changed from /^q_\d+/i to match q_ anywhere in path (e.g., "Concepts/q_001_...")
        questionIdentifier: /(?:^|[\/\\])q_\d+/i, // Matches q_001, q_002, etc. at start or after path separator
        // Delay before initializing (ms)
        initDelay: 500,
        // Delay to wait for embeds to load
        embedLoadDelay: 1000,
        // Max wait time for embeds to load
        embedLoadTimeout: 5000,
        // MathJax re-render delay
        mathRenderDelay: 100
    };

    // =========================================================================
    // State Management
    // =========================================================================

    const state = {
        battleActive: false,
        currentConcept: null,
        currentEmbed: null,
        questions: [],
        allQuestions: [],
        currentQuestionIndex: 0,
        correctAnswers: 0,
        answered: false,
        selectedAnswer: null,
        learnedConcepts: new Set(),
        questionHistory: {},
        processedEmbeds: new WeakSet() // Track which embeds we've processed
    };

    // =========================================================================
    // Persistence - Local Storage
    // =========================================================================

    function loadLearnedConcepts() {
        try {
            const stored = localStorage.getItem(CONFIG.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                state.learnedConcepts = new Set(parsed);
            }
        } catch (e) {
            console.warn('Battle: Could not load learned concepts:', e);
        }
    }

    function saveLearnedConcepts() {
        try {
            const data = JSON.stringify([...state.learnedConcepts]);
            localStorage.setItem(CONFIG.storageKey, data);
        } catch (e) {
            console.warn('Battle: Could not save learned concepts:', e);
        }
    }

    function loadQuestionHistory() {
        try {
            const stored = localStorage.getItem(CONFIG.historyStorageKey);
            if (stored) {
                state.questionHistory = JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Battle: Could not load question history:', e);
        }
    }

    function saveQuestionHistory() {
        try {
            const data = JSON.stringify(state.questionHistory);
            localStorage.setItem(CONFIG.historyStorageKey, data);
        } catch (e) {
            console.warn('Battle: Could not save question history:', e);
        }
    }

    function markConceptLearned(conceptName) {
        state.learnedConcepts.add(normalizeConceptName(conceptName));
        saveLearnedConcepts();
        updateAllBattleButtons();
    }

    function isConceptLearned(conceptName) {
        return state.learnedConcepts.has(normalizeConceptName(conceptName));
    }

    function normalizeConceptName(name) {
        return name.toLowerCase().trim().replace(/\s+/g, ' ');
    }

    // =========================================================================
    // Embed Loading Detection
    // =========================================================================

    function isEmbedLoaded(embed) {
        // Check if embed has the is-loaded class
        if (embed.classList.contains('is-loaded')) {
            return true;
        }
        
        // Check if content area has actual content
        const content = embed.querySelector('.markdown-embed-content, .markdown-preview-view');
        if (content) {
            const sizer = content.querySelector('.markdown-preview-sizer');
            if (sizer && sizer.children.length > 0) {
                return true;
            }
            // Also check for direct text content
            if (content.textContent.trim().length > 50) {
                return true;
            }
        }
        
        return false;
    }

    function waitForEmbedToLoad(embed, timeout = CONFIG.embedLoadTimeout) {
        return new Promise((resolve) => {
            // If already loaded, resolve immediately
            if (isEmbedLoaded(embed)) {
                resolve(true);
                return;
            }

            const startTime = Date.now();
            
            const checkLoaded = () => {
                if (isEmbedLoaded(embed)) {
                    resolve(true);
                    return;
                }
                
                if (Date.now() - startTime > timeout) {
                    console.warn('Battle: Embed load timeout', embed);
                    resolve(false);
                    return;
                }
                
                requestAnimationFrame(checkLoaded);
            };
            
            // Also observe for changes
            const observer = new MutationObserver(() => {
                if (isEmbedLoaded(embed)) {
                    observer.disconnect();
                    resolve(true);
                }
            });
            
            observer.observe(embed, { 
                childList: true, 
                subtree: true,
                characterData: true 
            });
            
            // Start checking
            checkLoaded();
            
            // Cleanup observer on timeout
            setTimeout(() => {
                observer.disconnect();
            }, timeout);
        });
    }

    // =========================================================================
    // Question Embed Identification
    // =========================================================================

    function isQuestionEmbed(embed) {
        // Check by src attribute (various possible attribute names in Obsidian Publish)
        const src = embed.getAttribute('src') 
            || embed.getAttribute('alt') 
            || embed.getAttribute('data-src')
            || embed.getAttribute('data-href')
            || '';
        
        if (CONFIG.questionIdentifier.test(src)) {
            return true;
        }
        
        // Check by title element
        const title = embed.querySelector('.markdown-embed-title, .embed-title');
        if (title && CONFIG.questionIdentifier.test(title.textContent)) {
            return true;
        }
        
        // Check by link inside the embed (Obsidian Publish sometimes uses this)
        const link = embed.querySelector('.markdown-embed-link, .embed-link, a.internal-link');
        if (link) {
            const href = link.getAttribute('href') || link.getAttribute('data-href') || '';
            if (CONFIG.questionIdentifier.test(href)) {
                return true;
            }
        }
        
        // Check the embed's class list for any classes containing the question pattern
        const classList = embed.className || '';
        if (/q_\d+/i.test(classList)) {
            return true;
        }
        
        return false;
    }

    function findQuestionEmbedsInConcept(conceptEmbed) {
        const allEmbeds = conceptEmbed.querySelectorAll('.markdown-embed, .internal-embed');
        const questionEmbeds = [];
        
        console.log('Battle: Searching for questions in concept, found', allEmbeds.length, 'total embeds');
        
        allEmbeds.forEach((embed, idx) => {
            // Skip if it's the concept embed itself
            if (embed === conceptEmbed) return;
            
            // Debug: log embed attributes
            const src = embed.getAttribute('src') || embed.getAttribute('alt') || embed.getAttribute('data-src') || '';
            const title = embed.querySelector('.markdown-embed-title, .embed-title');
            console.log(`Battle: Embed ${idx}: src="${src}", title="${title?.textContent || 'none'}"`);
            
            // Check if this is a question embed
            if (isQuestionEmbed(embed)) {
                console.log(`Battle: Embed ${idx} identified as question embed`);
                questionEmbeds.push(embed);
            }
        });
        
        return questionEmbeds;
    }

    // =========================================================================
    // Question Parser - Extracts questions from rendered embed HTML
    // =========================================================================

    function parseQuestionFromEmbed(embed, index) {
        const result = {
            id: `q_${index}_${Date.now()}`,
            question: '',
            options: [],
            answer: '',
            explanation: '',
            sourceEmbed: embed
        };

        // Get the embed content area - try multiple selectors for Obsidian Publish compatibility
        let content = embed.querySelector('.markdown-embed-content .markdown-preview-view');
        if (!content) content = embed.querySelector('.markdown-embed-content');
        if (!content) content = embed.querySelector('.markdown-preview-view');
        if (!content) content = embed.querySelector('.markdown-preview-sizer');
        if (!content) content = embed; // Last resort: use the embed itself
        
        if (!content) {
            console.warn('Battle: No content area found in embed', embed);
            return null;
        }

        // Clone to avoid modifying the original
        const contentClone = content.cloneNode(true);
        
        // Get the full HTML for parsing
        const fullHTML = contentClone.innerHTML;
        const fullText = contentClone.textContent;

        // Debug: log what we're working with
        console.log('Battle: Parsing question, content length:', fullText.length);
        console.log('Battle: First 200 chars:', fullText.substring(0, 200));

        if (fullText.length < 20) {
            console.warn('Battle: Content too short, embed may not be loaded', embed);
            return null;
        }

        // Parse question text (content before Answer Choices)
        result.question = extractQuestionText(contentClone);
        console.log('Battle: Extracted question:', result.question ? result.question.substring(0, 100) + '...' : 'NONE');
        
        // Parse answer choices
        result.options = extractAnswerChoices(contentClone, fullText);
        console.log('Battle: Extracted options:', result.options);
        
        // Parse solution and extract correct answer
        const solutionData = extractSolution(contentClone, fullText);
        result.explanation = solutionData.explanation;
        result.answer = solutionData.answer;
        console.log('Battle: Extracted answer:', result.answer);

        // Validate
        if (!result.question || result.options.length < 2 || !result.answer) {
            console.warn('Battle: Invalid question parsed', {
                hasQuestion: !!result.question,
                questionLength: result.question?.length || 0,
                optionCount: result.options.length,
                answer: result.answer
            });
            return null;
        }

        console.log('Battle: Successfully parsed question with', result.options.length, 'options');
        return result;
    }

    function extractQuestionText(container) {
        const fullText = container.textContent;
        const fullHTML = container.innerHTML;
        
        // Find the Question section - try multiple approaches
        const headers = container.querySelectorAll('h1, h2, h3');
        let questionHeader = null;
        let answerChoicesHeader = null;
        
        headers.forEach(h => {
            const text = h.textContent.toLowerCase().trim();
            if (text === 'question') {
                questionHeader = h;
            } else if (text === 'answer choices' || text === 'options' || text === 'choices') {
                answerChoicesHeader = h;
            }
        });

        // Method 1: If we found a Question header, get content after it
        if (questionHeader) {
            const contentParts = [];
            let sibling = questionHeader.nextElementSibling;
            
            while (sibling && sibling !== answerChoicesHeader) {
                if (!sibling.matches('h1, h2, h3') || 
                    !['answer choices', 'options', 'solution', 'answer'].includes(sibling.textContent.toLowerCase().trim())) {
                    contentParts.push(sibling.outerHTML);
                } else {
                    break;
                }
                sibling = sibling.nextElementSibling;
            }
            
            if (contentParts.length > 0) {
                return contentParts.join('');
            }
        }

        // Method 2: Use regex to extract text between "Question" and "Answer Choices"
        // This handles cases where headers aren't properly detected
        const questionMatch = fullText.match(/(?:^|\n)#*\s*Question\s*\n([\s\S]*?)(?=\n#*\s*Answer\s*Choices|\n#*\s*Options|$)/i);
        if (questionMatch && questionMatch[1]) {
            const questionText = questionMatch[1].trim();
            if (questionText.length > 10) {
                // Convert to basic HTML
                return '<p>' + questionText.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
            }
        }
        
        // Method 3: Look for text that starts after frontmatter and ends before Answer Choices
        // Handle the case where frontmatter is included: "shuffle: trueQuestion A survey..."
        const frontmatterEndMatch = fullText.match(/shuffle:\s*true\s*Question\s+([\s\S]*?)(?=Answer\s*Choices|$)/i);
        if (frontmatterEndMatch && frontmatterEndMatch[1]) {
            const questionText = frontmatterEndMatch[1].trim();
            if (questionText.length > 10) {
                return '<p>' + questionText.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
            }
        }
        
        // Method 4: Just look for "Question" followed by content until "Answer Choices"
        const simpleMatch = fullText.match(/Question\s+([\s\S]*?)(?=Answer\s*Choices|$)/i);
        if (simpleMatch && simpleMatch[1]) {
            const questionText = simpleMatch[1].trim();
            // Remove any frontmatter remnants
            const cleanedText = questionText.replace(/^[\s\S]*?(?:shuffle:\s*true\s*)/i, '').trim();
            if (cleanedText.length > 10) {
                return '<p>' + cleanedText.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
            }
        }

        // Method 5: Fallback - get everything before "Answer Choices" from HTML
        const answerChoicesIndex = fullHTML.search(/Answer\s*Choices|##\s*Options/i);
        if (answerChoicesIndex > 0) {
            let questionHTML = fullHTML.substring(0, answerChoicesIndex);
            // Remove frontmatter, Question header, and other noise
            questionHTML = questionHTML.replace(/<h[1-6][^>]*>\s*Question\s*<\/h[1-6]>/gi, '');
            questionHTML = questionHTML.replace(/tags:.*?(?=<|$)/gi, '');
            questionHTML = questionHTML.replace(/concepts:.*?(?=<|$)/gi, '');
            questionHTML = questionHTML.replace(/difficulty:.*?(?=<|$)/gi, '');
            questionHTML = questionHTML.replace(/shuffle:.*?(?=<|$)/gi, '');
            return questionHTML.trim();
        }

        console.warn('Battle: Could not extract question text');
        return '';
    }

    function extractAnswerChoices(container, fullText) {
        const options = [];
        
        // Get text after "Answer Choices" header and before "Solution"
        // Try multiple patterns to find the answer choices section
        let searchText = '';
        
        // Pattern 1: Between "Answer Choices" and "Solution" (with or without ##)
        const pattern1 = fullText.match(/Answer\s*Choices\s*([\s\S]*?)(?=\n\s*#*\s*Solution|\nSolution\s|$)/i);
        if (pattern1) {
            searchText = pattern1[1];
        }
        
        // If that didn't work, try just getting after Answer Choices
        if (!searchText || searchText.length < 5) {
            const pattern2 = fullText.match(/Answer\s*Choices\s*([\s\S]*?)$/i);
            if (pattern2) {
                // Manually cut off at "Solution"
                searchText = pattern2[1].split(/\n\s*#*\s*Solution/i)[0];
            }
        }
        
        // Fallback to full text
        if (!searchText) {
            searchText = fullText;
        }
        
        console.log('Battle: Searching for choices in:', searchText.substring(0, 200));
        
        // Method 1: Split by lines and look for (A), (B), etc.
        const lines = searchText.split('\n');
        for (const line of lines) {
            // Stop if we hit "Solution"
            if (/^\s*#*\s*Solution/i.test(line)) break;
            
            const lineMatch = line.match(/^\s*\(([A-E])\)\s*(.+)$/i);
            if (lineMatch) {
                const letter = lineMatch[1].toUpperCase();
                let content = lineMatch[2].trim();
                // Remove any trailing "Solution" text that might have snuck in
                content = content.replace(/\s*Solution[\s\S]*$/i, '').trim();
                if (content && !options.find(o => o.letter === letter)) {
                    options.push({ letter, content });
                }
            }
        }
        
        // Method 2: If no matches, try regex on full text
        if (options.length === 0) {
            const choicePattern = /\(([A-E])\)\s*([^\n(]+)/gi;
            let match;
            while ((match = choicePattern.exec(searchText)) !== null) {
                const letter = match[1].toUpperCase();
                let content = match[2].trim();
                content = content.replace(/\s*Solution[\s\S]*$/i, '').trim();
                if (content && !options.find(o => o.letter === letter)) {
                    options.push({ letter, content });
                }
            }
        }

        // Method 3: Look for list items if no options found
        if (options.length === 0) {
            const listItems = container.querySelectorAll('li');
            listItems.forEach(li => {
                const text = li.textContent.trim();
                const itemMatch = text.match(/^\(?([A-E])[\)\.:]?\s*(.+)$/i);
                if (itemMatch) {
                    let content = itemMatch[2].trim();
                    content = content.replace(/\s*Solution[\s\S]*$/i, '').trim();
                    options.push({
                        letter: itemMatch[1].toUpperCase(),
                        content: content
                    });
                }
            });
        }
        
        // Method 4: Look for paragraphs that start with (A), (B), etc.
        if (options.length === 0) {
            const paragraphs = container.querySelectorAll('p');
            paragraphs.forEach(p => {
                const text = p.textContent.trim();
                const pMatch = text.match(/^\(?([A-E])\)?\s*(.+)$/i);
                if (pMatch) {
                    let content = pMatch[2].trim();
                    content = content.replace(/\s*Solution[\s\S]*$/i, '').trim();
                    options.push({
                        letter: pMatch[1].toUpperCase(),
                        content: content
                    });
                }
            });
        }

        // Sort by letter
        options.sort((a, b) => a.letter.localeCompare(b.letter));
        
        console.log('Battle: Found', options.length, 'options:', options.map(o => o.letter).join(', '));
        
        return options;
    }

    function extractSolution(container, fullText) {
        let explanation = '';
        let answer = '';

        // Find Solution section
        const headers = container.querySelectorAll('h1, h2, h3');
        let solutionHeader = null;
        
        headers.forEach(h => {
            const text = h.textContent.toLowerCase().trim();
            if (text === 'solution' || text === 'explanation' || text === 'answer') {
                solutionHeader = h;
            }
        });

        if (solutionHeader) {
            const contentParts = [];
            let sibling = solutionHeader.nextElementSibling;
            
            while (sibling) {
                contentParts.push(sibling.outerHTML);
                sibling = sibling.nextElementSibling;
            }
            
            explanation = contentParts.join('');
        }

        // Extract answer letter from patterns like **Answer: (D)** or Answer: D
        const answerPatterns = [
            /\*\*Answer:\s*\(?([A-E])\)?/i,
            /Answer:\s*\(?([A-E])\)?/i,
            /correct\s*answer[:\s]*\(?([A-E])\)?/i,
            /\(([A-E])\)\s*(?:\*\*)?(?:is\s+)?correct/i,
            /([A-E])\s+is\s+(?:the\s+)?correct/i
        ];

        for (const pattern of answerPatterns) {
            const match = fullText.match(pattern);
            if (match) {
                answer = match[1].toUpperCase();
                break;
            }
        }

        return { explanation, answer };
    }

    // =========================================================================
    // Fetch Questions from Concept Page (for partial embeds like #Definition)
    // =========================================================================
    
    async function fetchQuestionsFromConceptPage(conceptUrl) {
        try {
            // Remove any hash/anchor from URL to get full page
            const fullUrl = conceptUrl.split('#')[0];
            console.log('Battle: Fetching concept page:', fullUrl);
            
            const response = await fetch(fullUrl);
            if (!response.ok) {
                console.warn('Battle: Failed to fetch concept page:', response.status);
                return null;
            }
            
            const html = await response.text();
            
            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Find question embeds in the fetched page
            const embeds = doc.querySelectorAll('.markdown-embed, .internal-embed');
            const questions = [];
            
            console.log('Battle: Found', embeds.length, 'embeds in fetched page');
            
            embeds.forEach((embed, index) => {
                // Check if this is a question embed
                const src = embed.getAttribute('src') || embed.getAttribute('alt') || embed.getAttribute('data-src') || '';
                const title = embed.querySelector('.markdown-embed-title, .embed-title');
                const titleText = title?.textContent || '';
                
                if (CONFIG.questionIdentifier.test(src) || CONFIG.questionIdentifier.test(titleText)) {
                    console.log('Battle: Found question embed in fetched page:', src || titleText);
                    
                    // Parse the question from the embed
                    const question = parseQuestionFromEmbed(embed, index);
                    if (question) {
                        questions.push(question);
                    }
                }
            });
            
            console.log('Battle: Parsed', questions.length, 'questions from fetched page');
            return questions;
            
        } catch (error) {
            console.error('Battle: Error fetching concept page:', error);
            return null;
        }
    }

    // =========================================================================
    // Markdown/Math Rendering
    // =========================================================================

    function triggerMathRender(container) {
        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([container]).catch(err => {
                    console.warn('MathJax typeset error:', err);
                });
            } else if (window.MathJax && window.MathJax.Hub) {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, container]);
            } else if (window.katex && window.renderMathInElement) {
                window.renderMathInElement(container, {
                    delimiters: [
                        {left: '\\[', right: '\\]', display: true},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ]
                });
            }
        }, CONFIG.mathRenderDelay);
    }

    // =========================================================================
    // Utility Functions
    // =========================================================================

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function getConceptNameFromEmbed(embedElement) {
        // PRIORITY: Try from src/alt/data-src attribute first
        // This is the most reliable source as it contains the full reference
        // e.g., "Inclusion-Exclusion Principle#Definition" -> "Inclusion-Exclusion Principle"
        const src = embedElement.getAttribute('src') 
            || embedElement.getAttribute('alt') 
            || embedElement.getAttribute('data-src')
            || '';
        
        if (src) {
            // Extract just the page name, removing any #Section anchor
            // Handle paths like "Concepts/Name#Section" or "Name#Section"
            const withoutAnchor = src.split('#')[0];
            const name = withoutAnchor.split('/').pop().replace(/-/g, ' ').trim();
            if (name) {
                console.log('Battle: Got concept name from src attribute:', name, '(from', src, ')');
                return name;
            }
        }
        
        // FALLBACK 1: Try to get from the embed link (often has the full path)
        // This is crucial for partial embeds where title shows section name
        const embedLink = embedElement.querySelector('.markdown-embed-link, a.internal-link');
        if (embedLink) {
            const href = embedLink.getAttribute('href') || '';
            if (href) {
                const withoutAnchor = href.split('#')[0];
                const name = withoutAnchor.split('/').pop().replace(/-/g, ' ').trim();
                if (name) {
                    console.log('Battle: Got concept name from embed link:', name);
                    return name;
                }
            }
        }
        
        // FALLBACK 2: Check for any link inside the embed that points to the concept page
        // This helps with partial embeds that might have different structures
        const anyLink = embedElement.querySelector('a[href]');
        if (anyLink) {
            const href = anyLink.getAttribute('href') || '';
            // Only use if it looks like a concept link (not an anchor-only link)
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                const withoutAnchor = href.split('#')[0];
                const name = withoutAnchor.split('/').pop().replace(/-/g, ' ').trim();
                if (name && name.length > 2) {
                    console.log('Battle: Got concept name from internal link:', name);
                    return name;
                }
            }
        }
        
        // FALLBACK 3: For Obsidian Publish, check data-href attribute on the embed itself
        const dataHref = embedElement.getAttribute('data-href') || '';
        if (dataHref) {
            const withoutAnchor = dataHref.split('#')[0];
            const name = withoutAnchor.split('/').pop().replace(/-/g, ' ').trim();
            if (name) {
                console.log('Battle: Got concept name from data-href:', name);
                return name;
            }
        }
        
        // FALLBACK 4: Check the title link if the title element contains a link
        const titleEl = embedElement.querySelector(':scope > .markdown-embed-title, :scope > .embed-title');
        if (titleEl) {
            // First, check if the title has a link inside it
            const titleLink = titleEl.querySelector('a');
            if (titleLink) {
                const href = titleLink.getAttribute('href') || '';
                if (href) {
                    const withoutAnchor = href.split('#')[0];
                    const name = withoutAnchor.split('/').pop().replace(/-/g, ' ').trim();
                    if (name) {
                        console.log('Battle: Got concept name from title link:', name);
                        return name;
                    }
                }
            }
            
            // If no link, use title text but only if it doesn't look like a section name
            const titleText = titleEl.textContent.trim();
            const sectionNames = ['definition', 'overview', 'introduction', 'summary', 
                                   'examples', 'notes', 'references', 'see also', 'battle questions'];
            if (!sectionNames.includes(titleText.toLowerCase())) {
                console.log('Battle: Got concept name from title element:', titleText);
                return titleText;
            } else {
                console.log('Battle: Title looks like section name, skipping:', titleText);
            }
        }

        console.log('Battle: Could not determine concept name for embed');
        return null;
    }

    // =========================================================================
    // Page-Level Battle Button (for concept pages with questions directly on them)
    // =========================================================================

    function findQuestionEmbedsOnPage() {
        // Look for question embeds anywhere on the current page
        const pageContent = document.querySelector('.markdown-rendered, .markdown-preview-view, .page-content, main');
        if (!pageContent) return [];
        
        const allEmbeds = pageContent.querySelectorAll('.markdown-embed, .internal-embed');
        const questionEmbeds = [];
        
        console.log('Battle: Searching for questions on PAGE, found', allEmbeds.length, 'total embeds');
        
        allEmbeds.forEach((embed, idx) => {
            const src = embed.getAttribute('src') 
                || embed.getAttribute('alt') 
                || embed.getAttribute('data-src') 
                || '';
            const title = embed.querySelector('.markdown-embed-title, .embed-title');
            console.log(`Battle: Page Embed ${idx}: src="${src}", title="${title?.textContent || 'none'}"`);
            
            if (isQuestionEmbed(embed)) {
                console.log(`Battle: Page Embed ${idx} identified as question embed`);
                questionEmbeds.push(embed);
            }
        });
        
        return questionEmbeds;
    }

    function getPageConceptName() {
        // Try to get the page title from various sources
        // 1. Look for h1 heading
        const h1 = document.querySelector('.markdown-rendered h1, .page-header h1, h1.page-title');
        if (h1) return h1.textContent.trim();
        
        // 2. Look for page title element
        const pageTitle = document.querySelector('.page-title, .publish-article-heading, .inline-title');
        if (pageTitle) return pageTitle.textContent.trim();
        
        // 3. Try document title
        const docTitle = document.title?.split(' - ')[0]?.trim();
        if (docTitle) return docTitle;
        
        return null;
    }

    function addBattleButtonToPage() {
        // Check if we already added a page-level battle button
        if (document.querySelector('.battle-page-btn-container')) return;
        
        // Find question embeds on the page (for when viewing the full concept page)
        const questionEmbeds = findQuestionEmbedsOnPage();
        console.log('Battle: Found', questionEmbeds.length, 'question embeds on page');
        
        // Only add button if there are enough questions on the current page
        if (questionEmbeds.length < CONFIG.questionsPerBattle) return;
        
        const conceptName = getPageConceptName();
        console.log('Battle: Page concept name:', conceptName);
        if (!conceptName) return;
        
        // Find the "Definition" heading to place button next to it
        let targetHeading = null;
        const allHeadings = document.querySelectorAll('.markdown-rendered h1, .markdown-rendered h2, .markdown-rendered h3');
        for (const heading of allHeadings) {
            const headingText = heading.textContent.toLowerCase().trim();
            if (headingText === 'definition') {
                targetHeading = heading;
                break;
            }
        }
        
        // Fallback to first h2 if no Definition heading
        if (!targetHeading) {
            targetHeading = document.querySelector('.markdown-rendered h2');
        }
        
        if (!targetHeading) return;
        
        addBattleButtonToHeading(targetHeading, conceptName, null);
    }
    
    function addBattleButtonToHeading(heading, conceptName, conceptPageUrl) {
        // Create the battle button
        const button = document.createElement('button');
        button.className = 'battle-btn battle-page-btn';
        
        const isLearned = isConceptLearned(conceptName);
        
        if (isLearned) {
            button.classList.add('learned');
            button.innerHTML = `
                <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="battle-btn-text">Learned</span>
            `;
        } else {
            button.innerHTML = `
                <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span class="battle-btn-text">Battle</span>
            `;
        }
        
        button.dataset.concept = conceptName;
        button.dataset.conceptUrl = conceptPageUrl || '';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startBattle(conceptName, null, conceptPageUrl);
        });
        
        // Wrap existing heading text in a span
        const headingText = heading.textContent;
        heading.innerHTML = '';
        
        // Create button container (goes FIRST/LEFT)
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'battle-page-btn-container';
        buttonContainer.style.cssText = 'flex-shrink: 0;';
        buttonContainer.appendChild(button);
        
        // Create text span
        const textSpan = document.createElement('span');
        textSpan.textContent = headingText;
        textSpan.style.cssText = 'flex-grow: 1;';
        
        // Style heading as flex container with button on LEFT
        heading.style.display = 'flex';
        heading.style.alignItems = 'center';
        heading.style.gap = '12px';
        
        // Add button first (left), then text
        heading.appendChild(buttonContainer);
        heading.appendChild(textSpan);
        
        console.log('Battle: Added battle button for', conceptName);
    }

    // =========================================================================
    // Battle Button Integration
    // =========================================================================

    async function addBattleButtons() {
        // First, try to add battle button to the current PAGE if it has questions
        addBattleButtonToPage();
        
        // Then handle concept embeds (like ![[Concept#Definition]])
        await addBattleButtonsToEmbeds();
    }
    
    async function addBattleButtonsToEmbeds() {
        const allEmbeds = document.querySelectorAll(CONFIG.conceptEmbedSelector);
        
        console.log('Battle: Checking', allEmbeds.length, 'embeds for battle buttons');
        
        for (const embed of allEmbeds) {
            // Skip if already processed
            if (state.processedEmbeds.has(embed)) continue;
            
            // Skip question embeds
            if (isQuestionEmbed(embed)) continue;
            
            // Skip if this embed is nested inside another non-question embed
            const parentEmbed = embed.parentElement?.closest(CONFIG.conceptEmbedSelector);
            if (parentEmbed && !isQuestionEmbed(parentEmbed)) continue;

            // Skip if already has battle button
            if (embed.querySelector('.battle-btn, .battle-page-btn-container')) continue;

            // Get the concept name and URL from the embed
            const conceptName = getConceptNameFromEmbed(embed);
            if (!conceptName) {
                console.log('Battle: Skipping embed - no concept name found');
                continue;
            }
            
            // Get the concept page URL from multiple sources
            let conceptUrl = null;
            
            // Try 1: From embed's src/alt/data-src/data-href attribute (most reliable for partial embeds)
            const srcAttr = embed.getAttribute('src') 
                || embed.getAttribute('alt') 
                || embed.getAttribute('data-src')
                || embed.getAttribute('data-href')
                || '';
            if (srcAttr) {
                // Remove anchor, convert to URL path
                const withoutAnchor = srcAttr.split('#')[0];
                conceptUrl = '/' + withoutAnchor.replace(/\s+/g, '-');
                console.log('Battle: Got URL from src attribute:', conceptUrl);
            }
            
            // Try 2: From embed link (check multiple selectors)
            if (!conceptUrl) {
                const conceptLink = embed.querySelector('.markdown-embed-link, .markdown-embed-title a, a.internal-link');
                if (conceptLink) {
                    const href = conceptLink.getAttribute('href');
                    if (href && !href.startsWith('#')) {
                        // Remove anchor from href too
                        conceptUrl = href.split('#')[0];
                        console.log('Battle: Got URL from embed link:', conceptUrl);
                    }
                }
            }
            
            // Try 3: From any internal link in the embed
            if (!conceptUrl) {
                const anyLink = embed.querySelector('a[href]:not([href^="#"]):not([href^="http"])');
                if (anyLink) {
                    const href = anyLink.getAttribute('href');
                    if (href) {
                        conceptUrl = href.split('#')[0];
                        console.log('Battle: Got URL from internal link:', conceptUrl);
                    }
                }
            }
            
            // Try 4: Construct from concept name
            if (!conceptUrl) {
                conceptUrl = '/' + conceptName.replace(/\s+/g, '-');
                console.log('Battle: Constructed URL from name:', conceptUrl);
            }
            
            console.log('Battle: Found concept embed:', conceptName, 'URL:', conceptUrl);

            // Mark as processed
            state.processedEmbeds.add(embed);
            
            // Determine where to place the battle button
            // For partial embeds like #Definition, there may be no headings inside
            
            // Option 1: Look for a heading inside the embed
            let targetHeading = null;
            const headings = embed.querySelectorAll('h1, h2, h3, h4');
            for (const h of headings) {
                const headingText = h.textContent.toLowerCase().trim();
                if (headingText === 'definition' || headingText.includes(conceptName.toLowerCase())) {
                    targetHeading = h;
                    break;
                }
            }
            
            // If no specific heading found, use first heading
            if (!targetHeading && headings.length > 0) {
                targetHeading = headings[0];
            }
            
            // If we found a heading, add button to it
            if (targetHeading) {
                addBattleButtonToHeading(targetHeading, conceptName, conceptUrl);
                console.log('Battle: Added button to heading for', conceptName);
                continue;
            }
            
            // Option 2: Use the embed's title bar (for partial embeds, this shows the section name)
            // Try multiple selectors - Obsidian Publish structure can vary
            let titleBar = embed.querySelector(':scope > .markdown-embed-title');
            if (!titleBar) titleBar = embed.querySelector(':scope > .embed-title');
            if (!titleBar) titleBar = embed.querySelector('.markdown-embed-title');
            if (!titleBar) titleBar = embed.querySelector('.embed-title');
            
            if (titleBar) {
                addBattleButtonToTitleBar(titleBar, conceptName, conceptUrl, embed);
                console.log('Battle: Added button to title bar for', conceptName);
                continue;
            }
            
            // Option 3: Prepend to embed content area
            const embedContent = embed.querySelector('.markdown-embed-content, .markdown-preview-view');
            if (embedContent) {
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'battle-page-btn-container';
                buttonContainer.style.cssText = 'display: flex; margin-bottom: 12px;';
                
                const button = createBattleButton(conceptName, conceptUrl);
                buttonContainer.appendChild(button);
                embedContent.prepend(buttonContainer);
                console.log('Battle: Added button to embed content for', conceptName);
                continue;
            }
            
            // Option 4: Last resort - prepend directly to the embed element
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'battle-page-btn-container';
            buttonContainer.style.cssText = 'display: flex; margin-bottom: 12px;';
            
            const button = createBattleButton(conceptName, conceptUrl);
            buttonContainer.appendChild(button);
            embed.prepend(buttonContainer);
            console.log('Battle: Added button directly to embed for', conceptName);
        }
    }
    
    function createBattleButton(conceptName, conceptUrl) {
        const button = document.createElement('button');
        button.className = 'battle-btn';
        
        const isLearned = isConceptLearned(conceptName);
        
        if (isLearned) {
            button.classList.add('learned');
            button.innerHTML = `
                <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="battle-btn-text">Learned</span>
            `;
        } else {
            button.innerHTML = `
                <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span class="battle-btn-text">Battle</span>
            `;
        }

        button.dataset.concept = conceptName;
        button.dataset.conceptUrl = conceptUrl || '';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startBattle(conceptName, null, conceptUrl);
        });
        
        return button;
    }
    
    function addBattleButtonToTitleBar(titleBar, conceptName, conceptUrl, embed) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'battle-btn-container';

        const button = document.createElement('button');
        button.className = 'battle-btn';
        
        const isLearned = isConceptLearned(conceptName);
        
        if (isLearned) {
            button.classList.add('learned');
            button.innerHTML = `
                <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="battle-btn-text">Learned</span>
            `;
        } else {
            button.innerHTML = `
                <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span class="battle-btn-text">Battle</span>
            `;
        }

        button.dataset.concept = conceptName;
        button.dataset.conceptUrl = conceptUrl || '';
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startBattle(conceptName, embed, conceptUrl);
        });

        buttonContainer.appendChild(button);
        titleBar.appendChild(buttonContainer);

        if (isLearned) {
            embed.classList.add('battle-concept-learned');
        }
    }

    function updateAllBattleButtons() {
        document.querySelectorAll('.battle-btn').forEach(button => {
            const conceptName = button.dataset.concept;
            const isLearned = isConceptLearned(conceptName);
            const embed = button.closest(CONFIG.conceptEmbedSelector);
            
            if (isLearned) {
                button.classList.add('learned');
                button.innerHTML = `
                    <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span class="battle-btn-text">Learned</span>
                `;
                if (embed) {
                    embed.classList.add('battle-concept-learned');
                }
            } else {
                button.classList.remove('learned');
                button.innerHTML = `
                    <svg class="battle-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span class="battle-btn-text">Battle</span>
                `;
                if (embed) {
                    embed.classList.remove('battle-concept-learned');
                }
            }
        });
    }

    // =========================================================================
    // Battle Modal UI
    // =========================================================================

    function createBattleModal() {
        const existingModal = document.getElementById('battle-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'battle-modal';
        modal.className = 'battle-modal';
        modal.innerHTML = `
            <div class="battle-modal-backdrop"></div>
            <div class="battle-modal-container">
                <div class="battle-modal-header">
                    <div class="battle-header-left">
                        <div class="battle-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </div>
                        <div class="battle-header-info">
                            <h2 class="battle-modal-title">Battle: <span id="battle-concept-name"></span></h2>
                            <div class="battle-subtitle">Answer ${CONFIG.questionsPerBattle} questions correctly to learn this concept</div>
                        </div>
                    </div>
                    <button class="battle-close-btn" aria-label="Close battle">&times;</button>
                </div>
                
                <div class="battle-progress-bar">
                    <div class="battle-progress-track">
                        <div id="battle-progress-fill" class="battle-progress-fill"></div>
                    </div>
                    <div class="battle-progress-dots">
                        ${Array(CONFIG.questionsPerBattle).fill(0).map((_, i) => 
                            `<div class="battle-progress-dot" data-index="${i}"></div>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="battle-modal-body">
                    <div id="battle-loading" class="battle-loading">
                        <div class="battle-spinner"></div>
                        <p>Loading questions...</p>
                    </div>
                    
                    <div id="battle-no-questions" class="battle-message" style="display: none;">
                        <div class="battle-message-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h3>No Questions Available</h3>
                        <p>Could not load questions. Make sure question embeds are published.</p>
                        <p class="battle-message-hint">Embed questions using <code>![[q_001_concept]]</code> syntax.</p>
                    </div>
                    
                    <div id="battle-content" style="display: none;">
                        <div class="battle-question-header">
                            <span class="battle-question-number">Question <span id="battle-q-num">1</span> of ${CONFIG.questionsPerBattle}</span>
                        </div>
                        <div id="battle-question-container" class="battle-question-container">
                            <div id="battle-question" class="battle-question"></div>
                            <div id="battle-options" class="battle-options"></div>
                        </div>
                        <div id="battle-feedback" class="battle-feedback" style="display: none;">
                            <div id="battle-feedback-status" class="battle-feedback-status"></div>
                            <div id="battle-explanation" class="battle-explanation"></div>
                        </div>
                        <div class="battle-actions">
                            <button id="battle-next-btn" class="battle-btn-action battle-btn-primary" style="display: none;">
                                Next Question
                            </button>
                        </div>
                    </div>
                    
                    <div id="battle-results" class="battle-results" style="display: none;">
                        <div id="battle-results-success" class="battle-results-content" style="display: none;">
                            <div class="battle-results-icon success">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h3 class="battle-results-title">Concept Learned!</h3>
                            <p class="battle-results-text">You answered all ${CONFIG.questionsPerBattle} questions correctly.</p>
                            <div class="battle-results-actions">
                                <button id="battle-done-btn" class="battle-btn-action battle-btn-primary">Done</button>
                            </div>
                        </div>
                        <div id="battle-results-fail" class="battle-results-content" style="display: none;">
                            <div class="battle-results-icon fail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                            <h3 class="battle-results-title">Not Quite</h3>
                            <p class="battle-results-text">You got <span id="battle-final-score">0</span> out of ${CONFIG.questionsPerBattle} correct.</p>
                            <p class="battle-results-hint">Review the concept and try again!</p>
                            <div class="battle-results-actions">
                                <button id="battle-retry-btn" class="battle-btn-action battle-btn-secondary">Try Again</button>
                                <button id="battle-close-result-btn" class="battle-btn-action battle-btn-ghost">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Attach event listeners
        modal.querySelector('.battle-modal-backdrop').addEventListener('click', closeBattle);
        modal.querySelector('.battle-close-btn').addEventListener('click', closeBattle);
        modal.querySelector('#battle-next-btn').addEventListener('click', nextQuestion);
        modal.querySelector('#battle-done-btn').addEventListener('click', closeBattle);
        modal.querySelector('#battle-retry-btn').addEventListener('click', retryBattle);
        modal.querySelector('#battle-close-result-btn').addEventListener('click', closeBattle);

        document.addEventListener('keydown', handleBattleKeyDown);

        return modal;
    }

    function handleBattleKeyDown(e) {
        if (e.key === 'Escape' && state.battleActive) {
            closeBattle();
        }
    }

    // =========================================================================
    // Battle Logic
    // =========================================================================

    async function startBattle(conceptName, embedElement, conceptUrl = null) {
        state.currentConcept = conceptName;
        state.currentEmbed = embedElement;
        state.battleActive = true;
        state.correctAnswers = 0;
        state.currentQuestionIndex = 0;
        state.answered = false;

        const modal = createBattleModal();
        modal.classList.add('active');
        document.body.classList.add('battle-modal-open');

        // Update concept name
        document.getElementById('battle-concept-name').textContent = conceptName;

        // Reset progress dots
        document.querySelectorAll('.battle-progress-dot').forEach(dot => {
            dot.className = 'battle-progress-dot';
        });
        document.getElementById('battle-progress-fill').style.width = '0%';

        // Find question embeds - try local first, then fetch from concept page
        let questionEmbeds = [];
        
        // Try 1: Look in the embed element itself
        if (embedElement) {
            questionEmbeds = findQuestionEmbedsInConcept(embedElement);
            console.log('Battle: Found', questionEmbeds.length, 'question embeds in embed');
        }
        
        // Try 2: Look on the current page
        if (questionEmbeds.length < CONFIG.questionsPerBattle) {
            questionEmbeds = findQuestionEmbedsOnPage();
            console.log('Battle: Found', questionEmbeds.length, 'question embeds on page');
        }
        
        // Try 3: Fetch from the concept page URL if we don't have enough questions locally
        if (questionEmbeds.length < CONFIG.questionsPerBattle && conceptUrl) {
            console.log('Battle: Not enough local questions, fetching from:', conceptUrl);
            const fetchedQuestions = await fetchQuestionsFromConceptPage(conceptUrl);
            if (fetchedQuestions && fetchedQuestions.length >= CONFIG.questionsPerBattle) {
                // Hide loading, show content
                document.getElementById('battle-loading').style.display = 'none';
                
                state.allQuestions = fetchedQuestions;
                state.questions = fetchedQuestions.slice(0, CONFIG.questionsPerBattle);
                
                document.getElementById('battle-content').style.display = 'block';
                displayBattleQuestion();
                return;
            }
        }
        
        // Debug: log the HTML structure of each embed
        questionEmbeds.forEach((embed, i) => {
            console.log(`Battle: Embed ${i} HTML structure:`, embed.innerHTML.substring(0, 500));
            console.log(`Battle: Embed ${i} classes:`, embed.className);
            console.log(`Battle: Embed ${i} children:`, Array.from(embed.children).map(c => c.tagName + '.' + c.className).join(', '));
        });

        // Wait for embeds to load
        const loadPromises = questionEmbeds.map(embed => waitForEmbedToLoad(embed));
        await Promise.all(loadPromises);

        // Longer delay to ensure rendering is complete
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Debug: log content after waiting
        questionEmbeds.forEach((embed, i) => {
            const content = embed.querySelector('.markdown-embed-content, .markdown-preview-view, .markdown-preview-sizer');
            console.log(`Battle: Embed ${i} after load - content element:`, content ? content.className : 'NOT FOUND');
            console.log(`Battle: Embed ${i} after load - text length:`, content ? content.textContent.length : 0);
        });

        // Parse questions from loaded embeds
        const questions = [];
        questionEmbeds.forEach((embed, index) => {
            const question = parseQuestionFromEmbed(embed, index);
            if (question) {
                questions.push(question);
            }
        });

        console.log('Battle: Parsed', questions.length, 'valid questions');

        // Hide loading
        document.getElementById('battle-loading').style.display = 'none';

        if (questions.length < CONFIG.questionsPerBattle) {
            document.getElementById('battle-no-questions').style.display = 'flex';
            return;
        }

        // Store all questions and select first 3 for battle
        state.allQuestions = questions;
        state.questions = questions.slice(0, CONFIG.questionsPerBattle);
        
        document.getElementById('battle-content').style.display = 'block';
        displayBattleQuestion();
    }

    function displayBattleQuestion() {
        const question = state.questions[state.currentQuestionIndex];
        state.answered = false;
        state.selectedAnswer = null;

        // Update question number
        document.getElementById('battle-q-num').textContent = state.currentQuestionIndex + 1;

        // Render question
        const questionContainer = document.getElementById('battle-question');
        questionContainer.innerHTML = question.question;

        // Render options
        const optionsContainer = document.getElementById('battle-options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'battle-option-btn';
            button.dataset.letter = option.letter;
            button.innerHTML = `
                <span class="battle-option-letter">${option.letter}</span>
                <span class="battle-option-content">${option.content}</span>
            `;
            button.addEventListener('click', () => selectBattleAnswer(option.letter, button));
            optionsContainer.appendChild(button);
        });

        // Hide feedback and next button
        document.getElementById('battle-feedback').style.display = 'none';
        document.getElementById('battle-next-btn').style.display = 'none';

        // Trigger math rendering
        triggerMathRender(document.getElementById('battle-question-container'));
    }

    function selectBattleAnswer(letter, button) {
        if (state.answered) return;

        state.answered = true;
        state.selectedAnswer = letter;

        const question = state.questions[state.currentQuestionIndex];
        const correctAnswer = question.answer;
        const isCorrect = letter === correctAnswer;

        if (isCorrect) {
            state.correctAnswers++;
        }

        // Record in history
        recordQuestionAttempt(question.id, isCorrect);

        // Update progress dot
        const dots = document.querySelectorAll('.battle-progress-dot');
        dots[state.currentQuestionIndex].classList.add(isCorrect ? 'correct' : 'incorrect');

        // Update progress bar
        const progressPercent = ((state.currentQuestionIndex + 1) / CONFIG.questionsPerBattle) * 100;
        document.getElementById('battle-progress-fill').style.width = `${progressPercent}%`;

        // Mark options
        const optionButtons = document.querySelectorAll('.battle-option-btn');
        optionButtons.forEach(btn => {
            btn.disabled = true;
            const btnLetter = btn.dataset.letter;

            if (btnLetter === correctAnswer) {
                btn.classList.add('correct');
            } else if (btnLetter === letter && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Show feedback
        const feedbackContainer = document.getElementById('battle-feedback');
        const statusElement = document.getElementById('battle-feedback-status');
        const explanationElement = document.getElementById('battle-explanation');

        statusElement.className = 'battle-feedback-status ' + (isCorrect ? 'correct' : 'incorrect');
        statusElement.innerHTML = isCorrect
            ? '<span class="battle-feedback-icon">✓</span> Correct!'
            : `<span class="battle-feedback-icon">✗</span> Incorrect. The answer is ${correctAnswer}.`;

        if (question.explanation) {
            explanationElement.innerHTML = question.explanation;
            explanationElement.style.display = 'block';
        } else {
            explanationElement.style.display = 'none';
        }
        
        feedbackContainer.style.display = 'block';

        // Show next button
        const nextBtn = document.getElementById('battle-next-btn');
        nextBtn.textContent = state.currentQuestionIndex < CONFIG.questionsPerBattle - 1 
            ? 'Next Question' 
            : 'See Results';
        nextBtn.style.display = 'block';

        // Trigger math rendering
        triggerMathRender(feedbackContainer);
    }

    function recordQuestionAttempt(questionId, correct) {
        if (!state.questionHistory[questionId]) {
            state.questionHistory[questionId] = {
                attempts: 0,
                correct: 0,
                lastAttempt: null,
                nextReview: null
            };
        }
        
        state.questionHistory[questionId].attempts++;
        if (correct) {
            state.questionHistory[questionId].correct++;
        }
        state.questionHistory[questionId].lastAttempt = Date.now();
        
        saveQuestionHistory();
    }

    function nextQuestion() {
        if (state.currentQuestionIndex < CONFIG.questionsPerBattle - 1) {
            state.currentQuestionIndex++;
            displayBattleQuestion();
        } else {
            showBattleResults();
        }
    }

    function showBattleResults() {
        document.getElementById('battle-content').style.display = 'none';
        document.getElementById('battle-results').style.display = 'block';

        const isPerfect = state.correctAnswers === CONFIG.questionsPerBattle;

        if (isPerfect) {
            document.getElementById('battle-results-success').style.display = 'flex';
            document.getElementById('battle-results-fail').style.display = 'none';
            markConceptLearned(state.currentConcept);

            const resultsIcon = document.querySelector('.battle-results-icon.success');
            resultsIcon.classList.add('celebrate');
        } else {
            document.getElementById('battle-results-success').style.display = 'none';
            document.getElementById('battle-results-fail').style.display = 'flex';
            document.getElementById('battle-final-score').textContent = state.correctAnswers;
        }
    }

    function retryBattle() {
        state.correctAnswers = 0;
        state.currentQuestionIndex = 0;
        state.answered = false;
        state.questions = shuffleArray(state.questions);

        document.querySelectorAll('.battle-progress-dot').forEach(dot => {
            dot.className = 'battle-progress-dot';
        });
        document.getElementById('battle-progress-fill').style.width = '0%';

        document.getElementById('battle-results').style.display = 'none';
        document.getElementById('battle-content').style.display = 'block';

        displayBattleQuestion();
    }

    function closeBattle() {
        const modal = document.getElementById('battle-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }

        document.body.classList.remove('battle-modal-open');
        document.removeEventListener('keydown', handleBattleKeyDown);
        state.battleActive = false;
    }

    // =========================================================================
    // Public API
    // =========================================================================

    window.BattleQuiz = {
        getLearnedConcepts: () => [...state.learnedConcepts],
        isConceptLearned: isConceptLearned,
        getQuestionHistory: () => ({...state.questionHistory}),
        getRefresherQuestions: (conceptEmbed) => {
            const all = state.allQuestions || [];
            return all.slice(CONFIG.questionsPerBattle);
        },
        resetConcept: (conceptName) => {
            state.learnedConcepts.delete(normalizeConceptName(conceptName));
            saveLearnedConcepts();
            updateAllBattleButtons();
        },
        resetAll: () => {
            state.learnedConcepts.clear();
            state.questionHistory = {};
            saveLearnedConcepts();
            saveQuestionHistory();
            updateAllBattleButtons();
        },
        // Debug helper
        debug: () => {
            console.log('Learned concepts:', [...state.learnedConcepts]);
            console.log('Question history:', state.questionHistory);
        }
    };

    // =========================================================================
    // Initialization
    // =========================================================================

    function init() {
        loadLearnedConcepts();
        loadQuestionHistory();
        addBattleButtons();
    }

    function observePageChanges() {
        window.addEventListener('popstate', () => setTimeout(init, 200));

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
            if (link) {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#')) {
                    setTimeout(init, 300);
                    setTimeout(init, 600);
                }
            }
        });

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    clearTimeout(window._battleRebuildTimeout);
                    window._battleRebuildTimeout = setTimeout(init, 300);
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
            setTimeout(() => {
                init();
                observePageChanges();
            }, CONFIG.initDelay);
        });
    } else {
        setTimeout(() => {
            init();
            observePageChanges();
        }, CONFIG.initDelay);
    }

})();
