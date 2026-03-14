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
    document.querySelectorAll('.exam-nav[data-current]').forEach(nav => {
      // Skip if already built
      if (nav.dataset.built === 'true') return;
      
      buildExamNav(nav);
      nav.dataset.built = 'true';
    });
  }

  // Cache for fetched exam objectives
  var examNavObjectivesCache = {};

  function buildExamNav(container) {
    // Parse data attributes
    const customColor = container.dataset.color;
    const prevData = parseNextExams(container.dataset.prev);
    const currentData = parseExamData(container.dataset.current);
    const nextData = parseNextExams(container.dataset.next);
    const reqs = container.dataset.reqs ? container.dataset.reqs.split(',').map(r => r.trim()) : [];
    const tracks = parseTracks(container.dataset.tracks);

    // Apply custom color if provided
    if (customColor) {
      container.style.setProperty('--nav-color', customColor);
      // Create a slightly lighter version for hover
      container.style.setProperty('--nav-color-hover', customColor);
    }

    // Set exam color on page container for callout tinting
    const pageEl = container.closest('.markdown-preview-view, .markdown-rendered, .page-container') || container.parentElement;
    if (pageEl) {
      pageEl.style.setProperty('--exam-color', customColor || 'var(--brand)');
      pageEl.classList.add('has-exam-nav');
    }

    // Clear container
    container.innerHTML = '';

    // SVG arrow icons (reused for collapsed view)
    var svgPrev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>';
    var svgNext = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 6 15 12 9 18"/></svg>';
    var svgChevron = '<svg class="exam-nav__collapsed-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

    // Helper: build a collapsed arrow (single link or dropdown for multiple exams)
    function buildCollapsedArrow(exams, direction) {
      var svg = direction === 'prev' ? svgPrev : svgNext;

      if (exams.length === 1) {
        var link = document.createElement('a');
        link.className = 'exam-nav__collapse-arrow internal-link';
        link.href = exams[0].url || '#';
        link.innerHTML = svg;
        return link;
      }

      // Multiple exams — dropdown
      var dropdown = document.createElement('div');
      dropdown.className = 'exam-nav__dropdown exam-nav__collapse-arrow-dropdown';

      var btn = document.createElement('button');
      btn.className = 'exam-nav__collapse-arrow';
      btn.type = 'button';
      btn.innerHTML = svg;

      var menu = document.createElement('div');
      menu.className = 'exam-nav__menu';
      menu.innerHTML = '<div class="exam-nav__menu-header">Choose your path</div>';

      exams.forEach(function (exam) {
        var item = document.createElement('a');
        item.className = 'exam-nav__menu-item';
        item.href = exam.url || '#';
        if (exam.url) item.classList.add('internal-link');
        var orgClass = exam.org ? 'exam-nav__org--' + exam.org.toLowerCase() : '';
        item.innerHTML =
          '<div class="exam-nav__menu-item-info">' +
            '<span class="exam-nav__menu-item-name">' + exam.name + '</span>' +
            (exam.fullName ? '<span class="exam-nav__menu-item-full">' + exam.fullName + '</span>' : '') +
          '</div>' +
          (exam.org ? '<span class="exam-nav__org ' + orgClass + '">' + exam.org + '</span>' : '');
        item.addEventListener('click', function () {
          dropdown.classList.remove('is-open');
          hideBackdrop();
        });
        menu.appendChild(item);
      });

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.contains('is-open');
        // Close any other open dropdowns first
        document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(function (d) {
          d.classList.remove('is-open');
        });
        hideBackdrop();
        if (!isOpen) dropdown.classList.add('is-open');
      });

      dropdown.appendChild(btn);
      dropdown.appendChild(menu);
      return dropdown;
    }

    // ── Collapsed view: < [Current Exam ▾] > ────────────
    var collapsedView = document.createElement('div');
    collapsedView.className = 'exam-nav__collapsed-view';

    if (prevData.length > 0) {
      collapsedView.appendChild(buildCollapsedArrow(prevData, 'prev'));
    }

    var collapsedPill = document.createElement('button');
    collapsedPill.className = 'exam-nav__btn exam-nav__btn--current exam-nav__collapsed-pill';
    collapsedPill.type = 'button';
    collapsedPill.innerHTML =
      '<span class="exam-nav__collapsed-label">' + currentData.name + '</span>' +
      svgChevron;
    collapsedPill.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.remove('is-collapsed');
    });
    collapsedView.appendChild(collapsedPill);

    if (nextData.length > 0) {
      collapsedView.appendChild(buildCollapsedArrow(nextData, 'next'));
    }

    container.appendChild(collapsedView);

    // ── Expanded view: full track + pill row ─────────────
    var expandedView = document.createElement('div');
    expandedView.className = 'exam-nav__expanded-view';

    // Exam Track row (at the top)
    if (tracks.length > 0) {
      const trackRow = document.createElement('div');
      trackRow.className = 'exam-nav__track';

      const trackLabel = document.createElement('span');
      trackLabel.className = 'exam-nav__track-label';
      trackLabel.textContent = 'Exam Track:';
      trackRow.appendChild(trackLabel);

      tracks.forEach((track, i) => {
        if (i > 0) {
          const sep = document.createElement('span');
          sep.className = 'exam-nav__track-sep';
          sep.textContent = '/';
          trackRow.appendChild(sep);
        }
        if (track.url) {
          const link = document.createElement('a');
          link.className = 'exam-nav__track-link internal-link';
          link.href = track.url;
          link.textContent = track.name;
          trackRow.appendChild(link);
        } else {
          const span = document.createElement('span');
          span.className = 'exam-nav__track-link';
          span.textContent = track.name;
          trackRow.appendChild(span);
        }
      });

      expandedView.appendChild(trackRow);
    }

    // Pill row container
    var pillRow = document.createElement('div');
    pillRow.className = 'exam-nav__pill-row';

    // Previous exam(s)
    if (prevData.length > 0) {
      renderExamGroup(pillRow, prevData, 'exam-nav__btn--prev');

      // Arrow after prev
      const arrow1 = document.createElement('span');
      arrow1.className = 'exam-nav__arrow';
      arrow1.textContent = '→';
      pillRow.appendChild(arrow1);
    }

    // Current exam wrapper (button + requirements below)
    const currentWrapper = document.createElement('div');
    currentWrapper.className = 'exam-nav__current';

    // Current exam button (clickable to collapse, like concept nav)
    const currentBtn = document.createElement('button');
    currentBtn.className = 'exam-nav__btn exam-nav__btn--current exam-nav__btn--collapsible';
    currentBtn.type = 'button';
    currentBtn.innerHTML =
      '<span>' + currentData.name + '</span>' +
      '<svg class="exam-nav__collapse-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>';
    currentBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.add('is-collapsed');
    });
    currentWrapper.appendChild(currentBtn);

    // Requirements text below current exam
    if (reqs.length > 0) {
      const reqsText = document.createElement('span');
      reqsText.className = 'exam-nav__reqs';
      reqsText.textContent = `Required for ${reqs.join(', ')}`;
      currentWrapper.appendChild(reqsText);
    }

    pillRow.appendChild(currentWrapper);

    // Next exam(s)
    if (nextData.length > 0) {
      // Arrow before next
      const arrow2 = document.createElement('span');
      arrow2.className = 'exam-nav__arrow';
      arrow2.textContent = '→';
      pillRow.appendChild(arrow2);

      renderExamGroup(pillRow, nextData, 'exam-nav__btn--next');
    }

    // (collapse button removed — current pill is now collapsible)

    expandedView.appendChild(pillRow);
    container.appendChild(expandedView);

    // Default to collapsed state
    container.classList.add('is-collapsed');

    // Learning Objectives dropdown
    buildExamObjectivesSection(container);

    // Close dropdown when clicking outside
    if (!window._examNavCloseRegistered) {
      window._examNavCloseRegistered = true;

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.exam-nav__dropdown') &&
            !e.target.closest('.exam-nav__lo-wrap')) {
          document.querySelectorAll('.exam-nav__dropdown.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          document.querySelectorAll('.exam-nav__lo-wrap.is-open').forEach(d => {
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
          document.querySelectorAll('.exam-nav__lo-wrap.is-open').forEach(d => {
            d.classList.remove('is-open');
          });
          hideBackdrop();
        }
      });
    }
  }

  // Build the Learning Objectives expandable section
  function buildExamObjectivesSection(container) {
    // Toggle button row
    const toggleRow = document.createElement('div');
    toggleRow.className = 'exam-nav__lo-toggle';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'exam-nav__lo-btn';
    toggleBtn.type = 'button';
    toggleBtn.innerHTML =
      '<span class="exam-nav__lo-btn-label">Concepts</span>' +
      '<svg class="exam-nav__lo-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasExpanded = container.classList.contains('is-lo-expanded');
      container.classList.toggle('is-lo-expanded');
      if (!wasExpanded) {
        elevateCenterColumn();
        if (!container._loLoaded) {
          loadExamObjectives(container);
        }
      } else {
        deelevateCenterColumn();
      }
    });

    toggleRow.appendChild(toggleBtn);
    container.appendChild(toggleRow);

    // Objectives section (hidden by default)
    var objSection = document.createElement('div');
    objSection.className = 'exam-nav__lo-section';
    container.appendChild(objSection);
  }

  // Load and render objectives for this exam page
  function loadExamObjectives(container) {
    container._loLoaded = true;
    var section = container.querySelector('.exam-nav__lo-section');
    if (!section) return;

    section.innerHTML = '<div class="exam-nav__lo-loading">Loading\u2026</div>';

    // Strategy 1: Parse directly from the rendered DOM callout blocks
    var domObjectives = parseObjectivesFromDOM(container);
    if (domObjectives.length > 0) {
      renderExamNavObjectives(section, domObjectives, container);
      return;
    }

    // Strategy 2: Fetch markdown (fallback)
    var pagePath = decodeURIComponent(window.location.pathname.replace(/^\//, ''));
    if (!pagePath) pagePath = document.title;

    fetchExamNavObjectives(pagePath).then(function (objectives) {
      renderExamNavObjectives(section, objectives, container);
    }).catch(function () {
      section.innerHTML = '<div class="exam-nav__lo-loading">Could not load objectives.</div>';
    });
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
            concepts.push({ name: cName, href: href });
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
  function renderExamNavObjectives(section, objectives, container) {
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
          // concept can be a string (from markdown parse) or {name, href} (from DOM parse)
          var cName = typeof concept === 'string' ? concept : concept.name;
          var cHref = typeof concept === 'string' ? ('Concepts/' + concept) : concept.href;
          var link = document.createElement('a');
          link.className = 'exam-nav__lo-menu-item internal-link';
          link.href = cHref;
          var numSpan = document.createElement('span');
          numSpan.className = 'exam-nav__lo-menu-num';
          numSpan.textContent = (idx + 1);
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
          showBackdrop();
        } else {
          hideBackdrop();
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

  // Render a group of exams as either a single button or a dropdown
  function renderExamGroup(container, exams, btnClass) {
    if (exams.length === 1) {
      // Single exam - just a button
      const link = document.createElement('a');
      link.className = `exam-nav__btn ${btnClass}`;
      link.href = exams[0].url || '#';
      link.textContent = exams[0].name;
      if (exams[0].url) {
        link.classList.add('internal-link');
      }
      container.appendChild(link);
    } else {
      // Multiple exams - dropdown
      const dropdown = document.createElement('div');
      dropdown.className = 'exam-nav__dropdown';

      // Dropdown trigger button
      const triggerBtn = document.createElement('button');
      triggerBtn.className = `exam-nav__btn ${btnClass}`;
      triggerBtn.type = 'button';
      triggerBtn.innerHTML = `
        <span>${exams.map(e => e.name.replace('Exam ', '')).join(' / ')}</span>
        <svg class="exam-nav__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      `;

      // Dropdown menu
      const menu = document.createElement('div');
      menu.className = 'exam-nav__menu';
      menu.innerHTML = `<div class="exam-nav__menu-header">Choose your path</div>`;

      exams.forEach(exam => {
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

  // Mobile backdrop helpers
  // Elevate / de-elevate the center column so exam-nav popups render above the sidebar
  function elevateCenterColumn() {
    var col = document.querySelector('.site-body-center-column');
    if (col) col.classList.add('exam-nav-elevated');
  }

  function deelevateCenterColumn() {
    // Only remove if nothing is still open
    var anyOpen = document.querySelector(
      '.exam-nav.is-lo-expanded, .exam-nav__dropdown.is-open, .exam-nav__lo-wrap.is-open'
    );
    if (!anyOpen) {
      var col = document.querySelector('.site-body-center-column');
      if (col) col.classList.remove('exam-nav-elevated');
    }
  }

  function showBackdrop() {
    elevateCenterColumn();
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
    deelevateCenterColumn();
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
    document.querySelectorAll('.concept-nav[data-current]').forEach(function (nav) {
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
          elevateCenterCol();
          if (!container._objectivesLoaded) {
            loadObjectivesInline(container, objectives);
          }
        } else {
          deelevateCenterCol();
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
    }

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
      '.concept-nav.is-expanded, .concept-nav__arrow-dropdown.is-open, .concept-nav__obj-wrap.is-open,' +
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

})();


/* ===========================================================
   EXAM JOURNEY TRACKER
   Sidebar widget that lets users pick a certification track
   (ASA, ACAS, FSA, FCAS), view requirements, and mark progress.
   Persists state in localStorage.
   =========================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'actuarial-notes-journey';

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

  var SVG_CHEVRON = '<svg class="journey-tracker__section-chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<polyline points="6 8 10 12 14 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var STATUS_ICONS = { not_started: SVG_CIRCLE, in_progress: SVG_PROGRESS, completed: SVG_CHECK };
  var STATUS_CYCLE = { not_started: 'in_progress', in_progress: 'completed', completed: 'not_started' };

  /* ---- Track definitions ---- */
  var TRACKS = [
    {
      key: 'ASA',
      name: 'ASA \u2014 Associate (SOA)',
      sections: [
        {
          label: 'Preliminary Exams',
          items: [
            { id: 'P',     name: 'Exam P \u2014 Probability',             path: 'Exam P-1 (SOA)' },
            { id: 'FM',    name: 'Exam FM \u2014 Financial Mathematics',   path: 'Exam FM-2 (SOA)' },
            { id: 'FAM',   name: 'Exam FAM \u2014 Fundamentals of Actuarial Math', path: null },
            { id: 'ALTAM', name: 'Exam ALTAM \u2014 Advanced Long-Term',   path: null, or: 'ASTAM' },
            { id: 'ASTAM', name: 'Exam ASTAM \u2014 Advanced Short-Term',  path: null, or: 'ALTAM' },
            { id: 'SRM',   name: 'Exam SRM \u2014 Statistics for Risk Modeling', path: null },
            { id: 'PA',    name: 'Exam PA \u2014 Predictive Analytics',    path: null }
          ]
        },
        {
          label: 'VEE Requirements',
          items: [
            { id: 'VEE-ECON', name: 'VEE \u2014 Economics',             path: null },
            { id: 'VEE-AF',   name: 'VEE \u2014 Accounting & Finance',  path: null },
            { id: 'VEE-MS',   name: 'VEE \u2014 Mathematical Statistics', path: null }
          ]
        },
        {
          label: 'Experience & Courses',
          items: [
            { id: 'FAP', name: 'FAP \u2014 Fundamentals of Actuarial Practice', path: null },
            { id: 'APC', name: 'APC \u2014 Associateship Professionalism Course', path: null }
          ]
        }
      ]
    },
    {
      key: 'ACAS',
      name: 'ACAS \u2014 Associate (CAS)',
      sections: [
        {
          label: 'Preliminary Exams',
          items: [
            { id: 'P',      name: 'Exam 1/P \u2014 Probability',           path: 'Exam P-1 (SOA)' },
            { id: 'FM',     name: 'Exam 2/FM \u2014 Financial Mathematics', path: 'Exam FM-2 (SOA)' },
            { id: 'MAS-I',  name: 'Exam MAS-I \u2014 Modern Actuarial Statistics I',  path: null },
            { id: 'MAS-II', name: 'Exam MAS-II \u2014 Modern Actuarial Statistics II', path: null },
            { id: 'CAS-5',  name: 'Exam 5 \u2014 Basic Techniques for Ratemaking & Reserving', path: null },
            { id: 'CAS-6',  name: 'Exam 6 \u2014 Regulation and Financial Reporting',  path: null }
          ]
        },
        {
          label: 'VEE Requirements',
          items: [
            { id: 'VEE-ECON', name: 'VEE \u2014 Economics',             path: null },
            { id: 'VEE-AF',   name: 'VEE \u2014 Accounting & Finance',  path: null },
            { id: 'VEE-MS',   name: 'VEE \u2014 Mathematical Statistics', path: null }
          ]
        },
        {
          label: 'Online Courses',
          items: [
            { id: 'CAS-OC1',   name: 'CAS Online Course 1',                   path: null },
            { id: 'CAS-OC2',   name: 'CAS Online Course 2',                   path: null },
            { id: 'CAS-PROF',  name: 'CAS Course on Professionalism',          path: null }
          ]
        }
      ]
    },
    {
      key: 'FSA',
      name: 'FSA \u2014 Fellow (SOA)',
      sections: [
        {
          label: 'ASA Requirements',
          items: [
            { id: 'P',     name: 'Exam P \u2014 Probability',             path: 'Exam P-1 (SOA)' },
            { id: 'FM',    name: 'Exam FM \u2014 Financial Mathematics',   path: 'Exam FM-2 (SOA)' },
            { id: 'FAM',   name: 'Exam FAM \u2014 Fundamentals of Actuarial Math', path: null },
            { id: 'ALTAM', name: 'Exam ALTAM \u2014 Advanced Long-Term',   path: null, or: 'ASTAM' },
            { id: 'ASTAM', name: 'Exam ASTAM \u2014 Advanced Short-Term',  path: null, or: 'ALTAM' },
            { id: 'SRM',   name: 'Exam SRM \u2014 Statistics for Risk Modeling', path: null },
            { id: 'PA',    name: 'Exam PA \u2014 Predictive Analytics',    path: null },
            { id: 'VEE-ECON', name: 'VEE \u2014 Economics',             path: null },
            { id: 'VEE-AF',   name: 'VEE \u2014 Accounting & Finance',  path: null },
            { id: 'VEE-MS',   name: 'VEE \u2014 Mathematical Statistics', path: null },
            { id: 'FAP', name: 'FAP \u2014 Fundamentals of Actuarial Practice', path: null },
            { id: 'APC', name: 'APC \u2014 Associateship Professionalism Course', path: null }
          ]
        },
        {
          label: 'Fellowship Exams',
          items: [
            { id: 'FSA-EXAM', name: 'Fellowship Exam (track-specific)',  path: null },
            { id: 'FSA-MOD',  name: 'Fellowship Module (track-specific)', path: null },
            { id: 'FSA-DMAC', name: 'DMAC \u2014 Decision Making & Communication', path: null }
          ]
        },
        {
          label: 'Fellowship Course',
          items: [
            { id: 'FPC', name: 'FPC \u2014 Fellowship Professionalism Course', path: null }
          ]
        }
      ]
    },
    {
      key: 'FCAS',
      name: 'FCAS \u2014 Fellow (CAS)',
      sections: [
        {
          label: 'ACAS Requirements',
          items: [
            { id: 'P',      name: 'Exam 1/P \u2014 Probability',           path: 'Exam P-1 (SOA)' },
            { id: 'FM',     name: 'Exam 2/FM \u2014 Financial Mathematics', path: 'Exam FM-2 (SOA)' },
            { id: 'MAS-I',  name: 'Exam MAS-I \u2014 Modern Actuarial Statistics I',  path: null },
            { id: 'MAS-II', name: 'Exam MAS-II \u2014 Modern Actuarial Statistics II', path: null },
            { id: 'CAS-5',  name: 'Exam 5 \u2014 Basic Techniques for Ratemaking & Reserving', path: null },
            { id: 'CAS-6',  name: 'Exam 6 \u2014 Regulation and Financial Reporting',  path: null },
            { id: 'VEE-ECON', name: 'VEE \u2014 Economics',             path: null },
            { id: 'VEE-AF',   name: 'VEE \u2014 Accounting & Finance',  path: null },
            { id: 'VEE-MS',   name: 'VEE \u2014 Mathematical Statistics', path: null },
            { id: 'CAS-OC1',   name: 'CAS Online Course 1',              path: null },
            { id: 'CAS-OC2',   name: 'CAS Online Course 2',              path: null },
            { id: 'CAS-PROF',  name: 'CAS Course on Professionalism',     path: null }
          ]
        },
        {
          label: 'Fellowship Exams',
          items: [
            { id: 'CAS-7', name: 'Exam 7 \u2014 Estimation of Policy Liabilities', path: null },
            { id: 'CAS-8', name: 'Exam 8 \u2014 Advanced Ratemaking',               path: null },
            { id: 'CAS-9', name: 'Exam 9 \u2014 Financial Risk & Rate of Return',   path: null }
          ]
        }
      ]
    }
  ];

  /* ---- State management ---- */
  var state = { selectedTrack: 'ASA', progress: {} };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.selectedTrack) state.selectedTrack = parsed.selectedTrack;
        if (parsed && parsed.progress) state.progress = parsed.progress;
      }
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function getStatus(id) {
    return state.progress[id] || 'not_started';
  }

  function cycleStatus(id) {
    var current = getStatus(id);
    state.progress[id] = STATUS_CYCLE[current];
    saveState();
  }

  /* ---- Count helpers ---- */
  function getTrackCounts(track) {
    var total = 0;
    var done = 0;
    var orSeen = {};
    track.sections.forEach(function (sec) {
      sec.items.forEach(function (item) {
        // For "or" pairs, only count one toward total
        if (item.or) {
          var pairKey = [item.id, item.or].sort().join('|');
          if (orSeen[pairKey]) return; // skip second of pair
          orSeen[pairKey] = true;
          // Count as done if either is completed
          if (getStatus(item.id) === 'completed' || getStatus(item.or) === 'completed') done++;
          total++;
        } else {
          total++;
          if (getStatus(item.id) === 'completed') done++;
        }
      });
    });
    return { total: total, done: done };
  }

  /* ---- DOM references ---- */
  var trackerEl = null;
  var countEl = null;
  var barFillEl = null;
  var sectionsEl = null;

  /* ---- Build the tracker ---- */
  function buildTracker() {
    if (document.querySelector('.journey-tracker')) return;

    var sidebar = document.querySelector('.site-body-left-column');
    if (!sidebar) return;

    trackerEl = document.createElement('div');
    trackerEl.className = 'journey-tracker';

    // Header
    var header = document.createElement('div');
    header.className = 'journey-tracker__header';
    var title = document.createElement('span');
    title.className = 'journey-tracker__title';
    title.textContent = 'Exam Journey';
    countEl = document.createElement('span');
    countEl.className = 'journey-tracker__count';
    header.appendChild(title);
    header.appendChild(countEl);

    // Progress bar
    var bar = document.createElement('div');
    bar.className = 'journey-tracker__bar';
    barFillEl = document.createElement('div');
    barFillEl.className = 'journey-tracker__bar-fill';
    bar.appendChild(barFillEl);

    // Track selector
    var select = document.createElement('select');
    select.className = 'journey-tracker__select';
    TRACKS.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.key;
      opt.textContent = t.name;
      select.appendChild(opt);
    });
    select.value = state.selectedTrack;
    select.addEventListener('change', function () {
      state.selectedTrack = select.value;
      saveState();
      renderSections();
      updateProgress();
    });

    // Sections container
    sectionsEl = document.createElement('div');
    sectionsEl.className = 'journey-tracker__sections';

    trackerEl.appendChild(header);
    trackerEl.appendChild(bar);
    trackerEl.appendChild(select);
    trackerEl.appendChild(sectionsEl);

    // Always insert as a DIRECT child of .site-body-left-column.
    // Walk sidebar's direct children to find the right spot: after the
    // search bar / toggles, before the nav tree (or its wrapper).
    var inserted = false;
    var children = sidebar.children;
    for (var ci = 0; ci < children.length; ci++) {
      var child = children[ci];
      // The nav tree (or its wrapper) is the first direct child that
      // contains a .nav-folder or .tree-item element, or IS one.
      var isNav = child.classList.contains('nav-folder') ||
                  child.classList.contains('tree-item') ||
                  child.querySelector('.nav-folder, .tree-item');
      if (isNav) {
        sidebar.insertBefore(trackerEl, child);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      // Nav tree not yet in DOM — append to sidebar. The MutationObserver
      // will reposition it once the nav tree appears.
      sidebar.appendChild(trackerEl);
    }

    renderSections();
    updateProgress();
  }

  function renderSections() {
    if (!sectionsEl) return;
    sectionsEl.innerHTML = '';

    var track = TRACKS.find(function (t) { return t.key === state.selectedTrack; });
    if (!track) return;

    track.sections.forEach(function (sec) {
      var section = document.createElement('div');
      section.className = 'journey-tracker__section';

      // Section header
      var sHeader = document.createElement('div');
      sHeader.className = 'journey-tracker__section-header';
      sHeader.innerHTML = SVG_CHEVRON;
      var sLabel = document.createElement('span');
      sLabel.textContent = sec.label;
      sHeader.appendChild(sLabel);
      sHeader.addEventListener('click', function () {
        section.classList.toggle('is-collapsed');
      });

      // Items container
      var itemsEl = document.createElement('div');
      itemsEl.className = 'journey-tracker__items';

      sec.items.forEach(function (item, idx) {
        // "or" separator
        if (item.or && idx > 0) {
          var prevItem = sec.items[idx - 1];
          if (prevItem && prevItem.or === item.id) {
            var orDiv = document.createElement('div');
            orDiv.className = 'journey-tracker__or';
            orDiv.textContent = 'or';
            itemsEl.appendChild(orDiv);
          }
        }

        var row = document.createElement('div');
        row.className = 'journey-tracker__item';
        row.dataset.status = getStatus(item.id);
        row.dataset.itemId = item.id;

        // Status button
        var statusBtn = document.createElement('button');
        statusBtn.className = 'journey-tracker__status';
        statusBtn.type = 'button';
        statusBtn.title = 'Click to change status';
        statusBtn.innerHTML = STATUS_ICONS[getStatus(item.id)];
        statusBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          cycleStatus(item.id);
          row.dataset.status = getStatus(item.id);
          statusBtn.innerHTML = STATUS_ICONS[getStatus(item.id)];
          updateProgress();
        });

        // Name (link if path exists)
        var nameEl;
        if (item.path) {
          nameEl = document.createElement('a');
          nameEl.className = 'journey-tracker__name internal-link';
          nameEl.href = '/' + encodeURIComponent(item.path).replace(/%20/g, '+');
          nameEl.dataset.href = item.path;
        } else {
          nameEl = document.createElement('span');
          nameEl.className = 'journey-tracker__name';
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

  function updateProgress() {
    var track = TRACKS.find(function (t) { return t.key === state.selectedTrack; });
    if (!track) return;

    var counts = getTrackCounts(track);
    if (countEl) countEl.textContent = counts.done + ' / ' + counts.total;
    if (barFillEl) {
      var pct = counts.total > 0 ? Math.round((counts.done / counts.total) * 100) : 0;
      barFillEl.style.width = pct + '%';
    }
  }

  /* ---- Init & SPA survival ---- */
  function init() {
    loadState();
    buildTracker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 250); });
  } else {
    setTimeout(init, 250);
  }

  // Re-inject if sidebar re-renders (SPA navigation), and reposition
  // the tracker if the nav tree loads after the tracker was inserted.
  var jtObserver = new MutationObserver(function () {
    if (!document.querySelector('.journey-tracker')) {
      trackerEl = null;
      countEl = null;
      barFillEl = null;
      sectionsEl = null;
      buildTracker();
    } else if (trackerEl) {
      // Reposition: ensure tracker is a direct child of sidebar and sits
      // before the nav tree (or its wrapper), not after it.
      var sidebar = document.querySelector('.site-body-left-column');
      if (!sidebar) return;

      // If tracker isn't a direct child of sidebar, move it there
      if (trackerEl.parentElement !== sidebar) {
        trackerEl.remove();
      }

      // Find the direct child of sidebar that contains the nav tree
      var navChild = null;
      var kids = sidebar.children;
      for (var k = 0; k < kids.length; k++) {
        var kid = kids[k];
        if (kid === trackerEl) continue;
        if (kid.classList.contains('nav-folder') || kid.classList.contains('tree-item') ||
            kid.querySelector('.nav-folder, .tree-item')) {
          navChild = kid;
          break;
        }
      }

      if (navChild) {
        // Ensure tracker is before the nav child
        var trackerIdx = -1, navIdx = -1;
        for (var m = 0; m < kids.length; m++) {
          if (kids[m] === trackerEl) trackerIdx = m;
          if (kids[m] === navChild) navIdx = m;
        }
        if (trackerIdx < 0) {
          // Tracker was removed — reinsert before nav
          sidebar.insertBefore(trackerEl, navChild);
        } else if (trackerIdx > navIdx) {
          // Tracker is after nav — move it before
          sidebar.insertBefore(trackerEl, navChild);
        }
      } else if (!trackerEl.parentElement) {
        // Tracker was removed and no nav found — re-append
        sidebar.appendChild(trackerEl);
      }
    }
  });

  function observeSidebar() {
    var target = document.querySelector('.site-body-left-column');
    if (target) {
      jtObserver.observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(observeSidebar, 350); });
  } else {
    setTimeout(observeSidebar, 350);
  }

})();


/* ===========================================================
   HIGH CONTRAST TOGGLE
   Injects a contrast icon + pill switch right beside the
   built-in dark/light mode toggle in the Obsidian Publish
   sidebar. Persists preference in localStorage.
   =========================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'actuarial-notes-high-contrast';

  // Half-circle contrast icon SVG
  var HC_ICON_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5"/>' +
    '<path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/>' +
    '</svg>';

  function applyHighContrast(enabled) {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    try { localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0'); } catch (e) {}
  }

  function restorePreference() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }

  function findThemeToggleRow() {
    // Obsidian Publish's dark/light toggle lives inside .site-body-left-column.
    // It renders as a wrapper div containing: [SVG icon] [checkbox/toggle element].
    // We need to find that wrapper so we can append our elements INSIDE it.
    var sidebar = document.querySelector('.site-body-left-column');
    if (!sidebar) return null;

    // Strategy 1: Find the checkbox-container (Obsidian's toggle pill) and return its parent
    var checkbox = sidebar.querySelector('.checkbox-container');
    if (checkbox) return checkbox.parentElement;

    // Strategy 2: Find a clickable-icon (the moon/sun SVG) and return its parent
    var clickableIcon = sidebar.querySelector('.clickable-icon');
    if (clickableIcon) return clickableIcon.parentElement;

    // Strategy 3: Walk the first few direct children of the sidebar looking
    // for a short element that contains an SVG (the toggle row, not the nav tree)
    var children = sidebar.children;
    for (var i = 0; i < Math.min(children.length, 5); i++) {
      var child = children[i];
      if (!child.querySelector) continue;
      // The toggle row will have an SVG but won't be the site name or search
      var hasSvg = child.querySelector('svg');
      var isSearch = child.querySelector('input[type="search"], input[type="text"]');
      var isNav = child.classList.contains('nav-folder') || child.classList.contains('tree-item');
      if (hasSvg && !isSearch && !isNav) return child;
    }

    return null;
  }

  function buildToggle() {
    if (document.querySelector('.hc-toggle-row')) return;

    var toggleRow = findThemeToggleRow();
    if (!toggleRow) return;

    // Build: [pill-track > icon + thumb]  (icon inside track, opposite the thumb)
    var row = document.createElement('div');
    row.className = 'hc-toggle-row';
    row.setAttribute('role', 'switch');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', 'Toggle high contrast mode');
    row.setAttribute('title', 'High Contrast');

    var icon = document.createElement('span');
    icon.className = 'hc-toggle-row__icon';
    icon.innerHTML = HC_ICON_SVG;

    var track = document.createElement('div');
    track.className = 'hc-toggle-row__track';
    var thumb = document.createElement('div');
    thumb.className = 'hc-toggle-row__thumb';
    track.appendChild(icon);
    track.appendChild(thumb);

    row.appendChild(track);

    function updateAria() {
      var on = document.body.classList.contains('high-contrast');
      row.setAttribute('aria-checked', on ? 'true' : 'false');
    }

    row.addEventListener('click', function (e) {
      e.stopPropagation();
      var nowOn = !document.body.classList.contains('high-contrast');
      applyHighContrast(nowOn);
      updateAria();
    });

    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        row.click();
      }
    });

    // Append INSIDE the same row that contains the dark mode toggle
    toggleRow.appendChild(row);

    // Ensure the row is flex so everything sits side-by-side
    toggleRow.style.display = 'flex';
    toggleRow.style.alignItems = 'center';
    toggleRow.style.gap = '0';

    updateAria();
  }

  function init() {
    applyHighContrast(restorePreference());
    buildToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 200); });
  } else {
    setTimeout(init, 200);
  }

  // Re-inject if sidebar re-renders (SPA navigation)
  var hcObserver = new MutationObserver(function () {
    if (!document.querySelector('.hc-toggle-row')) {
      buildToggle();
    }
  });

  function observeSidebar() {
    var target = document.querySelector('.site-body-left-column');
    if (target) {
      hcObserver.observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(observeSidebar, 300); });
  } else {
    setTimeout(observeSidebar, 300);
  }
})();
