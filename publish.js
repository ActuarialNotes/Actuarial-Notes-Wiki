/* SPA-safe navigation helper — triggers Obsidian Publish's internal router */
window._spaNavigate = function (path) {
  if (!path) return;
  var slug = path.replace(/ /g, '+');
  var url = window.location.origin + '/' + slug;
  var a = document.createElement('a');
  a.className = 'internal-link';
  a.setAttribute('data-href', path);
  a.href = url;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

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
   - data-prev: "Name|Full|URL|Org,Name2|Full2|URL2|Org2" (comma-separated, optional)
   - data-current: "Name|Full Name" (required)
   - data-next: "Name|Full|URL|Org,Name2|Full2|URL2|Org2" (comma-separated, optional)
   - data-reqs: "REQ1,REQ2" (comma-separated, optional)
   - data-tracks: "TrackName|URL,TrackName2|URL2" (comma-separated, optional)
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
    var examNavs = document.querySelectorAll('.exam-nav[data-current]');

    // Clean up orphaned sticky bars when navigating to a non-exam page
    // Skip stickies created by concept-nav (marked with data-from-concept)
    if (examNavs.length === 0) {
      document.querySelectorAll('.exam-nav__sticky:not([data-from-concept])').forEach(function (s) {
        s.remove();
      });
      // Reset persistent tabs position and trigger update
      window._syncPersistentOffset = null;
      var persistentNav = document.querySelector('.persistent-exam-navs');
      if (persistentNav) persistentNav.style.right = '';
      if (typeof window._updatePersistentExamNavs === 'function') {
        setTimeout(window._updatePersistentExamNavs, 100);
      }
      if (typeof window._updateExamLinkButtons === 'function') {
        setTimeout(window._updateExamLinkButtons, 150);
      }
      return;
    }

    examNavs.forEach(nav => {
      // Skip if already built
      if (nav.dataset.built === 'true') return;

      buildExamNav(nav);
      nav.dataset.built = 'true';
    });
  }

  // Cache for fetched exam objectives
  var examNavObjectivesCache = {};

  // ── Learned-concepts state ──────────────────────────────
  var LEARNED_KEY = 'actuarial-notes-learned';
  var learnedConcepts = {};

  function loadLearnedConcepts() {
    try {
      var raw = localStorage.getItem(LEARNED_KEY);
      if (raw) learnedConcepts = JSON.parse(raw) || {};
    } catch (e) { /* ignore */ }
  }

  function saveLearnedConcepts() {
    try { localStorage.setItem(LEARNED_KEY, JSON.stringify(learnedConcepts)); } catch (e) { /* ignore */ }
  }

  function isConceptLearned(examId, conceptName) {
    return learnedConcepts[examId] && learnedConcepts[examId].indexOf(conceptName) !== -1;
  }

  function toggleConceptLearned(examId, conceptName) {
    if (!learnedConcepts[examId]) learnedConcepts[examId] = [];
    var idx = learnedConcepts[examId].indexOf(conceptName);
    if (idx === -1) {
      learnedConcepts[examId].push(conceptName);
    } else {
      learnedConcepts[examId].splice(idx, 1);
    }
    saveLearnedConcepts();
  }

  function getExamId(currentData) {
    return currentData.name;
  }

  function updateObjectiveBadge(wrapEl, examId, objective) {
    var badge = wrapEl.querySelector('.exam-nav__lo-count');
    if (!badge) return;
    var allLearned = objective.concepts.length > 0 && objective.concepts.every(function (concept) {
      var cName = typeof concept === 'string' ? concept : concept.name;
      return isConceptLearned(examId, cName);
    });
    if (allLearned) {
      badge.classList.add('is-all-learned');
    } else {
      badge.classList.remove('is-all-learned');
    }
  }

  loadLearnedConcepts();

  // Expose learned-concept helpers globally for the concept popup
  window._isConceptLearned = isConceptLearned;
  window._toggleConceptLearned = function (examId, conceptName) {
    toggleConceptLearned(examId, conceptName);
    // Sync all exam-nav badges in the DOM
    document.querySelectorAll('.exam-nav__lo-menu-num').forEach(function (numEl) {
      var link = numEl.closest('.exam-nav__lo-menu-item');
      if (!link) return;
      var cName = (link.textContent || '').replace(/^\d+/, '').trim();
      if (cName === conceptName) {
        numEl.classList.toggle('is-learned', isConceptLearned(examId, conceptName));
      }
    });
    // Sync objective badges
    document.querySelectorAll('.exam-nav__lo-wrap').forEach(function (wrap) {
      var badge = wrap.querySelector('.exam-nav__lo-count');
      if (!badge) return;
      var items = wrap.querySelectorAll('.exam-nav__lo-menu-item');
      var allLearned = items.length > 0;
      items.forEach(function (item) {
        var cn = (item.textContent || '').replace(/^\d+/, '').trim();
        if (!isConceptLearned(examId, cn)) allLearned = false;
      });
      badge.classList.toggle('is-all-learned', allLearned);
    });
  };
  window._getLearnedConcepts = function () { return learnedConcepts; };

  function buildExamNav(container) {
    // Parse data attributes
    const customColor = container.dataset.color;
    const currentData = parseExamData(container.dataset.current);
    const tracks = parseTracks(container.dataset.tracks);
    var examId = getExamId(currentData);

    // Set exam color on page container for callout tinting
    const pageEl = container.closest('.markdown-preview-view, .markdown-rendered, .page-container') || container.parentElement;
    if (pageEl) {
      pageEl.style.setProperty('--exam-color', customColor || 'var(--brand)');
      pageEl.classList.add('has-exam-nav');
    }

    // Container is now just a hidden sentinel — clear it
    container.innerHTML = '';

    // ── Sticky bar (primary & only nav) ──────────────────
    // Clean up previous sticky bar if rebuilding
    if (container._stickyEl) {
      container._stickyEl.remove();
    }

    var sticky = document.createElement('div');
    sticky.className = 'exam-nav__sticky is-visible';

    // Resolve accent color from data-color or TRACKS definition
    var accentColor = customColor;
    var examInfo = typeof window._getExamInfoByPage === 'function' ? window._getExamInfoByPage() : null;
    if (!accentColor && examInfo && examInfo.color) {
      accentColor = examInfo.color;
    }
    if (accentColor) {
      sticky.style.setProperty('--nav-color', accentColor);
      sticky.style.setProperty('--nav-color-hover', accentColor);
      sticky.style.setProperty('--nav-accent', accentColor);
    }
    if (examInfo && examInfo.status === 'in_progress') {
      sticky.classList.add('is-in-progress');
    }

    var stickyBtn = document.createElement('button');
    stickyBtn.className = 'exam-nav__sticky-btn';
    stickyBtn.type = 'button';
    stickyBtn.innerHTML =
      '<span>' + currentData.name + '</span>' +
      '<svg class="exam-nav__sticky-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

    var stickyContent = document.createElement('div');
    stickyContent.className = 'exam-nav__sticky-content';

    // Track row in sticky (if tracks exist)
    if (tracks.length > 0) {
      var stickyTrack = document.createElement('div');
      stickyTrack.className = 'exam-nav__track';
      var stickyTrackLabel = document.createElement('span');
      stickyTrackLabel.className = 'exam-nav__track-label';
      stickyTrackLabel.textContent = 'Exam Track:';
      stickyTrack.appendChild(stickyTrackLabel);
      tracks.forEach(function (track, i) {
        if (i > 0) {
          var sep = document.createElement('span');
          sep.className = 'exam-nav__track-sep';
          sep.textContent = '/';
          stickyTrack.appendChild(sep);
        }
        if (track.url) {
          var link = document.createElement('a');
          link.className = 'exam-nav__track-link internal-link';
          link.href = track.url;
          link.textContent = track.name;
          stickyTrack.appendChild(link);
        } else {
          var span = document.createElement('span');
          span.className = 'exam-nav__track-link';
          span.textContent = track.name;
          stickyTrack.appendChild(span);
        }
      });
      stickyContent.appendChild(stickyTrack);
    }

    // Search bar for filtering concepts
    var searchRow = document.createElement('div');
    searchRow.className = 'exam-nav__search-row';

    var searchIconEl = document.createElement('span');
    searchIconEl.className = 'exam-nav__search-icon';
    searchIconEl.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5.5"/><line x1="13" y1="13" x2="17" y2="17"/></svg>';
    searchRow.appendChild(searchIconEl);

    var examSearchInput = document.createElement('input');
    examSearchInput.className = 'exam-nav__search-input';
    examSearchInput.type = 'text';
    examSearchInput.placeholder = 'Search concepts\u2026';
    searchRow.appendChild(examSearchInput);

    var examSearchClear = document.createElement('button');
    examSearchClear.className = 'exam-nav__search-clear';
    examSearchClear.type = 'button';
    examSearchClear.title = 'Clear search';
    examSearchClear.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="14" y2="14"/><line x1="14" y1="6" x2="6" y2="14"/></svg>';
    searchRow.appendChild(examSearchClear);

    stickyContent.appendChild(searchRow);

    // Concepts list in sticky
    var stickyLoSection = document.createElement('div');
    stickyLoSection.className = 'exam-nav__lo-section exam-nav__sticky-lo';
    stickyContent.appendChild(stickyLoSection);

    // Load concepts into sticky panel
    function loadStickyObjectives() {
      var objectives = parseObjectivesFromDOM(container);
      if (objectives.length > 0) {
        renderExamNavObjectives(stickyLoSection, objectives, container, examId);
      } else {
        // Use data-exam-page if set (concept pages inject this), else current URL
        var pagePath = container.dataset.examPage || decodeURIComponent(window.location.pathname.replace(/^\//, ''));
        if (!pagePath) pagePath = document.title;
        fetchExamNavObjectives(pagePath).then(function (objs) {
          renderExamNavObjectives(stickyLoSection, objs, container, examId);
        }).catch(function () {});
      }
    }
    setTimeout(loadStickyObjectives, 200);

    // ── Search filtering logic ──────────────────────────
    var searchEmptyEl = null;

    function escHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function examHighlight(text, term) {
      if (!term) return escHtml(text);
      var lower = text.toLowerCase();
      var idx = lower.indexOf(term);
      if (idx === -1) return escHtml(text);
      return escHtml(text.substring(0, idx)) +
        '<mark>' + escHtml(text.substring(idx, idx + term.length)) + '</mark>' +
        escHtml(text.substring(idx + term.length));
    }

    function filterExamConcepts(query) {
      var term = (query || '').trim().toLowerCase();
      var items = stickyLoSection.querySelectorAll('.exam-nav__lo-item');

      // Remove previous empty message
      if (searchEmptyEl) {
        searchEmptyEl.remove();
        searchEmptyEl = null;
      }

      if (!term) {
        // Reset: show all, collapse all, restore original text
        items.forEach(function (item) {
          item.classList.remove('is-hidden');
          var wrap = item.querySelector('.exam-nav__lo-wrap');
          if (wrap && wrap._autoExpanded) {
            wrap.classList.remove('is-open');
            wrap._autoExpanded = false;
          }
          // Restore original concept names
          var menuItems = item.querySelectorAll('.exam-nav__lo-menu-item');
          menuItems.forEach(function (mi) {
            if (mi._originalName != null) {
              // Restore: keep the number span, replace text node
              var textNodes = [];
              mi.childNodes.forEach(function (n) {
                if (n.nodeType === 3) textNodes.push(n);
              });
              // Remove mark elements and extra text nodes
              var marks = mi.querySelectorAll('mark');
              marks.forEach(function (m) { m.replaceWith(m.textContent); });
              // Normalize in case of split text nodes
              mi.normalize();
              // Reset innerHTML after the num span
              var numSpan = mi.querySelector('.exam-nav__lo-menu-num');
              if (numSpan) {
                // Rebuild: keep num span + plain text
                while (mi.childNodes.length > 1) mi.removeChild(mi.lastChild);
                mi.appendChild(document.createTextNode(mi._originalName));
              }
            }
            mi.classList.remove('is-hidden');
          });
        });
        return;
      }

      var anyVisible = false;

      items.forEach(function (item) {
        var wrap = item.querySelector('.exam-nav__lo-wrap');
        var menuItems = item.querySelectorAll('.exam-nav__lo-menu-item');
        var hasMatch = false;

        menuItems.forEach(function (mi) {
          // Store original name on first search
          if (mi._originalName == null) {
            // Get concept name: text content minus the number span
            var numSpan = mi.querySelector('.exam-nav__lo-menu-num');
            var fullText = mi.textContent;
            var numText = numSpan ? numSpan.textContent : '';
            mi._originalName = fullText.replace(numText, '').trim();
          }

          var cName = mi._originalName;
          var conceptMatch = cName.toLowerCase().indexOf(term) !== -1;
          if (conceptMatch) {
            hasMatch = true;
            mi.classList.remove('is-hidden');
            // Update display with highlight
            var numSpan = mi.querySelector('.exam-nav__lo-menu-num');
            if (numSpan) {
              while (mi.childNodes.length > 1) mi.removeChild(mi.lastChild);
              var temp = document.createElement('span');
              temp.innerHTML = examHighlight(cName, term);
              while (temp.firstChild) mi.appendChild(temp.firstChild);
            }
          } else {
            mi.classList.add('is-hidden');
          }
        });

        if (hasMatch) {
          item.classList.remove('is-hidden');
          anyVisible = true;
          // Auto-expand to show matching concepts
          if (wrap && !wrap.classList.contains('is-open')) {
            wrap.classList.add('is-open');
            wrap._autoExpanded = true;
          }
        } else {
          item.classList.add('is-hidden');
          if (wrap && wrap._autoExpanded) {
            wrap.classList.remove('is-open');
            wrap._autoExpanded = false;
          }
        }
      });

      if (!anyVisible) {
        searchEmptyEl = document.createElement('div');
        searchEmptyEl.className = 'exam-nav__search-empty';
        searchEmptyEl.textContent = 'No concepts found.';
        stickyLoSection.appendChild(searchEmptyEl);
      }
    }

    examSearchInput.addEventListener('input', function () {
      var val = examSearchInput.value;
      examSearchClear.classList.toggle('is-visible', val.length > 0);
      filterExamConcepts(val);
    });

    examSearchClear.addEventListener('click', function (e) {
      e.stopPropagation();
      examSearchInput.value = '';
      examSearchClear.classList.remove('is-visible');
      filterExamConcepts('');
      examSearchInput.focus();
    });

    // ── Toggle open/close ────────────────────────────────
    function openSticky() {
      sticky.classList.add('is-open');
      showBackdrop();
    }

    function closeSticky() {
      sticky.classList.remove('is-open');
      hideBackdrop();
    }

    stickyBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (sticky.classList.contains('is-open')) {
        closeSticky();
      } else {
        openSticky();
      }
    });

    // Handle internal link clicks — use SPA navigation helper
    sticky.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link');
      if (link) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeSticky();
        var href = link.getAttribute('data-href') || link.getAttribute('href') || '';
        if (href) {
          var path = href.replace(/^https?:\/\/[^/]+\//, '').replace(/^\//,'').replace(/\+/g, ' ');
          window._spaNavigate(path);
        }
      }
    });

    sticky.appendChild(stickyBtn);
    sticky.appendChild(stickyContent);
    // Insert into body so fixed positioning works cleanly
    document.body.appendChild(sticky);
    container._stickyEl = sticky;

    // Align sticky nav to right edge of content area
    function alignStickyToContent() {
      if (typeof window._getContentRightOffset === 'function') {
        sticky.style.right = window._getContentRightOffset() + 'px';
      }
    }
    alignStickyToContent();
    setTimeout(alignStickyToContent, 500);
    window.addEventListener('resize', alignStickyToContent);

    // Offset persistent tabs to sit left of the sticky tab
    function syncPersistentOffset() {
      var stickyRect = stickyBtn.getBoundingClientRect();
      var persistentNav = document.querySelector('.persistent-exam-navs');
      if (persistentNav) {
        var baseRight = typeof window._getContentRightOffset === 'function'
          ? window._getContentRightOffset() : 16;
        persistentNav.style.right = (baseRight + stickyRect.width + 6) + 'px';
      }
    }
    setTimeout(syncPersistentOffset, 350);
    // Re-sync when persistent navs update
    window._syncPersistentOffset = syncPersistentOffset;

    // Close dropdown when clicking outside
    if (!window._examNavCloseRegistered) {
      window._examNavCloseRegistered = true;

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.exam-nav__lo-wrap') &&
            !e.target.closest('.exam-nav__sticky')) {
          document.querySelectorAll('.exam-nav__lo-wrap.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          document.querySelectorAll('.exam-nav__sticky.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          hideBackdrop();
        }
      });

      // ESC key closes dropdown
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.exam-nav__lo-wrap.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          document.querySelectorAll('.exam-nav__sticky.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          hideBackdrop();
        }
      });
    }
  }

  // Parse objectives directly from rendered callout blocks in the DOM
  function parseObjectivesFromDOM(examNavContainer) {
    // Find the page content container that holds the callout blocks
    var pageEl = examNavContainer.closest('.markdown-preview-view, .markdown-rendered, .page-container')
              || examNavContainer.parentElement;
    if (!pageEl) return [];

    var callouts = pageEl.querySelectorAll('.callout[data-callout="example"]');
    if (!callouts.length) return [];

    var objectives = [];

    callouts.forEach(function (callout) {
      var titleEl = callout.querySelector('.callout-title-inner');
      if (!titleEl) return;

      var titleText = titleEl.textContent.trim();
      var weightMatch = titleText.match(/\{([^}]+)\}/);
      var weight = weightMatch ? weightMatch[1] : '';
      var name = titleText.replace(/\{[^}]+\}/g, '').trim();

      // Extract concepts from internal links inside the callout content
      var contentEl = callout.querySelector('.callout-content');
      var concepts = [];
      if (contentEl) {
        var seenNames = {};
        var links = contentEl.querySelectorAll('a.internal-link');
        links.forEach(function (link) {
          // data-href preserves original page name; href may be lowercased/encoded
          var dataHref = link.getAttribute('data-href') || '';
          var rawHref = link.getAttribute('href') || '';
          // Use actual href attribute for the link target (not data-href which may not be a full path)
          var href = rawHref;
          try { href = new URL(rawHref, window.location.origin).pathname.replace(/^\//, ''); } catch (e) {}
          // Derive display name from data-href (preserves casing) when available
          var cName;
          if (dataHref) {
            cName = dataHref.replace(/^Concepts\//, '').split('#')[0].trim();
          }
          // Fall back to textContent (which has the alias for aliased links,
          // but at least is human-readable and properly cased)
          cName = cName || link.textContent.trim();
          if (cName && !seenNames[cName]) {
            seenNames[cName] = true;
            concepts.push({ name: cName, href: href, dataHref: dataHref });
          }
        });
      }

      if (name) {
        objectives.push({ name: name, weight: weight, concepts: concepts });
      }
    });

    return objectives;
  }

  // Render objectives list with concept sub-dropdowns (styled like concept-nav)
  function renderExamNavObjectives(section, objectives, container, examId) {
    section.innerHTML = '';

    if (objectives.length === 0) {
      section.innerHTML = '<div class="exam-nav__lo-loading">No objectives found.</div>';
      return;
    }

    var list = document.createElement('ol');
    list.className = 'exam-nav__lo-list';

    objectives.forEach(function (objective, objIdx) {
      var li = document.createElement('li');
      li.className = 'exam-nav__lo-item';

      // Wrapper for dropdown positioning
      var wrap = document.createElement('div');
      wrap.className = 'exam-nav__lo-wrap';

      var btn = document.createElement('button');
      btn.className = 'exam-nav__lo-obj-btn';
      btn.type = 'button';

      var numSpan = document.createElement('span');
      numSpan.className = 'exam-nav__lo-obj-num';
      numSpan.textContent = (objIdx + 1);
      btn.appendChild(numSpan);

      var nameSpan = document.createElement('span');
      nameSpan.textContent = objective.name;
      btn.appendChild(nameSpan);

      if (objective.weight) {
        var weightSpan = document.createElement('span');
        weightSpan.className = 'exam-nav__lo-weight';
        weightSpan.textContent = objective.weight;
        btn.appendChild(weightSpan);
      }

      // Build floating dropdown menu with concepts
      var menu = document.createElement('div');
      menu.className = 'exam-nav__lo-menu';

      var menuHeader = document.createElement('div');
      menuHeader.className = 'exam-nav__lo-menu-header';
      menuHeader.textContent = objective.name;
      menu.appendChild(menuHeader);

      if (objective.concepts.length === 0) {
        var emptyMsg = document.createElement('div');
        emptyMsg.className = 'exam-nav__lo-loading';
        emptyMsg.textContent = 'No concepts found.';
        menu.appendChild(emptyMsg);
      } else {
        objective.concepts.forEach(function (concept, idx) {
          // concept can be a string (from markdown parse) or {name, href, dataHref} (from DOM parse)
          var cName = typeof concept === 'string' ? concept : concept.name;
          var cHref = typeof concept === 'string' ? ('Concepts/' + concept) : concept.href;
          var cDataHref = (typeof concept === 'object' && concept.dataHref) ? concept.dataHref : cHref;
          // Ensure href has a leading slash for proper navigation
          var linkHref = cHref.startsWith('/') ? cHref : ('/' + cHref);
          var link = document.createElement('a');
          link.className = 'exam-nav__lo-menu-item internal-link';
          link.href = linkHref;
          link.setAttribute('data-href', cDataHref);
          var numSpan = document.createElement('span');
          numSpan.className = 'exam-nav__lo-menu-num';
          numSpan.textContent = (idx + 1);
          if (examId && isConceptLearned(examId, cName)) {
            numSpan.classList.add('is-learned');
          }
          (function (ns, cn, obj) {
            ns.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
              toggleConceptLearned(examId, cn);
              ns.classList.toggle('is-learned');
              updateObjectiveBadge(wrap, examId, obj);
            });
          })(numSpan, cName, objective);
          numSpan.style.cursor = 'pointer';
          link.appendChild(numSpan);
          link.appendChild(document.createTextNode(cName));
          link.addEventListener('click', function () {
            wrap.classList.remove('is-open');
            hideBackdrop();
          });
          menu.appendChild(link);
        });
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasOpen = wrap.classList.contains('is-open');
        // Close all other LO dropdowns
        document.querySelectorAll('.exam-nav__lo-wrap.is-open').forEach(function (d) {
          d.classList.remove('is-open');
        });
        if (!wasOpen) {
          wrap.classList.add('is-open');
        }
      });

      // Concept count badge (inside button for full-width clickability)
      if (objective.concepts.length > 0) {
        var countBadge = document.createElement('span');
        countBadge.className = 'exam-nav__lo-count';
        countBadge.textContent = objective.concepts.length;
        btn.appendChild(countBadge);
      }

      wrap.appendChild(btn);
      wrap.appendChild(menu);
      if (examId) updateObjectiveBadge(wrap, examId, objective);
      li.appendChild(wrap);

      list.appendChild(li);
    });

    section.appendChild(list);
  }

  /* ── Fetch & parse exam page objectives ────────────────── */

  function fetchExamNavObjectives(pagePath) {
    if (examNavObjectivesCache[pagePath]) {
      return Promise.resolve(examNavObjectivesCache[pagePath]);
    }

    return fetchExamNavMarkdown(pagePath).then(function (md) {
      var objectives = md ? parseExamNavObjectives(md) : [];
      examNavObjectivesCache[pagePath] = objectives;
      return objectives;
    });
  }

  function fetchExamNavMarkdown(pagePath) {
    var baseName = pagePath.replace(/\.md$/, '');

    function hasCallouts(text) {
      return text && /\[!example\]/i.test(text);
    }

    // Strategy 1: Obsidian internal cache
    var cached = examNavTryCache(baseName);
    if (cached && hasCallouts(cached)) return Promise.resolve(cached);

    // Strategy 2: Fetch page URL
    var url = '/' + baseName.split('/').map(encodeURIComponent).join('/');
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    }).then(function (text) {
      if (examNavLooksLikeMarkdown(text) && hasCallouts(text)) return text;
      var extracted = examNavExtractMarkdown(text);
      if (extracted && hasCallouts(extracted)) return extracted;
      return null;
    }).catch(function () {
      return null;
    }).then(function (md) {
      if (md) return md;

      // Strategy 3: Obsidian Publish content API
      var siteId = examNavExtractSiteId();
      if (!siteId) return null;
      var apiUrl = 'https://publish-01.obsidian.md/access/' + siteId + '/' + encodeURIComponent(baseName + '.md');
      return fetch(apiUrl).then(function (r) {
        if (!r.ok) return null;
        return r.text();
      }).then(function (t) {
        return (t && hasCallouts(t)) ? t : null;
      }).catch(function () { return null; });
    });
  }

  function parseExamNavObjectives(md) {
    if (!md) return [];

    var objectives = [];
    var blocks = md.split(/^>\s*\[!example\]-?\s*/m);

    for (var i = 1; i < blocks.length; i++) {
      var block = blocks[i];
      var lines = block.split('\n');

      var titleLine = lines[0].trim();
      var weightMatch = titleLine.match(/\{([^}]+)\}/);
      var weight = weightMatch ? weightMatch[1] : '';
      var name = titleLine.replace(/\{[^}]+\}/g, '').trim();

      var bodyLines = [];
      for (var j = 1; j < lines.length; j++) {
        var line = lines[j];
        if (/^>\s?/.test(line)) {
          bodyLines.push(line.replace(/^>\s?/, ''));
        } else {
          break;
        }
      }
      var body = bodyLines.join('\n');

      var concepts = [];
      var wikiLinkRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      var match;
      while ((match = wikiLinkRe.exec(body)) !== null) {
        var cName = match[1].replace(/^Concepts\//, '').split('#')[0].trim();
        if (cName && concepts.indexOf(cName) === -1) {
          concepts.push(cName);
        }
      }

      if (name) {
        objectives.push({ name: name, weight: weight, concepts: concepts });
      }
    }

    return objectives;
  }

  /* ── Shared fetch helpers ────────────────────────────── */

  function examNavLooksLikeMarkdown(text) {
    if (!text || text.indexOf('<!DOCTYPE') !== -1) return false;
    return /^#\s/m.test(text) || />\s*\[!/m.test(text);
  }

  function examNavTryCache(baseName) {
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

      var candidates = [baseName + '.md', baseName];
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

  function examNavExtractMarkdown(html) {
    try {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var content = doc.querySelector('.markdown-preview-view, .markdown-rendered, .publish-renderer');
      if (content && content.textContent.trim().length > 20) {
        return content.innerHTML;
      }
      var pageData = doc.querySelector('[data-page-content], [data-markdown]');
      if (pageData) {
        var raw = pageData.getAttribute('data-page-content') || pageData.getAttribute('data-markdown') || '';
        if (raw && examNavLooksLikeMarkdown(raw)) return raw;
      }
    } catch (e) {}
    return null;
  }

  function examNavExtractSiteId() {
    try {
      if (window.publish && window.publish.siteId) return window.publish.siteId;
      if (window.publish && window.publish.site && window.publish.site.id) return window.publish.site.id;
      var els = document.querySelectorAll('link[href*="publish-01.obsidian.md"], script[src*="publish-01.obsidian.md"]');
      for (var i = 0; i < els.length; i++) {
        var attr = els[i].getAttribute('href') || els[i].getAttribute('src') || '';
        var m = attr.match(/publish-01\.obsidian\.md\/access\/([a-f0-9]+)/);
        if (m) return m[1];
      }
      var meta = document.querySelector('meta[name="publish-site-id"], meta[property="publish-site-id"]');
      if (meta) return meta.content;
    } catch (e) {}
    return null;
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

  // Parse tracks: "TrackName|URL,TrackName2|URL2"
  function parseTracks(str) {
    if (!str) return [];
    return str.split(',').map(t => {
      const parts = t.split('|').map(p => p.trim());
      return {
        name: parts[0] || '',
        url: parts[1] || ''
      };
    });
  }

  // Backdrop helpers
  function showBackdrop() {
    let backdrop = document.querySelector('.exam-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'exam-nav-backdrop';
      backdrop.addEventListener('click', () => {
        document.querySelectorAll('.exam-nav__lo-wrap.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        document.querySelectorAll('.exam-nav__sticky.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        hideBackdrop();
      });
      document.body.appendChild(backdrop);
    }
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
   DOWNLOAD DROPDOWN
   Converts <div class="download-dropdown" data-files="..."> into
   a styled dropdown button with a list of downloadable files.

   Usage in Markdown:
   <div class="download-dropdown"
        data-color="#2563eb"
        data-label="Downloads"
        data-files="Label|URL,Label2|URL2">
   </div>

   Each file entry in data-files is pipe-delimited: Name|URL
   Multiple entries are comma-separated.
   =========================================================== */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDownloadDropdowns);
  } else {
    initDownloadDropdowns();
  }

  function initDownloadDropdowns() {
    setTimeout(buildAllDownloadDropdowns, 100);
    observePageChanges();
  }

  function observePageChanges() {
    window.addEventListener('popstate', () => setTimeout(buildAllDownloadDropdowns, 150));

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(buildAllDownloadDropdowns, 400);
          setTimeout(buildAllDownloadDropdowns, 800);
        }
      }
    });

    const observer = new MutationObserver(() => {
      setTimeout(buildAllDownloadDropdowns, 200);
    });
    const target = document.querySelector('.markdown-reading-view') || document.body;
    observer.observe(target, { childList: true, subtree: true });
  }

  function buildAllDownloadDropdowns() {
    document.querySelectorAll('.download-dropdown').forEach(el => {
      if (el.dataset.built) return;
      el.dataset.built = 'true';
      buildDropdown(el);
    });
  }

  function buildDropdown(el) {
    const color = el.dataset.color || '#2563eb';
    const label = el.dataset.label || 'Downloads';
    const filesRaw = el.dataset.files || '';

    if (!filesRaw) return;

    const files = filesRaw.split(',').map(entry => {
      const parts = entry.trim().split('|');
      return { name: parts[0] || '', url: parts[1] || '#' };
    }).filter(f => f.name);

    if (!files.length) return;

    el.style.setProperty('--dl-color', color);

    // If only one file, render a simple download link (no dropdown needed)
    if (files.length === 1) {
      const link = document.createElement('a');
      link.className = 'dl-dropdown__single';
      link.href = files[0].url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = `
        <svg class="dl-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>${files[0].name}</span>
      `;
      el.appendChild(link);
      return;
    }

    // Multiple files — build dropdown
    const wrapper = document.createElement('div');
    wrapper.className = 'dl-dropdown__wrap';

    // Trigger button
    const trigger = document.createElement('button');
    trigger.className = 'dl-dropdown__trigger';
    trigger.type = 'button';
    trigger.innerHTML = `
      <svg class="dl-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>${label}</span>
      <svg class="dl-dropdown__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    `;

    // Menu
    const menu = document.createElement('div');
    menu.className = 'dl-dropdown__menu';
    menu.innerHTML = `<div class="dl-dropdown__menu-header">Select a file</div>`;

    files.forEach(file => {
      const item = document.createElement('a');
      item.className = 'dl-dropdown__menu-item';
      item.href = file.url;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.innerHTML = `
        <span class="dl-dropdown__menu-item-name">${file.name}</span>
        <svg class="dl-dropdown__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      `;

      item.addEventListener('click', () => {
        wrapper.classList.remove('is-open');
        hideDlBackdrop();
      });

      menu.appendChild(item);
    });

    // Toggle
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('is-open');

      // Close any other open download dropdowns
      document.querySelectorAll('.dl-dropdown__wrap.is-open').forEach(d => {
        d.classList.remove('is-open');
      });
      // Also close exam-nav dropdowns
      document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
        d.classList.remove('is-open');
      });

      if (!isOpen) {
        wrapper.classList.add('is-open');
        showDlBackdrop();
      } else {
        hideDlBackdrop();
      }
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    el.appendChild(wrapper);

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dl-dropdown__wrap')) {
        wrapper.classList.remove('is-open');
        hideDlBackdrop();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        wrapper.classList.remove('is-open');
        hideDlBackdrop();
      }
    });
  }

  // Backdrop helpers (reuses exam-nav backdrop where possible)
  function showDlBackdrop() {
    let backdrop = document.querySelector('.exam-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'exam-nav-backdrop';
      backdrop.addEventListener('click', () => {
        document.querySelectorAll('.dl-dropdown__wrap.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
          d.classList.remove('is-open');
        });
        hideDlBackdrop();
      });
      document.body.appendChild(backdrop);
    }
    if (window.innerWidth <= 540) {
      backdrop.classList.add('is-visible');
    }
  }

  function hideDlBackdrop() {
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
  const JOURNEY_LS_KEY = 'actuarial-notes-journey';

  // Check in-progress status directly from localStorage — no cross-IIFE dependency
  function isExamInProgress(name) {
    try {
      var raw = JSON.parse(localStorage.getItem(JOURNEY_LS_KEY));
      if (!raw || !raw.progress) return false;
      if (raw.progress[name] === 'in_progress') return true;
      // Strip number suffix: "P-1" → "P", "FM-2" → "FM"
      var shortId = name.replace(/-\d+$/, '');
      if (shortId !== name && raw.progress[shortId] === 'in_progress') return true;
      return false;
    } catch (e) { return false; }
  }

  let loCounter = 0;

  function injectBadges() {
    loCounter = 0;
    document.querySelectorAll('.callout .callout-title-inner').forEach(inner => {
      // Skip if already processed
      if (inner.parentElement.querySelector('.callout-badge')) return;

      const text = inner.textContent;
      const matches = [...text.matchAll(BADGES_RE)];
      if (!matches.length) return;

      // Strip all {…} from the visible title text
      inner.textContent = text.replace(BADGES_RE, '').trimEnd();

      // Check if this is a learning objective (has a percentage badge)
      const isLO = matches.some(m => PCT_RE.test(m[1]));
      if (isLO) {
        loCounter++;
        const numEl = document.createElement('data');
        numEl.className = 'callout-obj-num';
        numEl.textContent = loCounter;
        inner.parentElement.insertBefore(numEl, inner);
      }

      matches.forEach(match => {
        const badge = document.createElement('span');
        const isPct = PCT_RE.test(match[1]);
        badge.className = 'callout-badge' + (isPct ? ' callout-badge--pct' : ' callout-concept-count');
        badge.textContent = match[1];
        inner.parentElement.appendChild(badge);
      });
    });

    // Tint [!example] badges with exam accent colour when exam is in-progress
    tintExamBadges();
  }

  function tintExamBadges() {
    var examNav = document.querySelector('.exam-nav[data-current]');
    if (!examNav) return;

    // Prefer _getExamInfoByPage which resolves color and status via exam ID
    // (data-color attr may be absent when color comes from TRACKS at runtime,
    //  and data-current holds a display name not an ID so isExamInProgress
    //  can't match the localStorage key directly)
    var examColor = examNav.dataset.color;
    var inProgress = false;

    if (typeof window._getExamInfoByPage === 'function') {
      var examInfo = window._getExamInfoByPage();
      if (examInfo) {
        if (!examColor && examInfo.color) examColor = examInfo.color;
        inProgress = examInfo.status === 'in_progress';
      }
    }

    // Fallback: check localStorage directly using display name
    if (!inProgress) {
      var currentName = (examNav.dataset.current || '').split('|')[0].trim();
      if (currentName) inProgress = isExamInProgress(currentName);
    }

    if (!examColor || !inProgress) return;

    var pageEl = examNav.closest('.markdown-preview-view, .markdown-rendered, .page-container') || examNav.parentElement;
    if (!pageEl) return;

    pageEl.querySelectorAll('.callout[data-callout="example"] .callout-badge').forEach(function (badge) {
      if (badge.dataset.examTinted) return;
      badge.style.color = examColor;
      badge.style.background = 'color-mix(in oklab, ' + examColor + ' 12%, transparent)';
      badge.dataset.examTinted = '1';
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
   CALLOUT COLUMN ARRAYS
   Obsidian's markdown parser terminates HTML blocks at blank
   lines, so a <div class="callout-cols-2"> wrapper ends up
   empty with callouts rendered as siblings, or with stray <p>
   elements between them.

   This IIFE:
     1. Finds .callout-cols-2 / .callout-cols-3 containers
     2. Collects sibling .callout elements (skipping empty <p>/<br>)
     3. Moves them inside the container
     4. Applies grid styles inline (works even without publish.css)

   Markdown syntax — no closing </div> tag needed:

     <div class="callout-cols-2"></div>

     > [!example]- Title 1
     > Content

     > [!example]- Title 2
     > Content
   =========================================================== */

(function () {
  'use strict';

  var GRID_COLS = { 'callout-cols-2': 2, 'callout-cols-3': 3 };

  function isEmptyNode(el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName.toUpperCase();
    if (tag === 'BR') return true;
    if (tag === 'P' && !el.textContent.trim() && !el.querySelector('img,svg,canvas,iframe')) return true;
    return false;
  }

  function applyGridStyles(container, cols) {
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    container.style.gap = '16px';
    container.style.alignItems = 'start';
    container.style.margin = '1.25rem 0';
  }

  function initCalloutArrays() {
    Object.keys(GRID_COLS).forEach(function (cls) {
      document.querySelectorAll('.' + cls).forEach(function (container) {
        if (container.dataset.colsReady) return;
        var cols = GRID_COLS[cls];
        var callouts = [];

        // Case A: callouts already inside as direct children
        var innerCallouts = Array.from(container.querySelectorAll(':scope > .callout'));
        if (innerCallouts.length > 0) {
          callouts = innerCallouts;
        } else {
          // Case B: Obsidian Publish wraps each block in its own container div,
          // so the callouts are siblings of the *parent* of .callout-cols-2,
          // not direct siblings of .callout-cols-2 itself.
          // Walk up until we find a node that has a next sibling.
          var pivot = container;
          while (!pivot.nextElementSibling && pivot.parentElement && pivot.parentElement !== document.body) {
            pivot = pivot.parentElement;
          }

          var node = pivot.nextElementSibling;
          while (node) {
            // The sibling may be the callout itself, or a thin wrapper containing one
            var calloutEl = null;
            if (node.classList && node.classList.contains('callout')) {
              calloutEl = node;
            } else {
              var inner = node.querySelector('.callout');
              // Only consume the wrapper if the callout is its primary content
              if (inner && node.textContent.trim() === inner.textContent.trim()) {
                calloutEl = inner;
              }
            }

            if (calloutEl) {
              callouts.push(calloutEl);
              node = node.nextElementSibling;
            } else if (isEmptyNode(node)) {
              node = node.nextElementSibling;
            } else {
              break;
            }
          }

          if (callouts.length === 0) return;
          callouts.forEach(function (el) { container.appendChild(el); });
        }

        callouts.forEach(function (el) { el.style.margin = '0'; });
        applyGridStyles(container, cols);
        container.dataset.colsReady = '1';
      });
    });
  }

  function observePageChanges() {
    window.addEventListener('popstate', function () { setTimeout(initCalloutArrays, 150); });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        var href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(initCalloutArrays, 150);
          setTimeout(initCalloutArrays, 600);
        }
      }
    });

    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].type === 'childList' && mutations[i].addedNodes.length > 0) {
          clearTimeout(window._calloutColsTimeout);
          window._calloutColsTimeout = setTimeout(initCalloutArrays, 150);
          break;
        }
      }
    });

    var root = document.querySelector('.site-body-center-column, .markdown-rendered, main');
    if (root) {
      observer.observe(root, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initCalloutArrays, 150);
      observePageChanges();
    });
  } else {
    setTimeout(initCalloutArrays, 150);
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


/* ===========================================================
   CONCEPT SPLIT-PANE NAVIGATOR
   Opens a docked bottom pane inside .site-body-center-column
   when any concept link is clicked, rendering the concept page
   in an iframe with a footer nav bar for prev/next navigation.
   The pane is resizable via a drag handle between the exam
   content (top) and the concept viewer (bottom).
   =========================================================== */

(function () {
  'use strict';

  /* ---- DOM references ---- */
  var centerCol = null;
  var topPane = null;
  var handleEl = null;
  var bottomPane = null;
  var iframeEl = null;
  var titleEl = null;
  var prevBtn = null;
  var nextBtn = null;
  var posLabel = null;
  var loadingEl = null;
  var learnedBtn = null;

  /* ---- State ---- */
  var conceptList = [];   // [{ name, path }, …]
  var currentIndex = -1;
  var isOpen = false;
  var isInitialized = false;
  var paneMode = 'concept'; // 'concept' | 'resource'
  var tocList = [];          // [{ el, text, level }, …] headings in resource iframe
  var tocIndex = -1;         // current TOC heading index
  var resourceObserver = null; // MutationObserver for re-rendering persistence
  var cachedMeta = null;       // parsed metadata for the current resource

  /* ---- SVGs ---- */
  var svgPrev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>';
  var svgNext = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>';
  var svgCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px"><polyline points="20 6 9 17 4 12"/></svg>';

  /* ---- Init ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    createSplitPane();
    installClickInterceptor();
    hideObsidianBadge();
  }

  /* Hide "Powered by Obsidian Publish" badge via JS (covers dynamic injection) */
  function hideObsidianBadge() {
    function hide() {
      document.querySelectorAll('a[href*="obsidian.md"], a[href*="obsidian.md/publish"], .publish-renderer__footer').forEach(function (el) {
        el.style.display = 'none';
      });
    }
    hide();
    // Re-run after short delay in case it's injected late
    setTimeout(hide, 1000);
    setTimeout(hide, 3000);
  }

  /* -----------------------------------------------------------
     DETECT CURRENT EXAM ID from the page
     ----------------------------------------------------------- */
  function detectExamId() {
    var nav = document.querySelector('.exam-nav[data-current]');
    if (nav) {
      var raw = nav.dataset.current || '';
      return raw.split('|')[0].trim();
    }
    return '';
  }

  /* -----------------------------------------------------------
     CREATE SPLIT-PANE DOM (once)
     ----------------------------------------------------------- */
  function createSplitPane() {
    centerCol = document.querySelector('.site-body-center-column');
    if (!centerCol || isInitialized) return;
    isInitialized = true;

    // Preserve scroll position before wrapping
    var savedScroll = centerCol.scrollTop;

    // Create top pane wrapper and move all existing children into it
    topPane = document.createElement('div');
    topPane.className = 'concept-split__top';
    while (centerCol.firstChild) {
      topPane.appendChild(centerCol.firstChild);
    }

    // Create resize handle
    handleEl = document.createElement('div');
    handleEl.className = 'concept-split__handle';

    // Create bottom pane
    bottomPane = document.createElement('div');
    bottomPane.className = 'concept-split__bottom';

    // Header
    var header = document.createElement('div');
    header.className = 'concept-popup__header';

    titleEl = document.createElement('span');
    titleEl.className = 'concept-popup__title';
    titleEl.textContent = 'Concept';

    // Learned checkmark button
    learnedBtn = document.createElement('button');
    learnedBtn.className = 'concept-popup__learned-btn';
    learnedBtn.type = 'button';
    learnedBtn.title = 'Mark as learned';
    learnedBtn.innerHTML = svgCheck;
    learnedBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleLearned();
    });

    var fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'concept-popup__fullscreen';
    fullscreenBtn.type = 'button';
    fullscreenBtn.title = 'Toggle fullscreen';
    fullscreenBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
    fullscreenBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleFullscreen();
    });

    var closeBtn = document.createElement('button');
    closeBtn.className = 'concept-popup__close';
    closeBtn.type = 'button';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeSplitPane();
    });

    header.appendChild(learnedBtn);
    header.appendChild(titleEl);
    header.appendChild(fullscreenBtn);
    header.appendChild(closeBtn);

    // Body (iframe container)
    var body = document.createElement('div');
    body.className = 'concept-popup__body';

    iframeEl = document.createElement('iframe');
    iframeEl.className = 'concept-popup__iframe';
    iframeEl.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups');
    iframeEl.addEventListener('load', function () {
      if (loadingEl) loadingEl.classList.remove('is-visible');
      try {
        var iDoc = iframeEl.contentDocument || iframeEl.contentWindow.document;
        if (iDoc) {
          ensureIframeStyles(iDoc);
          installIframeClickInterceptor(iDoc);

          // Apply resource-specific formatting if in resource mode
          // Obsidian Publish renders content asynchronously after iframe load,
          // so we must poll until the content (images, headings) is ready.
          if (paneMode === 'resource') {
            waitForResourceContent(iframeEl.src);
          }
        }
      } catch (e) { /* cross-origin — skip */ }
    });

    loadingEl = document.createElement('div');
    loadingEl.className = 'concept-popup__loading';
    loadingEl.innerHTML = '<div class="concept-popup__spinner"></div>';

    body.appendChild(iframeEl);
    body.appendChild(loadingEl);

    // Footer nav bar
    var footer = document.createElement('div');
    footer.className = 'concept-popup__footer';

    prevBtn = document.createElement('button');
    prevBtn.className = 'concept-popup__nav-btn concept-popup__nav-btn--prev';
    prevBtn.type = 'button';
    prevBtn.innerHTML = svgPrev + '<span>Previous</span>';
    prevBtn.addEventListener('click', function () { navigatePopup(-1); });

    posLabel = document.createElement('span');
    posLabel.className = 'concept-popup__pos-label';

    nextBtn = document.createElement('button');
    nextBtn.className = 'concept-popup__nav-btn concept-popup__nav-btn--next';
    nextBtn.type = 'button';
    nextBtn.innerHTML = '<span>Next</span>' + svgNext;
    nextBtn.addEventListener('click', function () { navigatePopup(1); });

    footer.appendChild(prevBtn);
    footer.appendChild(posLabel);
    footer.appendChild(nextBtn);

    // Assemble bottom pane
    bottomPane.appendChild(header);
    bottomPane.appendChild(body);
    bottomPane.appendChild(footer);

    // Assemble center column
    centerCol.appendChild(topPane);
    centerCol.appendChild(handleEl);
    centerCol.appendChild(bottomPane);

    // Restore scroll position
    topPane.scrollTop = savedScroll;

    // Set up resize handle
    initSplitResize();

    // Re-sync bottom width on resize
    window.addEventListener('resize', function () {
      if (isOpen) syncBottomWidth();
    });

    // ESC to exit fullscreen first, then close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        if (centerCol && centerCol.classList.contains('concept-split--fullscreen')) {
          toggleFullscreen();
        } else {
          closeSplitPane();
        }
      }
    });

    // Arrow keys to navigate
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') navigatePopup(-1);
      if (e.key === 'ArrowRight') navigatePopup(1);
    });
  }

  /* -----------------------------------------------------------
     SPLIT-PANE RESIZE (modeled on initSidebarResize)
     ----------------------------------------------------------- */
  function initSplitResize() {
    if (!handleEl || !bottomPane || !centerCol) return;

    var startY, startH;

    function onMouseMove(e) {
      var newH = startH - (e.clientY - startY);
      var maxH = centerCol.getBoundingClientRect().height * 0.85;
      if (newH < 150) newH = 150;
      if (newH > maxH) newH = maxH;
      bottomPane.style.height = newH + 'px';
    }

    function onMouseUp() {
      document.body.classList.remove('concept-split-resizing');
      handleEl.classList.remove('is-active');
      var finalH = parseInt(bottomPane.style.height, 10);
      if (finalH) localStorage.setItem('concept-split-height', finalH);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    handleEl.addEventListener('mousedown', function (e) {
      e.preventDefault();
      startY = e.clientY;
      startH = bottomPane.getBoundingClientRect().height;
      document.body.classList.add('concept-split-resizing');
      handleEl.classList.add('is-active');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Touch support
    handleEl.addEventListener('touchstart', function (e) {
      e.preventDefault(); // prevent scroll while dragging
      var t = e.touches[0];
      startY = t.clientY;
      startH = bottomPane.getBoundingClientRect().height;
      document.body.classList.add('concept-split-resizing');
      handleEl.classList.add('is-active');

      function onTouchMove(ev) {
        ev.preventDefault(); // prevent scroll while dragging
        var tt = ev.touches[0];
        onMouseMove({ clientY: tt.clientY });
      }
      function onTouchEnd() {
        onMouseUp();
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    }, { passive: false });
  }

  /* -----------------------------------------------------------
     LEARNED STATE
     ----------------------------------------------------------- */
  function toggleLearned() {
    if (currentIndex < 0 || currentIndex >= conceptList.length) return;
    var concept = conceptList[currentIndex];
    var examId = detectExamId();
    if (!examId || typeof window._toggleConceptLearned !== 'function') return;

    window._toggleConceptLearned(examId, concept.name);
    updateLearnedBtn();
  }

  function updateLearnedBtn() {
    if (!learnedBtn) return;
    // Never show the learned button in resource mode
    if (paneMode === 'resource') {
      learnedBtn.style.display = 'none';
      return;
    }
    if (currentIndex < 0 || currentIndex >= conceptList.length) return;
    var concept = conceptList[currentIndex];
    var examId = detectExamId();
    if (!examId || typeof window._isConceptLearned !== 'function') {
      learnedBtn.style.display = 'none';
      return;
    }
    learnedBtn.style.display = '';
    var learned = window._isConceptLearned(examId, concept.name);
    learnedBtn.classList.toggle('is-learned', learned);
    learnedBtn.title = learned ? 'Mark as not learned' : 'Mark as learned';
  }

  /* -----------------------------------------------------------
     OPEN / CLOSE
     ----------------------------------------------------------- */
  function openSplitPane(concepts, index, mode) {
    if (!isInitialized) createSplitPane();
    if (!centerCol) return;

    conceptList = concepts;
    currentIndex = index;
    isOpen = true;
    paneMode = mode || 'concept';
    tocList = [];
    tocIndex = -1;

    // Toggle learned button visibility based on mode
    if (learnedBtn) learnedBtn.style.display = (paneMode === 'resource') ? 'none' : '';

    // Restore saved height
    var saved = localStorage.getItem('concept-split-height');
    if (saved) {
      var px = parseInt(saved, 10);
      var maxH = centerCol.getBoundingClientRect().height * 0.85;
      if (px >= 150 && px <= maxH) {
        bottomPane.style.height = px + 'px';
      }
    }

    centerCol.classList.add('concept-split--open');

    // Match bottom pane width to the top content area
    syncBottomWidth();

    loadConcept(index);
  }

  function syncBottomWidth() {
    if (!topPane || !bottomPane || !handleEl) return;
    // Find the content sizer inside the top pane
    var sizer = topPane.querySelector('.markdown-preview-sizer');
    if (!sizer) return;
    var w = sizer.getBoundingClientRect().width;
    if (w > 0) {
      bottomPane.style.maxWidth = w + 'px';
      handleEl.style.maxWidth = w + 'px';
    }
  }

  function toggleFullscreen() {
    if (!centerCol) return;
    var isFullscreen = centerCol.classList.toggle('concept-split--fullscreen');
    // Update button icon
    var btn = centerCol.querySelector('.concept-popup__fullscreen');
    if (btn) {
      btn.innerHTML = isFullscreen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
    }
  }

  function closeSplitPane() {
    disconnectResourceObserver();
    clearConceptHighlight();
    if (centerCol) {
      centerCol.classList.remove('concept-split--open');
      centerCol.classList.remove('concept-split--fullscreen');
    }
    isOpen = false;

    // Reset fullscreen icon
    var btn = centerCol ? centerCol.querySelector('.concept-popup__fullscreen') : null;
    if (btn) {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
    }

    // Clear iframe to stop any ongoing loads
    if (iframeEl) iframeEl.src = 'about:blank';
  }

  function loadConcept(index) {
    if (index < 0 || index >= conceptList.length) return;
    disconnectResourceObserver();

    currentIndex = index;
    var concept = conceptList[index];

    // Update title
    titleEl.textContent = concept.name;

    // Update learned button
    updateLearnedBtn();

    // Show loading
    if (loadingEl) loadingEl.classList.add('is-visible');

    // Load iframe
    var url = window.location.origin + '/' + concept.path.replace(/ /g, '+');
    iframeEl.src = url;

    // Update nav state
    updateNavState();

    // Highlight the active link in the exam syllabus / sources table
    if (paneMode === 'resource') {
      highlightActiveResourceLink();
    } else {
      highlightActiveConceptLink();
    }
  }

  function navigatePopup(direction) {
    if (paneMode === 'resource') {
      navigateResourceToc(direction);
      return;
    }
    var newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= conceptList.length) return;
    loadConcept(newIndex);
  }

  function updateNavState() {
    var hasPrev = currentIndex > 0;
    var hasNext = currentIndex < conceptList.length - 1;

    prevBtn.disabled = !hasPrev;
    prevBtn.classList.toggle('is-disabled', !hasPrev);
    nextBtn.disabled = !hasNext;
    nextBtn.classList.toggle('is-disabled', !hasNext);

    if (conceptList.length > 1) {
      posLabel.textContent = (currentIndex + 1) + ' of ' + conceptList.length;
    } else {
      posLabel.textContent = '';
    }

    // Update prev/next labels
    var prevLabel = prevBtn.querySelector('span');
    var nextLabel = nextBtn.querySelector('span');
    if (hasPrev && prevLabel) prevLabel.textContent = conceptList[currentIndex - 1].name;
    if (!hasPrev && prevLabel) prevLabel.textContent = '';
    if (hasNext && nextLabel) nextLabel.textContent = conceptList[currentIndex + 1].name;
    if (!hasNext && nextLabel) nextLabel.textContent = '';
  }

  /* -----------------------------------------------------------
     HIGHLIGHT ACTIVE CONCEPT in exam syllabus
     ----------------------------------------------------------- */
  function clearConceptHighlight() {
    if (!topPane) return;
    var prev = topPane.querySelectorAll('.concept-active-link');
    for (var i = 0; i < prev.length; i++) {
      prev[i].classList.remove('concept-active-link');
    }
  }

  function highlightActiveConceptLink() {
    clearConceptHighlight();

    if (currentIndex < 0 || currentIndex >= conceptList.length) return;
    if (!topPane) return;

    var concept = conceptList[currentIndex];
    var targetPath = concept.path; // e.g. "Concepts/Probability"

    // Find matching link in the top pane by data-href
    var links = topPane.querySelectorAll('a.internal-link');
    var matchedLink = null;
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('data-href') || '';
      var normalised = href.replace(/^\//, '').replace(/\+/g, ' ');
      if (normalised === targetPath) {
        matchedLink = links[i];
        break;
      }
    }
    if (!matchedLink) return;

    // Expand parent callout if collapsed (click title to trigger Obsidian's handler)
    var callout = matchedLink.closest('.callout');
    if (callout && callout.classList.contains('is-collapsed')) {
      var titleBtn = callout.querySelector('.callout-title');
      if (titleBtn) titleBtn.click();
    }

    // Apply highlight
    matchedLink.classList.add('concept-active-link');

    // Scroll into view with buffer (delay allows callout expansion to render)
    setTimeout(function () {
      var pane = topPane;
      var linkRect = matchedLink.getBoundingClientRect();
      var paneRect = pane.getBoundingClientRect();
      var buffer = 60;

      if (linkRect.bottom + buffer > paneRect.bottom) {
        pane.scrollBy({ top: linkRect.bottom - paneRect.bottom + buffer, behavior: 'smooth' });
      } else if (linkRect.top < paneRect.top) {
        pane.scrollBy({ top: linkRect.top - paneRect.top - buffer, behavior: 'smooth' });
      }
    }, 80);
  }

  /* -----------------------------------------------------------
     GATHER CONCEPT LIST from context
     ----------------------------------------------------------- */
  function gatherConceptsFromExamNav() {
    var items = document.querySelectorAll('.exam-nav__lo-menu-item');
    var concepts = [];
    var seen = {};
    items.forEach(function (link) {
      var href = link.getAttribute('data-href') || link.getAttribute('href') || '';
      var path = href.replace(/^\//, '').replace(/\+/g, ' ');
      if (!path || seen[path]) return;
      seen[path] = true;
      var name = path.replace(/^Concepts\//, '');
      concepts.push({ name: name, path: path });
    });
    return concepts;
  }

  function gatherConceptsFromPageContent() {
    var content = document.querySelector('.markdown-rendered, .markdown-preview-view, .concept-split__top');
    if (!content) return [];
    var links = content.querySelectorAll('a.internal-link');
    var concepts = [];
    var seen = {};
    links.forEach(function (link) {
      var href = link.getAttribute('data-href') || link.getAttribute('href') || '';
      var path = href.replace(/^\//, '').replace(/\+/g, ' ');
      if (!path.match(/^Concepts\//i)) return;
      if (seen[path]) return;
      seen[path] = true;
      var name = path.replace(/^Concepts\//, '');
      concepts.push({ name: name, path: path });
    });
    return concepts;
  }

  function gatherConceptsFromConceptNav() {
    var nav = document.querySelector('.concept-nav[data-current]');
    if (!nav) return [];
    var concepts = [];

    var prevRaw = nav.dataset.prev || '';
    if (prevRaw) {
      prevRaw.split(',').forEach(function (entry) {
        var parts = entry.split('|');
        if (parts.length >= 2) concepts.push({ name: parts[0], path: parts[1] });
      });
    }

    var currentName = nav.dataset.current || '';
    if (currentName) {
      concepts.push({ name: currentName, path: 'Concepts/' + currentName });
    }

    var nextRaw = nav.dataset.next || '';
    if (nextRaw) {
      nextRaw.split(',').forEach(function (entry) {
        var parts = entry.split('|');
        if (parts.length >= 2) concepts.push({ name: parts[0], path: parts[1] });
      });
    }

    return concepts;
  }

  function buildConceptList(clickedPath) {
    // Try exam-nav first (most structured list)
    var list = gatherConceptsFromExamNav();

    // Fallback to page content links
    if (list.length <= 1) {
      var pageList = gatherConceptsFromPageContent();
      if (pageList.length > list.length) list = pageList;
    }

    // Fallback to concept-nav prev/next chain
    if (list.length <= 1) {
      var navList = gatherConceptsFromConceptNav();
      if (navList.length > list.length) list = navList;
    }

    // If still no list, create single-item list
    if (list.length === 0) {
      var name = clickedPath.replace(/^Concepts\//, '');
      list = [{ name: name, path: clickedPath }];
    }

    // Ensure clicked concept is in the list
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].path === clickedPath || list[i].name === clickedPath.replace(/^Concepts\//, '')) {
        found = true;
        break;
      }
    }
    if (!found) {
      var cName = clickedPath.replace(/^Concepts\//, '');
      list.push({ name: cName, path: clickedPath });
    }

    return list;
  }

  function findConceptIndex(list, clickedPath) {
    var targetName = clickedPath.replace(/^Concepts\//, '');
    for (var i = 0; i < list.length; i++) {
      if (list[i].path === clickedPath || list[i].name === targetName) return i;
    }
    return 0;
  }

  /* -----------------------------------------------------------
     RESOURCE HELPERS
     ----------------------------------------------------------- */

  /** Check if a path looks like a resource (year pattern or Resources/ prefix). */
  function isResourcePath(path) {
    if (/^Resources\//i.test(path)) return true;
    if (/^Concepts\//i.test(path)) return false;
    if (/^Exam[ s]/i.test(path)) return false;
    // Year pattern in parentheses: "Title (Author - 2019)" or "Title (2019)"
    if (/\([^)]*\d{4}[^)]*\)/.test(path)) return true;
    // Variant: "Title - 2008"
    if (/\s-\s\d{4}$/.test(path)) return true;
    return false;
  }

  /** Build resource list from the Sources table on the current page. */
  function buildResourceList(clickedPath) {
    var content = topPane || document.querySelector('.markdown-rendered, .markdown-preview-view');
    if (!content) return [{ name: clickedPath, path: clickedPath }];

    // Find the Sources table: a table preceded by a heading containing "Sources"
    var tables = content.querySelectorAll('table');
    var sourcesTable = null;
    for (var t = 0; t < tables.length; t++) {
      var prev = tables[t].previousElementSibling;
      while (prev && !/^H[1-6]$/.test(prev.tagName)) prev = prev.previousElementSibling;
      if (prev && /sources/i.test(prev.textContent)) { sourcesTable = tables[t]; break; }
    }

    if (!sourcesTable) return [{ name: clickedPath, path: clickedPath }];

    var rows = sourcesTable.querySelectorAll('tbody tr');
    var list = [];
    var seen = {};
    for (var r = 0; r < rows.length; r++) {
      var firstCell = rows[r].querySelector('td');
      if (!firstCell) continue;
      var link = firstCell.querySelector('a.internal-link');
      if (!link) continue;
      var href = link.getAttribute('data-href') || link.textContent.trim();
      if (seen[href]) continue;
      seen[href] = true;
      list.push({ name: href, path: href });
    }

    // Ensure clicked resource is in the list
    if (!seen[clickedPath]) {
      list.push({ name: clickedPath, path: clickedPath });
    }

    return list.length ? list : [{ name: clickedPath, path: clickedPath }];
  }

  function findResourceIndex(list, clickedPath) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].path === clickedPath || list[i].name === clickedPath) return i;
    }
    return 0;
  }

  /**
   * Inject hide-styles into the iframe document. Safe to call repeatedly —
   * skips if the marker style already exists.
   */
  var IFRAME_STYLE_ID = '__an-iframe-hide';
  function ensureIframeStyles(iDoc) {
    if (!iDoc || !iDoc.head) return;
    if (iDoc.getElementById(IFRAME_STYLE_ID)) return;
    var style = iDoc.createElement('style');
    style.id = IFRAME_STYLE_ID;
    style.textContent =
      '.concept-nav, .concept-footer, .exam-nav__sticky, .exam-nav-backdrop, ' +
      '.sidebar-tabs-container, .site-body-left-column, .site-navbar, ' +
      '.page-header, .site-header, .site-footer, .publish-renderer__footer, ' +
      '.persistent-exam-navs, .persistent-exam-tab, ' +
      'a[href*="obsidian.md"], a[aria-label*="Obsidian"] ' +
      '{ display: none !important; } ' +
      '.publish-renderer, .site-body { padding-bottom: 0 !important; } ' +
      '.site-body-center-column { margin: 0 auto !important; max-width: 100% !important; } ' +
      '.published-container { display: block !important; }';
    iDoc.head.appendChild(style);
  }

  /** Install link click interceptor inside the iframe document. */
  var IFRAME_CLICK_KEY = '__anClickInstalled';
  function installIframeClickInterceptor(iDoc) {
    if (!iDoc || iDoc[IFRAME_CLICK_KEY]) return;
    iDoc[IFRAME_CLICK_KEY] = true;
    iDoc.addEventListener('click', function (ev) {
      var a = ev.target.closest('a.internal-link, a[data-href]');
      if (!a) return;
      var href = a.getAttribute('data-href') || a.getAttribute('href') || '';
      var p = href.replace(/^https?:\/\/[^/]+\//, '').replace(/^\//, '').replace(/\+/g, ' ');

      if (p.match(/^Concepts\//i)) {
        ev.preventDefault();
        ev.stopPropagation();
        paneMode = 'concept';
        if (learnedBtn) learnedBtn.style.display = '';
        var list = buildConceptList(p);
        var idx = findConceptIndex(list, p);
        conceptList = list;
        loadConcept(idx);
        return;
      }

      // Resource link detection (year pattern)
      if (isResourcePath(p)) {
        ev.preventDefault();
        ev.stopPropagation();
        paneMode = 'resource';
        if (learnedBtn) learnedBtn.style.display = 'none';
        var rList = buildResourceList(p);
        var rIdx = findResourceIndex(rList, p);
        conceptList = rList;
        loadConcept(rIdx);
        return;
      }
    }, true);
  }

  /** Disconnect any active resource observer. */
  function disconnectResourceObserver() {
    if (resourceObserver) {
      resourceObserver.disconnect();
      resourceObserver = null;
    }
    cachedMeta = null;
  }

  /**
   * Set up a persistent observer on the iframe content that (re-)injects
   * the resource hero whenever Obsidian Publish re-renders the markdown.
   * Also does initial polling until the content container appears.
   */
  function waitForResourceContent(expectedSrc) {
    disconnectResourceObserver();

    var attempts = 0;
    var maxAttempts = 40; // 40 × 150ms = 6s max wait
    var observing = false;

    function poll() {
      if (paneMode !== 'resource') return;
      if (expectedSrc && iframeEl.src !== expectedSrc) return;
      attempts++;

      var iDoc;
      try {
        iDoc = iframeEl.contentDocument || iframeEl.contentWindow.document;
      } catch (e) { return; }
      if (!iDoc) {
        if (attempts < maxAttempts) setTimeout(poll, 150);
        return;
      }

      ensureIframeStyles(iDoc);

      var body = iDoc.querySelector('.markdown-preview-sizer') ||
                 iDoc.querySelector('.markdown-rendered') || iDoc.body;
      if (!body) {
        if (attempts < maxAttempts) setTimeout(poll, 150);
        return;
      }

      // Try to apply the hero and build the TOC
      var heroOk = applyResourceHero(iDoc, body);
      buildTocFromIframe(iDoc);

      // Set up persistent observer once we have a body (only once)
      if (!observing) {
        observeResourceContent(iDoc, body, expectedSrc);
        observing = true;
      }

      // If hero isn't applied yet (e.g. image hasn't appeared), keep polling
      if (!heroOk && attempts < maxAttempts) {
        setTimeout(poll, 150);
      }
    }
    setTimeout(poll, 200);
  }

  /**
   * Install a MutationObserver on the markdown body so the hero is
   * re-injected every time Obsidian Publish re-renders the content.
   */
  function observeResourceContent(iDoc, body, expectedSrc) {
    disconnectResourceObserver();
    var debounceTimer = null;

    resourceObserver = new MutationObserver(function () {
      if (paneMode !== 'resource') { disconnectResourceObserver(); return; }
      if (expectedSrc && iframeEl.src !== expectedSrc) { disconnectResourceObserver(); return; }

      // Debounce — Obsidian may fire many mutations in quick succession
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        var curDoc;
        try {
          curDoc = iframeEl.contentDocument || iframeEl.contentWindow.document;
        } catch (e) { return; }
        if (!curDoc) return;

        ensureIframeStyles(curDoc);

        var curBody = curDoc.querySelector('.markdown-preview-sizer') ||
                      curDoc.querySelector('.markdown-rendered') || curDoc.body;
        if (!curBody) return;

        applyResourceHero(curDoc, curBody);
        buildTocFromIframe(curDoc);
      }, 80);
    });

    // Observe the body for child additions/removals (Obsidian re-renders)
    resourceObserver.observe(body, { childList: true, subtree: true });
  }

  /**
   * Parse metadata from the resource page content. Caches the result in
   * `cachedMeta` so subsequent re-applies after Obsidian re-renders don't
   * depend on DOM elements that may have been replaced.
   */
  function parseResourceMeta(iDoc, body) {
    if (cachedMeta) return cachedMeta;

    var h1 = body.querySelector('h1');
    var titleCandidates = [];

    // 1) Current concept list entry name (original wikilink — most reliable)
    if (currentIndex >= 0 && currentIndex < conceptList.length) {
      titleCandidates.push(conceptList[currentIndex].name);
    }
    // 2) iframe URL path (decoded)
    try {
      var urlPath = decodeURIComponent(iDoc.location.pathname.replace(/^\//, '')).replace(/\+/g, ' ');
      if (urlPath) titleCandidates.push(urlPath.replace(/^Resources\//, ''));
    } catch (e) {}
    // 3) Document title (strip site suffix)
    if (iDoc.title) titleCandidates.push(iDoc.title.replace(/\s*[-–|][^(]*$/, '').trim());
    // 4) h1 text
    if (h1) titleCandidates.push(h1.textContent.trim());

    var meta = { title: '', properties: [] };
    var INTERNAL_KEYS = { aliases: 1, cssclasses: 1, cssclass: 1, publish: 1, tags: 1 };

    // --- Try YAML front matter first ---
    // Obsidian Publish renders YAML as div.mod-frontmatter containing raw text
    var fmEl = body.querySelector('.mod-frontmatter');
    if (fmEl) {
      var fmText = fmEl.textContent || '';
      var fmLines = fmText.split('\n');
      for (var fi = 0; fi < fmLines.length; fi++) {
        var fmMatch = fmLines[fi].match(/^\s*([^:]+?)\s*:\s*(.+?)\s*$/);
        if (!fmMatch) continue;
        var rawKey = fmMatch[1].trim();
        var rawVal = fmMatch[2].replace(/^["']|["']$/g, '').trim();
        if (!rawKey || !rawVal) continue;
        if (INTERNAL_KEYS[rawKey.toLowerCase()]) continue;
        if (rawKey.toLowerCase() === 'title') meta.title = rawVal;
        var displayKey = rawKey.charAt(0).toUpperCase() + rawKey.slice(1);
        meta.properties.push({ key: displayKey, value: rawVal });
      }
    }

    // --- Fallback: parse metadata from filename patterns ---
    if (meta.properties.length === 0) {
      var parsed = false;
      var author = '', year = '';

      for (var ci = 0; ci < titleCandidates.length && !parsed; ci++) {
        var titleText = titleCandidates[ci];
        if (!titleText) continue;

        var m = titleText.match(/^(.+?)\s*\(([^)]*?)\s*-\s*(\d{4})\)\s*$/);
        if (m) {
          meta.title = m[1].trim(); author = m[2].trim(); year = m[3]; parsed = true;
        } else {
          var m1b = titleText.match(/^(.+?)\s*\(([^,)]+),\s*(\d{4})\)\s*$/);
          if (m1b) { meta.title = m1b[1].trim(); author = m1b[2].trim(); year = m1b[3]; parsed = true; }
        }
        if (!parsed) {
          var m2 = titleText.match(/^(.+?)\s*-\s*(\d{4})\s*$/);
          if (m2) { meta.title = m2[1].trim(); year = m2[2]; parsed = true; }
        }
        if (!parsed) {
          var m3 = titleText.match(/^(.+?)\s*\((\d{4})\)\s*$/);
          if (m3) { meta.title = m3[1].trim(); year = m3[2]; parsed = true; }
        }
      }

      if (author) meta.properties.push({ key: 'Author', value: author });
      if (year)   meta.properties.push({ key: 'Year', value: year });

      var publisherEl = body.querySelector('.resource-publisher, [data-publisher]');
      if (publisherEl) meta.properties.push({ key: 'Publisher', value: publisherEl.textContent.trim() });
    }

    if (!meta.title) {
      meta.title = (h1 ? h1.textContent.trim() : titleCandidates[0] || '').replace(/\s*\([^)]*\)\s*$/, '');
    }

    // Also cache the image src so we can rebuild the hero even if the
    // original <img> element has been replaced by Obsidian.
    var firstImg = body.querySelector('img[src]');
    if (firstImg) meta.imgSrc = firstImg.getAttribute('src');

    cachedMeta = meta;
    return meta;
  }

  /**
   * (Re-)apply the resource hero to the iframe body.
   * Safe to call repeatedly — skips if hero already exists,
   * rebuilds it from cached metadata if Obsidian wiped the DOM.
   */
  var HERO_STYLE_ID = '__an-resource-hero-css';
  function applyResourceHero(iDoc, body) {
    // Already injected and still in the DOM — nothing to do
    if (body.querySelector('.resource-hero')) return true;

    var meta = parseResourceMeta(iDoc, body);
    if (!meta || !meta.imgSrc) {
      // No image found yet — check if one appeared now
      var img = body.querySelector('img[src]');
      if (!img) return false;
      if (meta) meta.imgSrc = img.getAttribute('src');
      else return false;
    }

    // Build the hero element
    var hero = iDoc.createElement('div');
    hero.className = 'resource-hero';

    var imgWrap = iDoc.createElement('div');
    imgWrap.className = 'resource-hero__img';
    var heroImg = iDoc.createElement('img');
    heroImg.src = meta.imgSrc;
    imgWrap.appendChild(heroImg);

    var metaWrap = iDoc.createElement('div');
    metaWrap.className = 'resource-hero__meta';

    if (meta.properties.length > 0) {
      var detailsWrap = iDoc.createElement('div');
      detailsWrap.className = 'resource-hero__details';
      for (var di = 0; di < meta.properties.length; di++) {
        var prop = meta.properties[di];
        var span = iDoc.createElement('span');
        span.className = 'resource-hero__detail';
        span.innerHTML = '<strong>' + escapeHtml(prop.key) + '</strong> ' + escapeHtml(prop.value);
        detailsWrap.appendChild(span);
      }
      metaWrap.appendChild(detailsWrap);
    }

    hero.appendChild(imgWrap);
    hero.appendChild(metaWrap);
    body.insertBefore(hero, body.firstChild);

    // Mark the original image and h1 for hiding via CSS.
    // We mark them each time because Obsidian may replace the DOM nodes.
    var origImg = body.querySelector('img[src]:not(.resource-hero__img img)');
    if (origImg) {
      var origImgParent = origImg.closest('p, div.image-embed, span.image-embed') || origImg.parentNode;
      if (origImgParent && origImgParent !== body && !origImgParent.closest('.resource-hero')) {
        origImgParent.setAttribute('data-hero-hidden', '');
      } else if (!origImg.closest('.resource-hero')) {
        origImg.setAttribute('data-hero-hidden', '');
      }
    }
    var origH1 = body.querySelector('h1');
    if (origH1 && !origH1.closest('.resource-hero')) {
      origH1.setAttribute('data-hero-hidden', '');
    }
    // Hide the YAML frontmatter block and its header rendered by Obsidian
    var origFrontmatter = body.querySelector('.mod-frontmatter');
    if (origFrontmatter) {
      origFrontmatter.setAttribute('data-hero-hidden', '');
      // Also hide the preceding .mod-header if it's the "Properties" label
      var prevSib = origFrontmatter.previousElementSibling;
      if (prevSib && prevSib.classList.contains('mod-header')) {
        prevSib.setAttribute('data-hero-hidden', '');
      }
    }

    // Ensure hero CSS is in <head> (use ID so it's not duplicated)
    if (!iDoc.getElementById(HERO_STYLE_ID)) {
      var heroStyle = iDoc.createElement('style');
      heroStyle.id = HERO_STYLE_ID;
      heroStyle.textContent =
        // Hero layout
        '.resource-hero { display: flex; gap: 20px; align-items: flex-start; padding: 20px 0; margin-bottom: 8px; }' +
        '.resource-hero__img { flex-shrink: 0; width: clamp(120px, 30%, 250px); }' +
        '.resource-hero__img img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.25); display: block; object-fit: contain; }' +
        '.resource-hero__meta { flex: 1; min-width: 0; }' +
        // Inline metadata details with dot separators
        '.resource-hero__details { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 0; margin: 0; }' +
        '.resource-hero__detail { color: var(--text-muted, #888); font-size: clamp(0.8rem, 2.5vw, 0.95rem); white-space: nowrap; }' +
        '.resource-hero__detail + .resource-hero__detail::before { content: "\\00b7"; margin: 0 8px; color: var(--text-muted, #888); }' +
        '.resource-hero__detail strong { color: var(--text, #cdd6f4); margin-right: 6px; }' +
        // Hide originals that have been replaced by the hero
        '[data-hero-hidden] { display: none !important; }' +
        // Scroll padding for TOC navigation
        'h1, h2, h3, h4, h5, h6 { scroll-margin-top: 16px; }';
      iDoc.head.appendChild(heroStyle);
    }

    return true;
  }

  /** Simple HTML escape for metadata text. */
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /** Extract headings from the resource iframe to build a TOC navigation list. */
  function buildTocFromIframe(iDoc) {
    var body = iDoc.querySelector('.markdown-preview-sizer') ||
               iDoc.querySelector('.markdown-rendered') || iDoc.body;
    if (!body) return;

    var headings = body.querySelectorAll('h1, h2, h3');
    tocList = [];
    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      // Skip the resource-hero injected title
      if (h.closest('.resource-hero')) continue;
      // Skip hidden headings (the original h1 we hid)
      if (h.style.display === 'none') continue;
      tocList.push({ el: h, text: h.textContent.trim(), level: parseInt(h.tagName.charAt(1), 10) });
    }
    tocIndex = tocList.length > 0 ? 0 : -1;
    updateNavStateResource();
  }

  /** Navigate TOC by scrolling to a heading within the resource iframe. */
  function navigateResourceToc(direction) {
    if (tocList.length === 0) return;
    var newIdx = tocIndex + direction;
    if (newIdx < 0 || newIdx >= tocList.length) return;
    tocIndex = newIdx;
    try {
      tocList[tocIndex].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) { /* element may no longer exist */ }
    updateNavStateResource();
  }

  /** Update nav buttons/label for resource TOC mode. */
  function updateNavStateResource() {
    if (tocList.length === 0) {
      prevBtn.disabled = true;
      prevBtn.classList.add('is-disabled');
      nextBtn.disabled = true;
      nextBtn.classList.add('is-disabled');
      posLabel.textContent = '';
      var pl = prevBtn.querySelector('span');
      var nl = nextBtn.querySelector('span');
      if (pl) pl.textContent = '';
      if (nl) nl.textContent = '';
      return;
    }

    var hasPrev = tocIndex > 0;
    var hasNext = tocIndex < tocList.length - 1;

    prevBtn.disabled = !hasPrev;
    prevBtn.classList.toggle('is-disabled', !hasPrev);
    nextBtn.disabled = !hasNext;
    nextBtn.classList.toggle('is-disabled', !hasNext);

    posLabel.textContent = (tocIndex + 1) + ' of ' + tocList.length;

    var prevLabel = prevBtn.querySelector('span');
    var nextLabel = nextBtn.querySelector('span');
    if (prevLabel) prevLabel.textContent = hasPrev ? tocList[tocIndex - 1].text : '';
    if (nextLabel) nextLabel.textContent = hasNext ? tocList[tocIndex + 1].text : '';
  }

  /** Highlight the active resource link in the Sources table. */
  function highlightActiveResourceLink() {
    clearConceptHighlight();

    if (currentIndex < 0 || currentIndex >= conceptList.length) return;
    if (!topPane) return;

    var resource = conceptList[currentIndex];
    var links = topPane.querySelectorAll('a.internal-link');
    var matchedLink = null;
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('data-href') || '';
      if (href === resource.name || href === resource.path) {
        matchedLink = links[i];
        break;
      }
    }
    if (!matchedLink) return;

    matchedLink.classList.add('concept-active-link');

    setTimeout(function () {
      var pane = topPane;
      var linkRect = matchedLink.getBoundingClientRect();
      var paneRect = pane.getBoundingClientRect();
      var buffer = 60;

      if (linkRect.bottom + buffer > paneRect.bottom) {
        pane.scrollBy({ top: linkRect.bottom - paneRect.bottom + buffer, behavior: 'smooth' });
      } else if (linkRect.top < paneRect.top) {
        pane.scrollBy({ top: linkRect.top - paneRect.top - buffer, behavior: 'smooth' });
      }
    }, 80);
  }

  /* -----------------------------------------------------------
     CLICK INTERCEPTOR — capture concept & resource link clicks
     ----------------------------------------------------------- */
  function installClickInterceptor() {
    // Use window (not document) capture phase so we fire before Obsidian's
    // own document-level SPA handler and can intercept concept links.
    window.addEventListener('click', function (e) {
      // On mobile the split-pane popup isn't usable. Skip interception so
      // Obsidian's own handler fires — it navigates to the page and
      // auto-closes the sidebar, which is the correct mobile behaviour.
      if (window.innerWidth <= 768) return;

      var link = e.target.closest('a.internal-link, a[data-href]');
      if (!link) return;

      var dataHref = link.getAttribute('data-href') || '';
      var rawHref = link.getAttribute('href') || '';
      var path = (dataHref || rawHref).replace(/^https?:\/\/[^/]+\//, '').replace(/^\//, '').replace(/\+/g, ' ');

      // Determine if this is a concept or resource link
      var isConcept = false;
      var isResource = false;

      if (path.match(/^Concepts\//i)) {
        isConcept = true;
      } else {
        var altPath = rawHref.replace(/^https?:\/\/[^/]+\//, '').replace(/^\//, '').replace(/\+/g, ' ');
        if (altPath.match(/^Concepts\//i)) {
          path = altPath;
          isConcept = true;
        } else if (isResourcePath(path)) {
          isResource = true;
        } else if (isResourcePath(altPath)) {
          path = altPath;
          isResource = true;
        }
      }

      if (!isConcept && !isResource) return;

      // Don't intercept if inside the split-pane bottom (iframe links)
      if (link.closest('.concept-split__bottom')) return;

      // Don't intercept learned-badge clicks (number toggles)
      if (e.target.closest('.exam-nav__lo-menu-num')) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Close exam-nav sticky if open
      var sticky = document.querySelector('.exam-nav__sticky.is-open');
      if (sticky) sticky.classList.remove('is-open');
      var backdrop = document.querySelector('.exam-nav-backdrop');
      if (backdrop) backdrop.classList.remove('is-visible');

      if (isResource) {
        var rList = buildResourceList(path);
        var rIdx = findResourceIndex(rList, path);
        if (isOpen) {
          paneMode = 'resource';
          if (learnedBtn) learnedBtn.style.display = 'none';
          tocList = [];
          tocIndex = -1;
          conceptList = rList;
          loadConcept(rIdx);
        } else {
          openSplitPane(rList, rIdx, 'resource');
        }
      } else {
        var list = buildConceptList(path);
        var idx = findConceptIndex(list, path);
        if (isOpen) {
          paneMode = 'concept';
          if (learnedBtn) learnedBtn.style.display = '';
          conceptList = list;
          loadConcept(idx);
        } else {
          openSplitPane(list, idx, 'concept');
        }
      }
    }, true); // capture phase to intercept before other handlers
  }

  // Expose for external use
  window._openConceptPopup = function (conceptPath) {
    var list = buildConceptList(conceptPath);
    var idx = findConceptIndex(list, conceptPath);
    openSplitPane(list, idx, 'concept');
  };

  window._openResourcePopup = function (resourcePath) {
    var list = buildResourceList(resourcePath);
    var idx = findResourceIndex(list, resourcePath);
    openSplitPane(list, idx, 'resource');
  };

})();


/* ===========================================================
   CONCEPT NAVIGATION COMPONENT
   Renders prev → current → next navigation for concept pages,
   with a learning-objective badge that opens a panel showing
   all objectives and their concepts for the parent exam(s).

   Usage in Markdown:

   <div class="concept-nav"
        data-color="#2563eb"
        data-current="Inclusion-Exclusion Principle"
        data-prev="Set Function|Concepts/Set Function,Venn Diagram|Concepts/Venn Diagram"
        data-next="Conditional Probability|Concepts/Conditional Probability"
        data-objectives="P-1|Probability|1. General Probability|Exam P-1 (SOA)">
   </div>

   Format:
   - data-color: Hex color for theming (optional, defaults to --brand)
   - data-current: Display name of this concept (required)
   - data-prev: "Name|Path,Name2|Path2" — comma-separated, pipe-delimited (optional)
   - data-next: "Name|Path,Name2|Path2" — comma-separated, pipe-delimited (optional)
   - data-objectives: "ExamCode|ExamName|ObjectiveName|ExamPagePath;..." — semicolon-separated (optional)
   =========================================================== */

(function () {
  'use strict';

  /* ── Bootstrap ─────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConceptNav);
  } else {
    initConceptNav();
  }

  function initConceptNav() {
    setTimeout(buildAllConceptNavs, 100);
    observePageChanges();
  }

  function observePageChanges() {
    window.addEventListener('popstate', function () { setTimeout(buildAllConceptNavs, 150); });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        var href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(buildAllConceptNavs, 200);
          setTimeout(buildAllConceptNavs, 500);
        }
      }
    });

    var observer = new MutationObserver(function () {
      clearTimeout(window._conceptNavRebuildTimeout);
      window._conceptNavRebuildTimeout = setTimeout(buildAllConceptNavs, 200);
    });

    var container = document.querySelector('.site-body-center-column, .markdown-rendered, main');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  function buildAllConceptNavs() {
    var navs = document.querySelectorAll('.concept-nav[data-current]');
    // Clean up footer and concept-sourced exam-nav stickies when no concept-nav on page
    if (navs.length === 0) {
      document.querySelectorAll('.concept-footer').forEach(function (f) { f.remove(); });
      document.querySelectorAll('.exam-nav__sticky[data-from-concept]').forEach(function (s) { s.remove(); });
    }
    navs.forEach(function (nav) {
      if (nav.dataset.built === 'true') return;
      buildConceptNav(nav);
      nav.dataset.built = 'true';
    });
  }

  /* ── Parsers ───────────────────────────────────────────── */

  function parseConcepts(str) {
    if (!str) return [];
    return str.split(',').map(function (entry) {
      var parts = entry.split('|').map(function (p) { return p.trim(); });
      return { name: parts[0] || '', path: parts[1] || '' };
    }).filter(function (c) { return c.name; });
  }

  function parseObjectives(str) {
    if (!str) return [];
    return str.split(';').map(function (entry) {
      var parts = entry.split('|').map(function (p) { return p.trim(); });
      return {
        code: parts[0] || '',
        name: parts[1] || '',
        objective: parts[2] || '',
        pagePath: parts[3] || ''
      };
    }).filter(function (o) { return o.code; });
  }

  /* ── Main builder ──────────────────────────────────────── */

  function buildConceptNav(container) {
    var customColor = container.dataset.color;
    var currentName = container.dataset.current;
    var prevData = parseConcepts(container.dataset.prev);
    var nextData = parseConcepts(container.dataset.next);
    var objectives = parseObjectives(container.dataset.objectives);

    if (customColor) {
      container.style.setProperty('--cnav-color', customColor);
    }

    container.innerHTML = '';

    /* ── Main row: ◄  [Current Name]  ► ▾ ───────────── */
    var navRow = document.createElement('div');
    navRow.className = 'concept-nav__row';

    // Prev arrow button
    if (prevData.length > 0) {
      renderArrowBtn(navRow, prevData, 'prev');
    }

    // Current concept pill (clickable to expand objectives if available)
    if (objectives.length > 0) {
      var pill = document.createElement('button');
      pill.className = 'concept-nav__current concept-nav__current--expandable';
      pill.type = 'button';
      pill.innerHTML =
        '<span class="concept-nav__current-label">' + currentName.replace(/</g, '&lt;') + '</span>' +
        '<svg class="concept-nav__current-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

      pill.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasExpanded = container.classList.contains('is-expanded');
        container.classList.toggle('is-expanded');
        if (!wasExpanded) {
          if (!container._objectivesLoaded) {
            loadObjectivesInline(container, objectives);
          }
        }
      });
      navRow.appendChild(pill);
    } else {
      var pill = document.createElement('span');
      pill.className = 'concept-nav__current';
      pill.textContent = currentName;
      navRow.appendChild(pill);
    }

    // Next arrow button
    if (nextData.length > 0) {
      renderArrowBtn(navRow, nextData, 'next');
    }

    container.appendChild(navRow);

    // Objectives section (hidden by default, shown on expand)
    if (objectives.length > 0) {
      var objSection = document.createElement('div');
      objSection.className = 'concept-nav__objectives';
      container.appendChild(objSection);

      // Eagerly fetch objectives to render the progress bar immediately
      fetchProgressEagerly(container, objectives);

      // Inject an exam-nav sentinel so the exam-nav IIFE builds a sticky bar
      injectExamNavSentinel(container, objectives, customColor);
    }

    // Build the concept-nav footer with back/forward + progress
    buildConceptFooter(container, prevData, nextData, objectives, customColor, currentName);

    /* ── Global close handlers (registered once) ───────── */
    if (!window._conceptNavCloseRegistered) {
      window._conceptNavCloseRegistered = true;

      document.addEventListener('click', function (e) {
        if (!e.target.closest('.concept-nav__arrow-dropdown') &&
            !e.target.closest('.concept-nav__obj-wrap')) {
          closeAllConceptDropdowns();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeAllConceptDropdowns();
        }
      });
    }
  }

  /* ── Arrow button (prev/next) ───────────────────────────── */

  function renderArrowBtn(parent, concepts, direction) {
    var svgPrev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>';
    var svgNext = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>';
    var svg = direction === 'prev' ? svgPrev : svgNext;

    if (concepts.length === 1) {
      var link = document.createElement('a');
      link.className = 'concept-nav__arrow-btn internal-link';
      link.href = concepts[0].path || '#';
      link.innerHTML = svg;
      parent.appendChild(link);
    } else {
      // Multiple paths — dropdown
      var wrapper = document.createElement('div');
      wrapper.className = 'concept-nav__arrow-dropdown';

      var btn = document.createElement('button');
      btn.className = 'concept-nav__arrow-btn';
      btn.type = 'button';
      btn.innerHTML = svg;

      var menu = document.createElement('div');
      menu.className = 'concept-nav__arrow-menu';

      concepts.forEach(function (c) {
        var item = document.createElement('a');
        item.className = 'concept-nav__arrow-menu-item internal-link';
        item.href = c.path || '#';
        item.textContent = c.name;
        item.addEventListener('click', function () {
          wrapper.classList.remove('is-open');
        });
        menu.appendChild(item);
      });

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = wrapper.classList.contains('is-open');
        closeAllConceptDropdowns();
        if (!isOpen) wrapper.classList.add('is-open');
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(menu);
      parent.appendChild(wrapper);
    }
  }

  function closeAllConceptDropdowns() {
    document.querySelectorAll('.concept-nav__arrow-dropdown.is-open, .concept-nav__obj-wrap.is-open').forEach(function (d) {
      d.classList.remove('is-open');
    });
    hideConceptBackdrop();
  }

  /* ── Inline objectives loading ──────────────────────────── */

  var examObjectivesCache = {};

  function loadObjectivesInline(container, objectives) {
    container._objectivesLoaded = true;
    var section = container.querySelector('.concept-nav__objectives');
    if (!section) return;

    section.innerHTML = '<div class="concept-nav__obj-loading">Loading\u2026</div>';

    // Deduplicate by exam pagePath
    var seen = {};
    var uniqueExams = [];
    objectives.forEach(function (obj) {
      if (!seen[obj.pagePath]) {
        seen[obj.pagePath] = true;
        uniqueExams.push(obj);
      }
    });

    Promise.all(uniqueExams.map(function (exam) {
      return fetchExamObjectives(exam.pagePath).then(function (allObj) {
        return { exam: exam, objectives: allObj };
      });
    })).then(function (results) {
      renderObjectivesView(section, results, objectives, container);
    }).catch(function () {
      section.innerHTML = '<div class="concept-nav__obj-loading">Could not load objectives.</div>';
    });
  }

  function renderObjectivesView(section, results, navObjectives, container) {
    section.innerHTML = '';
    var currentObjName = navObjectives[0].objective.replace(/^\d+\.\s*/, '');
    var currentConceptName = container ? container.dataset.current : '';

    // Find current concept's position in its objective and render progress bar
    if (currentConceptName && container) {
      var progressInfo = findConceptProgress(results, currentObjName, navObjectives[0].objective, currentConceptName);
      if (progressInfo) {
        renderProgressBar(container, progressInfo);
      }
    }

    results.forEach(function (result) {
      var header = document.createElement('div');
      header.className = 'concept-nav__obj-header';
      if (result.exam.pagePath) {
        var headerLink = document.createElement('a');
        headerLink.className = 'concept-nav__obj-header-link internal-link';
        headerLink.href = result.exam.pagePath;
        headerLink.textContent = 'Exam ' + result.exam.code;
        header.appendChild(headerLink);
      } else {
        header.textContent = 'Exam ' + result.exam.code + ':';
      }
      section.appendChild(header);

      if (result.objectives.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'concept-nav__obj-loading';
        empty.textContent = 'No objectives found.';
        section.appendChild(empty);
        return;
      }

      var list = document.createElement('ol');
      list.className = 'concept-nav__obj-list';

      result.objectives.forEach(function (objective) {
        var li = document.createElement('li');
        li.className = 'concept-nav__obj-item';

        if (objective.name === currentObjName ||
            objective.name === navObjectives[0].objective) {
          li.classList.add('is-current');
        }

        // Wrapper for dropdown positioning
        var wrap = document.createElement('div');
        wrap.className = 'concept-nav__obj-wrap';

        var btn = document.createElement('button');
        btn.className = 'concept-nav__obj-btn';
        btn.type = 'button';

        var objNumSpan = document.createElement('span');
        objNumSpan.className = 'concept-nav__obj-num';
        objNumSpan.textContent = (result.objectives.indexOf(objective) + 1);
        btn.appendChild(objNumSpan);

        var objNameSpan = document.createElement('span');
        objNameSpan.className = 'concept-nav__obj-name';
        objNameSpan.textContent = objective.name;
        btn.appendChild(objNameSpan);

        // Build floating dropdown menu
        var menu = document.createElement('div');
        menu.className = 'concept-nav__obj-menu';

        var menuHeader = document.createElement('div');
        menuHeader.className = 'concept-nav__obj-menu-header';
        menuHeader.textContent = objective.name;
        menu.appendChild(menuHeader);

        if (objective.concepts.length === 0) {
          var emptyMsg = document.createElement('div');
          emptyMsg.className = 'concept-nav__obj-loading';
          emptyMsg.textContent = 'No concepts found.';
          menu.appendChild(emptyMsg);
        } else {
          objective.concepts.forEach(function (concept, idx) {
            var link = document.createElement('a');
            link.className = 'concept-nav__obj-menu-item internal-link';
            link.href = 'Concepts/' + concept;
            var numSpan = document.createElement('span');
            numSpan.className = 'concept-nav__obj-menu-num';
            numSpan.textContent = (idx + 1);
            link.appendChild(numSpan);
            link.appendChild(document.createTextNode(concept));
            link.addEventListener('click', function () {
              wrap.classList.remove('is-open');
              hideConceptBackdrop();
            });
            menu.appendChild(link);
          });
        }

        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var wasOpen = wrap.classList.contains('is-open');
          closeAllConceptDropdowns();
          if (!wasOpen) {
            wrap.classList.add('is-open');
            showConceptBackdrop();
          }
        });

        // Concept count badge (inside button for full-width clickability)
        if (objective.concepts.length > 0) {
          var countBadge = document.createElement('span');
          countBadge.className = 'concept-nav__obj-count';
          countBadge.textContent = objective.concepts.length;
          btn.appendChild(countBadge);
        }

        wrap.appendChild(btn);
        wrap.appendChild(menu);
        li.appendChild(wrap);

        list.appendChild(li);
      });

      section.appendChild(list);
    });
  }

  /* ── Progress bar ─────────────────────────────────────── */

  function findConceptProgress(results, currentObjName, rawObjName, currentConceptName) {
    for (var i = 0; i < results.length; i++) {
      var objectives = results[i].objectives;
      for (var j = 0; j < objectives.length; j++) {
        var obj = objectives[j];
        if (obj.name !== currentObjName && obj.name !== rawObjName) continue;
        var idx = obj.concepts.indexOf(currentConceptName);
        if (idx !== -1) {
          return { position: idx + 1, total: obj.concepts.length, objectiveName: obj.name };
        }
      }
    }
    return null;
  }

  function renderProgressBar(container, info) {
    // Remove any existing progress bar and LO label
    var existing = container.querySelector('.concept-nav__progress');
    if (existing) existing.remove();
    var existingLabel = container.querySelector('.concept-nav__lo-label');
    if (existingLabel) existingLabel.remove();

    var pct = (info.position / info.total) * 100;

    var bar = document.createElement('div');
    bar.className = 'concept-nav__progress';

    var track = document.createElement('div');
    track.className = 'concept-nav__progress-track';

    var fill = document.createElement('div');
    fill.className = 'concept-nav__progress-fill';
    fill.style.width = pct + '%';

    var label = document.createElement('span');
    label.className = 'concept-nav__progress-label';
    label.textContent = info.position + ' / ' + info.total;

    track.appendChild(fill);
    bar.appendChild(track);
    bar.appendChild(label);

    // Insert after the nav row, before objectives section
    var navRow = container.querySelector('.concept-nav__row');
    if (navRow && navRow.nextSibling) {
      container.insertBefore(bar, navRow.nextSibling);
    } else {
      container.appendChild(bar);
    }

    // Add LO label below progress bar (clickable to expand)
    if (info.objectiveName) {
      var loLabel = document.createElement('div');
      loLabel.className = 'concept-nav__lo-label';
      loLabel.textContent = info.objectiveName;
      loLabel.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!container.classList.contains('is-expanded')) {
          container.classList.add('is-expanded');
          var objectives = parseObjectives(container.dataset.objectives);
          if (!container._objectivesLoaded && objectives.length > 0) {
            loadObjectivesInline(container, objectives);
          }
        }
      });

      // Insert after progress bar, before objectives section
      if (bar.nextSibling) {
        container.insertBefore(loLabel, bar.nextSibling);
      } else {
        container.appendChild(loLabel);
      }
    }
  }

  function fetchProgressEagerly(container, objectives) {
    var currentConceptName = container.dataset.current;
    var rawObjName = objectives[0].objective;
    var currentObjName = rawObjName.replace(/^\d+\.\s*/, '');

    // Deduplicate by exam pagePath
    var seen = {};
    var uniqueExams = [];
    objectives.forEach(function (obj) {
      if (!seen[obj.pagePath]) {
        seen[obj.pagePath] = true;
        uniqueExams.push(obj);
      }
    });

    Promise.all(uniqueExams.map(function (exam) {
      return fetchExamObjectives(exam.pagePath).then(function (allObj) {
        return { exam: exam, objectives: allObj };
      });
    })).then(function (results) {
      var progressInfo = findConceptProgress(results, currentObjName, rawObjName, currentConceptName);
      if (progressInfo) {
        renderProgressBar(container, progressInfo);
      }
    }).catch(function () { /* silently skip progress bar on error */ });
  }

  /* ── Fetch & parse exam page objectives ────────────────── */

  function fetchExamObjectives(examPagePath) {
    if (examObjectivesCache[examPagePath]) {
      return Promise.resolve(examObjectivesCache[examPagePath]);
    }

    return fetchExamMarkdown(examPagePath).then(function (md) {
      var objectives = md ? parseObjectivesFromMarkdown(md) : [];
      examObjectivesCache[examPagePath] = objectives;
      return objectives;
    });
  }

  /** Fetch raw markdown for an exam page using a multi-strategy approach.
      Validates that the result actually contains callout blocks before
      accepting it — this prevents SPA HTML shells from short-circuiting. */
  function fetchExamMarkdown(pagePath) {
    var baseName = pagePath.replace(/\.md$/, '');

    function hasCallouts(text) {
      return text && /\[!example\]/i.test(text);
    }

    // Strategy 1: Obsidian internal cache
    var cached = cnavTryCache(baseName);
    if (cached && hasCallouts(cached)) return Promise.resolve(cached);

    // Strategy 2: Fetch page URL
    var url = '/' + baseName.split('/').map(encodeURIComponent).join('/');
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    }).then(function (text) {
      // Check if raw markdown was returned
      if (cnavLooksLikeMarkdown(text) && hasCallouts(text)) return text;

      // Try extracting markdown from HTML response
      var extracted = cnavExtractMarkdown(text);
      if (extracted && hasCallouts(extracted)) return extracted;

      // HTML response with no useful content — fall through
      return null;
    }).catch(function () {
      return null;
    }).then(function (md) {
      if (md) return md;

      // Strategy 3: Obsidian Publish content API
      var siteId = cnavExtractSiteId();
      if (!siteId) return null;
      var apiUrl = 'https://publish-01.obsidian.md/access/' + siteId + '/' + encodeURIComponent(baseName + '.md');
      return fetch(apiUrl).then(function (r) {
        if (!r.ok) return null;
        return r.text();
      }).then(function (t) {
        return (t && hasCallouts(t)) ? t : null;
      }).catch(function () { return null; });
    });
  }

  /** Parse learning objectives from raw exam page markdown.
      Splits on `> [!example]-` callout blocks and extracts titles,
      weights, and [[wikilink]] concepts from each block. */
  function parseObjectivesFromMarkdown(md) {
    if (!md) return [];

    var objectives = [];
    // Split into callout blocks: each starts with "> [!example]-"
    var blocks = md.split(/^>\s*\[!example\]-?\s*/m);

    // First element is everything before the first callout — skip it
    for (var i = 1; i < blocks.length; i++) {
      var block = blocks[i];
      var lines = block.split('\n');

      // First line is the callout title: "General Probability {23-30%}"
      var titleLine = lines[0].trim();
      var weightMatch = titleLine.match(/\{([^}]+)\}/);
      var weight = weightMatch ? weightMatch[1] : '';
      var name = titleLine.replace(/\{[^}]+\}/g, '').trim();

      // Collect the rest of the callout body (lines starting with ">")
      var bodyLines = [];
      for (var j = 1; j < lines.length; j++) {
        var line = lines[j];
        // Callout body lines start with ">" or ">>"
        if (/^>\s?/.test(line)) {
          bodyLines.push(line.replace(/^>\s?/, ''));
        } else {
          // End of callout block
          break;
        }
      }
      var body = bodyLines.join('\n');

      // Extract [[wikilinks]] from body
      var concepts = [];
      var wikiLinkRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      var match;
      while ((match = wikiLinkRe.exec(body)) !== null) {
        var cName = match[1].replace(/^Concepts\//, '').split('#')[0].trim();
        if (cName && concepts.indexOf(cName) === -1) {
          concepts.push(cName);
        }
      }

      if (name) {
        objectives.push({ name: name, weight: weight, concepts: concepts });
      }
    }

    return objectives;
  }

  /* ── Shared fetch helpers (minimal copies from Question Browser) ── */

  function cnavLooksLikeMarkdown(text) {
    if (!text || text.indexOf('<!DOCTYPE') !== -1) return false;
    return /^#\s/m.test(text) || />\s*\[!/m.test(text);
  }

  function cnavTryCache(baseName) {
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

      var candidates = [baseName + '.md', baseName];
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

  function cnavExtractMarkdown(html) {
    try {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var content = doc.querySelector('.markdown-preview-view, .markdown-rendered, .publish-renderer');
      if (content && content.textContent.trim().length > 20) {
        // The rendered HTML might contain wiki link text we can parse
        return content.innerHTML;
      }
      var pageData = doc.querySelector('[data-page-content], [data-markdown]');
      if (pageData) {
        var raw = pageData.getAttribute('data-page-content') || pageData.getAttribute('data-markdown') || '';
        if (raw && cnavLooksLikeMarkdown(raw)) return raw;
      }
    } catch (e) {}
    return null;
  }

  function cnavExtractSiteId() {
    try {
      if (window.publish && window.publish.siteId) return window.publish.siteId;
      if (window.publish && window.publish.site && window.publish.site.id) return window.publish.site.id;
      var els = document.querySelectorAll('link[href*="publish-01.obsidian.md"], script[src*="publish-01.obsidian.md"]');
      for (var i = 0; i < els.length; i++) {
        var attr = els[i].getAttribute('href') || els[i].getAttribute('src') || '';
        var m = attr.match(/publish-01\.obsidian\.md\/access\/([a-f0-9]+)/);
        if (m) return m[1];
      }
      var meta = document.querySelector('meta[name="publish-site-id"], meta[property="publish-site-id"]');
      if (meta) return meta.content;
    } catch (e) {}
    return null;
  }

  /* ── Backdrop helpers ──────────────────────────────────── */

  function elevateCenterCol() {
    var col = document.querySelector('.site-body-center-column');
    if (col) col.classList.add('exam-nav-elevated');
  }

  function deelevateCenterCol() {
    var anyOpen = document.querySelector(
      '.concept-nav__arrow-dropdown.is-open, .concept-nav__obj-wrap.is-open,' +
      '.exam-nav.is-lo-expanded, .exam-nav__dropdown.is-open, .exam-nav__lo-wrap.is-open'
    );
    if (!anyOpen) {
      var col = document.querySelector('.site-body-center-column');
      if (col) col.classList.remove('exam-nav-elevated');
    }
  }

  function showConceptBackdrop() {
    elevateCenterCol();
    var backdrop = document.querySelector('.exam-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'exam-nav-backdrop';
      backdrop.addEventListener('click', function () {
        closeAllConceptDropdowns();
        document.querySelectorAll('.dl-dropdown__wrap.is-open').forEach(function (d) {
          d.classList.remove('is-open');
        });
        document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(function (d) {
          d.classList.remove('is-open');
        });
        hideConceptBackdrop();
      });
      document.body.appendChild(backdrop);
    }
    if (window.innerWidth <= 540) {
      backdrop.classList.add('is-visible');
    }
  }

  function hideConceptBackdrop() {
    var backdrop = document.querySelector('.exam-nav-backdrop');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
    }
    deelevateCenterCol();
  }

  /* ── Inject exam-nav sentinel for concept pages ────────── */

  function injectExamNavSentinel(container, objectives, customColor) {
    // Remove previous sentinel if rebuilding
    if (container._examNavSentinel) {
      // Also remove the sticky it created
      var oldSticky = container._examNavSentinel._stickyEl;
      if (oldSticky) oldSticky.remove();
      container._examNavSentinel.remove();
    }

    var exam = objectives[0];
    var sentinel = document.createElement('div');
    sentinel.className = 'exam-nav';
    sentinel.style.display = 'none';
    sentinel.dataset.current = exam.code + '|' + exam.name;
    if (customColor) sentinel.dataset.color = customColor;
    // Store exam page path so the exam-nav IIFE fetches from the right page
    sentinel.dataset.examPage = exam.pagePath;

    // Inject into the page content so the exam-nav IIFE's MutationObserver picks it up
    var pageEl = container.closest('.markdown-preview-view, .markdown-rendered, .page-container') || container.parentElement;
    if (pageEl) {
      pageEl.appendChild(sentinel);
    }
    container._examNavSentinel = sentinel;

    // Mark the resulting sticky as concept-sourced so cleanup doesn't remove it
    // The exam-nav IIFE will build from this sentinel asynchronously; apply the flag after
    setTimeout(function () {
      if (sentinel._stickyEl) {
        sentinel._stickyEl.setAttribute('data-from-concept', 'true');
      }
    }, 350);
  }

  /* ── Concept navigation footer ─────────────────────────── */

  function buildConceptFooter(container, prevData, nextData, objectives, customColor, currentName) {
    // Clean up previous footer
    if (container._footerEl) {
      container._footerEl.remove();
    }

    // Only show footer if there's prev or next navigation
    if (prevData.length === 0 && nextData.length === 0) return;

    var footer = document.createElement('div');
    footer.className = 'concept-footer';
    if (customColor) {
      footer.style.setProperty('--cnav-color', customColor);
    }

    var svgPrev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>';
    var svgNext = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>';

    // ── Prev button ──
    var prevBtn;
    if (prevData.length > 0) {
      if (prevData.length === 1) {
        prevBtn = document.createElement('a');
        prevBtn.className = 'concept-footer__btn concept-footer__btn--prev internal-link';
        prevBtn.href = prevData[0].path || '#';
        prevBtn.innerHTML = svgPrev + '<span class="concept-footer__btn-label">' + prevData[0].name.replace(/</g, '&lt;') + '</span>';
      } else {
        prevBtn = document.createElement('div');
        prevBtn.className = 'concept-footer__btn-group concept-footer__btn-group--prev';

        var prevTrigger = document.createElement('button');
        prevTrigger.className = 'concept-footer__btn concept-footer__btn--prev';
        prevTrigger.type = 'button';
        prevTrigger.innerHTML = svgPrev + '<span class="concept-footer__btn-label">Previous</span>';

        var prevMenu = document.createElement('div');
        prevMenu.className = 'concept-footer__menu concept-footer__menu--prev';
        prevData.forEach(function (c) {
          var item = document.createElement('a');
          item.className = 'concept-footer__menu-item internal-link';
          item.href = c.path || '#';
          item.textContent = c.name;
          prevMenu.appendChild(item);
        });

        prevTrigger.addEventListener('click', function (e) {
          e.stopPropagation();
          prevBtn.classList.toggle('is-open');
        });

        prevBtn.appendChild(prevTrigger);
        prevBtn.appendChild(prevMenu);
      }
    } else {
      prevBtn = document.createElement('div');
      prevBtn.className = 'concept-footer__btn concept-footer__btn--prev concept-footer__btn--disabled';
      prevBtn.innerHTML = svgPrev + '<span class="concept-footer__btn-label"></span>';
    }
    footer.appendChild(prevBtn);

    // ── Center: progress indicator ──
    var center = document.createElement('div');
    center.className = 'concept-footer__center';

    var progressTrack = document.createElement('div');
    progressTrack.className = 'concept-footer__progress-track';
    var progressFill = document.createElement('div');
    progressFill.className = 'concept-footer__progress-fill';
    progressTrack.appendChild(progressFill);

    var progressLabel = document.createElement('span');
    progressLabel.className = 'concept-footer__progress-label';

    center.appendChild(progressTrack);
    center.appendChild(progressLabel);
    footer.appendChild(center);

    // ── Next button ──
    var nextBtn;
    if (nextData.length > 0) {
      if (nextData.length === 1) {
        nextBtn = document.createElement('a');
        nextBtn.className = 'concept-footer__btn concept-footer__btn--next internal-link';
        nextBtn.href = nextData[0].path || '#';
        nextBtn.innerHTML = '<span class="concept-footer__btn-label">' + nextData[0].name.replace(/</g, '&lt;') + '</span>' + svgNext;
      } else {
        nextBtn = document.createElement('div');
        nextBtn.className = 'concept-footer__btn-group concept-footer__btn-group--next';

        var nextTrigger = document.createElement('button');
        nextTrigger.className = 'concept-footer__btn concept-footer__btn--next';
        nextTrigger.type = 'button';
        nextTrigger.innerHTML = '<span class="concept-footer__btn-label">Next</span>' + svgNext;

        var nextMenu = document.createElement('div');
        nextMenu.className = 'concept-footer__menu concept-footer__menu--next';
        nextData.forEach(function (c) {
          var item = document.createElement('a');
          item.className = 'concept-footer__menu-item internal-link';
          item.href = c.path || '#';
          item.textContent = c.name;
          nextMenu.appendChild(item);
        });

        nextTrigger.addEventListener('click', function (e) {
          e.stopPropagation();
          nextBtn.classList.toggle('is-open');
        });

        nextBtn.appendChild(nextTrigger);
        nextBtn.appendChild(nextMenu);
      }
    } else {
      nextBtn = document.createElement('div');
      nextBtn.className = 'concept-footer__btn concept-footer__btn--next concept-footer__btn--disabled';
      nextBtn.innerHTML = '<span class="concept-footer__btn-label"></span>' + svgNext;
    }
    footer.appendChild(nextBtn);

    // Insert into body for fixed positioning
    document.body.appendChild(footer);
    container._footerEl = footer;

    // Handle SPA navigation on internal links in the footer
    footer.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link');
      if (link) {
        e.preventDefault();
        e.stopImmediatePropagation();
        footer.querySelectorAll('.is-open').forEach(function (d) { d.classList.remove('is-open'); });
        var href = link.getAttribute('data-href') || link.getAttribute('href') || '';
        if (href) {
          var path = href.replace(/^https?:\/\/[^/]+\//, '').replace(/^\//,'').replace(/\+/g, ' ');
          window._spaNavigate(path);
        }
      }
    }, true);

    // Close footer menus on outside click
    if (!window._conceptFooterCloseRegistered) {
      window._conceptFooterCloseRegistered = true;
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.concept-footer__btn-group')) {
          document.querySelectorAll('.concept-footer__btn-group.is-open').forEach(function (d) {
            d.classList.remove('is-open');
          });
        }
      });
    }

    // Populate progress once objectives are fetched
    if (objectives && objectives.length > 0) {
      fetchFooterProgress(container, objectives, progressFill, progressLabel, currentName);
    }
  }

  function fetchFooterProgress(container, objectives, fillEl, labelEl, currentConceptName) {
    var rawObjName = objectives[0].objective;
    var currentObjName = rawObjName.replace(/^\d+\.\s*/, '');

    var seen = {};
    var uniqueExams = [];
    objectives.forEach(function (obj) {
      if (!seen[obj.pagePath]) {
        seen[obj.pagePath] = true;
        uniqueExams.push(obj);
      }
    });

    Promise.all(uniqueExams.map(function (exam) {
      return fetchExamObjectives(exam.pagePath).then(function (allObj) {
        return { exam: exam, objectives: allObj };
      });
    })).then(function (results) {
      var progressInfo = findConceptProgress(results, currentObjName, rawObjName, currentConceptName);
      if (progressInfo) {
        var pct = (progressInfo.position / progressInfo.total) * 100;
        fillEl.style.width = pct + '%';
        labelEl.textContent = progressInfo.position + ' / ' + progressInfo.total;
      }
    }).catch(function () { /* silently skip */ });
  }

})();


/* ===========================================================
   SIDEBAR TABS
   Sidebar with tabbed interface for exam tracking.
   Replaces the entire left sidebar with a tabbed interface.
   Persists active tab and journey state in localStorage.
   =========================================================== */

(function () {
  'use strict';

  /* ---- Storage keys ---- */
  var TAB_KEY = 'actuarial-notes-active-tab';
  var JOURNEY_KEY = 'actuarial-notes-journey';

  /* ---- SVG icons ---- */
  var SVG_CIRCLE = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.8"/></svg>';

  var SVG_PROGRESS = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.8"/>' +
    '<path d="M10 2a8 8 0 0 1 0 16" fill="currentColor" opacity=".45"/></svg>';

  var SVG_CHECK = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="10" cy="10" r="8" fill="currentColor" opacity=".2"/>' +
    '<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.8"/>' +
    '<polyline points="6.5 10.5 9 13 14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var SVG_CHEVRON = '<svg class="sidebar-tabs__section-chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<polyline points="6 8 10 12 14 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* Tab icons */
  var SVG_TAB_EXAMS = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h9l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><polyline points="13 2 13 6 17 6"/><line x1="6" y1="10" x2="14" y2="10"/><line x1="6" y1="13" x2="14" y2="13"/><line x1="6" y1="16" x2="10" y2="16"/></svg>';

  var SVG_SPEAKER_ON = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 7 7 7 12 3 12 17 7 13 3 13"/><path d="M15 7a4 4 0 0 1 0 6"/></svg>';

  var SVG_SPEAKER_OFF = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 7 7 7 12 3 12 17 7 13 3 13"/><line x1="15" y1="8" x2="19" y2="12"/><line x1="19" y1="8" x2="15" y2="12"/></svg>';

  var SVG_SUN = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="10" y1="16" x2="10" y2="18"/><line x1="3.3" y1="3.3" x2="4.7" y2="4.7"/><line x1="15.3" y1="15.3" x2="16.7" y2="16.7"/><line x1="2" y1="10" x2="4" y2="10"/><line x1="16" y1="10" x2="18" y2="10"/><line x1="3.3" y1="16.7" x2="4.7" y2="15.3"/><line x1="15.3" y1="4.7" x2="16.7" y2="3.3"/></svg>';

  var SVG_MOON = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11.4A7 7 0 0 1 8.6 3a7 7 0 1 0 8.4 8.4z"/></svg>';

  var SVG_SEARCH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5.5"/><line x1="13" y1="13" x2="17" y2="17"/></svg>';

  var SVG_CLEAR = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="14" y2="14"/><line x1="14" y1="6" x2="6" y2="14"/></svg>';

  /* Search result category icons */
  var SVG_CAT_EXAM = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 1.5h7.5L13 4v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5A1 1 0 0 1 3 1.5z"/><polyline points="10.5 1.5 10.5 4.5 13 4.5"/><line x1="5" y1="8" x2="11" y2="8"/><line x1="5" y1="10.5" x2="11" y2="10.5"/></svg>';

  var SVG_CAT_CONCEPT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="4"/><line x1="6.5" y1="12" x2="9.5" y2="12"/><line x1="7" y1="14" x2="9" y2="14"/><line x1="6.5" y1="10" x2="9.5" y2="10"/></svg>';

  var SVG_CAT_DOC = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 1.5h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5A1 1 0 0 1 3 1.5z"/><line x1="5" y1="5" x2="11" y2="5"/><line x1="5" y1="7.5" x2="11" y2="7.5"/><line x1="5" y1="10" x2="9" y2="10"/></svg>';

  var STATUS_ICONS = { not_started: SVG_CIRCLE, in_progress: SVG_PROGRESS, completed: SVG_CHECK };
  var STATUS_CYCLE = { not_started: 'in_progress', in_progress: 'completed', completed: 'not_started' };

  var COLOR_HEX = {
    sky: '#0284c7', blue: '#2563eb', indigo: '#4f46e5', violet: '#7c3aed',
    purple: '#9333ea', fuchsia: '#c026d3', pink: '#db2777', rose: '#e11d48',
    red: '#dc2626', orange: '#ea580c', amber: '#d97706', yellow: '#ca8a04',
    lime: '#65a30d', green: '#16a34a', emerald: '#059669', teal: '#0d9488',
    cyan: '#0891b2', slate: '#475569'
  };

  /* ---- Tab definitions ---- */
  var TABS = [
    { id: 'exams',    label: 'Exams',    icon: SVG_TAB_EXAMS },
    { id: 'search',   label: 'Search',   icon: SVG_SEARCH }
  ];

  /* ---- Track definitions ---- */
  var TRACKS = [
    {
      key: 'DEFAULT',
      name: 'Choose a Track',
      certPath: null,
      sections: [
        {
          label: 'Preliminary Exams',
          items: [
            { id: 'P',  name: 'Exam P-1',  path: 'Exam P-1 (SOA)', color: 'blue' },
            { id: 'FM', name: 'Exam FM-2',  path: 'Exam FM-2 (SOA)', color: 'indigo' }
          ]
        }
      ]
    },
    {
      key: 'ASA',
      name: 'ASA (SOA)',
      certPath: 'Exams/Certifications/Associate of the Society of Actuaries (ASA)',
      sections: [
        {
          label: 'VEE Requirements',
          items: [
            { id: 'VEE-MS',   name: 'VEE Mathematical Statistics', path: null, color: 'sky' },
            { id: 'VEE-ECON', name: 'VEE Economics',             path: null, color: 'sky' },
            { id: 'VEE-AF',   name: 'VEE Accounting & Finance',  path: null, color: 'sky' }
          ]
        },
        {
          label: 'Preliminary Exams',
          items: [
            { id: 'P',     name: 'Exam P-1',   path: 'Exam P-1 (SOA)', color: 'blue' },
            { id: 'FM',    name: 'Exam FM-2',   path: 'Exam FM-2 (SOA)', color: 'indigo' }
          ]
        },
        {
          label: 'Exams & Courses',
          items: [
            { id: 'PAF',   name: 'PAF',        path: null, color: 'violet' },
            { id: 'FAM',   name: 'Exam FAM',   path: null, color: 'purple' },
            { id: 'SRM',   name: 'Exam SRM',   path: null, color: 'fuchsia' },
            { id: 'ASF',   name: 'ASF',        path: null, color: 'pink' },
            { id: 'PA',    name: 'Exam PA',     path: null, color: 'rose' },
            { id: 'ALTAM', name: 'Exam ALTAM',  path: null, or: 'ASTAM', color: 'red' },
            { id: 'ASTAM', name: 'Exam ASTAM',  path: null, or: 'ALTAM', color: 'red' },
            { id: 'ATPA',  name: 'ATPA',        path: null, color: 'orange' },
            { id: 'FAP',   name: 'FAP',         path: null, color: 'amber' },
            { id: 'APC',   name: 'APC',         path: null, color: 'slate' }
          ]
        }
      ]
    },
    {
      key: 'ACAS',
      name: 'ACAS (CAS)',
      certPath: 'Exams/Certifications/Associate of the Casualty Actuarial Society (ACAS)',
      sections: [
        {
          label: 'VEE Requirements',
          items: [
            { id: 'VEE-ECON', name: 'VEE Economics',             path: null, color: 'sky' },
            { id: 'VEE-AF',   name: 'VEE Accounting & Finance',  path: null, color: 'sky' }
          ]
        },
        {
          label: 'Preliminary Exams',
          items: [
            { id: 'P',      name: 'Exam P-1',   path: 'Exam P-1 (SOA)', color: 'blue' },
            { id: 'FM',     name: 'Exam FM-2',   path: 'Exam FM-2 (SOA)', color: 'indigo' }
          ]
        },
        {
          label: 'Exams & Requirements',
          items: [
            { id: 'MAS-I',    name: 'Exam MAS-I',    path: 'Exam MAS-I (CAS)', color: 'violet' },
            { id: 'MAS-II',   name: 'Exam MAS-II',   path: 'Exam MAS-II (CAS)', color: 'violet' },
            { id: 'CAS-IA',   name: 'CAS DISC IA',   path: null, color: 'fuchsia' },
            { id: 'CAS-DA',   name: 'CAS DISC DA',   path: null, color: 'fuchsia' },
            { id: 'CAS-RM',   name: 'CAS DISC RM',   path: null, color: 'fuchsia' },
            { id: 'CAS-5',    name: 'Exam 5',        path: 'Exam 5 (CAS)', color: 'pink' },
            { id: 'CAS-PCPA', name: 'PCPA',           path: null, color: 'rose' },
            { id: 'CAS-6',    name: 'Exam 6',         path: 'Exam 6 (CAS)', color: 'orange' },
            { id: 'CAS-APC',  name: 'APC',            path: null, color: 'slate' }
          ]
        }
      ]
    },
    {
      key: 'FSA',
      name: 'FSA (SOA)',
      certPath: 'Exams/Certifications/Fellow of the Society of Actuaries (FSA)',
      sections: [
        {
          label: 'ASA Requirements',
          collapsed: true,
          items: [
            { id: 'VEE-MS',   name: 'VEE Mathematical Statistics', path: null, color: 'sky' },
            { id: 'VEE-ECON', name: 'VEE Economics',             path: null, color: 'sky' },
            { id: 'VEE-AF',   name: 'VEE Accounting & Finance',  path: null, color: 'sky' },
            { id: 'P',     name: 'Exam P-1',   path: 'Exam P-1 (SOA)', color: 'blue' },
            { id: 'FM',    name: 'Exam FM-2',   path: 'Exam FM-2 (SOA)', color: 'indigo' },
            { id: 'PAF',   name: 'PAF',        path: null, color: 'violet' },
            { id: 'FAM',   name: 'Exam FAM',   path: null, color: 'purple' },
            { id: 'SRM',   name: 'Exam SRM',   path: null, color: 'fuchsia' },
            { id: 'ASF',   name: 'ASF',        path: null, color: 'pink' },
            { id: 'PA',    name: 'Exam PA',     path: null, color: 'rose' },
            { id: 'ALTAM', name: 'Exam ALTAM',  path: null, or: 'ASTAM', color: 'red' },
            { id: 'ASTAM', name: 'Exam ASTAM',  path: null, or: 'ALTAM', color: 'red' },
            { id: 'ATPA', name: 'ATPA',        path: null, color: 'orange' },
            { id: 'FAP',  name: 'FAP',         path: null, color: 'amber' },
            { id: 'APC',  name: 'APC',         path: null, color: 'slate' }
          ]
        },
        {
          label: 'Required Courses',
          items: [
            { id: 'FSA-DMAC', name: 'DMAC', path: null, color: 'amber' },
            { id: 'FSA-FAC',  name: 'FAC',  path: null, color: 'slate' }
          ]
        },
        {
          label: 'Corporate Finance and ERM',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-CFE101', name: 'CFE 101', path: null, color: 'lime', seq: 'CFE' },
            { id: 'FSA-CFE201', name: 'CFE 201', path: null, color: 'lime', seq: 'CFE' }
          ]
        },
        {
          label: 'Group and Health Insurance',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-GH101', name: 'GH 101',     path: null, color: 'green', seq: 'GH' },
            { id: 'FSA-GH201', name: 'GH 201-U/C', path: null, color: 'green', seq: 'GH' },
            { id: 'FSA-GH301', name: 'GH 301',     path: null, color: 'green' }
          ]
        },
        {
          label: 'General Insurance',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-GI101', name: 'GI 101', path: null, color: 'emerald', seq: 'GI' },
            { id: 'FSA-GI201', name: 'GI 201', path: null, color: 'emerald', seq: 'GI' },
            { id: 'FSA-GI301', name: 'GI 301', path: null, color: 'emerald' },
            { id: 'FSA-GI302', name: 'GI 302', path: null, color: 'emerald' }
          ]
        },
        {
          label: 'Individual Life and Annuities',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-ILA101', name: 'ILA 101',     path: null, color: 'teal', seq: 'ILA' },
            { id: 'FSA-ILA201', name: 'ILA 201-U/I', path: null, color: 'teal', seq: 'ILA' }
          ]
        },
        {
          label: 'Investment',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-INV101', name: 'INV 101', path: null, color: 'cyan', seq: 'INV' },
            { id: 'FSA-INV201', name: 'INV 201', path: null, color: 'cyan', seq: 'INV' }
          ]
        },
        {
          label: 'Retirement Benefits',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-RET101', name: 'RET 101', path: null, color: 'yellow', seq: 'RET' },
            { id: 'FSA-RET201', name: 'RET 201', path: null, color: 'yellow', seq: 'RET' },
            { id: 'FSA-RET301', name: 'RET 301', path: null, color: 'yellow' }
          ]
        },
        {
          label: 'Cross Practice',
          elective: true,
          collapsed: true,
          items: [
            { id: 'FSA-CP311', name: 'CP 311', path: null, color: 'orange' },
            { id: 'FSA-CP312', name: 'CP 312', path: null, color: 'orange' },
            { id: 'FSA-CP321', name: 'CP 321', path: null, color: 'orange' },
            { id: 'FSA-CP341', name: 'CP 341', path: null, color: 'orange' },
            { id: 'FSA-CP351', name: 'CP 351', path: null, color: 'orange' }
          ]
        }
      ]
    },
    {
      key: 'FCAS',
      name: 'FCAS (CAS)',
      certPath: 'Exams/Certifications/Fellow of the Casualty Actuarial Society (FCAS)',
      sections: [
        {
          label: 'ACAS Requirements',
          collapsed: true,
          items: [
            { id: 'VEE-ECON', name: 'VEE Economics',             path: null, color: 'sky' },
            { id: 'VEE-AF',   name: 'VEE Accounting & Finance',  path: null, color: 'sky' },
            { id: 'P',      name: 'Exam P-1',     path: 'Exam P-1 (SOA)', color: 'blue' },
            { id: 'FM',     name: 'Exam FM-2',     path: 'Exam FM-2 (SOA)', color: 'indigo' },
            { id: 'MAS-I',  name: 'Exam MAS-I',    path: 'Exam MAS-I (CAS)', color: 'violet' },
            { id: 'MAS-II', name: 'Exam MAS-II',   path: 'Exam MAS-II (CAS)', color: 'violet' },
            { id: 'CAS-IA',   name: 'CAS DISC IA',   path: null, color: 'fuchsia' },
            { id: 'CAS-DA',   name: 'CAS DISC DA',   path: null, color: 'fuchsia' },
            { id: 'CAS-RM',   name: 'CAS DISC RM',   path: null, color: 'fuchsia' },
            { id: 'CAS-5',    name: 'Exam 5',         path: null, color: 'pink' },
            { id: 'CAS-PCPA', name: 'PCPA',           path: null, color: 'rose' },
            { id: 'CAS-6',    name: 'Exam 6',         path: null, color: 'orange' },
            { id: 'CAS-APC',  name: 'APC',            path: null, color: 'slate' }
          ]
        },
        {
          label: 'Fellowship Exams',
          items: [
            { id: 'CAS-7', name: 'Exam 7',   path: null, color: 'lime' },
            { id: 'CAS-8', name: 'Exam 8',   path: null, color: 'green' },
            { id: 'CAS-9', name: 'Exam 9',   path: null, color: 'emerald' }
          ]
        }
      ]
    }
  ];

  /* ---- Journey state management ---- */
  var journeyState = { selectedTrack: 'DEFAULT', progress: {} };

  function loadJourneyState() {
    try {
      var raw = localStorage.getItem(JOURNEY_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.selectedTrack) journeyState.selectedTrack = parsed.selectedTrack;
        if (parsed && parsed.progress) journeyState.progress = parsed.progress;
      }
    } catch (e) { /* ignore */ }
  }
  loadJourneyState();   // load early so _getExamInfoByPage returns correct status

  function saveJourneyState() {
    try { localStorage.setItem(JOURNEY_KEY, JSON.stringify(journeyState)); } catch (e) { /* ignore */ }
  }

  function getStatus(id) {
    return journeyState.progress[id] || 'not_started';
  }

  function cycleStatus(id) {
    var current = getStatus(id);
    journeyState.progress[id] = STATUS_CYCLE[current];
    saveJourneyState();
  }

  /* ---- Active tab state ---- */
  var activeTab = 'exams';
  function loadActiveTab() {
    try {
      activeTab = localStorage.getItem(TAB_KEY) || 'exams';
      if (activeTab !== 'exams') activeTab = 'exams';
    } catch (e) { /* ignore */ }
  }
  function saveActiveTab() {
    try { localStorage.setItem(TAB_KEY, activeTab); } catch (e) { /* ignore */ }
  }

  /* ---- Count helpers ---- */
  function getTrackCounts(track) {
    var total = 0;
    var done = 0;
    var orSeen = {};
    var electiveDone = 0;
    var hasElectives = false;

    track.sections.forEach(function (sec) {
      if (sec.elective) {
        hasElectives = true;
        sec.items.forEach(function (item) {
          if (getStatus(item.id) === 'completed') electiveDone++;
        });
        return;
      }
      if (sec.collapsed) {
        total++;
        var allDone = sec.items.every(function (item) {
          if (item.or) {
            return getStatus(item.id) === 'completed' || getStatus(item.or) === 'completed';
          }
          return getStatus(item.id) === 'completed';
        });
        if (allDone) done++;
        return;
      }
      sec.items.forEach(function (item) {
        if (item.or) {
          var pairKey = [item.id, item.or].sort().join('|');
          if (orSeen[pairKey]) return;
          orSeen[pairKey] = true;
          if (getStatus(item.id) === 'completed' || getStatus(item.or) === 'completed') done++;
          total++;
        } else {
          total++;
          if (getStatus(item.id) === 'completed') done++;
        }
      });
    });

    if (hasElectives) {
      total += 4;
      done += Math.min(electiveDone, 4);
    }

    return { total: total, done: done };
  }

  /* Build an array of { status, color } segments for the progress bar.
     Each segment represents one "unit" matching getTrackCounts logic. */
  function getTrackSegments(track) {
    var segments = [];
    var orSeen = {};
    var electiveItems = [];
    var hasElectives = false;

    track.sections.forEach(function (sec) {
      if (sec.elective) {
        hasElectives = true;
        sec.items.forEach(function (item) {
          electiveItems.push(item);
        });
        return;
      }
      if (sec.collapsed) {
        // Collapsed section = 1 unit; pick best status & first color
        var allDone = sec.items.every(function (item) {
          if (item.or) return getStatus(item.id) === 'completed' || getStatus(item.or) === 'completed';
          return getStatus(item.id) === 'completed';
        });
        var anyInProgress = sec.items.some(function (item) {
          return getStatus(item.id) === 'in_progress';
        });
        var bestColor = sec.items[0] ? sec.items[0].color : 'slate';
        // Find the in-progress item color if any
        if (anyInProgress && !allDone) {
          var ipItem = sec.items.find(function (item) { return getStatus(item.id) === 'in_progress'; });
          if (ipItem) bestColor = ipItem.color;
        }
        segments.push({
          status: allDone ? 'completed' : (anyInProgress ? 'in_progress' : 'not_started'),
          color: bestColor
        });
        return;
      }
      sec.items.forEach(function (item) {
        if (item.or) {
          var pairKey = [item.id, item.or].sort().join('|');
          if (orSeen[pairKey]) return;
          orSeen[pairKey] = true;
          var s1 = getStatus(item.id);
          var s2 = getStatus(item.or);
          var pairDone = s1 === 'completed' || s2 === 'completed';
          var pairInProgress = s1 === 'in_progress' || s2 === 'in_progress';
          var pairColor = item.color;
          if (pairInProgress && !pairDone) {
            pairColor = s1 === 'in_progress' ? item.color : item.color;
          }
          segments.push({
            status: pairDone ? 'completed' : (pairInProgress ? 'in_progress' : 'not_started'),
            color: pairColor
          });
        } else {
          var st = getStatus(item.id);
          segments.push({ status: st, color: item.color });
        }
      });
    });

    if (hasElectives) {
      // Sort elective items: completed first, then in_progress, then not_started
      var sortedElectives = electiveItems.slice().sort(function (a, b) {
        var order = { completed: 0, in_progress: 1, not_started: 2 };
        return (order[getStatus(a.id)] || 2) - (order[getStatus(b.id)] || 2);
      });
      for (var i = 0; i < 4; i++) {
        if (i < sortedElectives.length) {
          var elItem = sortedElectives[i];
          var elStatus = getStatus(elItem.id);
          segments.push({ status: elStatus, color: elItem.color });
        } else {
          segments.push({ status: 'not_started', color: 'slate' });
        }
      }
    }

    return segments;
  }

  /* ---- HTML escaping ---- */
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ============================================================
     VAULT CONTENT INDEX (for sidebar search)
     ============================================================ */
  var _vaultIndexCache = null;
  var _vaultIndexLoading = false;
  var _vaultIndexCallbacks = [];
  var _knownFileCategories = {};
  var _currentPagePaths = {};  // tracks items discovered from current page links
  var _navTreeObserver = null;
  var SESSION_INDEX_KEY = 'wiki-search-discovered';

  /** Watch for Obsidian's nav tree to load (it renders client-side and may
      not be in the DOM when buildBaseIndex first runs). When nav elements
      appear, invalidate the cached index so the next search picks them up. */
  function observeNavTree() {
    if (_navTreeObserver) return;
    var sidebar = document.querySelector('.site-body-left-column');
    if (!sidebar) return;

    _navTreeObserver = new MutationObserver(function () {
      var navEls = document.querySelectorAll(
        '.nav-file-title[data-path], .tree-item-self[data-path]'
      );
      if (navEls.length > 0) {
        _navTreeObserver.disconnect();
        _navTreeObserver = null;
        _vaultIndexCache = null;
        _vaultIndexLoading = false;
      }
    });

    _navTreeObserver.observe(sidebar, { childList: true, subtree: true });
  }

  /** Persist globally-discovered file paths across SPA navigations so that
      pages visited earlier contribute to the "Entire Wiki" index. */
  function saveDiscoveredFiles(index) {
    try {
      var files = [];
      for (var i = 0; i < index.length; i++) {
        if (index[i].source === 'global' && index[i].path) {
          files.push(index[i].path + '.md');
        }
      }
      if (files.length > 5) {
        sessionStorage.setItem(SESSION_INDEX_KEY, JSON.stringify(files));
      }
    } catch (e) {}
  }

  function loadDiscoveredFiles() {
    try {
      var json = sessionStorage.getItem(SESSION_INDEX_KEY);
      return json ? JSON.parse(json) : [];
    } catch (e) { return []; }
  }

  function getSiteFiles() {
    try {
      var sf = null;
      if (window.publish && window.publish.vault) {
        sf = window.publish.vault.fileMap || window.publish.vault.files;
      }
      if (!sf && window.app && window.app.vault) {
        sf = window.app.vault.fileMap || window.app.vault.files;
      }
      if (!sf && window.publish && window.publish.site) {
        sf = window.publish.site.cache || window.publish.site.files;
      }
      // Deep search: walk top-level properties of window.publish looking
      // for any object whose keys look like .md file paths
      if (!sf && window.publish) {
        var candidates = Object.keys(window.publish);
        for (var c = 0; c < candidates.length; c++) {
          var val = window.publish[candidates[c]];
          if (val && typeof val === 'object' && !Array.isArray(val)) {
            var vKeys = Object.keys(val);
            if (vKeys.length > 2 && vKeys.some(function (k) { return /\.md$/.test(k); })) {
              sf = val;
              break;
            }
          }
        }
      }
      return sf;
    } catch (e) { return null; }
  }

  function extractSiteId() {
    try {
      if (window.publish && window.publish.siteId) return window.publish.siteId;
      if (window.publish && window.publish.site && window.publish.site.id) return window.publish.site.id;
      // Check ALL script and link tags for obsidian.md references
      var allEls = document.querySelectorAll('link[href*="obsidian.md"], script[src*="obsidian.md"]');
      for (var i = 0; i < allEls.length; i++) {
        var attr = allEls[i].getAttribute('href') || allEls[i].getAttribute('src') || '';
        var m = attr.match(/obsidian\.md\/access\/([a-f0-9]+)/);
        if (m) return m[1];
      }
      var meta = document.querySelector('meta[name="publish-site-id"], meta[property="publish-site-id"]');
      if (meta) return meta.content;
      // Check inline script tags for embedded site config
      var scripts = document.querySelectorAll('script:not([src])');
      for (var j = 0; j < scripts.length; j++) {
        var txt = scripts[j].textContent || '';
        var idMatch = txt.match(/siteId['":\s]+['"]([a-f0-9]{20,})['"]/);
        if (idMatch) return idMatch[1];
      }
    } catch (e) {}
    return null;
  }

  function addToIndex(index, seen, name, path, category, color, source) {
    var key = name.toLowerCase();
    if (seen[key]) return;
    seen[key] = true;
    index.push({ name: name, path: path, category: category, color: color || null, source: source || 'global' });
  }

  function categorizeFile(filePath) {
    var baseName = filePath.replace(/\.md$/, '');
    var displayName = baseName;
    var category = null;  // null = skip unless matched

    if (filePath.indexOf('Concepts/') === 0) {
      category = 'concept';
      displayName = baseName.replace(/^Concepts\//, '');
    } else if (filePath.indexOf('Resources/') === 0) {
      category = 'document';
      displayName = baseName.replace(/^Resources\//, '');
    } else if (filePath.indexOf('Exams/') === 0) {
      category = 'exam';
      displayName = baseName.replace(/^Exams\//, '');
    } else {
      var lk = baseName.toLowerCase();
      if (lk.indexOf('exam ') === 0 || lk.indexOf('exam-') === 0) {
        category = 'exam';
      } else if (/\([^)]*\d{4}\)/.test(baseName) || lk.indexOf('books/') === 0) {
        category = 'document';
      } else if (baseName !== 'README' && baseName !== 'Home' && baseName !== 'publish') {
        category = 'concept';
      }
    }

    return { name: displayName, path: baseName, category: category };
  }

  /** Strip full URL to just the pathname portion (no leading slash). */
  function hrefToPath(href) {
    if (!href) return '';
    // Handle full URLs: https://wiki.actuarialnotes.com/Concepts/Foo
    try {
      if (href.indexOf('http') === 0) {
        var url = new URL(href);
        href = url.pathname;
      }
    } catch (e) {}
    // Strip leading slash and decode
    return decodeURIComponent(href.replace(/^\//, '')).replace(/\+/g, ' ');
  }

  function buildBaseIndex() {
    var index = [];
    var seen = {};
    var examPaths = {};

    // 1) Add all exam items from TRACKS (always available)
    TRACKS.forEach(function (track) {
      track.sections.forEach(function (sec) {
        sec.items.forEach(function (item) {
          addToIndex(index, seen, item.name, item.path || null, 'exam', item.color, 'global');
          if (item.path) examPaths[item.path.toLowerCase()] = true;
        });
      });
    });

    // 2) Scan Obsidian Publish navigation tree (multiple selector strategies)
    var navFound = 0;

    // Strategy A: elements with data-path attribute
    var navTreeItems = document.querySelectorAll('.nav-file-title[data-path], .tree-item-self[data-path]');
    for (var n = 0; n < navTreeItems.length; n++) {
      var navPath = navTreeItems[n].getAttribute('data-path');
      if (!navPath) continue;
      var navInfo = categorizeFile(navPath);
      if (!navInfo.category) continue;
      if (examPaths[navInfo.path.toLowerCase()]) continue;
      addToIndex(index, seen, navInfo.name, navInfo.path, navInfo.category, null, 'global');
      navFound++;
    }

    // Strategy B: walk folder/file hierarchy using .nav-folder containers
    var navFolders = document.querySelectorAll('.nav-folder');
    for (var f = 0; f < navFolders.length; f++) {
      var folderTitleEl = navFolders[f].querySelector(':scope > .nav-folder-title, :scope > .tree-item-self');
      var folderName = folderTitleEl ? (folderTitleEl.textContent || '').trim() : '';
      var fileEls = navFolders[f].querySelectorAll('.nav-file-title-content, .tree-item-inner');
      for (var g = 0; g < fileEls.length; g++) {
        if (fileEls[g].closest('.nav-folder') !== navFolders[f]) continue;
        var fileName = (fileEls[g].textContent || '').trim();
        if (!fileName) continue;
        var fullPath = folderName ? folderName + '/' + fileName : fileName;
        var fInfo = categorizeFile(fullPath);
        if (!fInfo.category) continue;
        if (examPaths[fInfo.path.toLowerCase()]) continue;
        addToIndex(index, seen, fInfo.name, fInfo.path, fInfo.category, null, 'global');
        navFound++;
      }
    }

    // Strategy C: tree-item based hierarchy (modern Obsidian Publish)
    if (navFound === 0) {
      var treeItems = document.querySelectorAll('.tree-item');
      for (var t = 0; t < treeItems.length; t++) {
        var selfEl = treeItems[t].querySelector(':scope > .tree-item-self');
        if (!selfEl) continue;
        // Check for data-path first
        var tPath = selfEl.getAttribute('data-path') || '';
        if (!tPath) {
          // Reconstruct path from hierarchy: walk up tree-item ancestors
          var parts = [];
          var innerEl = selfEl.querySelector('.tree-item-inner');
          if (innerEl) parts.unshift((innerEl.textContent || '').trim());
          var ancestor = treeItems[t].parentElement;
          while (ancestor) {
            var parentItem = ancestor.closest('.tree-item');
            if (!parentItem) break;
            var parentSelf = parentItem.querySelector(':scope > .tree-item-self');
            if (parentSelf) {
              var parentInner = parentSelf.querySelector('.tree-item-inner');
              if (parentInner) parts.unshift((parentInner.textContent || '').trim());
            }
            ancestor = parentItem.parentElement;
          }
          tPath = parts.filter(Boolean).join('/');
        }
        if (!tPath) continue;
        // Skip folder nodes (they have children)
        if (treeItems[t].querySelector('.tree-item-children .tree-item')) continue;
        var tInfo = categorizeFile(tPath);
        if (!tInfo.category) continue;
        if (examPaths[tInfo.path.toLowerCase()]) continue;
        addToIndex(index, seen, tInfo.name, tInfo.path, tInfo.category, null, 'global');
        navFound++;
      }
    }

    // Strategy D: scan all links in the sidebar nav area
    var sidebarLinks = document.querySelectorAll('.site-body-left-column a[href], .nav-view-outer a[href]');
    for (var s = 0; s < sidebarLinks.length; s++) {
      var sHref = sidebarLinks[s].getAttribute('href') || '';
      var sPath = hrefToPath(sHref);
      if (!sPath || sPath.indexOf('http') === 0) continue;
      var sInfo = categorizeFile(sPath);
      if (!sInfo.category) continue;
      if (examPaths[sInfo.path.toLowerCase()]) continue;
      addToIndex(index, seen, sInfo.name, sInfo.path, sInfo.category, null, 'global');
      navFound++;
    }

    // 3) Scan current page DOM for internal links (mark as 'page' source)
    var domLinks = document.querySelectorAll('a.internal-link[data-href]');
    for (var i = 0; i < domLinks.length; i++) {
      var linkEl = domLinks[i];
      var linkPath = hrefToPath(linkEl.getAttribute('href'));
      if (!linkPath) linkPath = linkEl.getAttribute('data-href') || '';
      if (!linkPath) continue;
      var info = categorizeFile(linkPath);
      var known = _knownFileCategories[info.name.toLowerCase()];
      if (known) info = known;
      if (!info.category) continue;
      if (examPaths[info.path.toLowerCase()]) continue;
      _currentPagePaths[info.name.toLowerCase()] = true;
      addToIndex(index, seen, info.name, info.path, info.category, null, 'page');
    }

    // 4) Add files from vault object (if available)
    var sf = getSiteFiles();
    if (sf) {
      var keys = Object.keys(sf);
      for (var j = 0; j < keys.length; j++) {
        var fileKey = keys[j];
        if (fileKey.charAt(0) === '.' || fileKey.indexOf('/.') !== -1) continue;
        if (fileKey === 'README.md' || fileKey === 'Home.md') continue;
        var fileInfo = categorizeFile(fileKey);
        if (!fileInfo.category) continue;
        if (examPaths[fileInfo.path.toLowerCase()]) continue;
        addToIndex(index, seen, fileInfo.name, fileInfo.path, fileInfo.category, null, 'global');

        // Try to extract [[wikilinks]] from content if available
        var entry = sf[fileKey];
        var md = typeof entry === 'string' ? entry :
                 (entry && (entry.content || entry.markdown || entry.data || ''));
        if (md && typeof md === 'string' && md.indexOf('[[') !== -1) {
          var wikiRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
          var match;
          while ((match = wikiRe.exec(md)) !== null) {
            var linkTarget = match[1].trim();
            var conceptName = linkTarget;
            var conceptPath = linkTarget;
            if (linkTarget.indexOf('Concepts/') === 0) {
              conceptName = linkTarget.replace(/^Concepts\//, '');
            } else {
              conceptPath = 'Concepts/' + linkTarget;
            }
            if (!examPaths[conceptPath.toLowerCase()]) {
              addToIndex(index, seen, conceptName, conceptPath, 'concept', null, 'global');
            }
          }
        }
      }
    }

    // 5) Load previously-discovered files from sessionStorage
    var prevFiles = loadDiscoveredFiles();
    for (var pf = 0; pf < prevFiles.length; pf++) {
      var pfPath = prevFiles[pf];
      if (!pfPath) continue;
      var pfInfo = categorizeFile(pfPath);
      if (!pfInfo.category) continue;
      if (examPaths[pfInfo.path.toLowerCase()]) continue;
      addToIndex(index, seen, pfInfo.name, pfInfo.path, pfInfo.category, null, 'global');
    }

    return { index: index, seen: seen, navFound: navFound };
  }

  /** Merge API/fetched files into the live cache */
  function mergeFilesIntoCache(files, examPaths) {
    var apiCategories = {};
    for (var k = 0; k < files.length; k++) {
      var fp = files[k];
      if (fp.charAt(0) === '.' || fp.indexOf('/.') !== -1) continue;
      if (fp === 'README.md' || fp === 'Home.md' || fp === 'publish.js' || fp === 'publish.css') continue;
      if (!fp.match(/\.md$/)) continue;
      var info = categorizeFile(fp);
      if (!info.category) continue;
      apiCategories[info.name.toLowerCase()] = info;
      _knownFileCategories[info.name.toLowerCase()] = info;
    }
    // Correct categories of existing entries
    for (var m = 0; m < _vaultIndexCache.length; m++) {
      var existing = _vaultIndexCache[m];
      var apiInfo = apiCategories[existing.name.toLowerCase()];
      if (apiInfo && apiInfo.category && existing.category !== 'exam') {
        existing.category = apiInfo.category;
        existing.path = apiInfo.path;
      }
    }
    // Add new entries
    var seen = {};
    _vaultIndexCache.forEach(function (item) { seen[item.name.toLowerCase()] = true; });
    for (var key in apiCategories) {
      var entry = apiCategories[key];
      if (examPaths[entry.path.toLowerCase()]) continue;
      addToIndex(_vaultIndexCache, seen, entry.name, entry.path, entry.category, null, 'global');
    }
  }

  /** Fetch homepage HTML and extract nav links to discover all wiki files */
  function fetchHomepageIndex(callback) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', window.location.origin + '/', true);
    xhr2.timeout = 8000;
    xhr2.onload = function () {
      try {
        if (xhr2.status === 200) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(xhr2.responseText, 'text/html');

          var examPaths = {};
          TRACKS.forEach(function (track) {
            track.sections.forEach(function (sec) {
              sec.items.forEach(function (item) {
                if (item.path) examPaths[item.path.toLowerCase()] = true;
              });
            });
          });

          // Scan data-path attributes from fetched page's nav tree
          var remotePaths = [];
          var remoteNavItems = doc.querySelectorAll('[data-path]');
          for (var r = 0; r < remoteNavItems.length; r++) {
            var rPath = remoteNavItems[r].getAttribute('data-path');
            if (rPath) remotePaths.push(rPath.replace(/\.md$/, '') + '.md');
          }

          // Scan internal links from fetched page
          var remoteLinks = doc.querySelectorAll('a[href]');
          for (var q = 0; q < remoteLinks.length; q++) {
            var rHref = remoteLinks[q].getAttribute('href') || '';
            if (rHref.indexOf('/') === 0 && rHref.length > 1) {
              var rFile = decodeURIComponent(rHref.replace(/^\//, '').replace(/\+/g, ' '));
              if (rFile && rFile.indexOf('.') === -1) {
                remotePaths.push(rFile + '.md');
              }
            } else if (rHref && rHref.indexOf('http') !== 0 && rHref.indexOf('#') !== 0 && rHref.indexOf('mailto') !== 0) {
              // Also catch relative links (without leading /)
              var rFile2 = decodeURIComponent(rHref.replace(/\+/g, ' '));
              if (rFile2 && rFile2.indexOf('.') === -1) {
                remotePaths.push(rFile2 + '.md');
              }
            }
          }

          // Also scan data-href attributes from internal links in fetched page
          var remoteInternalLinks = doc.querySelectorAll('a.internal-link[data-href]');
          for (var rl = 0; rl < remoteInternalLinks.length; rl++) {
            var rDataHref = remoteInternalLinks[rl].getAttribute('data-href') || '';
            if (rDataHref) {
              remotePaths.push(rDataHref.replace(/\.md$/, '') + '.md');
            }
          }

          // Walk tree-item hierarchy in fetched HTML
          var treeItems = doc.querySelectorAll('.tree-item');
          for (var ti = 0; ti < treeItems.length; ti++) {
            var tiSelf = treeItems[ti].querySelector(':scope > .tree-item-self');
            if (!tiSelf) continue;
            var tiPath = tiSelf.getAttribute('data-path');
            if (tiPath) {
              remotePaths.push(tiPath.replace(/\.md$/, '') + '.md');
              continue;
            }
            // Reconstruct path from hierarchy
            var tiParts = [];
            var tiInner = tiSelf.querySelector('.tree-item-inner');
            if (tiInner) tiParts.unshift((tiInner.textContent || '').trim());
            var tiAnc = treeItems[ti].parentElement;
            while (tiAnc) {
              var tiParent = tiAnc.closest('.tree-item');
              if (!tiParent) break;
              var tiParSelf = tiParent.querySelector(':scope > .tree-item-self');
              if (tiParSelf) {
                var tiParInner = tiParSelf.querySelector('.tree-item-inner');
                if (tiParInner) tiParts.unshift((tiParInner.textContent || '').trim());
              }
              tiAnc = tiParent.parentElement;
            }
            var tiJoined = tiParts.filter(Boolean).join('/');
            if (tiJoined && !treeItems[ti].querySelector('.tree-item-children .tree-item')) {
              remotePaths.push(tiJoined + '.md');
            }
          }

          if (remotePaths.length > 0) {
            mergeFilesIntoCache(remotePaths, examPaths);
          }
        }
      } catch (e) {}
      callback(_vaultIndexCache);
    };
    xhr2.onerror = xhr2.ontimeout = function () {
      callback(_vaultIndexCache);
    };
    xhr2.send();
  }

  /** Rescan the *live* DOM for nav-tree elements and internal links.
      This catches elements that weren't present at the initial 250ms mark. */
  function rescanLiveDOM(examPaths) {
    var found = [];
    var navItems = document.querySelectorAll(
      '.nav-file-title[data-path], .tree-item-self[data-path]'
    );
    for (var i = 0; i < navItems.length; i++) {
      var p = navItems[i].getAttribute('data-path');
      if (p) found.push(p.replace(/\.md$/, '') + '.md');
    }
    var allLinks = document.querySelectorAll(
      '.markdown-preview-view a.internal-link[data-href], ' +
      '.publish-renderer a.internal-link[data-href]'
    );
    for (var j = 0; j < allLinks.length; j++) {
      var href = allLinks[j].getAttribute('data-href') || '';
      if (href) found.push(href.replace(/\.md$/, '') + '.md');
    }
    if (found.length > 0) {
      mergeFilesIntoCache(found, examPaths);
    }
  }

  /** Extract internal links and wikilinks from a fetched HTML string. */
  function extractLinksFromHTML(html) {
    var paths = [];
    try {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      // data-href attributes on internal links
      var internalLinks = doc.querySelectorAll('a.internal-link[data-href]');
      for (var i = 0; i < internalLinks.length; i++) {
        var dh = internalLinks[i].getAttribute('data-href') || '';
        if (dh) paths.push(dh.replace(/\.md$/, '') + '.md');
      }
      // href-based links starting with /
      var allAnchors = doc.querySelectorAll('a[href]');
      for (var j = 0; j < allAnchors.length; j++) {
        var h = allAnchors[j].getAttribute('href') || '';
        if (h.indexOf('/') === 0 && h.length > 1) {
          var f = decodeURIComponent(h.replace(/^\//, '').replace(/\+/g, ' '));
          if (f && f.indexOf('.') === -1 && f.indexOf('http') !== 0) {
            paths.push(f + '.md');
          }
        }
      }
      // data-path attributes from nav tree elements
      var navEls = doc.querySelectorAll('[data-path]');
      for (var k = 0; k < navEls.length; k++) {
        var dp = navEls[k].getAttribute('data-path');
        if (dp) paths.push(dp.replace(/\.md$/, '') + '.md');
      }
    } catch (e) {}
    // Extract [[wikilinks]] from raw text
    if (html.indexOf('[[') !== -1) {
      var wikiRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      var m;
      while ((m = wikiRe.exec(html)) !== null) {
        var target = m[1].trim();
        if (target) paths.push(target.replace(/\.md$/, '') + '.md');
      }
    }
    return paths;
  }

  /** Try to extract file paths from the sitemap.xml (Obsidian Publish
      generates sitemaps for published sites). */
  function fetchSitemap(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.origin + '/sitemap.xml', true);
    xhr.timeout = 5000;
    xhr.onload = function () {
      var paths = [];
      try {
        if (xhr.status === 200 && xhr.responseText.indexOf('<url') !== -1) {
          var locRe = /<loc>([^<]+)<\/loc>/g;
          var lm;
          while ((lm = locRe.exec(xhr.responseText)) !== null) {
            var loc = lm[1].trim();
            try {
              var parsed = new URL(loc);
              var p = decodeURIComponent(parsed.pathname.replace(/^\//, '').replace(/\+/g, ' '));
              if (p) paths.push(p.replace(/\.md$/, '') + '.md');
            } catch (e2) {}
          }
        }
      } catch (e) {}
      callback(paths);
    };
    xhr.onerror = xhr.ontimeout = function () { callback([]); };
    xhr.send();
  }

  /** Search inline <script> tags and global objects for embedded file
      cache data (Obsidian Publish embeds site data in the page). */
  function extractEmbeddedFiles() {
    var paths = [];
    try {
      // Search inline scripts for JSON objects containing .md keys
      var scripts = document.querySelectorAll('script:not([src])');
      for (var i = 0; i < scripts.length; i++) {
        var txt = scripts[i].textContent || '';
        if (txt.length < 50) continue;
        // Look for file paths in JSON-like structures
        var mdRe = /["']([A-Za-z][A-Za-z0-9 \/\-()]*\.md)["']/g;
        var mm;
        while ((mm = mdRe.exec(txt)) !== null) {
          paths.push(mm[1]);
        }
      }
      // Also check for __PUBLISH_CACHE__ or similar globals
      var globals = ['__PUBLISH_CACHE__', '__OBSIDIAN__', '__NEXT_DATA__'];
      for (var g = 0; g < globals.length; g++) {
        var gval = window[globals[g]];
        if (gval && typeof gval === 'object') {
          var gkeys = Object.keys(gval);
          for (var gk = 0; gk < gkeys.length; gk++) {
            if (/\.md$/.test(gkeys[gk])) paths.push(gkeys[gk]);
          }
        }
      }
    } catch (e) {}
    return paths;
  }

  /** Crawl pages to discover links.  Fetches each URL, parses the HTML
      response for links/wikilinks, and merges results into the cache.
      Falls through multiple strategies to maximize discovery. */
  function discoverWikiFiles(examPaths, callback) {
    var allFound = [];
    var strategies = 3;  // sitemap + embedded + page-crawl

    function strategyDone() {
      strategies--;
      if (strategies <= 0) {
        if (allFound.length > 0) {
          mergeFilesIntoCache(allFound, examPaths);
        }
        callback();
      }
    }

    // Strategy 1: Sitemap
    fetchSitemap(function (sitemapPaths) {
      for (var i = 0; i < sitemapPaths.length; i++) allFound.push(sitemapPaths[i]);
      strategyDone();
    });

    // Strategy 2: Embedded script data
    var embedded = extractEmbeddedFiles();
    for (var e = 0; e < embedded.length; e++) allFound.push(embedded[e]);
    strategyDone();

    // Strategy 3: Crawl exam pages + homepage HTML
    var pagePaths = [''];  // start with homepage
    var pathSeen = {};
    TRACKS.forEach(function (track) {
      track.sections.forEach(function (sec) {
        sec.items.forEach(function (item) {
          if (item.path && !pathSeen[item.path]) {
            pathSeen[item.path] = true;
            pagePaths.push(item.path);
          }
        });
      });
    });

    var crawlPending = pagePaths.length;
    function crawlDone() {
      crawlPending--;
      if (crawlPending <= 0) strategyDone();
    }

    pagePaths.forEach(function (pagePath) {
      var url = window.location.origin + '/' + encodeURIComponent(pagePath).replace(/%20/g, '+');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.timeout = 8000;
      xhr.onload = function () {
        try {
          if (xhr.status === 200) {
            var links = extractLinksFromHTML(xhr.responseText);
            for (var i = 0; i < links.length; i++) allFound.push(links[i]);
          }
        } catch (e) {}
        crawlDone();
      };
      xhr.onerror = xhr.ontimeout = function () { crawlDone(); };
      xhr.send();
    });
  }

  function getVaultIndex(callback) {
    if (_vaultIndexCache) {
      if (callback) callback(_vaultIndexCache);
      return _vaultIndexCache;
    }

    var base = buildBaseIndex();
    _vaultIndexCache = base.index;

    // If the Obsidian nav tree wasn't in the DOM yet, watch for it
    if (base.navFound === 0) {
      observeNavTree();
    }

    if (_vaultIndexLoading) {
      if (callback) _vaultIndexCallbacks.push(callback);
      return _vaultIndexCache;
    }

    var examPaths = {};
    TRACKS.forEach(function (track) {
      track.sections.forEach(function (sec) {
        sec.items.forEach(function (item) {
          if (item.path) examPaths[item.path.toLowerCase()] = true;
        });
      });
    });

    function notifyCallbacks() {
      _vaultIndexLoading = false;
      saveDiscoveredFiles(_vaultIndexCache);
      var cbs = _vaultIndexCallbacks.slice();
      _vaultIndexCallbacks = [];
      cbs.forEach(function (cb) { cb(_vaultIndexCache); });
    }

    _vaultIndexLoading = true;
    if (callback) _vaultIndexCallbacks.push(callback);

    // Primary strategy: try Obsidian Publish API for full file listing
    var siteId = extractSiteId();
    if (siteId) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://publish-01.obsidian.md/cache/' + siteId, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = 5000;
      xhr.onload = function () {
        try {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var keys = Object.keys(data);
            if (keys.length > 0) {
              mergeFilesIntoCache(keys, examPaths);
              notifyCallbacks();
              return;
            }
          }
        } catch (e) {}
        // API returned nothing useful — try all other discovery methods
        discoverWikiFiles(examPaths, function () { notifyCallbacks(); });
      };
      xhr.onerror = xhr.ontimeout = function () {
        discoverWikiFiles(examPaths, function () { notifyCallbacks(); });
      };
      xhr.send(JSON.stringify({ id: siteId }));
    } else {
      // No siteId — discover wiki files via sitemap, embedded data, and crawling
      discoverWikiFiles(examPaths, function () { notifyCallbacks(); });
    }

    // Also schedule a delayed live-DOM rescan as additional fallback
    setTimeout(function () {
      rescanLiveDOM(examPaths);
      saveDiscoveredFiles(_vaultIndexCache);
    }, 1500);

    return _vaultIndexCache;
  }

  /* ============================================================
     SIDEBAR COLLAPSE HELPER
     ============================================================ */
  function closeSidebar() {
    // Click Obsidian's native sidebar toggle button to properly collapse
    var toggleBtn = document.querySelector(
      '.site-body-left-column-collapse-icon, ' +
      '.sidebar-toggle-button, ' +
      '[aria-label="Toggle left sidebar"]'
    );
    if (toggleBtn) { toggleBtn.click(); }
  }

  /**
   * Navigate via a synthetic internal-link placed inside the sidebar element.
   * Obsidian Publish auto-closes the mobile sidebar when an internal-link
   * inside the left column is clicked, so anchoring the link there lets the
   * framework handle the collapse natively — unlike _spaNavigate which
   * appends to document.body and bypasses that behaviour.
   */
  function sidebarNavigate(path) {
    if (!path) return;
    // Dismiss the mobile keyboard before navigating
    if (document.activeElement) { document.activeElement.blur(); }
    var slug = path.replace(/ /g, '+');
    var url = window.location.origin + '/' + slug;
    var a = document.createElement('a');
    a.className = 'internal-link';
    a.setAttribute('data-href', path);
    a.href = url;
    a.style.display = 'none';
    // Append inside the sidebar so Obsidian sees it as a sidebar-link click
    var sidebar = document.querySelector('.site-body-left-column');
    var parent = sidebar || document.body;
    parent.appendChild(a);
    a.click();
    parent.removeChild(a);
  }

  /* ============================================================
     DOM REFERENCES & BUILD
     ============================================================ */
  var containerEl = null;
  var panelEl = null;
  var barFillEl = null;
  var countEl = null;

  function buildSidebarTabs() {
    if (document.querySelector('.sidebar-tabs')) return;

    var sidebar = document.querySelector('.site-body-left-column');
    if (!sidebar) return;

    // Ensure sidebar has relative positioning for the absolute overlay
    if (getComputedStyle(sidebar).position === 'static') {
      sidebar.style.position = 'relative';
    }

    containerEl = document.createElement('div');
    containerEl.className = 'sidebar-tabs';

    /* ---- Tab bar ---- */
    var bar = document.createElement('div');
    bar.className = 'sidebar-tabs__bar';

    TABS.forEach(function (tab) {
      var btn = document.createElement('button');
      btn.className = 'sidebar-tabs__tab';
      btn.type = 'button';
      btn.dataset.tabId = tab.id;
      if (tab.id === activeTab) btn.classList.add('is-active');

      var iconSpan = document.createElement('span');
      iconSpan.className = 'sidebar-tabs__tab-icon';
      iconSpan.innerHTML = tab.icon;

      var labelSpan = document.createElement('span');
      labelSpan.className = 'sidebar-tabs__tab-label';
      labelSpan.textContent = tab.label;

      btn.appendChild(iconSpan);
      btn.appendChild(labelSpan);

      btn.addEventListener('click', function () {
        activeTab = tab.id;
        saveActiveTab();
        // Update active state on all tabs
        var allTabs = bar.querySelectorAll('.sidebar-tabs__tab');
        for (var i = 0; i < allTabs.length; i++) {
          allTabs[i].classList.toggle('is-active', allTabs[i].dataset.tabId === activeTab);
        }
        renderActivePanel();
        if (typeof SoundFX !== 'undefined' && SoundFX.click) SoundFX.click();
      });

      bar.appendChild(btn);
    });

    /* ---- Panel ---- */
    panelEl = document.createElement('div');
    panelEl.className = 'sidebar-tabs__panel';

    /* ---- Utility bar ---- */
    var utilBar = document.createElement('div');
    utilBar.className = 'sidebar-tabs__utility';

    // Dark / Light mode toggle
    var themeBtn = document.createElement('button');
    themeBtn.className = 'sidebar-tabs__utility-btn';
    themeBtn.type = 'button';
    var isLight = document.body.classList.contains('theme-light');
    themeBtn.title = isLight ? 'Switch to Dark' : 'Switch to Light';
    themeBtn.innerHTML = isLight ? SVG_SUN : SVG_MOON;
    themeBtn.addEventListener('click', function () {
      isLight = !isLight;
      document.body.classList.toggle('theme-light', isLight);
      document.body.classList.toggle('theme-dark', !isLight);
      themeBtn.innerHTML = isLight ? SVG_SUN : SVG_MOON;
      themeBtn.title = isLight ? 'Switch to Dark' : 'Switch to Light';
      try { localStorage.setItem('actuarial-notes-theme', isLight ? 'light' : 'dark'); } catch (e) {}
    });
    utilBar.appendChild(themeBtn);

    // Sound mute toggle
    var muteBtn = document.createElement('button');
    muteBtn.className = 'sidebar-tabs__utility-btn';
    muteBtn.type = 'button';
    muteBtn.title = 'Toggle Sound';
    var isMuted = false;
    try { isMuted = localStorage.getItem('actuarial-notes-muted') === '1'; } catch (e) {}
    muteBtn.innerHTML = isMuted ? SVG_SPEAKER_OFF : SVG_SPEAKER_ON;
    muteBtn.addEventListener('click', function () {
      if (typeof SoundFX !== 'undefined' && SoundFX.toggleMute) {
        SoundFX.toggleMute();
        isMuted = !isMuted;
        muteBtn.innerHTML = isMuted ? SVG_SPEAKER_OFF : SVG_SPEAKER_ON;
      }
    });
    utilBar.appendChild(muteBtn);

    containerEl.appendChild(bar);
    containerEl.appendChild(panelEl);
    containerEl.appendChild(utilBar);

    sidebar.appendChild(containerEl);

    renderActivePanel();
    initSidebarResize(sidebar);
  }

  /* ============================================================
     SIDEBAR RESIZE (desktop drag-to-resize)
     ============================================================ */
  function initSidebarResize(sidebar) {
    if (window.innerWidth <= 768) return;
    if (sidebar.querySelector('.sidebar-resize-handle')) return;

    var handle = document.createElement('div');
    handle.className = 'sidebar-resize-handle';
    sidebar.appendChild(handle);

    // Restore saved width
    var saved = localStorage.getItem('sidebar-width');
    if (saved) {
      var px = parseInt(saved, 10);
      if (px >= 200 && px <= 600) {
        sidebar.style.width = px + 'px';
        sidebar.style.minWidth = px + 'px';
        sidebar.style.maxWidth = px + 'px';
      }
    }

    var startX, startW;

    function onMouseMove(e) {
      var newW = startW + (e.clientX - startX);
      if (newW < 200) newW = 200;
      if (newW > 600) newW = 600;
      sidebar.style.width = newW + 'px';
      sidebar.style.minWidth = newW + 'px';
      sidebar.style.maxWidth = newW + 'px';
    }

    function onMouseUp(e) {
      document.body.classList.remove('sidebar-resizing');
      handle.classList.remove('is-active');
      var finalW = parseInt(sidebar.style.width, 10);
      if (finalW) localStorage.setItem('sidebar-width', finalW);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      startX = e.clientX;
      startW = sidebar.getBoundingClientRect().width;
      document.body.classList.add('sidebar-resizing');
      handle.classList.add('is-active');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  /* ============================================================
     PANEL RENDERING — dispatches to tab-specific renderers
     ============================================================ */
  function renderActivePanel() {
    if (!panelEl) return;
    panelEl.innerHTML = '';

    var content = document.createElement('div');
    content.className = 'sidebar-tabs__panel-content';

    switch (activeTab) {
      case 'exams':    renderExamsPanel(content);     break;
      case 'search':   renderSearchPanel(content);    break;
    }

    panelEl.appendChild(content);
  }

  /* ============================================================
     EXAMS TAB
     ============================================================ */
  function renderExamsPanel(container) {
    // Track selector + progress header
    var headerRow = document.createElement('div');
    headerRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;margin-top:10px';

    var titleRow = document.createElement('div');
    titleRow.className = 'sidebar-tabs__panel-header';
    var titleSpan = document.createElement('span');
    titleSpan.className = 'sidebar-tabs__panel-title';
    titleSpan.textContent = 'Certification Track';
    countEl = document.createElement('span');
    countEl.className = 'sidebar-tabs__panel-count';
    titleRow.appendChild(titleSpan);
    titleRow.appendChild(countEl);
    headerRow.appendChild(titleRow);
    container.appendChild(headerRow);

    // Track selector row (select + cert link button)
    var selectRow = document.createElement('div');
    selectRow.className = 'sidebar-tabs__select-row';

    var select = document.createElement('select');
    select.className = 'sidebar-tabs__select';
    TRACKS.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.key;
      opt.textContent = t.name;
      select.appendChild(opt);
    });
    select.value = journeyState.selectedTrack;
    selectRow.appendChild(select);

    // Certification page link button (uses same internal link approach as exam links)
    var certBtn = document.createElement('a');
    certBtn.className = 'sidebar-tabs__cert-btn';
    certBtn.title = 'View certification requirements';
    certBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
    certBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var track = TRACKS.find(function (t) { return t.key === journeyState.selectedTrack; });
      if (track && track.certPath) {
        sidebarNavigate(track.certPath);
      }
    }, true);
    selectRow.appendChild(certBtn);

    function updateCertBtn() {
      var track = TRACKS.find(function (t) { return t.key === journeyState.selectedTrack; });
      if (track && track.certPath) {
        var slug = track.certPath.replace(/ /g, '+');
        certBtn.href = '/' + slug;
        certBtn.style.display = '';
      } else {
        certBtn.removeAttribute('href');
        certBtn.style.display = 'none';
      }
    }
    updateCertBtn();

    container.appendChild(selectRow);

    // Progress bar (segmented)
    var bar = document.createElement('div');
    bar.className = 'sidebar-tabs__progress-bar';
    barFillEl = bar; // store reference to the bar container itself
    container.appendChild(bar);

    // Sections container
    var sectionsEl = document.createElement('div');
    sectionsEl.style.cssText = 'display:flex;flex-direction:column;gap:2px';
    container.appendChild(sectionsEl);

    function renderTrackSections() {
      sectionsEl.innerHTML = '';
      var track = TRACKS.find(function (t) { return t.key === journeyState.selectedTrack; });
      if (!track) return;

      track.sections.forEach(function (sec) {
        var section = document.createElement('div');
        section.className = 'sidebar-tabs__section';
        if (sec.collapsed) section.classList.add('is-collapsed');

        var sHeader = document.createElement('div');
        sHeader.className = 'sidebar-tabs__section-header';
        sHeader.innerHTML = SVG_CHEVRON;
        var sLabel = document.createElement('span');
        sLabel.textContent = sec.label;
        sHeader.appendChild(sLabel);
        sHeader.addEventListener('click', function () {
          section.classList.toggle('is-collapsed');
        });

        // FSA elective info note
        if (sec.elective) {
          var prevSections = track.sections.slice(0, track.sections.indexOf(sec));
          var isFirstElective = !prevSections.some(function (s) { return s.elective; });
          if (isFirstElective) {
            var infoNote = document.createElement('div');
            infoNote.className = 'exams-panel__info-note';
            infoNote.textContent = 'Pick a 101\u2013201 sequence + 2 others';
            sectionsEl.appendChild(infoNote);
          }
        }

        var itemsEl = document.createElement('div');
        itemsEl.className = 'exams-panel__items sidebar-tabs__section-items';

        sec.items.forEach(function (item, idx) {
          // "or" separator
          if (item.or && idx > 0) {
            var prevItem = sec.items[idx - 1];
            if (prevItem && prevItem.or === item.id) {
              var orDiv = document.createElement('div');
              orDiv.className = 'exams-panel__or';
              orDiv.textContent = 'or';
              itemsEl.appendChild(orDiv);
            }
          }

          var row = document.createElement('div');
          row.className = 'exams-panel__item';
          row.dataset.status = getStatus(item.id);
          row.dataset.itemId = item.id;
          if (item.color) row.dataset.examColor = item.color;

          var statusBtn = document.createElement('button');
          statusBtn.className = 'exams-panel__status';
          statusBtn.type = 'button';
          statusBtn.title = 'Click to change status';
          statusBtn.innerHTML = STATUS_ICONS[getStatus(item.id)];
          statusBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            cycleStatus(item.id);
            var newStatus = getStatus(item.id);
            row.dataset.status = newStatus;
            statusBtn.innerHTML = STATUS_ICONS[newStatus];
            updateExamsProgress();
            if (typeof SoundFX !== 'undefined') {
              if (newStatus === 'in_progress' && SoundFX.inProgress) SoundFX.inProgress();
              else if (newStatus === 'completed' && SoundFX.complete) SoundFX.complete();
              else if (SoundFX.click) SoundFX.click();
            }
          });

          var nameEl;
          if (item.path) {
            nameEl = document.createElement('a');
            nameEl.className = 'exams-panel__name';
            nameEl.href = '/' + item.path.replace(/ /g, '+');
            nameEl.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopImmediatePropagation();
              sidebarNavigate(item.path);
            }, true);
          } else {
            nameEl = document.createElement('span');
            nameEl.className = 'exams-panel__name';
          }
          nameEl.textContent = item.name;
          nameEl.title = item.name;

          row.appendChild(statusBtn);
          row.appendChild(nameEl);
          itemsEl.appendChild(row);
        });

        section.appendChild(sHeader);
        section.appendChild(itemsEl);
        sectionsEl.appendChild(section);
      });
    }

    select.addEventListener('change', function () {
      journeyState.selectedTrack = select.value;
      saveJourneyState();
      renderTrackSections();
      updateExamsProgress();
      updateCertBtn();
    });

    renderTrackSections();
    updateExamsProgress();
  }

  /* ============================================================
     SEARCH TAB
     ============================================================ */
  var CAT_ICONS = { exam: SVG_CAT_EXAM, concept: SVG_CAT_CONCEPT, document: SVG_CAT_DOC };
  var CAT_LABELS = { exam: 'Exams', concept: 'Concepts', document: 'Resources' };
  var CAT_ORDER = ['exam', 'concept', 'document'];
  var MAX_PER_CAT = 12;

  function highlightMatch(text, term) {
    if (!term) return esc(text);
    var lower = text.toLowerCase();
    var idx = lower.indexOf(term);
    if (idx === -1) return esc(text);
    return esc(text.substring(0, idx)) +
      '<mark>' + esc(text.substring(idx, idx + term.length)) + '</mark>' +
      esc(text.substring(idx + term.length));
  }

  function navigateToResult(path) {
    if (!path) return;
    window._spaNavigate(path);
  }

  /** Detect current exam page name for scope filtering */
  function getCurrentExamName() {
    var path = decodeURIComponent(window.location.pathname.replace(/^\//, '')).replace(/\+/g, ' ');
    if (!path) return null;
    // Match "Exam P-1 (SOA)" style pages
    if (/^exam\s/i.test(path)) return path;
    // Check if we're on an exam-related page (e.g. concept linked from exam)
    var container = document.querySelector('.markdown-preview-view[data-exam-page], [data-exam-page]');
    if (container) return container.getAttribute('data-exam-page');
    return null;
  }

  function renderSearchPanel(container) {
    // Scope filter (This Exam / Entire Wiki)
    var scopeRow = document.createElement('div');
    scopeRow.className = 'sidebar-tabs__search-scope';

    var scopeExam = document.createElement('button');
    scopeExam.className = 'sidebar-tabs__scope-btn is-active';
    scopeExam.type = 'button';
    scopeExam.textContent = 'This Page';
    scopeExam.dataset.scope = 'page';

    var scopeAll = document.createElement('button');
    scopeAll.className = 'sidebar-tabs__scope-btn';
    scopeAll.type = 'button';
    scopeAll.textContent = 'Entire Wiki';
    scopeAll.dataset.scope = 'all';

    scopeRow.appendChild(scopeExam);
    scopeRow.appendChild(scopeAll);
    container.appendChild(scopeRow);

    var activeScope = 'page';

    function setScope(scope) {
      activeScope = scope;
      scopeExam.classList.toggle('is-active', scope === 'page');
      scopeAll.classList.toggle('is-active', scope === 'all');
      performSearch(searchInput.value);
    }

    scopeExam.addEventListener('click', function () { setScope('page'); });
    scopeAll.addEventListener('click', function () { setScope('all'); });

    // Search input row
    var searchRow = document.createElement('div');
    searchRow.className = 'sidebar-tabs__search-row';
    searchRow.style.marginTop = '6px';

    var searchIcon = document.createElement('span');
    searchIcon.className = 'sidebar-tabs__search-icon';
    searchIcon.innerHTML = SVG_SEARCH;
    searchRow.appendChild(searchIcon);

    var searchInput = document.createElement('input');
    searchInput.className = 'sidebar-tabs__search-input';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search exams, concepts\u2026';
    searchRow.appendChild(searchInput);

    var searchClear = document.createElement('button');
    searchClear.className = 'sidebar-tabs__search-clear';
    searchClear.type = 'button';
    searchClear.title = 'Clear search';
    searchClear.innerHTML = SVG_CLEAR;
    searchRow.appendChild(searchClear);

    container.appendChild(searchRow);

    // Results container (inline, not a dropdown)
    var resultsEl = document.createElement('div');
    resultsEl.className = 'sidebar-tabs__search-results';
    container.appendChild(resultsEl);

    var selectedIdx = -1;
    var resultEls = [];

    // Empty state (shown when no query)
    var emptyState = document.createElement('div');
    emptyState.className = 'sidebar-tabs__search-hint';
    emptyState.innerHTML = '<span class="sidebar-tabs__search-hint-icon">' + SVG_SEARCH + '</span>' +
      '<span>Search across all exams, concepts, and documents</span>';
    resultsEl.appendChild(emptyState);

    function updateSelected() {
      for (var i = 0; i < resultEls.length; i++) {
        resultEls[i].classList.toggle('is-selected', i === selectedIdx);
      }
      if (selectedIdx >= 0 && resultEls[selectedIdx]) {
        resultEls[selectedIdx].scrollIntoView({ block: 'nearest' });
      }
    }

    function performSearch(query) {
      var term = query.trim().toLowerCase();
      resultEls = [];
      selectedIdx = -1;

      if (!term) {
        resultsEl.innerHTML = '';
        resultsEl.appendChild(emptyState);
        searchClear.classList.remove('is-visible');
        return;
      }

      searchClear.classList.add('is-visible');

      // Get index synchronously (returns what's available now)
      var allItems = getVaultIndex(function (updatedItems) {
        // Re-render with updated index if query still matches
        if (searchInput.value.trim().toLowerCase() === term) {
          renderResults(updatedItems, term);
        }
      });
      renderResults(allItems, term);
    }

    function renderResults(allItems, term) {
      resultEls = [];
      selectedIdx = -1;

      var grouped = {};
      CAT_ORDER.forEach(function (c) { grouped[c] = []; });

      for (var i = 0; i < allItems.length; i++) {
        var item = allItems[i];
        // Scope filter: in 'page' mode, only show items from current page links
        if (activeScope === 'page' && item.source !== 'page' && item.category !== 'exam') {
          // Also check _currentPagePaths in case the item was added globally but exists on this page
          if (!_currentPagePaths[item.name.toLowerCase()]) continue;
        }
        if (item.name.toLowerCase().indexOf(term) !== -1) {
          var cat = item.category;
          if (!cat) continue;
          if (grouped[cat] && grouped[cat].length < MAX_PER_CAT) {
            grouped[cat].push(item);
          }
        }
      }

      var totalResults = 0;
      CAT_ORDER.forEach(function (c) { totalResults += grouped[c].length; });

      resultsEl.innerHTML = '';

      if (totalResults === 0) {
        var noResults = document.createElement('div');
        noResults.className = 'sidebar-tabs__search-empty';
        noResults.textContent = activeScope === 'page'
          ? 'No results on this page. Try "Entire Wiki".'
          : 'No results found';
        resultsEl.appendChild(noResults);
        return;
      }

      CAT_ORDER.forEach(function (cat) {
        var items = grouped[cat];
        if (!items.length) return;

        var group = document.createElement('div');
        group.className = 'sidebar-tabs__search-group';

        var label = document.createElement('div');
        label.className = 'sidebar-tabs__search-group-label';
        label.textContent = CAT_LABELS[cat];
        group.appendChild(label);

        items.forEach(function (item) {
          var result = document.createElement('a');
          result.className = 'sidebar-tabs__search-result';
          result.dataset.category = cat;
          if (item.path) {
            result.href = '/' + item.path.replace(/ /g, '+');
          }

          var iconEl = document.createElement('span');
          iconEl.className = 'sidebar-tabs__search-result-icon';
          iconEl.innerHTML = CAT_ICONS[cat] || CAT_ICONS.document;
          result.appendChild(iconEl);

          var nameEl = document.createElement('span');
          nameEl.className = 'sidebar-tabs__search-result-name';
          nameEl.innerHTML = highlightMatch(item.name, term);
          result.appendChild(nameEl);

          result.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var isMobile = window.innerWidth <= 768;
            // Open concepts in the split-pane on desktop; on mobile navigate directly
            if (!isMobile && cat === 'concept' && item.path && typeof window._openConceptPopup === 'function') {
              var conceptPath = item.path.match(/^Concepts\//i) ? item.path : 'Concepts/' + item.path;
              window._openConceptPopup(conceptPath);
              closeSidebar();
            } else {
              // Navigate via a link inside the sidebar so Obsidian's
              // framework auto-closes the mobile sidebar.
              sidebarNavigate(item.path);
            }
          }, true);

          result.addEventListener('mouseenter', function () {
            selectedIdx = resultEls.indexOf(result);
            updateSelected();
          });

          group.appendChild(result);
          resultEls.push(result);
        });

        resultsEl.appendChild(group);
      });
    }

    searchInput.addEventListener('input', function () {
      performSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', function (e) {
      if (!resultEls.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = Math.min(selectedIdx + 1, resultEls.length - 1);
        updateSelected();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = Math.max(selectedIdx - 1, 0);
        updateSelected();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIdx >= 0 && resultEls[selectedIdx]) {
          resultEls[selectedIdx].click();
        }
      }
    });

    searchClear.addEventListener('click', function () {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });

    // Auto-focus the search input when tab opens
    setTimeout(function () { searchInput.focus(); }, 50);
  }

  function updateExamsProgress() {
    var track = TRACKS.find(function (t) { return t.key === journeyState.selectedTrack; });
    if (!track) return;

    var counts = getTrackCounts(track);
    if (countEl) countEl.textContent = counts.done + ' / ' + counts.total;

    // Rebuild segmented progress bar
    if (barFillEl) {
      barFillEl.innerHTML = '';
      var segments = getTrackSegments(track);
      segments.forEach(function (seg) {
        var segEl = document.createElement('div');
        segEl.className = 'sidebar-tabs__progress-seg';
        if (seg.status === 'completed') {
          segEl.classList.add('is-completed');
        } else if (seg.status === 'in_progress') {
          segEl.classList.add('is-in-progress');
          segEl.style.setProperty('--seg-color', COLOR_HEX[seg.color] || 'var(--brand)');
        }
        barFillEl.appendChild(segEl);
      });
    }

    updatePersistentExamNavs();
    updateExamLinkButtons();
    syncStickyExamNavStatus();
  }

  /* ---- Colour in-progress exam-link buttons on the home page ---- */
  function updateExamLinkButtons() {
    var links = document.querySelectorAll('.exam-link');
    if (!links.length) return;

    /* Build path → { status, color } lookup from all tracks */
    var pathMap = {};
    TRACKS.forEach(function (track) {
      track.sections.forEach(function (sec) {
        sec.items.forEach(function (item) {
          if (item.path) {
            var key = item.path.toLowerCase();
            if (!pathMap[key]) {
              pathMap[key] = { status: getStatus(item.id), color: item.color };
            }
          }
        });
      });
    });

    links.forEach(function (link) {
      var href = decodeURIComponent(link.getAttribute('href') || '')
        .replace(/\+/g, ' ')
        .replace(/^\//, '');
      var info = pathMap[href.toLowerCase()] || null;
      var status = info ? info.status : 'not_started';

      /* In-progress: accent colour + glow */
      if (status === 'in_progress') {
        link.classList.add('is-in-progress');
        link.classList.remove('is-completed');
        link.style.setProperty('--link-accent', COLOR_HEX[info.color] || 'var(--brand)');
      /* Completed: dimmed + checkmark badge */
      } else if (status === 'completed') {
        link.classList.remove('is-in-progress');
        link.classList.add('is-completed');
        link.style.removeProperty('--link-accent');
      /* Not started: default look */
      } else {
        link.classList.remove('is-in-progress');
        link.classList.remove('is-completed');
        link.style.removeProperty('--link-accent');
      }
    });
  }

  /* ============================================================
     PERSISTENT EXAM NAV TABS (right side of viewport)
     Kept from original code — shows in-progress exams
     ============================================================ */
  function getInProgressExams() {
    var seen = {};
    var result = [];
    TRACKS.forEach(function (track) {
      track.sections.forEach(function (sec) {
        sec.items.forEach(function (item) {
          if (!seen[item.id] && getStatus(item.id) === 'in_progress') {
            seen[item.id] = true;
            result.push({ id: item.id, name: item.name, path: item.path, color: item.color });
          }
        });
      });
    });
    return result;
  }

  function syncStickyExamNavStatus() {
    var sticky = document.querySelector('.exam-nav__sticky');
    if (!sticky) return;
    var info = window._getExamInfoByPage ? window._getExamInfoByPage() : null;
    if (info && info.status === 'in_progress') {
      sticky.classList.add('is-in-progress');
    } else {
      sticky.classList.remove('is-in-progress');
    }
  }

  function isOnExamPage(examPath) {
    if (!examPath) return false;
    var currentPath = decodeURIComponent(window.location.pathname.replace(/^\//, '').replace(/\+/g, ' '));
    return currentPath === examPath || currentPath === examPath.replace(/ /g, '+');
  }

  function updatePersistentExamNavs() {
    var navContainer = document.querySelector('.persistent-exam-navs');
    var inProgress = getInProgressExams();

    var filtered = inProgress.filter(function (exam) { return !isOnExamPage(exam.path); });

    var realStickyName = '';
    var realSticky = document.querySelector('.exam-nav__sticky.is-visible');
    if (realSticky) {
      var btn = realSticky.querySelector('.exam-nav__sticky-btn span');
      if (btn) realStickyName = btn.textContent.trim();
    }
    if (realStickyName) {
      filtered = filtered.filter(function (exam) { return exam.name !== realStickyName; });
    }

    if (filtered.length === 0) {
      if (navContainer) navContainer.remove();
      return;
    }

    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.className = 'persistent-exam-navs';
      document.body.appendChild(navContainer);
    }

    var currentIds = filtered.map(function (e) { return e.id; }).join(',');
    if (navContainer.dataset.examIds === currentIds) return;
    navContainer.dataset.examIds = currentIds;
    navContainer.innerHTML = '';

    var isStacked = filtered.length >= 2;
    if (isStacked) navContainer.classList.add('is-stacked');
    else navContainer.classList.remove('is-stacked');

    filtered.forEach(function (exam, idx) {
      var tab = document.createElement('a');
      tab.className = 'persistent-exam-tab';
      tab.dataset.examId = exam.id;
      if (exam.path) {
        tab.href = '/' + exam.path.replace(/ /g, '+');
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          window._spaNavigate(exam.path);
        }, true);
      } else {
        tab.href = '#';
        tab.addEventListener('click', function (e) { e.preventDefault(); });
      }
      tab.style.setProperty('--tab-color', COLOR_HEX[exam.color] || 'var(--brand)');
      if (isStacked) tab.style.zIndex = String(filtered.length - idx);
      tab.innerHTML = '<span class="persistent-exam-tab__name">' + esc(exam.name) + '</span>';
      navContainer.appendChild(tab);
    });

    if (isStacked) {
      navContainer.addEventListener('click', function (e) {
        if (!navContainer.classList.contains('is-expanded')) {
          e.preventDefault();
          e.stopPropagation();
          navContainer.classList.add('is-expanded');
        }
      }, true);
    }

    if (typeof window._syncPersistentOffset === 'function') {
      setTimeout(window._syncPersistentOffset, 50);
    }

    // Align tabs to the right edge of the page content area
    alignPersistentNavsToContent();

    if (!window._persistentNavCloseRegistered) {
      window._persistentNavCloseRegistered = true;
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.persistent-exam-navs')) {
          var c = document.querySelector('.persistent-exam-navs');
          if (c) c.classList.remove('is-expanded');
        }
      });
      window.addEventListener('resize', alignPersistentNavsToContent);
    }
  }

  window._getContentRightOffset = function () {
    // The readable content is constrained to 900px max-width inside
    // .markdown-preview-view; find the actual right edge of that content.
    var el = document.querySelector(
      '.markdown-preview-view > h1, .markdown-preview-view > p'
    );
    if (el) {
      var r = el.getBoundingClientRect();
      return Math.max(window.innerWidth - r.right, 16);
    }
    // Fallback: use center column
    var col = document.querySelector('.site-body-center-column');
    if (col) {
      var colRect = col.getBoundingClientRect();
      return Math.max(window.innerWidth - colRect.right, 16);
    }
    return 16;
  };

  function alignPersistentNavsToContent() {
    var nav = document.querySelector('.persistent-exam-navs');
    if (!nav) return;
    nav.style.right = window._getContentRightOffset() + 'px';
  }

  /* ============================================================
     REFRESH — allows other IIFEs to trigger re-renders
     ============================================================ */
  function refreshTab(tabId) {
    if (tabId && tabId !== activeTab) return;
    renderActivePanel();
  }

  /* ============================================================
     INIT & SPA SURVIVAL
     ============================================================ */
  function init() {
    loadJourneyState();
    loadActiveTab();
    buildSidebarTabs();
    setTimeout(updatePersistentExamNavs, 300);
    setTimeout(updateExamLinkButtons, 350);
  }

  // Expose API for cross-IIFE access
  window._updatePersistentExamNavs = updatePersistentExamNavs;
  window._updateExamLinkButtons = updateExamLinkButtons;
  window._sidebarTabs = { refresh: refreshTab };

  // Allow exam-nav IIFE to check current page exam status
  window._getExamInfoByPage = function () {
    var currentPath = decodeURIComponent(window.location.pathname.replace(/^\//, '').replace(/\+/g, ' '));
    for (var t = 0; t < TRACKS.length; t++) {
      for (var s = 0; s < TRACKS[t].sections.length; s++) {
        var items = TRACKS[t].sections[s].items;
        for (var i = 0; i < items.length; i++) {
          if (items[i].path && (currentPath === items[i].path || currentPath === items[i].path.replace(/ /g, '+'))) {
            return { id: items[i].id, status: getStatus(items[i].id), color: COLOR_HEX[items[i].color] || null };
          }
        }
      }
    }
    return null;
  };

  // Re-check persistent navs on SPA navigation + invalidate search cache
  window.addEventListener('popstate', function () {
    _vaultIndexCache = null;
    _vaultIndexLoading = false;
    _currentPagePaths = {};
    setTimeout(updatePersistentExamNavs, 250);
    setTimeout(updateExamLinkButtons, 300);
  });
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
    if (link) {
      _vaultIndexCache = null;
      _vaultIndexLoading = false;
      _currentPagePaths = {};
      setTimeout(updatePersistentExamNavs, 300);
      setTimeout(updatePersistentExamNavs, 600);
      setTimeout(updateExamLinkButtons, 350);
      setTimeout(updateExamLinkButtons, 650);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 250); });
  } else {
    setTimeout(init, 250);
  }

  // Re-inject if sidebar re-renders (SPA navigation).
  // Instead of rebuilding from scratch (which causes a visible flicker),
  // preserve the existing sidebar-tabs element and re-append it.
  var _detachedSidebar = null;

  var stObserver = new MutationObserver(function () {
    var sidebar = document.querySelector('.site-body-left-column');
    if (!sidebar) return;

    if (!document.querySelector('.sidebar-tabs')) {
      if (_detachedSidebar && _detachedSidebar.parentNode !== sidebar) {
        // Re-attach the preserved sidebar instead of rebuilding
        sidebar.appendChild(_detachedSidebar);
        containerEl = _detachedSidebar;
        panelEl = containerEl.querySelector('.sidebar-tabs__panel');
        barFillEl = containerEl.querySelector('.sidebar-tabs__progress-fill');
        countEl = containerEl.querySelector('.sidebar-tabs__progress-count');
      } else {
        // First time or element was truly lost — build fresh
        containerEl = null;
        panelEl = null;
        barFillEl = null;
        countEl = null;
        buildSidebarTabs();
        _detachedSidebar = containerEl;
      }
    }
  });

  // Also keep a reference whenever we successfully build the sidebar
  var _origBuildSidebarTabs = buildSidebarTabs;
  buildSidebarTabs = function () {
    _origBuildSidebarTabs();
    if (containerEl) _detachedSidebar = containerEl;
  };

  // Before Obsidian wipes the left column, detach our sidebar to preserve it
  var preNavObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      for (var j = 0; j < mutations[i].removedNodes.length; j++) {
        var removed = mutations[i].removedNodes[j];
        if (removed === _detachedSidebar ||
            (removed.nodeType === 1 && removed.querySelector && removed.querySelector('.sidebar-tabs'))) {
          // Obsidian is removing our sidebar — detach and preserve it
          if (containerEl && containerEl.parentNode) {
            _detachedSidebar = containerEl;
          }
        }
      }
    }
  });

  function observeSidebar() {
    var target = document.querySelector('.site-body-left-column');
    if (target) {
      stObserver.observe(target, { childList: true, subtree: true });
      preNavObserver.observe(target, { childList: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(observeSidebar, 350); });
  } else {
    setTimeout(observeSidebar, 350);
  }

})();


/* ===========================================================
   SOUND EFFECTS ENGINE
   Synthesises short, satisfying video-game sounds via the
   Web Audio API.  No external audio files required.
   =========================================================== */

var SoundFX = (function () {
  'use strict';

  var MUTE_KEY = 'actuarial-notes-muted';
  var ctx = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      watchState(ctx);
    }
    return ctx;
  }

  // Play a near-inaudible tone to (re-)activate the iOS audio session.
  // IMPORTANT: iOS requires *actual non-zero audio output* to activate
  // the session — a silent (all-zeros) buffer is not enough.  We use a
  // very short, very quiet oscillator pulse that is effectively inaudible
  // but satisfies the iOS audio-session activation requirement.
  function playSilent(ac) {
    try {
      var osc = ac.createOscillator();
      var gain = ac.createGain();
      gain.gain.value = 0.001;          // ~-60dB, inaudible
      osc.frequency.value = 200;
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(0);
      osc.stop(ac.currentTime + 0.01);  // 10ms pulse
    } catch (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[SoundFX] playSilent failed:', e.message, 'state:', ac.state);
      }
    }
  }

  // Mobile browsers keep AudioContext suspended until a user gesture handler
  // calls resume(). Re-run on every gesture in case of re-suspension (tab
  // switches, lock-screen, etc.).
  function unlockAudio() {
    var ac = getCtx();
    if (ac.state === 'running') {
      playSilent(ac);
    } else {
      ac.resume().then(function () {
        playSilent(ac);
      }).catch(function () {});
    }
  }
  document.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });
  document.addEventListener('touchend', unlockAudio, { capture: true, passive: true });
  document.addEventListener('click', unlockAudio, true);

  // Auto-resume if iOS re-suspends the context (e.g. after tab switch,
  // lock-screen, or interruption from a phone call).
  function watchState(ac) {
    if (ac.addEventListener) {
      ac.addEventListener('statechange', function () {
        if (ac.state === 'suspended' || ac.state === 'interrupted') {
          ac.resume().catch(function () {});
        }
      });
    }
  }

  // Ensure AudioContext is running before scheduling audio.
  // On iOS Safari the context starts suspended; resume() must be called
  // from a user-gesture handler.  If the context is already running
  // (typical after the first interaction), we play immediately.
  // Otherwise we resume and schedule in the .then() callback — this is
  // fine because the unlockAudio() touchstart handler has already called
  // resume() in the gesture context, so the .then() just waits for it
  // to finish.
  function ensureRunning(cb) {
    var ac = getCtx();
    if (ac.state === 'running') {
      cb(ac);
    } else {
      ac.resume().then(function () {
        playSilent(ac);
        cb(ac);
      }).catch(function () {});
    }
  }

  function isMuted() {
    try { return localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { return false; }
  }

  function setMuted(m) {
    try { localStorage.setItem(MUTE_KEY, m ? '1' : '0'); } catch (e) {}
  }

  function toggleMute() {
    var m = !isMuted();
    setMuted(m);
    return m;
  }

  // Soft mouse click — single short noise burst
  // Pre-generate the click buffer once so every click sounds identical
  var _clickBuf = null;
  function getClickBuf(ac) {
    if (_clickBuf && _clickBuf.sampleRate === ac.sampleRate) return _clickBuf;
    var len = 0.012;
    var buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * len), ac.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    _clickBuf = buf;
    return buf;
  }

  function playClick() {
    if (isMuted()) return;
    ensureRunning(function (ac) {
      var t = ac.currentTime;

      var len = 0.012;
      var src = ac.createBufferSource();
      src.buffer = getClickBuf(ac);

      var filt = ac.createBiquadFilter();
      filt.type = 'bandpass';
      filt.frequency.value = 3500;
      filt.Q.value = 1.2;

      var gain = ac.createGain();
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + len);

      src.connect(filt);
      filt.connect(gain);
      gain.connect(ac.destination);
      src.start(t);
    });
  }

  // In-progress — single upward sweep tone (activating)
  function playInProgress() {
    if (isMuted()) return;
    ensureRunning(function (ac) {
      var t = ac.currentTime;
      var dur = 0.18;

      var osc = ac.createOscillator();
      var gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(262, t);
      osc.frequency.exponentialRampToValueAtTime(392, t + dur * 0.8);
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + dur + 0.01);
    });
  }

  // Complete — ascending major triad chime (achievement)
  function playComplete() {
    if (isMuted()) return;
    ensureRunning(function (ac) {
      var t = ac.currentTime;

      var notes = [523, 659, 784]; // C5, E5, G5
      var spacing = 0.07;

      for (var i = 0; i < notes.length; i++) {
        (function (freq, idx) {
          var start = t + idx * spacing;
          var osc = ac.createOscillator();
          var gain = ac.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.0, start);
          gain.gain.linearRampToValueAtTime(0.08, start + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
          osc.connect(gain);
          gain.connect(ac.destination);
          osc.start(start);
          osc.stop(start + 0.16);
        })(notes[i], i);
      }
    });
  }

  // Dropdown open — quick ascending two-note chime (discovery / reveal)
  // Rising major third: C5 → E5, bright and pleasant
  function playDropdownOpen() {
    if (isMuted()) return;
    ensureRunning(function (ac) {
      var t = ac.currentTime;

      var notes = [523, 659]; // C5, E5 — rising major third
      var spacing = 0.06;

      for (var i = 0; i < notes.length; i++) {
        (function (freq, idx) {
          var start = t + idx * spacing;
          var osc = ac.createOscillator();
          var gain = ac.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.0, start);
          gain.gain.linearRampToValueAtTime(0.07, start + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);
          osc.connect(gain);
          gain.connect(ac.destination);
          osc.start(start);
          osc.stop(start + 0.09);
        })(notes[i], i);
      }
    });
  }

  // Callout open — soft woosh / unfolding sound
  // Filtered noise with a bandpass sweep from low to high
  function playCalloutOpen() {
    if (isMuted()) return;
    ensureRunning(function (ac) {
      var t = ac.currentTime;
      var dur = 0.25;

      // White noise source
      var len = dur + 0.1;
      var samples = Math.ceil(ac.sampleRate * len);
      var buf = ac.createBuffer(1, samples, ac.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < samples; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      var src = ac.createBufferSource();
      src.buffer = buf;

      // Bandpass filter sweeps upward — creates the woosh
      var filt = ac.createBiquadFilter();
      filt.type = 'bandpass';
      filt.Q.value = 0.8;
      filt.frequency.setValueAtTime(300, t);
      filt.frequency.exponentialRampToValueAtTime(3000, t + dur * 0.7);
      filt.frequency.exponentialRampToValueAtTime(2000, t + dur);

      // Volume envelope — quick swell then fade
      var gain = ac.createGain();
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.04, t + dur * 0.25);
      gain.gain.linearRampToValueAtTime(0.03, t + dur * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      src.connect(filt);
      filt.connect(gain);
      gain.connect(ac.destination);
      src.start(t);
      src.stop(t + dur + 0.05);
    });
  }

  return {
    click: playClick,
    dropdownOpen: playDropdownOpen,
    calloutOpen: playCalloutOpen,
    inProgress: playInProgress,
    complete: playComplete,
    isMuted: isMuted,
    toggleMute: toggleMute,
    _dbg: function () { return ctx ? ctx.state : 'no-ctx'; }
  };
})();


/* ===========================================================
   SOUND EFFECT HOOKS
   Plays SoundFX.click() on interactive element clicks and
   SoundFX.calloutOpen() when a callout expands.
   =========================================================== */

(function () {
  'use strict';

  // Dropdown triggers — get the tonal triple-tap sound
  var DROPDOWN = '.dl-dropdown__trigger, ' +
    'button.exam-nav__collapse-arrow, .exam-nav__lo-obj-btn, ' +
    'button.concept-nav__arrow-btn, .concept-nav__current--expandable, .concept-nav__obj-btn, ' +
    '.exam-nav__dropdown > .exam-nav__btn';

  // Debounce flag — prevents double-firing when nested elements both match
  // and prevents touchend + click from firing the same sound twice.
  var _sfxLock = false;

  function triggerSfx(e) {
    if (_sfxLock) return;
    var el = e.target;
    if (!el.closest) return;

    // Check dropdown triggers first (tonal triple-tap)
    if (el.closest(DROPDOWN)) {
      SoundFX.dropdownOpen();
    // All other links, buttons, and interactive elements get the same click
    } else if (el.closest('a, button, .clickable-icon, .checkbox-container, .callout-title')) {
      SoundFX.click();
    } else {
      return; // not interactive, no sound
    }

    _sfxLock = true;
    setTimeout(function () { _sfxLock = false; }, 350);
  }

  // On touch devices, touchend fires immediately in the gesture context
  // (no 300ms delay like click). This ensures iOS Safari has the context
  // running by the time we schedule audio.
  document.addEventListener('touchend', triggerSfx, { capture: true, passive: true });
  // Desktop fallback — also catches touch devices where touchend missed
  document.addEventListener('click', triggerSfx, true);

  // Watch for callouts losing .is-collapsed (= opening)
  function observeCallouts() {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'attributes' && m.attributeName === 'class') {
          var t = m.target;
          if (t.classList && t.classList.contains('callout') &&
              !t.classList.contains('is-collapsed') &&
              m.oldValue && m.oldValue.indexOf('is-collapsed') !== -1) {
            SoundFX.calloutOpen();
          }
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(observeCallouts, 250); });
  } else {
    setTimeout(observeCallouts, 250);
  }

})();


/* ===========================================================
   SFX DEBUG OVERLAY
   Activate with ?sfx-debug=1 in the URL.
   Shows AudioContext state and event flow on mobile.
   =========================================================== */

(function () {
  if (!/[?&]sfx-debug=1/.test(window.location.search)) return;

  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:999999;' +
    'background:rgba(0,0,0,0.85);color:#0f0;font:11px/1.4 monospace;' +
    'padding:8px 10px;max-height:40vh;overflow-y:auto;pointer-events:none;';
  document.body.appendChild(el);

  var lines = [];
  function log(msg) {
    var ts = new Date().toTimeString().slice(0, 8);
    lines.push(ts + ' ' + msg);
    if (lines.length > 30) lines.shift();
    el.textContent = lines.join('\n');
  }

  // Patch SoundFX methods to log calls
  ['click', 'dropdownOpen', 'calloutOpen', 'inProgress', 'complete'].forEach(function (name) {
    var orig = SoundFX[name];
    SoundFX[name] = function () {
      var state = SoundFX._dbg ? SoundFX._dbg() : '?';
      log('SoundFX.' + name + '() ctx=' + state + ' muted=' + SoundFX.isMuted());
      return orig.apply(this, arguments);
    };
  });

  // Log touch/click events on interactive elements
  ['touchstart', 'touchend', 'click'].forEach(function (evName) {
    document.addEventListener(evName, function (e) {
      var tag = e.target.tagName || '?';
      var cls = (e.target.className || '').toString().slice(0, 30);
      log(evName + ' <' + tag + '> .' + cls);
    }, { capture: true, passive: true });
  });

  log('SFX debug active. Tap something!');
})();


/* ===========================================================
   HIGH CONTRAST — Always enabled
   HIGH CONTRAST — Always enabled  +  Restore theme preference
   =========================================================== */

(function () {
  'use strict';

  function applyDefaults() {
    document.body.classList.add('high-contrast');
    try {
      var saved = localStorage.getItem('actuarial-notes-theme');
      if (saved === 'light') {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      } else if (saved === 'dark') {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDefaults);
  } else {
    applyDefaults();
  }
})();


/* ===========================================================
   HIGHLIGHT UPCOMING ROW COMPONENT

   Scans a table for dates and highlights the row containing
   the next upcoming date. Works with any table — add a wrapper:

   <div class="highlight-upcoming" data-date-col="0"></div>

   The div must appear immediately before the table in Markdown.
   - data-date-col: 0-based column index containing dates
                     (defaults to 0)

   Dates are parsed from cell text; supports formats like
   "Jan 2026", "January 15, 2026", "2026-03-21", etc.
   =========================================================== */

(function () {
  'use strict';

  function highlightUpcoming() {
    var markers = document.querySelectorAll('.highlight-upcoming');
    markers.forEach(function (marker) {
      // Find nearest table: try siblings first, then search parent container
      var table = marker.nextElementSibling;
      while (table && table.tagName !== 'TABLE') {
        // Check inside wrapper elements (Obsidian may wrap in <p> or <div>)
        if (table.querySelector && table.querySelector('table')) {
          table = table.querySelector('table');
          break;
        }
        table = table.nextElementSibling;
      }
      // Fallback: search within the same parent (works inside callouts)
      if (!table || table.tagName !== 'TABLE') {
        table = marker.parentElement && marker.parentElement.querySelector('table');
      }
      if (!table) return;

      var colIdx = parseInt(marker.getAttribute('data-date-col') || '0', 10);
      var rows = table.querySelectorAll('tbody tr');
      var now = new Date();
      now.setHours(0, 0, 0, 0);

      var bestRow = null;
      var bestDate = null;

      rows.forEach(function (row) {
        row.classList.remove('row-highlight-next');
        var cells = row.querySelectorAll('td');
        if (cells.length <= colIdx) return;

        var text = cells[colIdx].textContent.trim();
        var d = parseFlexDate(text);
        // For ranges, use end date so active windows stay highlighted
        if (!d || d < now) return;

        if (!bestDate || d < bestDate) {
          bestDate = d;
          bestRow = row;
        }
      });

      if (bestRow) bestRow.classList.add('row-highlight-next');
    });
  }

  function parseFlexDate(str) {
    // Handle date ranges ("Apr 22 - May 1", "Apr 22 – May 1, 2026")
    // Use the END date so active windows stay highlighted through their close
    var rangeSep = /\s*[-–—]\s*/;
    var parts = str.split(rangeSep);
    var endPart = parts[parts.length - 1].trim();
    var startPart = parts[0].trim();

    var d = parseSingleDate(endPart, startPart);
    return d;
  }

  function parseSingleDate(str, startStr) {
    // 1. Explicit year — native parse handles most formats
    var d = new Date(str);
    if (!isNaN(d.getTime())) return d;

    var now = new Date();
    var year = now.getFullYear();

    // 2. "Month Day" → "Month Day, <year>" with rollover
    var m = str.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?$/);
    if (m) {
      // If start month is provided, use it to detect cross-year ranges
      d = new Date(m[1] + ' ' + m[2] + ', ' + year);
      if (!isNaN(d.getTime())) {
        if (d < now) d = new Date(m[1] + ' ' + m[2] + ', ' + (year + 1));
        return d;
      }
    }

    // 3. "Month Year" → first of that month
    m = str.match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (m) {
      d = new Date(m[1] + ' 1, ' + m[2]);
      if (!isNaN(d.getTime())) return d;
    }

    return null;
  }

  // ── SPA-aware init (matches other components) ──────────────
  function init() {
    // Stagger calls so late-rendering content (callouts) is caught
    highlightUpcoming();
    setTimeout(highlightUpcoming, 500);
    setTimeout(highlightUpcoming, 1200);
    observePageChanges();
  }

  function observePageChanges() {
    window.addEventListener('popstate', function () {
      setTimeout(highlightUpcoming, 150);
      setTimeout(highlightUpcoming, 600);
    });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        var href = link.getAttribute('href');
        if (href && href.charAt(0) !== '#') {
          setTimeout(highlightUpcoming, 200);
          setTimeout(highlightUpcoming, 600);
        }
      }
    });

    // Retry observer setup until container exists
    function attachObserver() {
      var container = document.querySelector('.markdown-preview-view')
                   || document.querySelector('.publish-renderer');
      if (container) {
        var observer = new MutationObserver(function () {
          clearTimeout(window._hlUpcomingTimeout);
          window._hlUpcomingTimeout = setTimeout(highlightUpcoming, 200);
        });
        observer.observe(container, { childList: true, subtree: true });
      } else {
        setTimeout(attachObserver, 500);
      }
    }
    attachObserver();
  }

  // Expose for cross-IIFE use (Research Concept 404 workflow)
  window._getVaultIndex = getVaultIndex;
  window._extractSiteId = extractSiteId;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 200);
    });
  } else {
    setTimeout(init, 200);
  }
})();


/* ===========================================================
   RESEARCH CONCEPT (NOT FOUND PAGE)
   Replaces Obsidian's default 404 with an AI-powered concept
   research workflow: pick context files, generate a definition.
   =========================================================== */
(function () {
  'use strict';

  var RC = 'research-concept';
  var INVITE_KEY = 'actuarial-notes-invite-code';
  var API_URL = 'https://actuarial-notes-wiki-server.vercel.app/api/chat';
  var MAX_FILES = 8;

  /* ---- State ---- */
  var state = 'initial'; // initial | invite | select | loading | result
  var selectedFiles = [];  // [{ name, path }]
  var resultMarkdown = '';
  var lastPath = '';

  /* ---- SVG icons ---- */
  var SVG_SEARCH = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="20" r="14"/><line x1="30" y1="30" x2="42" y2="42"/></svg>';
  var SVG_RESEARCH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="6"/><line x1="13" y1="13" x2="18" y2="18"/><line x1="8.5" y1="5.5" x2="8.5" y2="11.5"/><line x1="5.5" y1="8.5" x2="11.5" y2="8.5"/></svg>';

  /* ---- Helpers ---- */
  function esc(s) { return s.replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function getPageName() {
    var p = decodeURIComponent(window.location.pathname.replace(/^\//, '').replace(/\+/g, ' '));
    return p || 'Unknown Page';
  }

  function getConceptName() {
    var name = getPageName();
    name = name.replace(/^Concepts\//, '');
    return name;
  }

  function getInviteCode() {
    try { return localStorage.getItem(INVITE_KEY) || ''; } catch (e) { return ''; }
  }

  function setInviteCode(code) {
    try { localStorage.setItem(INVITE_KEY, code); } catch (e) {}
  }

  function extractSiteIdLocal() {
    if (typeof window._extractSiteId === 'function') return window._extractSiteId();
    if (window.publish && window.publish.siteId) return window.publish.siteId;
    return null;
  }

  function fetchFileContent(filePath) {
    var siteId = extractSiteIdLocal();
    if (!siteId) return Promise.resolve(null);
    var path = filePath;
    if (!/\.md$/.test(path)) path = path + '.md';
    var url = 'https://publish-01.obsidian.md/access/' + siteId + '/' + encodeURIComponent(path);
    return fetch(url).then(function (r) { return r.ok ? r.text() : null; }).catch(function () { return null; });
  }

  /* ---- Markdown to HTML renderer ---- */
  function renderMd(md) {
    var html = md;
    // Code blocks first (preserve from further processing)
    var codeBlocks = [];
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      var idx = codeBlocks.length;
      codeBlocks.push('<pre><code>' + esc(code.trim()) + '</code></pre>');
      return '\x00CB' + idx + '\x00';
    });
    // Display math $$...$$ (multiline)
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, function (_, m) {
      return '<div class="math-display">$$' + m + '$$</div>';
    });
    // Inline math $...$
    html = html.replace(/\$([^\$\n]+)\$/g, function (_, m) {
      return '<span class="math-inline">$' + m + '$</span>';
    });
    // Headings
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
    // Highlights ==text==
    html = html.replace(/==([^=]+)==/g, '<mark>$1</mark>');
    // Bold **text**
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    html = html.replace(/(?<!\*)\*([^\*]+)\*(?!\*)/g, '<em>$1</em>');
    // Inline code `text`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Wikilinks [[target|display]] or [[target]]
    html = html.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, function (_, target, display) {
      var href = '/' + target.replace(/ /g, '+');
      return '<a class="internal-link" href="' + href + '">' + display + '</a>';
    });
    html = html.replace(/\[\[([^\]]+)\]\]/g, function (_, target) {
      var href = '/' + target.replace(/ /g, '+');
      var display = target.replace(/^.*\//, '');
      return '<a class="internal-link" href="' + href + '">' + display + '</a>';
    });
    // Blockquotes (simple, one level)
    html = html.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');
    // Unordered lists
    html = html.replace(/(^[-*]\s+.+(\n|$))+/gm, function (block) {
      var items = block.trim().split('\n').map(function (line) {
        return '<li>' + line.replace(/^[-*]\s+/, '') + '</li>';
      }).join('');
      return '<ul>' + items + '</ul>';
    });
    // Ordered lists
    html = html.replace(/(^\d+\.\s+.+(\n|$))+/gm, function (block) {
      var items = block.trim().split('\n').map(function (line) {
        return '<li>' + line.replace(/^\d+\.\s+/, '') + '</li>';
      }).join('');
      return '<ol>' + items + '</ol>';
    });
    // Paragraphs: wrap remaining loose lines
    html = html.replace(/^(?!<[a-z]|[\x00]|\s*$)(.+)$/gm, '<p>$1</p>');
    // Restore code blocks
    html = html.replace(/\x00CB(\d+)\x00/g, function (_, idx) {
      return codeBlocks[parseInt(idx, 10)] || '';
    });
    return html;
  }

  /* ---- System prompt ---- */
  function buildSystemPrompt(conceptName) {
    return 'You are an actuarial science expert writing for a study wiki. Generate a concept definition page for "' + conceptName + '" in Obsidian-flavored markdown.\n\n' +
      'Format:\n' +
      '# ' + conceptName + '\n\n' +
      '## Definition\n' +
      'A concise definition using ==highlights== for key terms.\n\n' +
      '## Key Properties\n' +
      'Important properties with LaTeX formulas ($$) where appropriate.\n\n' +
      '## Example\n' +
      'A worked example demonstrating the concept.\n\n' +
      '## Related Concepts\n' +
      'Bulleted [[wikilinks]] to related concepts.\n\n' +
      'Rules:\n' +
      '- Ground your definition in the provided context documents when available\n' +
      '- Use $$ for display math and $ for inline math\n' +
      '- Use ==highlights== for key terms in the definition\n' +
      '- Keep it concise and exam-focused\n' +
      '- If context is insufficient, provide the best definition you can and note any gaps';
  }

  /* ---- 404 detection ---- */
  function isNotFound() {
    if (document.querySelector('.' + RC)) return false;
    var renderer = document.querySelector('.markdown-preview-view') || document.querySelector('.publish-renderer');
    if (!renderer) return false;
    var text = renderer.textContent.trim();
    if (text === '' || /page not found/i.test(text)) return true;
    var hasContent = renderer.querySelector('p, h1, h2, h3, h4, h5, h6, ul, ol, table, blockquote, .callout, pre');
    return !hasContent;
  }

  /* ---- Render states ---- */
  function render() {
    if (!isNotFound()) return;
    var renderer = document.querySelector('.markdown-preview-view') || document.querySelector('.publish-renderer');
    if (!renderer) return;

    var currentPath = window.location.pathname;
    if (currentPath !== lastPath) {
      state = 'initial';
      selectedFiles = [];
      resultMarkdown = '';
      lastPath = currentPath;
    }

    renderer.innerHTML = '';
    var container = document.createElement('div');
    container.className = RC;

    if (state === 'initial') renderInitial(container);
    else if (state === 'invite') renderInvite(container);
    else if (state === 'select') renderSelect(container);
    else if (state === 'loading') renderLoading(container);
    else if (state === 'result') renderResult(container);

    renderer.appendChild(container);
  }

  function renderInitial(el) {
    var conceptName = getConceptName();
    el.innerHTML =
      '<div class="' + RC + '__icon">' + SVG_SEARCH + '</div>' +
      '<h1 class="' + RC + '__title">Page Not Found</h1>' +
      '<p class="' + RC + '__page-name"><code>' + esc(getPageName()) + '</code></p>' +
      '<p class="' + RC + '__message">This concept doesn\u2019t have a page yet.</p>' +
      '<div class="' + RC + '__actions">' +
        '<button class="' + RC + '__btn ' + RC + '__btn--primary" data-action="research">' +
          SVG_RESEARCH + ' Research Concept' +
        '</button>' +
      '</div>';

    el.querySelector('[data-action="research"]').addEventListener('click', function () {
      if (getInviteCode()) {
        state = 'select';
      } else {
        state = 'invite';
      }
      render();
    });
  }

  function renderInvite(el) {
    el.innerHTML =
      '<div class="' + RC + '__icon">' + SVG_SEARCH + '</div>' +
      '<h1 class="' + RC + '__title">Enter Invite Code</h1>' +
      '<p class="' + RC + '__message">An invite code is required to use AI research.</p>' +
      '<div class="' + RC + '__invite">' +
        '<input class="' + RC + '__input" type="text" placeholder="Invite code" autocomplete="off" />' +
        '<p class="' + RC + '__error" style="display:none"></p>' +
        '<button class="' + RC + '__btn ' + RC + '__btn--primary" data-action="submit-code">Continue</button>' +
        '<button class="' + RC + '__btn ' + RC + '__btn--secondary" data-action="back">Back</button>' +
      '</div>';

    var input = el.querySelector('.' + RC + '__input');
    var errorEl = el.querySelector('.' + RC + '__error');
    var submitBtn = el.querySelector('[data-action="submit-code"]');

    function submit() {
      var code = input.value.trim();
      if (!code) {
        errorEl.textContent = 'Please enter an invite code.';
        errorEl.style.display = '';
        return;
      }
      setInviteCode(code);
      state = 'select';
      render();
    }

    submitBtn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submit();
    });
    el.querySelector('[data-action="back"]').addEventListener('click', function () {
      state = 'initial';
      render();
    });
    setTimeout(function () { input.focus(); }, 50);
  }

  function renderSelect(el) {
    var conceptName = getConceptName();
    el.style.alignItems = 'center';

    el.innerHTML =
      '<h1 class="' + RC + '__title">Research: ' + esc(conceptName) + '</h1>' +
      '<p class="' + RC + '__message">Select context files to ground the AI definition (max ' + MAX_FILES + ').</p>' +
      '<div class="' + RC + '__file-picker">' +
        '<input class="' + RC + '__search-input" type="text" placeholder="Search exams, concepts, documents\u2026" />' +
        '<div class="' + RC + '__search-results"></div>' +
        '<div class="' + RC + '__chips"></div>' +
      '</div>' +
      '<div class="' + RC + '__actions">' +
        '<button class="' + RC + '__btn ' + RC + '__btn--primary" data-action="generate" disabled>Generate Definition</button>' +
        '<button class="' + RC + '__btn ' + RC + '__btn--secondary" data-action="skip">Skip \u2014 Generate Without Context</button>' +
      '</div>';

    var searchInput = el.querySelector('.' + RC + '__search-input');
    var resultsEl = el.querySelector('.' + RC + '__search-results');
    var chipsEl = el.querySelector('.' + RC + '__chips');
    var generateBtn = el.querySelector('[data-action="generate"]');

    function updateChips() {
      chipsEl.innerHTML = '';
      selectedFiles.forEach(function (f, idx) {
        var chip = document.createElement('span');
        chip.className = RC + '__chip';
        chip.innerHTML = esc(f.name) + ' <span class="' + RC + '__chip-x" data-idx="' + idx + '">\u00d7</span>';
        chipsEl.appendChild(chip);
      });
      chipsEl.querySelectorAll('.' + RC + '__chip-x').forEach(function (x) {
        x.addEventListener('click', function () {
          selectedFiles.splice(parseInt(x.getAttribute('data-idx'), 10), 1);
          updateChips();
          doSearch(searchInput.value);
        });
      });
      generateBtn.disabled = selectedFiles.length === 0;
    }

    function isSelected(path) {
      return selectedFiles.some(function (f) { return f.path === path; });
    }

    function toggleFile(item) {
      if (isSelected(item.path)) {
        selectedFiles = selectedFiles.filter(function (f) { return f.path !== item.path; });
      } else if (selectedFiles.length < MAX_FILES) {
        selectedFiles.push({ name: item.name, path: item.path });
      }
      updateChips();
      doSearch(searchInput.value);
    }

    var CAT_ORDER = ['exam', 'concept', 'document'];
    var CAT_LABELS = { exam: 'Exams', concept: 'Concepts', document: 'Documents' };

    function doSearch(query) {
      var term = query.trim().toLowerCase();
      resultsEl.innerHTML = '';
      if (!term) return;

      var allItems = [];
      if (typeof window._getVaultIndex === 'function') {
        allItems = window._getVaultIndex(function (updated) {
          if (searchInput.value.trim().toLowerCase() === term) {
            renderSearchResults(updated, term);
          }
        });
      }
      renderSearchResults(allItems, term);
    }

    function renderSearchResults(allItems, term) {
      var grouped = {};
      CAT_ORDER.forEach(function (c) { grouped[c] = []; });
      for (var i = 0; i < allItems.length; i++) {
        var item = allItems[i];
        if (!item.category || !grouped[item.category]) continue;
        if (item.name.toLowerCase().indexOf(term) !== -1 && grouped[item.category].length < 15) {
          grouped[item.category].push(item);
        }
      }

      resultsEl.innerHTML = '';
      var total = 0;
      CAT_ORDER.forEach(function (cat) {
        if (grouped[cat].length === 0) return;
        total += grouped[cat].length;
        var label = document.createElement('div');
        label.className = RC + '__search-group-label';
        label.textContent = CAT_LABELS[cat];
        resultsEl.appendChild(label);
        grouped[cat].forEach(function (item) {
          var row = document.createElement('div');
          row.className = RC + '__search-item' + (isSelected(item.path) ? ' is-selected' : '');
          row.innerHTML = '<input type="checkbox"' + (isSelected(item.path) ? ' checked' : '') +
            (selectedFiles.length >= MAX_FILES && !isSelected(item.path) ? ' disabled' : '') +
            ' /> ' + esc(item.name);
          row.addEventListener('click', function (e) {
            e.preventDefault();
            toggleFile(item);
          });
          resultsEl.appendChild(row);
        });
      });
      if (total === 0 && term) {
        var empty = document.createElement('div');
        empty.style.cssText = 'padding:0.8em;color:var(--text-faint);font-size:0.9rem;';
        empty.textContent = 'No results found';
        resultsEl.appendChild(empty);
      }
    }

    searchInput.addEventListener('input', function () { doSearch(searchInput.value); });
    setTimeout(function () { searchInput.focus(); }, 50);

    generateBtn.addEventListener('click', function () {
      state = 'loading';
      render();
      doGenerate(false);
    });

    el.querySelector('[data-action="skip"]').addEventListener('click', function () {
      selectedFiles = [];
      state = 'loading';
      render();
      doGenerate(true);
    });

    updateChips();
  }

  function renderLoading(el) {
    el.innerHTML =
      '<div class="' + RC + '__loading">' +
        '<div class="' + RC + '__spinner"></div>' +
        '<p class="' + RC + '__progress">Preparing\u2026</p>' +
      '</div>';
  }

  function setProgress(msg) {
    var p = document.querySelector('.' + RC + '__progress');
    if (p) p.textContent = msg;
  }

  function doGenerate(skipContext) {
    var conceptName = getConceptName();
    var systemPrompt = buildSystemPrompt(conceptName);

    if (skipContext || selectedFiles.length === 0) {
      callApi(systemPrompt, 'Define the concept: ' + conceptName);
      return;
    }

    // Fetch selected files
    var fetched = [];
    var total = selectedFiles.length;
    var done = 0;

    selectedFiles.forEach(function (f, idx) {
      setProgress('Fetching files (' + (done + 1) + '/' + total + ')\u2026');
      fetchFileContent(f.path).then(function (content) {
        fetched[idx] = { name: f.name, content: content };
        done++;
        setProgress('Fetching files (' + Math.min(done + 1, total) + '/' + total + ')\u2026');
        if (done === total) {
          setProgress('Generating definition\u2026');
          var contextText = fetched.map(function (f) {
            return f.content ? '--- ' + f.name + ' ---\n' + f.content : '';
          }).filter(Boolean).join('\n\n');
          var userMsg = 'Define the concept: ' + conceptName;
          if (contextText) {
            userMsg += '\n\nContext documents:\n\n' + contextText;
          }
          callApi(systemPrompt, userMsg);
        }
      });
    });
  }

  function callApi(systemPrompt, text) {
    var code = getInviteCode();
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Invite-Code': code
      },
      body: JSON.stringify({ text: text, systemPrompt: systemPrompt })
    })
    .then(function (r) {
      if (r.status === 401) {
        // Bad invite code — clear it and go back
        setInviteCode('');
        state = 'invite';
        render();
        var errEl = document.querySelector('.' + RC + '__error');
        if (errEl) {
          errEl.textContent = 'Invalid invite code. Please try again.';
          errEl.style.display = '';
        }
        return null;
      }
      if (r.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.');
      }
      if (!r.ok) throw new Error('AI service error (' + r.status + '). Please try again.');
      return r.json();
    })
    .then(function (data) {
      if (!data) return; // handled above (401)
      resultMarkdown = data.text || '';
      if (!resultMarkdown) throw new Error('Empty response from AI.');
      state = 'result';
      render();
    })
    .catch(function (err) {
      state = 'initial';
      render();
      // Show error in the initial view
      var container = document.querySelector('.' + RC);
      if (container) {
        var errP = document.createElement('p');
        errP.className = RC + '__error';
        errP.textContent = err.message || 'Something went wrong.';
        container.appendChild(errP);
      }
    });
  }

  function renderResult(el) {
    el.style.alignItems = 'stretch';
    el.innerHTML =
      '<div class="' + RC + '__result">' + renderMd(resultMarkdown) + '</div>' +
      '<div class="' + RC + '__result-actions">' +
        '<button class="' + RC + '__btn ' + RC + '__btn--secondary" data-action="copy">' +
          'Copy Markdown' +
        '</button>' +
        '<button class="' + RC + '__btn ' + RC + '__btn--secondary" data-action="restart">' +
          'Start Over' +
        '</button>' +
      '</div>';

    el.querySelector('[data-action="copy"]').addEventListener('click', function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(resultMarkdown).then(function () {
          var btn = el.querySelector('[data-action="copy"]');
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = 'Copy Markdown'; }, 2000);
        });
      }
    });

    el.querySelector('[data-action="restart"]').addEventListener('click', function () {
      state = 'initial';
      selectedFiles = [];
      resultMarkdown = '';
      render();
    });

    // Trigger MathJax/KaTeX re-render if available
    try {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
      } else if (window.renderMathInElement) {
        var resultEl = el.querySelector('.' + RC + '__result');
        if (resultEl) window.renderMathInElement(resultEl);
      }
    } catch (e) {}
  }

  /* ---- Navigation detection ---- */
  function check() {
    setTimeout(render, 300);
    setTimeout(render, 800);
  }

  window.addEventListener('popstate', check);
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
    if (link) check();
  });

  function attachObserver() {
    var target = document.querySelector('.markdown-preview-view') || document.querySelector('.publish-renderer');
    if (target) {
      var observer = new MutationObserver(function () {
        clearTimeout(window._researchConceptTimeout);
        window._researchConceptTimeout = setTimeout(render, 300);
      });
      observer.observe(target, { childList: true, subtree: true });
    } else {
      setTimeout(attachObserver, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () { check(); attachObserver(); }, 300);
    });
  } else {
    setTimeout(function () { check(); attachObserver(); }, 300);
  }
})();


/* ===========================================================
   CUSTOM EXAM WORKFLOW — ARCHIVED
   Syllabus uploader & document library features have been moved
   to publish-archived-custom-exam.js for future refinement.
   =========================================================== */
