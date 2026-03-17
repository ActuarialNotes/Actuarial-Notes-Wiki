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
    if (examNavs.length === 0) {
      document.querySelectorAll('.exam-nav__sticky').forEach(function (s) {
        s.remove();
      });
      // Reset persistent tabs position and trigger update
      window._syncPersistentOffset = null;
      var persistentNav = document.querySelector('.persistent-exam-navs');
      if (persistentNav) persistentNav.style.right = '';
      if (typeof window._updatePersistentExamNavs === 'function') {
        setTimeout(window._updatePersistentExamNavs, 100);
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

  function buildExamNav(container) {
    // Parse data attributes
    const customColor = container.dataset.color;
    const currentData = parseExamData(container.dataset.current);
    const tracks = parseTracks(container.dataset.tracks);

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
    if (customColor) {
      sticky.style.setProperty('--nav-color', customColor);
      sticky.style.setProperty('--nav-color-hover', customColor);
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

    // Concepts list in sticky
    var stickyLoSection = document.createElement('div');
    stickyLoSection.className = 'exam-nav__lo-section exam-nav__sticky-lo';
    stickyContent.appendChild(stickyLoSection);

    // Load concepts into sticky panel
    function loadStickyObjectives() {
      var objectives = parseObjectivesFromDOM(container);
      if (objectives.length > 0) {
        renderExamNavObjectives(stickyLoSection, objectives, container);
      } else {
        var pagePath = decodeURIComponent(window.location.pathname.replace(/^\//, ''));
        if (!pagePath) pagePath = document.title;
        fetchExamNavObjectives(pagePath).then(function (objs) {
          renderExamNavObjectives(stickyLoSection, objs, container);
        }).catch(function () {});
      }
    }
    setTimeout(loadStickyObjectives, 200);

    // ── Embed download dropdown ─────────────────────────
    var dlEl = pageEl ? pageEl.querySelector('.download-dropdown') : null;
    if (dlEl) {
      var dlFilesRaw = dlEl.dataset.files || '';
      var dlColor = dlEl.dataset.color || customColor || '#2563eb';
      var dlLabel = dlEl.dataset.label || 'Downloads';
      var dlFiles = dlFilesRaw.split(',').map(function (entry) {
        var parts = entry.trim().split('|');
        return { name: parts[0] || '', url: parts[1] || '#' };
      }).filter(function (f) { return f.name; });

      if (dlFiles.length > 0) {
        var dlSection = document.createElement('div');
        dlSection.className = 'exam-nav__sticky-downloads';
        dlSection.style.setProperty('--dl-color', dlColor);

        var dlIconSvg = '<svg class="dl-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
          '<polyline points="7 10 12 15 17 10"/>' +
          '<line x1="12" y1="15" x2="12" y2="3"/>' +
          '</svg>';

        if (dlFiles.length === 1) {
          // Single file — direct link
          var singleLink = document.createElement('a');
          singleLink.className = 'dl-dropdown__single';
          singleLink.href = dlFiles[0].url;
          singleLink.target = '_blank';
          singleLink.rel = 'noopener noreferrer';
          singleLink.innerHTML = dlIconSvg + '<span>' + dlFiles[0].name + '</span>';
          dlSection.appendChild(singleLink);
        } else {
          // Multiple files — full dropdown (reuse dl-dropdown classes)
          var wrapper = document.createElement('div');
          wrapper.className = 'dl-dropdown__wrap';

          var trigger = document.createElement('button');
          trigger.className = 'dl-dropdown__trigger';
          trigger.type = 'button';
          trigger.innerHTML = dlIconSvg +
            '<span>' + dlLabel + '</span>' +
            '<svg class="dl-dropdown__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

          var menu = document.createElement('div');
          menu.className = 'dl-dropdown__menu';
          menu.innerHTML = '<div class="dl-dropdown__menu-header">Select a file</div>';

          dlFiles.forEach(function (file) {
            var item = document.createElement('a');
            item.className = 'dl-dropdown__menu-item';
            item.href = file.url;
            item.target = '_blank';
            item.rel = 'noopener noreferrer';
            item.innerHTML =
              '<span class="dl-dropdown__menu-item-name">' + file.name + '</span>' +
              '<svg class="dl-dropdown__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
                '<polyline points="7 10 12 15 17 10"/>' +
                '<line x1="12" y1="15" x2="12" y2="3"/>' +
              '</svg>';
            item.addEventListener('click', function () {
              wrapper.classList.remove('is-open');
            });
            menu.appendChild(item);
          });

          trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            wrapper.classList.toggle('is-open');
          });

          wrapper.appendChild(trigger);
          wrapper.appendChild(menu);
          dlSection.appendChild(wrapper);
        }

        stickyContent.appendChild(dlSection);
      }

      // Hide original download-dropdown so the separate IIFE doesn't render it
      dlEl.dataset.built = 'true';
      dlEl.style.display = 'none';
    }

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

    // Handle internal link clicks — Obsidian's SPA router doesn't reach
    // the sticky bar since it's outside the page content container.
    // Use window.open(_self) pattern (same as journey tracker).
    sticky.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link');
      if (link) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeSticky();
        var href = link.getAttribute('href');
        if (href) {
          var url = href.startsWith('http') ? href
            : window.location.origin + (href.startsWith('/') ? '' : '/') + href;
          window.open(url, '_self');
        }
      }
    }, true);

    sticky.appendChild(stickyBtn);
    sticky.appendChild(stickyContent);
    // Insert into body so fixed positioning works cleanly
    document.body.appendChild(sticky);
    container._stickyEl = sticky;

    // Offset persistent tabs to sit left of the sticky tab
    function syncPersistentOffset() {
      var stickyRect = stickyBtn.getBoundingClientRect();
      var persistentNav = document.querySelector('.persistent-exam-navs');
      if (persistentNav) {
        persistentNav.style.right = (stickyRect.width + 6) + 'px';
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

})();


/* ===========================================================
   SIDEBAR TABS
   Modern 4-tab sidebar: Library, Process, Exams, Practice.
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

  var SVG_PLUS = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></svg>';

  var SVG_BOOK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4c0-1 1-2 3-2s4 1 5 2c1-1 3-2 5-2s3 1 3 2v11c0 .5-.5 1-1 1-.5 0-1.5-.5-4-.5s-3 1-3 1-1-1-3-1-3.5.5-4 .5c-.5 0-1-.5-1-1V4z"/><path d="M10 6v10"/></svg>';

  var SVG_TRASH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 6 5 16 15 16 15 6"/><line x1="3" y1="6" x2="17" y2="6"/><path d="M8 6V4h4v2"/></svg>';

  var SVG_EDIT = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 3.5l5 5L6 19H1v-5L11.5 3.5z"/></svg>';

  /* Tab icons */
  var SVG_TAB_LIBRARY = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4c0-1 1-2 3-2s4 1 5 2c1-1 3-2 5-2s3 1 3 2v11c0 .5-.5 1-1 1-.5 0-1.5-.5-4-.5s-3 1-3 1-1-1-3-1-3.5.5-4 .5c-.5 0-1-.5-1-1V4z"/><path d="M10 6v10"/></svg>';

  var SVG_TAB_PROCESS = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2" width="14" height="5" rx="1"/><rect x="3" y="13" width="14" height="5" rx="1"/><path d="M10 7v2m0 2v2"/><path d="M7 11h6"/></svg>';

  var SVG_TAB_EXAMS = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h9l4 4v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><polyline points="13 2 13 6 17 6"/><line x1="6" y1="10" x2="14" y2="10"/><line x1="6" y1="13" x2="14" y2="13"/><line x1="6" y1="16" x2="10" y2="16"/></svg>';

  var SVG_TAB_PRACTICE = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2l5 5-10 10H3v-5L13 2z"/><path d="M11 4l5 5"/></svg>';

  var SVG_HC_ICON = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5"/>' +
    '<path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/></svg>';

  var SVG_SPEAKER_ON = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 7 7 7 12 3 12 17 7 13 3 13"/><path d="M15 7a4 4 0 0 1 0 6"/></svg>';

  var SVG_SPEAKER_OFF = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 7 7 7 12 3 12 17 7 13 3 13"/><line x1="15" y1="8" x2="19" y2="12"/><line x1="19" y1="8" x2="15" y2="12"/></svg>';

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
    { id: 'library',  label: 'Library',  icon: SVG_TAB_LIBRARY },
    { id: 'process',  label: 'Process',  icon: SVG_TAB_PROCESS },
    { id: 'exams',    label: 'Exams',    icon: SVG_TAB_EXAMS },
    { id: 'practice', label: 'Practice', icon: SVG_TAB_PRACTICE }
  ];

  /* ---- Practice exams list ---- */
  var PRACTICE_EXAMS = [
    { key: 'P',  name: 'Exam P-1 (Probability)',            path: 'Exam P-1 (SOA)' },
    { key: 'FM', name: 'Exam FM-2 (Financial Mathematics)',  path: 'Exam FM-2 (SOA)' }
  ];

  /* ---- Track definitions ---- */
  var TRACKS = [
    {
      key: 'ASA',
      name: 'ASA (SOA)',
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
            { id: 'MAS-I',    name: 'Exam MAS-I',    path: null, color: 'violet' },
            { id: 'MAS-II',   name: 'Exam MAS-II',   path: null, color: 'violet' },
            { id: 'CAS-IA',   name: 'CAS DISC IA',   path: null, color: 'fuchsia' },
            { id: 'CAS-DA',   name: 'CAS DISC DA',   path: null, color: 'fuchsia' },
            { id: 'CAS-RM',   name: 'CAS DISC RM',   path: null, color: 'fuchsia' },
            { id: 'CAS-5',    name: 'Exam 5',         path: null, color: 'pink' },
            { id: 'CAS-PCPA', name: 'PCPA',           path: null, color: 'rose' },
            { id: 'CAS-6',    name: 'Exam 6',         path: null, color: 'orange' },
            { id: 'CAS-APC',  name: 'APC',            path: null, color: 'slate' }
          ]
        }
      ]
    },
    {
      key: 'FSA',
      name: 'FSA (SOA)',
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
          collapsed: true,
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
      sections: [
        {
          label: 'ACAS Requirements',
          collapsed: true,
          items: [
            { id: 'VEE-ECON', name: 'VEE Economics',             path: null, color: 'sky' },
            { id: 'VEE-AF',   name: 'VEE Accounting & Finance',  path: null, color: 'sky' },
            { id: 'P',      name: 'Exam P-1',     path: 'Exam P-1 (SOA)', color: 'blue' },
            { id: 'FM',     name: 'Exam FM-2',     path: 'Exam FM-2 (SOA)', color: 'indigo' },
            { id: 'MAS-I',  name: 'Exam MAS-I',    path: null, color: 'violet' },
            { id: 'MAS-II', name: 'Exam MAS-II',   path: null, color: 'violet' },
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
  var journeyState = { selectedTrack: 'ASA', progress: {} };

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
    try { activeTab = localStorage.getItem(TAB_KEY) || 'exams'; } catch (e) { /* ignore */ }
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

  /* ---- HTML escaping ---- */
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

    // High contrast toggle
    var hcBtn = document.createElement('button');
    hcBtn.className = 'sidebar-tabs__utility-btn';
    hcBtn.type = 'button';
    hcBtn.title = 'High Contrast';
    hcBtn.innerHTML = SVG_HC_ICON;
    if (document.body.classList.contains('high-contrast')) hcBtn.classList.add('is-active');
    hcBtn.addEventListener('click', function () {
      var on = document.body.classList.toggle('high-contrast');
      try { localStorage.setItem('actuarial-notes-high-contrast', on ? '1' : '0'); } catch (e) {}
      hcBtn.classList.toggle('is-active', on);
    });
    utilBar.appendChild(hcBtn);

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
      case 'library':  renderLibraryPanel(content);  break;
      case 'process':  renderProcessPanel(content);  break;
      case 'exams':    renderExamsPanel(content);     break;
      case 'practice': renderPracticePanel(content);  break;
    }

    panelEl.appendChild(content);
  }

  /* ============================================================
     LIBRARY TAB
     ============================================================ */
  function renderLibraryPanel(container) {
    var docs = (typeof window._getLibraryDocs === 'function') ? window._getLibraryDocs() : [];

    // Header + upload button
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:10px';

    var titleRow = document.createElement('div');
    titleRow.className = 'sidebar-tabs__panel-header';
    var title = document.createElement('span');
    title.className = 'sidebar-tabs__panel-title';
    title.textContent = 'Document Library';
    var countSpan = document.createElement('span');
    countSpan.className = 'sidebar-tabs__panel-count';
    countSpan.textContent = docs.length > 0 ? String(docs.length) : '';
    titleRow.appendChild(title);
    titleRow.appendChild(countSpan);
    header.appendChild(titleRow);

    var uploadBtn = document.createElement('button');
    uploadBtn.className = 'sidebar-tabs__btn sidebar-tabs__btn--primary';
    uploadBtn.type = 'button';
    uploadBtn.innerHTML = '<span class="sidebar-tabs__btn-icon">' + SVG_PLUS + '</span> Upload';
    uploadBtn.style.cssText = 'font-size:0.75rem;padding:5px 10px';
    uploadBtn.addEventListener('click', function () {
      if (typeof window._openLibraryUploadModal === 'function') window._openLibraryUploadModal();
    });
    header.appendChild(uploadBtn);
    container.appendChild(header);

    if (docs.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'sidebar-tabs__empty';
      empty.innerHTML =
        '<div class="sidebar-tabs__empty-icon">' + SVG_BOOK + '</div>' +
        '<div class="sidebar-tabs__empty-title">No documents yet</div>' +
        '<div class="sidebar-tabs__empty-desc">Upload textbooks, articles, or lecture notes to build your library.</div>';
      container.appendChild(empty);
      return;
    }

    // Document list
    docs.forEach(function (doc) {
      var item = document.createElement('div');
      item.className = 'library-panel__doc-item';

      var color = getDocColor(doc.id);
      var initials = getDocInitials(doc.title);

      var avatar = document.createElement('div');
      avatar.className = 'library-panel__doc-avatar';
      avatar.style.background = color;
      avatar.textContent = initials;

      var info = document.createElement('div');
      info.className = 'library-panel__doc-info';

      var docTitle = document.createElement('div');
      docTitle.className = 'library-panel__doc-title';
      docTitle.textContent = doc.title || 'Untitled Document';

      var meta = document.createElement('div');
      meta.className = 'library-panel__doc-meta';
      var tocCount = (doc.toc || []).length;
      var glossaryCount = (doc.glossary || []).length;
      var isSourceOnly = !doc.pdfText && tocCount === 0 && glossaryCount === 0;

      if (isSourceOnly) {
        // Source-only document: show author, year, type
        var metaParts = [];
        if (doc.author) metaParts.push(doc.author);
        if (doc.year) metaParts.push(String(doc.year));
        if (doc.sourceType) metaParts.push(doc.sourceType.charAt(0).toUpperCase() + doc.sourceType.slice(1));
        meta.textContent = metaParts.length > 0 ? metaParts.join(' · ') : 'Source reference';
      } else {
        meta.textContent = (doc.author ? doc.author + ' · ' : '') + tocCount + ' sections · ' + glossaryCount + ' terms';
      }

      var badges = document.createElement('div');
      badges.className = 'library-panel__doc-badges';
      if (isSourceOnly) {
        if (doc.sourceType) {
          var typeBadge = document.createElement('span');
          typeBadge.className = 'library-panel__badge library-panel__badge--active';
          typeBadge.textContent = doc.sourceType.charAt(0).toUpperCase() + doc.sourceType.slice(1);
          badges.appendChild(typeBadge);
        }
      } else {
        if (tocCount > 0) {
          var tocBadge = document.createElement('span');
          tocBadge.className = 'library-panel__badge library-panel__badge--active';
          tocBadge.textContent = 'TOC';
          badges.appendChild(tocBadge);
        }
        if (glossaryCount > 0) {
          var termBadge = document.createElement('span');
          termBadge.className = 'library-panel__badge library-panel__badge--active';
          termBadge.textContent = 'Terms';
          badges.appendChild(termBadge);
        }
      }

      info.appendChild(docTitle);
      info.appendChild(meta);
      info.appendChild(badges);

      item.appendChild(avatar);
      item.appendChild(info);

      item.addEventListener('click', function () {
        if (typeof window._openLibraryDocPage === 'function') window._openLibraryDocPage(doc.id);
      });

      container.appendChild(item);
    });
  }

  function getDocColor(id) {
    var colors = ['#2563eb', '#7c3aed', '#dc2626', '#059669', '#d97706', '#db2777', '#0891b2', '#4f46e5'];
    var hash = 0;
    var s = String(id);
    for (var i = 0; i < s.length; i++) hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
    return colors[Math.abs(hash) % colors.length];
  }

  function getDocInitials(title) {
    if (!title) return '?';
    var words = title.split(/\s+/).filter(function (w) { return w.length > 0; });
    if (words.length === 0) return '?';
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  /* ============================================================
     DOCUMENT PROCESSING TAB
     ============================================================ */
  function renderProcessPanel(container) {
    var docs = (typeof window._getLibraryDocs === 'function') ? window._getLibraryDocs() : [];

    var title = document.createElement('div');
    title.className = 'sidebar-tabs__panel-header';
    title.innerHTML = '<span class="sidebar-tabs__panel-title">Document Processing</span>';
    container.appendChild(title);

    if (docs.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'sidebar-tabs__empty';
      empty.innerHTML =
        '<div class="sidebar-tabs__empty-icon">' + SVG_TAB_PROCESS + '</div>' +
        '<div class="sidebar-tabs__empty-title">No documents to process</div>' +
        '<div class="sidebar-tabs__empty-desc">Upload a document in the Library tab first, then come here to extract structured content.</div>';
      container.appendChild(empty);
      return;
    }

    // Document selector
    var selectLabel = document.createElement('div');
    selectLabel.style.cssText = 'font-size:0.78rem;color:var(--text-dim);margin-bottom:4px';
    selectLabel.textContent = 'Select document:';
    container.appendChild(selectLabel);

    var select = document.createElement('select');
    select.className = 'sidebar-tabs__select';
    var defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Choose a document...';
    select.appendChild(defaultOpt);
    docs.forEach(function (doc) {
      var opt = document.createElement('option');
      opt.value = doc.id;
      opt.textContent = doc.title || 'Untitled';
      select.appendChild(opt);
    });
    container.appendChild(select);

    // Results area (below actions)
    var resultsArea = document.createElement('div');
    resultsArea.style.cssText = 'margin-top:12px';

    // Action cards
    var grid = document.createElement('div');
    grid.className = 'docproc-panel__action-grid';

    var tocCard = createActionCard('Extract Table of Contents',
      'View the hierarchical outline of the document structure.',
      function () {
        var docId = select.value;
        if (!docId) { alert('Please select a document first.'); return; }
        var doc = findDoc(docId, docs);
        if (!doc) return;
        renderTocViewer(resultsArea, doc);
      });
    grid.appendChild(tocCard);

    var termsCard = createActionCard('Extract Terms & Definitions',
      'View key terms with multi-layered definitions (mathematical, technical, experiential).',
      function () {
        var docId = select.value;
        if (!docId) { alert('Please select a document first.'); return; }
        renderTermsViewer(resultsArea, docId, docs);
      });
    grid.appendChild(termsCard);

    var moreCard = createActionCard('More Formats',
      'Summaries, key assumptions, formula sheets — coming soon.',
      null);
    moreCard.classList.add('is-disabled');
    grid.appendChild(moreCard);

    container.appendChild(grid);
    container.appendChild(resultsArea);
  }

  function findDoc(docId, docs) {
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].id === docId) return docs[i];
    }
    return null;
  }

  function renderTocViewer(container, doc) {
    container.innerHTML = '';
    var toc = doc.toc || [];
    if (toc.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'sidebar-tabs__empty';
      empty.innerHTML = '<div class="sidebar-tabs__empty-title">No TOC data</div>' +
        '<div class="sidebar-tabs__empty-desc">This document has no table of contents extracted yet.</div>';
      container.appendChild(empty);
      return;
    }

    var header = document.createElement('div');
    header.className = 'sidebar-tabs__panel-header';
    header.innerHTML = '<span class="sidebar-tabs__panel-title">Table of Contents</span>' +
      '<span class="sidebar-tabs__panel-count">' + toc.length + '</span>';
    container.appendChild(header);

    var list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';
    toc.forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'docproc-panel__toc-item';
      var level = item.level || item.depth || 0;
      row.style.paddingLeft = (level * 14) + 'px';

      var titleEl = document.createElement('span');
      titleEl.className = 'docproc-panel__toc-title';
      var vals = Object.values(item);
      titleEl.textContent = item.title || item.name || item.text || (typeof vals[0] === 'string' ? vals[0] : 'Untitled');
      row.appendChild(titleEl);

      if (item.page || item.pageNum) {
        var pageEl = document.createElement('span');
        pageEl.className = 'docproc-panel__toc-page';
        pageEl.textContent = 'p.' + (item.page || item.pageNum);
        row.appendChild(pageEl);
      }

      list.appendChild(row);
    });
    container.appendChild(list);
  }

  function createActionCard(titleText, descText, onClick) {
    var card = document.createElement('div');
    card.className = 'docproc-panel__action-card';
    var t = document.createElement('div');
    t.className = 'docproc-panel__action-title';
    t.textContent = titleText;
    var d = document.createElement('div');
    d.className = 'docproc-panel__action-desc';
    d.textContent = descText;
    card.appendChild(t);
    card.appendChild(d);
    if (onClick) card.addEventListener('click', onClick);
    return card;
  }

  function renderTermsViewer(container, docId, docs) {
    container.innerHTML = '';
    if (!docId) return;

    var doc = null;
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].id === docId) { doc = docs[i]; break; }
    }
    if (!doc || !(doc.glossary && doc.glossary.length > 0)) {
      var empty = document.createElement('div');
      empty.className = 'sidebar-tabs__empty';
      empty.innerHTML = '<div class="sidebar-tabs__empty-title">No terms found</div>' +
        '<div class="sidebar-tabs__empty-desc">This document has no terms & definitions extracted yet.</div>';
      container.appendChild(empty);
      return;
    }

    var header = document.createElement('div');
    header.className = 'sidebar-tabs__panel-header';
    header.innerHTML = '<span class="sidebar-tabs__panel-title">Terms</span>' +
      '<span class="sidebar-tabs__panel-count">' + doc.glossary.length + '</span>';
    container.appendChild(header);

    doc.glossary.forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'docproc-panel__term-card';

      var vals = Object.values(entry);
      var termText = entry.term || entry.name || entry.title || (typeof vals[0] === 'string' ? vals[0] : '');

      var name = document.createElement('div');
      name.className = 'docproc-panel__term-name';
      name.textContent = termText;
      card.appendChild(name);

      if (entry.page) {
        var page = document.createElement('div');
        page.className = 'docproc-panel__term-page';
        page.textContent = 'Page ' + entry.page;
        card.appendChild(page);
      }

      // Definition — support multi-layered or single
      var defs = entry.definitions || null;
      var singleDef = entry.definition || entry.description || entry.def || (typeof vals[1] === 'string' ? vals[1] : '');

      if (defs && (defs.mathematical || defs.technical || defs.experiential)) {
        // Multi-layered definitions with tabs
        var defTabs = document.createElement('div');
        defTabs.className = 'docproc-panel__def-tabs';
        var defContent = document.createElement('div');
        defContent.className = 'docproc-panel__def-content';

        var types = [
          { key: 'mathematical', label: 'Math' },
          { key: 'technical', label: 'Technical' },
          { key: 'experiential', label: 'Intuitive' }
        ];

        var firstActive = null;
        types.forEach(function (type) {
          var tab = document.createElement('button');
          tab.className = 'docproc-panel__def-tab';
          tab.type = 'button';
          tab.textContent = type.label;
          if (!defs[type.key]) {
            tab.classList.add('is-empty');
          } else if (!firstActive) {
            firstActive = type.key;
            tab.classList.add('is-active');
            defContent.textContent = defs[type.key];
          }
          tab.addEventListener('click', function () {
            if (!defs[type.key]) return;
            var allTabs = defTabs.querySelectorAll('.docproc-panel__def-tab');
            for (var j = 0; j < allTabs.length; j++) allTabs[j].classList.remove('is-active');
            tab.classList.add('is-active');
            defContent.textContent = defs[type.key];
          });
          defTabs.appendChild(tab);
        });

        card.appendChild(defTabs);
        card.appendChild(defContent);
      } else if (singleDef) {
        var defEl = document.createElement('div');
        defEl.className = 'docproc-panel__def-content';
        defEl.textContent = singleDef;
        card.appendChild(defEl);
      }

      container.appendChild(card);
    });
  }

  /* ============================================================
     EXAMS TAB
     ============================================================ */
  function renderExamsPanel(container) {
    // Add Custom Exam button at top
    var addExamBtn = document.createElement('button');
    addExamBtn.className = 'sidebar-tabs__btn sidebar-tabs__btn--primary sidebar-tabs__btn--full';
    addExamBtn.type = 'button';
    addExamBtn.innerHTML = '<span class="sidebar-tabs__btn-icon">' + SVG_PLUS + '</span> Add Custom Exam';
    addExamBtn.addEventListener('click', function () {
      if (typeof window._openCustomExamModal === 'function') window._openCustomExamModal();
    });
    container.appendChild(addExamBtn);

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

    // Track selector
    var select = document.createElement('select');
    select.className = 'sidebar-tabs__select';
    TRACKS.forEach(function (t) {
      var opt = document.createElement('option');
      opt.value = t.key;
      opt.textContent = t.name;
      select.appendChild(opt);
    });
    select.value = journeyState.selectedTrack;
    container.appendChild(select);

    // Progress bar
    var bar = document.createElement('div');
    bar.className = 'sidebar-tabs__progress-bar';
    barFillEl = document.createElement('div');
    barFillEl.className = 'sidebar-tabs__progress-fill';
    bar.appendChild(barFillEl);
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
            var slug = item.path.replace(/ /g, '+');
            nameEl.href = window.location.origin + '/' + slug;
            nameEl.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopImmediatePropagation();
              window.open(window.location.origin + '/' + slug, '_self');
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
    });

    renderTrackSections();
    updateExamsProgress();

    // Divider before custom exams
    var divider = document.createElement('div');
    divider.style.cssText = 'height:1px;background:var(--sb-border);margin:12px 0';
    container.appendChild(divider);

    // Custom Exams section
    renderCustomExamsSection(container);
  }

  function updateExamsProgress() {
    var track = TRACKS.find(function (t) { return t.key === journeyState.selectedTrack; });
    if (!track) return;

    var counts = getTrackCounts(track);
    if (countEl) countEl.textContent = counts.done + ' / ' + counts.total;
    if (barFillEl) {
      var pct = counts.total > 0 ? Math.round((counts.done / counts.total) * 100) : 0;
      barFillEl.style.width = pct + '%';
    }

    updatePersistentExamNavs();
  }

  function renderCustomExamsSection(container) {
    var customExams = (typeof window._getCustomExams === 'function') ? window._getCustomExams() : [];

    if (customExams.length === 0) return;

    var header = document.createElement('div');
    header.className = 'sidebar-tabs__panel-header';
    header.innerHTML = '<span class="sidebar-tabs__panel-title">My Custom Exams</span>' +
      '<span class="sidebar-tabs__panel-count">' + customExams.length + '</span>';
    container.appendChild(header);

    var list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:1px';

    customExams.forEach(function (exam) {
      var item = document.createElement('div');
      item.className = 'exams-panel__custom-item';

      var dot = document.createElement('span');
      dot.className = 'exams-panel__custom-dot';
      dot.style.background = exam.color || '#2563eb';

      var name = document.createElement('span');
      name.className = 'exams-panel__custom-name';
      name.textContent = exam.name;

      var actions = document.createElement('span');
      actions.className = 'exams-panel__custom-actions';

      var editBtn = document.createElement('button');
      editBtn.className = 'exams-panel__custom-action';
      editBtn.type = 'button';
      editBtn.title = 'Edit';
      editBtn.innerHTML = SVG_EDIT;
      editBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (typeof window._openEditExamModal === 'function') window._openEditExamModal(exam.id);
      });

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'exams-panel__custom-action exams-panel__custom-action--danger';
      deleteBtn.type = 'button';
      deleteBtn.title = 'Delete';
      deleteBtn.innerHTML = SVG_TRASH;
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (typeof window._deleteCustomExam === 'function') {
          window._deleteCustomExam(exam.id);
          refreshTab('exams');
        }
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      item.appendChild(dot);
      item.appendChild(name);
      item.appendChild(actions);

      item.addEventListener('click', function () {
        if (typeof window._openExamViewer === 'function') window._openExamViewer(exam.id);
      });

      list.appendChild(item);
    });

    container.appendChild(list);
  }

  /* ============================================================
     PRACTICE TAB
     ============================================================ */

  function renderPracticePanel(container) {
    var empty = document.createElement('div');
    empty.className = 'sidebar-tabs__empty';
    empty.style.paddingTop = '3rem';
    empty.innerHTML =
      '<div class="sidebar-tabs__empty-icon">' + SVG_TAB_PRACTICE + '</div>' +
      '<div class="sidebar-tabs__empty-title">Coming Soon!</div>' +
      '<div class="sidebar-tabs__empty-desc">Exam prep mode and work problem mode are on the way. Stay tuned.</div>';
    container.appendChild(empty);
  }

  /* (Practice sub-functions removed — coming soon placeholder only) */

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
        var slug = exam.path.replace(/ /g, '+');
        tab.href = window.location.origin + '/' + slug;
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          window.open(window.location.origin + '/' + slug, '_self');
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

    if (!window._persistentNavCloseRegistered) {
      window._persistentNavCloseRegistered = true;
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.persistent-exam-navs')) {
          var c = document.querySelector('.persistent-exam-navs');
          if (c) c.classList.remove('is-expanded');
        }
      });
    }
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
  }

  // Expose API for cross-IIFE access
  window._updatePersistentExamNavs = updatePersistentExamNavs;
  window._sidebarTabs = { refresh: refreshTab };

  // Re-check persistent navs on SPA navigation
  window.addEventListener('popstate', function () {
    setTimeout(updatePersistentExamNavs, 250);
  });
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
    if (link) {
      setTimeout(updatePersistentExamNavs, 300);
      setTimeout(updatePersistentExamNavs, 600);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 250); });
  } else {
    setTimeout(init, 250);
  }

  // Re-inject if sidebar re-renders (SPA navigation)
  var stObserver = new MutationObserver(function () {
    if (!document.querySelector('.sidebar-tabs')) {
      containerEl = null;
      panelEl = null;
      barFillEl = null;
      countEl = null;
      buildSidebarTabs();
    }
  });

  function observeSidebar() {
    var target = document.querySelector('.site-body-left-column');
    if (target) {
      stObserver.observe(target, { childList: true, subtree: true });
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
    }
    return ctx;
  }

  // Mobile browsers keep AudioContext suspended until a user gesture handler
  // calls resume(). Re-run on every gesture in case of re-suspension (tab
  // switches, lock-screen, etc.).
  // Always play a silent 1-sample buffer: iOS Safari can silently deactivate
  // the audio session even while ac.state === 'running' (e.g. after page
  // layout changes).  Re-activating it on every touchstart is the safest fix.
  // IMPORTANT: the silent buffer must be played *after* resume() resolves —
  // calling start() on a suspended context throws a DOMException (caught
  // silently) meaning the iOS audio session never actually gets activated.
  function unlockAudio() {
    var ac = getCtx();
    function playSilent() {
      try {
        var buf = ac.createBuffer(1, 1, ac.sampleRate);
        var src = ac.createBufferSource();
        src.buffer = buf;
        src.connect(ac.destination);
        src.start(0);
      } catch (e) {}
    }
    if (ac.state === 'running') {
      playSilent();
    } else {
      ac.resume().then(playSilent).catch(function () {});
    }
  }
  document.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });
  document.addEventListener('click', unlockAudio, true);

  // Ensure AudioContext is running before scheduling audio.
  // On mobile, resume() is async — scheduling at a frozen currentTime
  // produces silent or quiet playback.  This helper waits for 'running'
  // state so that currentTime is accurate when the callback fires.
  function ensureRunning(cb) {
    var ac = getCtx();
    if (ac.state === 'running') { cb(ac); return; }
    ac.resume().then(function () { cb(ac); }).catch(function () {});
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
    toggleMute: toggleMute
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
  var _sfxLock = false;

  document.addEventListener('click', function (e) {
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
    setTimeout(function () { _sfxLock = false; }, 60);
  }, true);

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
   HIGH CONTRAST — Restore preference on load
   (Toggle UI is now in the sidebar tabs utility bar)
   =========================================================== */

(function () {
  'use strict';

  function restoreHighContrast() {
    try {
      if (localStorage.getItem('actuarial-notes-high-contrast') === '1') {
        document.body.classList.add('high-contrast');
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restoreHighContrast);
  } else {
    restoreHighContrast();
  }
})();


/* ═══════════════════════════════════════════════════════════════════════
   7. READ-ALOUD BUTTON — replaces native heading anchor with a speaker
      icon that reads the section content aloud via SpeechSynthesis API
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  if (!window.speechSynthesis) return;

  // ── SVG icons ──────────────────────────────────────────────────────
  var SPEAK_SVG =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>' +
    '<path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M19.07 4.93a10 10 0 010 14.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>';

  var STOP_SVG =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>' +
    '</svg>';

  // ── State ──────────────────────────────────────────────────────────
  var currentUtterance = null;
  var currentBtn = null;
  var keepAliveTimer = null;

  // ── Helpers ────────────────────────────────────────────────────────
  function resetBtn(btn) {
    btn.innerHTML = SPEAK_SVG;
    btn.classList.remove('is-speaking');
    btn.setAttribute('aria-label', 'Read this section aloud');
    if (btn === currentBtn) {
      currentBtn = null;
      currentUtterance = null;
    }
  }

  function stopSpeech() {
    window.speechSynthesis.cancel();
    if (keepAliveTimer) { clearInterval(keepAliveTimer); keepAliveTimer = null; }
    if (currentBtn) resetBtn(currentBtn);
    currentUtterance = null;
    currentBtn = null;
  }

  function getTextBetweenHeadings(heading) {
    var level = parseInt(heading.tagName.charAt(1), 10);
    var parts = [heading.textContent.trim()];

    // In Obsidian Publish each block is wrapped in a div, so walk
    // siblings of the wrapper div rather than the heading itself.
    var wrapper = heading.parentElement;
    var sibling = wrapper.nextElementSibling;

    while (sibling) {
      // Check if this sibling (or its child) is a heading
      var childHeading = sibling.querySelector(':is(h1, h2, h3, h4, h5, h6)');
      if (!childHeading && /^H[1-6]$/.test(sibling.tagName)) {
        childHeading = sibling; // flat DOM fallback
      }
      if (childHeading) {
        var sibLevel = parseInt(childHeading.tagName.charAt(1), 10);
        if (sibLevel <= level) break;
      }
      parts.push(sibling.textContent.trim());
      sibling = sibling.nextElementSibling;
    }

    return parts.filter(Boolean).join('. ');
  }

  function toggleSpeech(heading, btn) {
    // If this heading is already speaking, stop it
    if (currentBtn === btn && window.speechSynthesis.speaking) {
      stopSpeech();
      return;
    }

    // Stop any other speech first
    if (window.speechSynthesis.speaking) {
      stopSpeech();
    }

    var text = getTextBetweenHeadings(heading);
    if (!text) return;

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'en-US';
    currentUtterance.rate = 1.0;
    currentBtn = btn;

    btn.innerHTML = STOP_SVG;
    btn.classList.add('is-speaking');
    btn.setAttribute('aria-label', 'Stop reading');

    currentUtterance.onend = function () { resetBtn(btn); };
    currentUtterance.onerror = function () { resetBtn(btn); };

    window.speechSynthesis.speak(currentUtterance);

    // Chrome workaround: speech stops after ~15s unless we pause/resume
    keepAliveTimer = setInterval(function () {
      if (!window.speechSynthesis.speaking) {
        clearInterval(keepAliveTimer);
        keepAliveTimer = null;
        return;
      }
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);
  }

  // ── Button injection ───────────────────────────────────────────────
  function injectButtons() {
    var headings = document.querySelectorAll(
      '.markdown-preview-sizer :is(h1, h2, h3, h4, h5, h6)'
    );

    headings.forEach(function (heading) {
      if (heading.querySelector('.read-aloud-btn')) return;
      // Skip headings inside embeds
      if (heading.closest('.markdown-embed')) return;

      var btn = document.createElement('button');
      btn.className = 'read-aloud-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Read this section aloud');
      btn.setAttribute('tabindex', '0');
      btn.innerHTML = SPEAK_SVG;

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSpeech(heading, btn);
      });

      heading.appendChild(btn);
    });
  }

  // ── SPA navigation handling ────────────────────────────────────────
  function onNavigate() {
    stopSpeech();
    injectButtons();
  }

  function observePageChanges() {
    window.addEventListener('popstate', function () {
      setTimeout(onNavigate, 150);
    });

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.internal-link, a[href^="/"], .nav-file-title, .tree-item-self');
      if (link) {
        var href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          setTimeout(onNavigate, 200);
          setTimeout(onNavigate, 500);
        }
      }
    });

    var rebuildTimeout;
    var observer = new MutationObserver(function () {
      clearTimeout(rebuildTimeout);
      rebuildTimeout = setTimeout(injectButtons, 200);
    });

    var container = document.querySelector('.markdown-preview-view');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }
  }

  // Stop speech when tab is hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopSpeech();
  });

  // ── Init ───────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () { injectButtons(); observePageChanges(); }, 200);
    });
  } else {
    setTimeout(function () { injectButtons(); observePageChanges(); }, 200);
  }
})();


/* ===========================================================
   CUSTOM EXAM WORKFLOW
   Sidebar button + multi-step AI-powered PDF analysis workflow.
   Lets users upload a PDF, extract learning objectives/sources/
   concepts via Anthropic Claude API, and create custom exam
   study guides stored in localStorage.
   =========================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'actuarial-notes-custom-exams';
  var INVITE_CODE_KEY = 'actuarial-notes-invite-code';
  var PROMPTS_KEY = 'actuarial-notes-exam-prompts';
  var API_PROXY_URL = 'https://actuarial-notes-wiki-server.vercel.app/api/chat';
  var PDFJS_VERSION = '4.0.379';
  var PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VERSION;

  var DEFAULT_OBJECTIVES_PROMPT = 'You are an expert actuarial exam content analyst. Analyze the provided document and extract the learning objectives.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "examTitle": "Short exam or course name",\n  "examDescription": "1-2 sentence overview of the exam/document",\n  "objectives": [\n    {\n      "title": "Learning Objective Title",\n      "weight": 25,\n      "concepts": [\n        {\n          "name": "Concept Name",\n          "description": "Clear 1-3 sentence description of this concept"\n        }\n      ]\n    }\n  ]\n}\n\nRules:\n- weight is a percentage (number) if found in the document, otherwise null\n- Each objective should have 2-8 relevant concepts\n- Extract ALL learning objectives you can identify\n- Be thorough but accurate — only include what the document supports\n- CRITICAL: concept "name" fields must use the EXACT noun phrases and terminology from the source document verbatim — do not paraphrase, rename, or generalize them\n- Group concepts logically under each objective so that closely related topics appear together\n- concept "description" should be a concise 1-2 sentence explanation of what the student needs to do or understand for that concept';

  var DEFAULT_SOURCES_PROMPT = 'You are an expert actuarial exam content analyst. Analyze the provided document and extract the required sources and references.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "sources": [\n    {\n      "title": "Source Title",\n      "author": "Author Name",\n      "year": "Year published (e.g. 2020) or null if unknown",\n      "chapters": "Relevant chapters/sections",\n      "type": "textbook"\n    }\n  ]\n}\n\nRules:\n- Sources type should be one of: textbook, paper, manual, online, syllabus\n- Extract ALL required readings, textbooks, and references mentioned\n- Include chapter/section ranges where specified\n- For year, extract the publication year or edition year if mentioned; use null if not found';

  var DEFAULT_FEEDBACK_PROMPT = 'You are an expert actuarial exam content analyst. The user has reviewed the following extracted exam content and provided feedback. Update the content based on their feedback and return the complete updated JSON.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "examTitle": "Short exam or course name",\n  "examDescription": "1-2 sentence overview",\n  "objectives": [\n    {\n      "title": "Learning Objective Title",\n      "weight": 25,\n      "concepts": [\n        {\n          "name": "Concept Name",\n          "description": "Description"\n        }\n      ]\n    }\n  ],\n  "sources": [\n    {\n      "title": "Source Title",\n      "author": "Author Name",\n      "year": "Year published or null",\n      "chapters": "Relevant chapters",\n      "type": "textbook"\n    }\n  ]\n}';

  var DEFAULT_CONCEPTS_PROMPT = 'You are an expert actuarial exam content analyst. Given the following document text and a list of concept names, find detailed definitions and explanations for each concept.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "conceptDetails": {\n    "Concept Name": "A thorough 2-5 sentence definition and explanation of this concept as described in the source document, including key formulas, relationships, or examples where relevant."\n  }\n}\n\nRules:\n- Use the EXACT concept names as keys\n- Draw definitions directly from the source document content\n- Include mathematical formulas or relationships if mentioned\n- If a concept is not found in the document, provide a brief general definition and note it was not explicitly covered\n- Be thorough but concise';

  var DEFAULT_LIBRARY_TOC_PROMPT = 'You are a document structure extraction tool. Your job is to reproduce the EXACT table of contents of this document.\n\nThe document text preserves line breaks and includes heading markers:\n- [H1] = large heading (chapter-level)\n- [H2] = medium heading (section-level)\n- Lines without markers are body text\n- Page boundaries are marked with "--- Page N ---"\n\nReturn ONLY valid JSON (no markdown, no code fences):\n{\n  "title": "Document Title",\n  "author": "Author Name or empty string if unknown",\n  "toc": [\n    { "title": "Chapter 1: Introduction to Ratemaking", "level": 1, "page": 1 },\n    { "title": "1.1 The Ratemaking Process", "level": 2, "page": 2 },\n    { "title": "1.2 Basic Terminology", "level": 2, "page": 5 },\n    { "title": "Chapter 2: Rating Manuals", "level": 1, "page": 15 },\n    { "title": "2.1 Manual Rate Components", "level": 2, "page": 16 },\n    { "title": "Appendix A: Formulas", "level": 1, "page": 200 }\n  ]\n}\n\nCRITICAL REQUIREMENTS:\n- Use [H1] and [H2] markers to identify chapter and section headings throughout the document\n- If the document contains a Table of Contents page, reproduce it EXACTLY as-is with all entries\n- List EVERY individual chapter AND every numbered subsection (e.g., 1.1, 1.2, 2.1, 2.2, 2.3, etc.)\n- Do NOT group or combine multiple chapters into summary categories\n- Do NOT invent your own section titles — use the exact titles from the document (without the [H1]/[H2] markers)\n- level 1 = chapter (e.g., "Chapter 5"), level 2 = section (e.g., "5.1", "5.2"), level 3 = subsection (e.g., "5.1.1")\n- Use a FLAT list — no nested children objects\n- Include ALL appendices, exhibits, and back matter as separate entries\n- A typical textbook should have 10-20 chapters EACH with multiple numbered subsections — expect 50-200+ total entries\n- page is the page number from the nearest "--- Page N ---" marker, or null';

  var DEFAULT_LIBRARY_GLOSSARY_PROMPT = 'You are a technical term extraction tool. Identify the important technical TERMS from this actuarial document.\n\nThe document text preserves line breaks and includes formatting markers:\n- [H1] / [H2] = heading markers (skip these as terms — they are section titles)\n- Page boundaries are marked with "--- Page N ---"\n\nReturn ONLY valid JSON (no markdown, no code fences):\n{\n  "terms": [\n    {"term": "Chain Ladder Method", "page": 12},\n    {"term": "IBNR", "page": 5},\n    {"term": "Loss Development Factor", "page": 8}\n  ]\n}\n\nCRITICAL REQUIREMENTS:\n- A "term" is a specific METHOD, FORMULA, RATIO, ACRONYM, METRIC, or TECHNICAL CONCEPT — a named thing\n- Good examples: "Bornhuetter-Ferguson Method", "Loss Ratio", "Credibility Weight", "Pure Premium", "Expense Ratio", "Combined Ratio"\n- BAD examples (DO NOT include): chapter titles like "Introduction to Ratemaking", section headings marked with [H1]/[H2], topic descriptions\n- Each entry needs only "term" (1-5 words) and "page" (from nearest "--- Page N ---" marker, or null)\n- DO NOT include definitions — just the term names and page numbers\n- Extract 30-80 of the MOST IMPORTANT terms from the document\n- Include: named methods, formulas, statistical techniques, ratios, acronyms, regulatory terms, and technical vocabulary';

  var DEFAULT_LIBRARY_DEFINE_PROMPT = 'You are an actuarial science expert. Generate clear, concise definitions for the following technical terms.\n\nReturn ONLY valid JSON (no markdown, no code fences):\n{\n  "glossary": [\n    {"term": "Chain Ladder Method", "definition": "A reserving technique that uses historical loss development patterns to project ultimate losses by applying age-to-age development factors.", "page": 12},\n    {"term": "IBNR", "definition": "Incurred But Not Reported. Reserves set aside for claims that have occurred but have not yet been reported to the insurer.", "page": 5}\n  ]\n}\n\nREQUIREMENTS:\n- Provide a 1-2 sentence definition for EACH term listed\n- Definitions should be accurate for actuarial science contexts\n- If a term is an acronym, expand it and explain what it means\n- Keep definitions concise but complete';

  /* ---- State ---- */
  var LIBRARY_STORAGE_KEY = 'actuarial-notes-doc-library';
  var customExams = [];
  var libraryDocs = [];
  var sidebarBtnEl = null;
  var libraryBtnEl = null;
  var myExamsEl = null;
  var modalEl = null;
  var backdropEl = null;
  var currentStep = 1;
  var workflowData = {};
  var editingExamId = null;

  /* ---- Sidebar helper ---- */
  function closeSidebar() {
    // Obsidian Publish: click the sidebar toggle button if it exists
    var toggleBtn = document.querySelector('.site-body-left-column-collapse-icon, .sidebar-toggle-button, [aria-label="Toggle left sidebar"]');
    if (toggleBtn) { toggleBtn.click(); return; }
    // Fallback: hide sidebar on mobile/tablet and restore on next user-initiated open
    var sidebar = document.querySelector('.site-body-left-column');
    if (sidebar && window.innerWidth < 1000) {
      sidebar.style.display = 'none';
      var obs = new MutationObserver(function () {
        obs.disconnect();
        sidebar.style.display = '';
      });
      obs.observe(sidebar, { attributes: true, childList: true });
    }
  }

  /* ---- SVG Icons ---- */
  var SVG_PLUS = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></svg>';

  var SVG_DOC = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6l-4-4z"/><polyline points="12 2 12 6 16 6"/></svg>';

  var SVG_CHECK_CIRCLE = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><polyline points="6.5 10.5 9 13 14 7"/></svg>';

  var SVG_CLOSE = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="15" y2="15"/><line x1="15" y1="5" x2="5" y2="15"/></svg>';

  var SVG_UPLOAD = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M32 32l-8-8-8 8"/><line x1="24" y1="24" x2="24" y2="42"/><path d="M40.78 34.78A8 8 0 0 0 36 20h-2.02A12.98 12.98 0 0 0 10 24c0 3.28 1.22 6.28 3.22 8.56"/></svg>';

  var SVG_SPINNER = '<svg class="custom-exam__spinner" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10 2a8 8 0 0 1 8 8"/></svg>';

  var SVG_TRASH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 6 5 16 15 16 15 6"/><line x1="3" y1="6" x2="17" y2="6"/><path d="M8 6V4h4v2"/></svg>';

  var SVG_EDIT = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 3.5l5 5L6 19H1v-5L11.5 3.5z"/></svg>';

  var SVG_DOWNLOAD = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 13v4H3v-4"/><polyline points="7 8 10 11 13 8"/><line x1="10" y1="11" x2="10" y2="2"/></svg>';

  var SVG_GEAR = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="3"/><path d="M16.5 11.13a1.5 1.5 0 0 0 .3 1.65l.05.05a1.82 1.82 0 1 1-2.57 2.57l-.05-.05a1.5 1.5 0 0 0-1.65-.3 1.5 1.5 0 0 0-.91 1.37v.15a1.82 1.82 0 1 1-3.64 0v-.08a1.5 1.5 0 0 0-.98-1.37 1.5 1.5 0 0 0-1.65.3l-.05.05a1.82 1.82 0 1 1-2.57-2.57l.05-.05a1.5 1.5 0 0 0 .3-1.65 1.5 1.5 0 0 0-1.37-.91h-.15a1.82 1.82 0 1 1 0-3.64h.08a1.5 1.5 0 0 0 1.37-.98 1.5 1.5 0 0 0-.3-1.65l-.05-.05a1.82 1.82 0 1 1 2.57-2.57l.05.05a1.5 1.5 0 0 0 1.65.3h.07a1.5 1.5 0 0 0 .91-1.37v-.15a1.82 1.82 0 1 1 3.64 0v.08a1.5 1.5 0 0 0 .91 1.37 1.5 1.5 0 0 0 1.65-.3l.05-.05a1.82 1.82 0 1 1 2.57 2.57l-.05.05a1.5 1.5 0 0 0-.3 1.65v.07a1.5 1.5 0 0 0 1.37.91h.15a1.82 1.82 0 1 1 0 3.64h-.08a1.5 1.5 0 0 0-1.37.91z"/></svg>';

  /* ---- HTML escaping ---- */
  function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- Color palette for exams ---- */
  var EXAM_COLORS = ['#2563eb', '#7c3aed', '#dc2626', '#059669', '#d97706', '#db2777', '#0891b2', '#4f46e5', '#c2410c', '#0d9488'];

  /* ---- Persistence ---- */
  function loadExams() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      customExams = raw ? JSON.parse(raw) : [];
    } catch (e) { customExams = []; }
  }

  function saveExams() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(customExams)); } catch (e) { /* ignore */ }
  }

  function getInviteCode() {
    try { return localStorage.getItem(INVITE_CODE_KEY) || ''; } catch (e) { return ''; }
  }

  function setInviteCode(code) {
    try { localStorage.setItem(INVITE_CODE_KEY, code); } catch (e) { /* ignore */ }
  }

  function getCustomPrompts() {
    try {
      var raw = localStorage.getItem(PROMPTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function setCustomPrompts(prompts) {
    try { localStorage.setItem(PROMPTS_KEY, JSON.stringify(prompts)); } catch (e) { /* ignore */ }
  }

  function loadLibrary() {
    try {
      var raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
      libraryDocs = raw ? JSON.parse(raw) : [];
    } catch (e) { libraryDocs = []; }
  }

  function saveLibrary() {
    try { localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(libraryDocs)); } catch (e) { /* ignore */ }
    // Refresh sidebar tabs to reflect library changes
    if (window._sidebarTabs && window._sidebarTabs.refresh) window._sidebarTabs.refresh();
  }

  /* ---- Glossary search helper ---- */
  function searchGlossary(query) {
    var results = [];
    var q = (query || '').toLowerCase().trim();
    if (!q) return results;
    var words = q.split(/\s+/).filter(function (w) { return w.length >= 3; });

    libraryDocs.forEach(function (doc) {
      (doc.glossary || []).forEach(function (entry) {
        var entryTerm = entry.term || entry.name || entry.title || '';
        var entryDef = entry.definition || entry.description || entry.def || '';
        if (!entryTerm) return;
        var termLower = entryTerm.toLowerCase();
        var match = termLower.indexOf(q) !== -1 || q.indexOf(termLower) !== -1;
        if (!match && words.length > 0) {
          match = words.some(function (w) { return termLower.indexOf(w) !== -1; });
        }
        if (match) {
          results.push({
            term: entryTerm,
            definition: entryDef,
            page: entry.page,
            sourceDocId: doc.id,
            sourceDocTitle: doc.title
          });
        }
      });
    });
    return results;
  }

  /* ---- Sidebar: Button + My Exams ---- */
  function buildSidebar() {
    if (document.querySelector('.custom-exam__sidebar-btn')) return;

    var sidebar = document.querySelector('.site-body-left-column');
    if (!sidebar) return;

    // Find the inner wrapper (same strategy as journey tracker)
    var searchInput = sidebar.querySelector('input[type="search"], input[type="text"]');
    var innerWrapper = null;

    if (searchInput) {
      var el = searchInput;
      while (el.parentElement && el.parentElement !== sidebar) { el = el.parentElement; }
      if (el.parentElement === sidebar) { innerWrapper = el; }
    }
    if (!innerWrapper) {
      var children = sidebar.children;
      for (var ci = 0; ci < children.length; ci++) {
        if (children[ci].querySelector && (children[ci].querySelector('.nav-folder, .tree-item') || children[ci].querySelector('input[type="search"]'))) {
          innerWrapper = children[ci];
          break;
        }
      }
    }
    var container = innerWrapper || sidebar;

    // Create button
    sidebarBtnEl = document.createElement('button');
    sidebarBtnEl.className = 'custom-exam__sidebar-btn';
    sidebarBtnEl.type = 'button';
    sidebarBtnEl.innerHTML = '<span class="custom-exam__sidebar-btn-icon">' + SVG_PLUS + '</span><span>Add Custom Exam</span>';
    sidebarBtnEl.addEventListener('click', function () {
      editingExamId = null;
      workflowData = {};
      openModal();
    });

    // Create My Exams section
    myExamsEl = document.createElement('div');
    myExamsEl.className = 'custom-exam__my-exams';
    renderMyExams();

    // Create Document Library button
    libraryBtnEl = document.createElement('button');
    libraryBtnEl.className = 'custom-exam__sidebar-btn doc-library__sidebar-btn';
    libraryBtnEl.type = 'button';
    libraryBtnEl.innerHTML = '<span class="custom-exam__sidebar-btn-icon">' + SVG_BOOK + '</span><span>Library</span>';
    if (libraryDocs.length > 0) {
      libraryBtnEl.innerHTML += '<span class="doc-library__sidebar-count">' + libraryDocs.length + '</span>';
    }
    libraryBtnEl.addEventListener('click', function () {
      renderLibraryViewer();
      closeSidebar();
    });

    // Wrap both buttons in a row
    var btnRow = document.createElement('div');
    btnRow.className = 'sidebar-btn-row';
    btnRow.appendChild(libraryBtnEl);
    btnRow.appendChild(sidebarBtnEl);

    // Insert before journey tracker
    // Order: Button Row → My Exams → (rest)
    var journeyTracker = container.querySelector('.journey-tracker');
    if (journeyTracker) {
      journeyTracker.parentElement.insertBefore(btnRow, journeyTracker);
      journeyTracker.parentElement.insertBefore(myExamsEl, journeyTracker);
    } else {
      // Insert before nav tree
      var navRoot = container.querySelector('.nav-folder.mod-root') || container.querySelector('.nav-folder') || container.querySelector('.tree-item');
      if (navRoot) {
        navRoot.parentElement.insertBefore(btnRow, navRoot);
        navRoot.parentElement.insertBefore(myExamsEl, navRoot);
      } else {
        container.appendChild(btnRow);
        container.appendChild(myExamsEl);
      }
    }
  }

  function renderMyExams() {
    // Refresh sidebar tabs to reflect changes
    if (window._sidebarTabs && window._sidebarTabs.refresh) window._sidebarTabs.refresh();
    if (!myExamsEl) return;
    myExamsEl.innerHTML = '';

    if (customExams.length === 0) {
      myExamsEl.style.display = 'none';
      return;
    }
    myExamsEl.style.display = '';

    var header = document.createElement('div');
    header.className = 'custom-exam__my-exams-header';
    header.innerHTML = '<span class="custom-exam__my-exams-title">My Custom Exams</span><span class="custom-exam__my-exams-count">' + customExams.length + '</span>';
    myExamsEl.appendChild(header);

    var list = document.createElement('div');
    list.className = 'custom-exam__my-exams-list';

    customExams.forEach(function (exam) {
      var item = document.createElement('div');
      item.className = 'custom-exam__my-exams-item';
      item.setAttribute('data-exam-id', exam.id);

      var dot = document.createElement('span');
      dot.className = 'custom-exam__my-exams-dot';
      dot.style.background = exam.color || '#2563eb';

      var name = document.createElement('span');
      name.className = 'custom-exam__my-exams-name';
      name.textContent = exam.name;

      var actions = document.createElement('span');
      actions.className = 'custom-exam__my-exams-actions';

      var editBtn = document.createElement('button');
      editBtn.className = 'custom-exam__my-exams-action';
      editBtn.type = 'button';
      editBtn.title = 'Edit';
      editBtn.innerHTML = SVG_EDIT;
      editBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openEditModal(exam.id);
      });

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'custom-exam__my-exams-action custom-exam__my-exams-action--danger';
      deleteBtn.type = 'button';
      deleteBtn.title = 'Delete';
      deleteBtn.innerHTML = SVG_TRASH;
      deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (confirm('Delete "' + exam.name + '"? This cannot be undone.')) {
          customExams = customExams.filter(function (ex) { return ex.id !== exam.id; });
          saveExams();
          renderMyExams();
        }
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      item.appendChild(dot);
      item.appendChild(name);
      item.appendChild(actions);

      item.addEventListener('click', function () {
        renderExamViewer(exam.id);
        closeSidebar();
      });

      list.appendChild(item);
    });

    myExamsEl.appendChild(list);
  }

  /* ---- Modal system ---- */
  var STEP_LABELS = ['Access', 'Upload', 'Processing', 'Review', 'Complete'];

  function openModal(startStep) {
    if (modalEl) closeModal(true);

    var hasCode = !!getInviteCode();
    if (!startStep) {
      currentStep = hasCode ? 2 : 1;
    } else {
      currentStep = startStep;
    }

    // Backdrop
    backdropEl = document.createElement('div');
    backdropEl.className = 'custom-exam__backdrop';
    backdropEl.addEventListener('click', closeModal);

    // Modal
    modalEl = document.createElement('div');
    modalEl.className = 'custom-exam__modal';
    modalEl.addEventListener('click', function (e) { e.stopPropagation(); });

    // Header
    var header = document.createElement('div');
    header.className = 'custom-exam__modal-header';

    var titleEl = document.createElement('span');
    titleEl.className = 'custom-exam__modal-title';
    titleEl.textContent = editingExamId ? 'Edit Custom Exam' : 'Create Custom Exam';

    var headerActions = document.createElement('div');
    headerActions.className = 'custom-exam__modal-header-actions';

    var gearBtn = document.createElement('button');
    gearBtn.className = 'custom-exam__modal-icon-btn';
    gearBtn.type = 'button';
    gearBtn.title = 'Access Settings';
    gearBtn.innerHTML = SVG_GEAR;
    gearBtn.addEventListener('click', function () {
      currentStep = 1;
      renderStep();
    });

    var closeBtn = document.createElement('button');
    closeBtn.className = 'custom-exam__modal-icon-btn';
    closeBtn.type = 'button';
    closeBtn.title = 'Close';
    closeBtn.innerHTML = SVG_CLOSE;
    closeBtn.addEventListener('click', closeModal);

    headerActions.appendChild(gearBtn);
    headerActions.appendChild(closeBtn);
    header.appendChild(titleEl);
    header.appendChild(headerActions);

    // Step indicator
    var stepsBar = document.createElement('div');
    stepsBar.className = 'custom-exam__steps';
    stepsBar.setAttribute('data-steps', 'true');

    for (var i = 0; i < STEP_LABELS.length; i++) {
      var step = document.createElement('div');
      step.className = 'custom-exam__step';
      step.setAttribute('data-step', String(i + 1));
      var num = document.createElement('span');
      num.className = 'custom-exam__step-num';
      num.textContent = String(i + 1);
      var lbl = document.createElement('span');
      lbl.className = 'custom-exam__step-label';
      lbl.textContent = STEP_LABELS[i];
      step.appendChild(num);
      step.appendChild(lbl);
      if (i < STEP_LABELS.length - 1) {
        var line = document.createElement('span');
        line.className = 'custom-exam__step-line';
        stepsBar.appendChild(step);
        stepsBar.appendChild(line);
      } else {
        stepsBar.appendChild(step);
      }
    }

    // Body
    var body = document.createElement('div');
    body.className = 'custom-exam__modal-body';

    modalEl.appendChild(header);
    modalEl.appendChild(stepsBar);
    modalEl.appendChild(body);

    document.body.appendChild(backdropEl);
    document.body.appendChild(modalEl);

    // Force reflow for animation
    void modalEl.offsetHeight;
    backdropEl.classList.add('is-visible');
    modalEl.classList.add('is-visible');

    renderStep();

    // ESC to close
    document.addEventListener('keydown', handleModalEsc);
  }

  function closeModal(immediate) {
    document.removeEventListener('keydown', handleModalEsc);
    if (!modalEl) return;

    if (immediate) {
      // Synchronous removal (used when reopening immediately)
      if (modalEl.parentElement) modalEl.parentElement.removeChild(modalEl);
      if (backdropEl && backdropEl.parentElement) backdropEl.parentElement.removeChild(backdropEl);
      modalEl = null;
      backdropEl = null;
    } else {
      // Animated removal
      var oldModal = modalEl;
      var oldBackdrop = backdropEl;
      oldModal.classList.remove('is-visible');
      if (oldBackdrop) oldBackdrop.classList.remove('is-visible');
      modalEl = null;
      backdropEl = null;
      setTimeout(function () {
        if (oldModal && oldModal.parentElement) oldModal.parentElement.removeChild(oldModal);
        if (oldBackdrop && oldBackdrop.parentElement) oldBackdrop.parentElement.removeChild(oldBackdrop);
      }, 250);
    }
  }

  function handleModalEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  function openEditModal(examId) {
    var exam = customExams.find(function (ex) { return ex.id === examId; });
    if (!exam) return;

    // Lightweight edit modal — name, colour, filename only
    var backdrop = document.createElement('div');
    backdrop.className = 'custom-exam__backdrop';

    var modal = document.createElement('div');
    modal.className = 'custom-exam__modal';
    modal.style.maxWidth = '420px';
    modal.addEventListener('click', function (e) { e.stopPropagation(); });

    // Header
    var header = document.createElement('div');
    header.className = 'custom-exam__modal-header';
    header.innerHTML = '<span class="custom-exam__modal-title">Edit Exam</span>';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'custom-exam__modal-icon-btn';
    closeBtn.type = 'button';
    closeBtn.innerHTML = SVG_CLOSE;
    closeBtn.addEventListener('click', function () { backdrop.remove(); modal.remove(); });
    header.appendChild(closeBtn);

    var body = document.createElement('div');
    body.className = 'custom-exam__modal-body';
    body.style.padding = '20px';

    // Name field
    var nameGroup = document.createElement('div');
    nameGroup.className = 'custom-exam__form-group';
    nameGroup.innerHTML = '<label class="custom-exam__label">Exam Name</label>';
    var nameInput = document.createElement('input');
    nameInput.className = 'custom-exam__input';
    nameInput.type = 'text';
    nameInput.value = exam.name;
    nameGroup.appendChild(nameInput);
    body.appendChild(nameGroup);

    // Colour dropdown
    var colorGroup = document.createElement('div');
    colorGroup.className = 'custom-exam__form-group';
    colorGroup.innerHTML = '<label class="custom-exam__label">Accent Colour</label>';
    var colorSelectRow = document.createElement('div');
    colorSelectRow.style.cssText = 'display:flex;align-items:center;gap:10px';
    var colorDot = document.createElement('span');
    colorDot.style.cssText = 'width:20px;height:20px;border-radius:50%;flex-shrink:0';
    colorDot.style.background = exam.color || '#2563eb';
    var colorSelect = document.createElement('select');
    colorSelect.className = 'custom-exam__input';
    colorSelect.style.flex = '1';
    var selectedColor = exam.color || '#2563eb';
    EXAM_COLORS.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      opt.style.color = c;
      if (c === selectedColor) opt.selected = true;
      colorSelect.appendChild(opt);
    });
    colorSelect.addEventListener('change', function () {
      selectedColor = colorSelect.value;
      colorDot.style.background = selectedColor;
    });
    colorSelectRow.appendChild(colorDot);
    colorSelectRow.appendChild(colorSelect);
    colorGroup.appendChild(colorSelectRow);
    body.appendChild(colorGroup);

    // Source filename
    if (exam.fileName) {
      var fileGroup = document.createElement('div');
      fileGroup.className = 'custom-exam__form-group';
      fileGroup.innerHTML = '<label class="custom-exam__label">Source File</label>';
      var fileDisplay = document.createElement('div');
      fileDisplay.style.cssText = 'font-size:0.9rem;opacity:0.7;padding:8px 0';
      fileDisplay.textContent = exam.fileName;
      fileGroup.appendChild(fileDisplay);
      body.appendChild(fileGroup);
    }

    // Buttons
    var btnRow = document.createElement('div');
    btnRow.className = 'custom-exam__btn-row';
    btnRow.style.marginTop = '20px';

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'custom-exam__btn custom-exam__btn--ghost';
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', function () { backdrop.remove(); modal.remove(); });

    var saveBtn = document.createElement('button');
    saveBtn.className = 'custom-exam__btn custom-exam__btn--primary';
    saveBtn.type = 'button';
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', function () {
      var newName = nameInput.value.trim();
      if (!newName) { nameInput.focus(); return; }
      exam.name = newName;
      exam.color = selectedColor;
      exam.updatedAt = new Date().toISOString();
      saveExams();
      renderMyExams();
      // If viewer is open, refresh it
      var existingViewer = document.querySelector('.custom-exam__viewer');
      if (existingViewer) { removeViewer(existingViewer); renderExamViewer(exam.id); }
      backdrop.remove();
      modal.remove();
    });

    btnRow.appendChild(cancelBtn);
    btnRow.appendChild(saveBtn);
    body.appendChild(btnRow);

    modal.appendChild(header);
    modal.appendChild(body);
    backdrop.appendChild(modal);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) { backdrop.remove(); } });
    document.body.appendChild(backdrop);
    requestAnimationFrame(function () { backdrop.style.opacity = '1'; backdrop.style.visibility = 'visible'; });
  }

  /* ---- Step rendering ---- */
  function renderStep() {
    if (!modalEl) return;

    // Update step indicator
    var steps = modalEl.querySelectorAll('.custom-exam__step');
    steps.forEach(function (s) {
      var sNum = parseInt(s.getAttribute('data-step'), 10);
      s.classList.remove('is-active', 'is-done');
      if (sNum === currentStep) s.classList.add('is-active');
      else if (sNum < currentStep) s.classList.add('is-done');
    });

    // Update lines
    var lines = modalEl.querySelectorAll('.custom-exam__step-line');
    lines.forEach(function (l, idx) {
      l.classList.toggle('is-done', (idx + 1) < currentStep);
    });

    var body = modalEl.querySelector('.custom-exam__modal-body');
    if (!body) return;
    body.innerHTML = '';

    switch (currentStep) {
      case 1: renderInviteCodeStep(body); break;
      case 2: renderUploadStep(body); break;
      case 3: renderProcessingStep(body); break;
      case 4: renderReviewStep(body); break;
      case 5: renderCompleteStep(body); break;
    }
  }

  /* ---- Step 1: Invite Code ---- */
  function renderInviteCodeStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content';

    var icon = document.createElement('div');
    icon.className = 'custom-exam__step-icon';
    icon.innerHTML = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 4-4 2 4 2 2 4 2-4 4-2-4-2-2-4z"/><path d="M10 14l-1.5 3L5 18.5l3.5 1.5L10 23l1.5-3 3.5-1.5L11.5 17 10 14z"/><circle cx="30" cy="30" r="12"/><path d="M26 30l3 3 5-6"/></svg>';

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = 'Enter Invite Code';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = 'Enter your invite code to access AI-powered PDF analysis. Your code is stored locally in your browser.';

    var inputWrap = document.createElement('div');
    inputWrap.className = 'custom-exam__input-wrap';

    var label = document.createElement('label');
    label.className = 'custom-exam__label';
    label.textContent = 'Invite Code';

    var input = document.createElement('input');
    input.className = 'custom-exam__input';
    input.type = 'text';
    input.placeholder = 'Enter your invite code...';
    input.value = getInviteCode();
    input.autocomplete = 'off';

    var error = document.createElement('div');
    error.className = 'custom-exam__error';

    var btn = document.createElement('button');
    btn.className = 'custom-exam__btn custom-exam__btn--primary';
    btn.type = 'button';
    btn.textContent = 'Continue';
    btn.addEventListener('click', function () {
      var code = input.value.trim();
      if (!code) {
        error.textContent = 'Please enter an invite code';
        error.style.display = 'block';
        return;
      }
      error.style.display = 'none';
      setInviteCode(code);
      currentStep = 2;
      renderStep();
    });

    inputWrap.appendChild(label);
    inputWrap.appendChild(input);
    inputWrap.appendChild(error);

    wrap.appendChild(icon);
    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(inputWrap);
    wrap.appendChild(btn);
    body.appendChild(wrap);
  }

  /* ---- Step 2: Upload PDF ---- */
  function renderUploadStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content';

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = 'Upload PDF Document';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = 'Upload an exam syllabus, textbook chapter, or study guide. The AI will extract learning objectives, source materials, and key concepts.';

    var dropzone = document.createElement('div');
    dropzone.className = 'custom-exam__dropzone';

    var dzInner = document.createElement('div');
    dzInner.className = 'custom-exam__dropzone-inner';
    dzInner.innerHTML = '<div class="custom-exam__dropzone-icon">' + SVG_UPLOAD + '</div>' +
      '<div class="custom-exam__dropzone-text">Drag & drop your PDF here</div>' +
      '<div class="custom-exam__dropzone-sub">or click to browse</div>';

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.style.display = 'none';

    var fileInfo = document.createElement('div');
    fileInfo.className = 'custom-exam__file-info';
    fileInfo.style.display = 'none';

    dropzone.appendChild(dzInner);
    dropzone.appendChild(fileInput);

    // Drag events
    dropzone.addEventListener('dragover', function (e) {
      e.preventDefault();
      dropzone.classList.add('is-dragover');
    });
    dropzone.addEventListener('dragleave', function () {
      dropzone.classList.remove('is-dragover');
    });
    dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropzone.classList.remove('is-dragover');
      var files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type === 'application/pdf') {
        handleFile(files[0]);
      }
    });
    dropzone.addEventListener('click', function () {
      fileInput.click();
    });
    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
      }
    });

    var selectedFile = null;
    function handleFile(file) {
      selectedFile = file;
      var sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      fileInfo.innerHTML = '<span class="custom-exam__file-info-icon">' + SVG_DOC + '</span>' +
        '<span class="custom-exam__file-info-name">' + file.name + '</span>' +
        '<span class="custom-exam__file-info-size">' + sizeMB + ' MB</span>';
      fileInfo.style.display = 'flex';
      dzInner.innerHTML = '<div class="custom-exam__dropzone-icon custom-exam__dropzone-icon--success">' + SVG_CHECK_CIRCLE + '</div>' +
        '<div class="custom-exam__dropzone-text">PDF selected</div>' +
        '<div class="custom-exam__dropzone-sub">Click to change file</div>';
      analyzeBtn.disabled = false;
      analyzeBtn.classList.remove('custom-exam__btn--disabled');
    }

    var error = document.createElement('div');
    error.className = 'custom-exam__error';

    var analyzeBtn = document.createElement('button');
    analyzeBtn.className = 'custom-exam__btn custom-exam__btn--primary custom-exam__btn--disabled';
    analyzeBtn.type = 'button';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyze Document';
    analyzeBtn.addEventListener('click', function () {
      if (!selectedFile) return;
      workflowData.file = selectedFile;
      currentStep = 3;
      renderStep();
    });

    // Advanced: Customize Prompts
    var advancedToggle = document.createElement('button');
    advancedToggle.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--small';
    advancedToggle.type = 'button';
    advancedToggle.style.marginTop = '8px';
    advancedToggle.style.fontSize = '0.8rem';
    var prompts = getCustomPrompts();
    var advOpen = false;
    advancedToggle.textContent = '▸ Advanced: Customize Prompts';

    var advancedPanel = document.createElement('div');
    advancedPanel.style.display = 'none';
    advancedPanel.style.marginTop = '8px';

    var objPromptGroup = document.createElement('div');
    objPromptGroup.className = 'custom-exam__form-group';
    objPromptGroup.innerHTML = '<label class="custom-exam__label" style="font-size:0.8rem">Objectives Extraction Prompt</label>';
    var objPromptTA = document.createElement('textarea');
    objPromptTA.className = 'custom-exam__textarea';
    objPromptTA.rows = 5;
    objPromptTA.style.fontSize = '0.75rem';
    objPromptTA.value = prompts.objectives || DEFAULT_OBJECTIVES_PROMPT;
    objPromptTA.addEventListener('input', function () {
      var p = getCustomPrompts();
      p.objectives = objPromptTA.value;
      setCustomPrompts(p);
    });
    objPromptGroup.appendChild(objPromptTA);

    var srcPromptGroup = document.createElement('div');
    srcPromptGroup.className = 'custom-exam__form-group';
    srcPromptGroup.innerHTML = '<label class="custom-exam__label" style="font-size:0.8rem">Sources Extraction Prompt</label>';
    var srcPromptTA = document.createElement('textarea');
    srcPromptTA.className = 'custom-exam__textarea';
    srcPromptTA.rows = 5;
    srcPromptTA.style.fontSize = '0.75rem';
    srcPromptTA.value = prompts.sources || DEFAULT_SOURCES_PROMPT;
    srcPromptTA.addEventListener('input', function () {
      var p = getCustomPrompts();
      p.sources = srcPromptTA.value;
      setCustomPrompts(p);
    });
    srcPromptGroup.appendChild(srcPromptTA);

    var resetPromptsBtn = document.createElement('button');
    resetPromptsBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--small';
    resetPromptsBtn.type = 'button';
    resetPromptsBtn.style.fontSize = '0.75rem';
    resetPromptsBtn.textContent = 'Reset to defaults';
    resetPromptsBtn.addEventListener('click', function () {
      objPromptTA.value = DEFAULT_OBJECTIVES_PROMPT;
      srcPromptTA.value = DEFAULT_SOURCES_PROMPT;
      setCustomPrompts({ objectives: DEFAULT_OBJECTIVES_PROMPT, sources: DEFAULT_SOURCES_PROMPT });
    });

    advancedPanel.appendChild(objPromptGroup);
    advancedPanel.appendChild(srcPromptGroup);
    advancedPanel.appendChild(resetPromptsBtn);

    advancedToggle.addEventListener('click', function () {
      advOpen = !advOpen;
      advancedPanel.style.display = advOpen ? 'block' : 'none';
      advancedToggle.textContent = (advOpen ? '▾' : '▸') + ' Advanced: Customize Prompts';
    });

    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(dropzone);
    wrap.appendChild(fileInfo);
    wrap.appendChild(error);
    wrap.appendChild(analyzeBtn);
    wrap.appendChild(advancedToggle);
    wrap.appendChild(advancedPanel);
    body.appendChild(wrap);
  }

  /* ---- Step 3: AI Processing ---- */
  function renderProcessingStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content';

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = 'Analyzing Document';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = 'The AI is reading your document and extracting structured content.';

    // Progress tasks (two AI phases)
    var tasks = [
      { id: 'extract', label: 'Reading PDF' },
      { id: 'objectives', label: 'Extracting learning objectives' },
      { id: 'concepts', label: 'Extracting concepts' },
      { id: 'sources', label: 'Identifying sources & references' }
    ];

    var progressEl = document.createElement('div');
    progressEl.className = 'custom-exam__progress';

    tasks.forEach(function (task) {
      var row = document.createElement('div');
      row.className = 'custom-exam__progress-task';
      row.setAttribute('data-task', task.id);

      var statusIcon = document.createElement('span');
      statusIcon.className = 'custom-exam__progress-status';
      statusIcon.innerHTML = '<span class="custom-exam__progress-dot"></span>';

      var text = document.createElement('span');
      text.className = 'custom-exam__progress-label';
      text.textContent = task.label;

      var result = document.createElement('span');
      result.className = 'custom-exam__progress-result';

      row.appendChild(statusIcon);
      row.appendChild(text);
      row.appendChild(result);
      progressEl.appendChild(row);
    });

    // Live results preview panel
    var livePreview = document.createElement('div');
    livePreview.className = 'custom-exam__live-preview';
    livePreview.style.marginTop = '16px';
    livePreview.style.display = 'none';

    var errorEl = document.createElement('div');
    errorEl.className = 'custom-exam__error';

    var retryBtn = document.createElement('button');
    retryBtn.className = 'custom-exam__btn custom-exam__btn--secondary';
    retryBtn.type = 'button';
    retryBtn.textContent = 'Retry';
    retryBtn.style.display = 'none';
    retryBtn.addEventListener('click', function () {
      currentStep = 3;
      renderStep();
    });

    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(progressEl);
    wrap.appendChild(livePreview);
    wrap.appendChild(errorEl);
    wrap.appendChild(retryBtn);
    body.appendChild(wrap);

    // Start processing
    runProcessing(progressEl, livePreview, errorEl, retryBtn);
  }

  function setTaskStatus(progressEl, taskId, status, resultText) {
    var row = progressEl.querySelector('[data-task="' + taskId + '"]');
    if (!row) return;
    var statusEl = row.querySelector('.custom-exam__progress-status');
    var resultEl = row.querySelector('.custom-exam__progress-result');

    row.classList.remove('is-pending', 'is-active', 'is-done', 'is-error');

    if (status === 'active') {
      row.classList.add('is-active');
      statusEl.innerHTML = SVG_SPINNER;
    } else if (status === 'done') {
      row.classList.add('is-done');
      statusEl.innerHTML = SVG_CHECK_CIRCLE;
    } else if (status === 'error') {
      row.classList.add('is-error');
      statusEl.innerHTML = SVG_CLOSE;
    } else {
      row.classList.add('is-pending');
      statusEl.innerHTML = '<span class="custom-exam__progress-dot"></span>';
    }

    if (resultText) resultEl.textContent = resultText;
  }

  function animateItemsIn(container, items, renderItem, delay) {
    items.forEach(function (item, i) {
      setTimeout(function () {
        var el = renderItem(item);
        el.style.opacity = '0';
        el.style.transform = 'translateY(6px)';
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        container.appendChild(el);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        });
      }, i * (delay || 120));
    });
  }

  async function runProcessing(progressEl, livePreview, errorEl, retryBtn) {
    var prompts = getCustomPrompts();

    try {
      // Task 1: Extract text
      setTaskStatus(progressEl, 'extract', 'active');
      setTaskStatus(progressEl, 'objectives', 'pending');
      setTaskStatus(progressEl, 'sources', 'pending');

      var pdfText = await extractPdfText(workflowData.file);
      workflowData.pdfText = pdfText.text;
      setTaskStatus(progressEl, 'extract', 'done', pdfText.pageCount + ' pages read');

      // Task 2: Extract objectives
      setTaskStatus(progressEl, 'objectives', 'active');
      setTaskStatus(progressEl, 'concepts', 'pending');
      var objPrompt = prompts.objectives || DEFAULT_OBJECTIVES_PROMPT;
      var objResult = await callClaudeApi(pdfText.text, objPrompt);
      workflowData.examTitle = objResult.examTitle || 'Custom Exam';
      workflowData.examDescription = objResult.examDescription || '';
      workflowData.objectives = objResult.objectives || [];
      workflowData.color = EXAM_COLORS[Math.floor(Math.random() * EXAM_COLORS.length)];

      var conceptCount = 0;
      workflowData.objectives.forEach(function (o) { conceptCount += (o.concepts || []).length; });
      setTaskStatus(progressEl, 'objectives', 'done', workflowData.objectives.length + ' objectives, ' + conceptCount + ' concepts');

      // Show objectives preview
      livePreview.style.display = 'block';
      var objPreviewLabel = document.createElement('div');
      objPreviewLabel.style.fontWeight = '600';
      objPreviewLabel.style.fontSize = '0.8rem';
      objPreviewLabel.style.opacity = '0.6';
      objPreviewLabel.style.marginBottom = '6px';
      objPreviewLabel.textContent = 'Learning Objectives';
      livePreview.appendChild(objPreviewLabel);

      var objPreviewList = document.createElement('div');
      livePreview.appendChild(objPreviewList);
      animateItemsIn(objPreviewList, workflowData.objectives, function (obj) {
        var el = document.createElement('div');
        el.style.cssText = 'padding:4px 8px;border-left:3px solid var(--brand,#2563eb);margin-bottom:4px;font-size:0.85rem;border-radius:2px;background:var(--bg-elev,#f8f8f8)';
        el.textContent = obj.title + (obj.weight ? ' — ' + obj.weight + '%' : '');
        return el;
      }, 100);

      // Task 3: Extract concept details
      await new Promise(function (r) { setTimeout(r, workflowData.objectives.length * 100 + 200); });
      setTaskStatus(progressEl, 'concepts', 'active');

      var allConceptNames = [];
      workflowData.objectives.forEach(function (o) {
        (o.concepts || []).forEach(function (c) { allConceptNames.push(c.name); });
      });

      if (allConceptNames.length > 0) {
        try {
          var conceptText = 'Document:\n' + pdfText.text.substring(0, 80000) + '\n\nConcepts to define:\n' + allConceptNames.join('\n');
          var conceptResult = await callClaudeApi(conceptText, DEFAULT_CONCEPTS_PROMPT);
          var details = conceptResult.conceptDetails || {};
          workflowData.objectives.forEach(function (o) {
            (o.concepts || []).forEach(function (c) {
              if (details[c.name]) c.detail = details[c.name];
            });
          });
          var enrichedCount = Object.keys(details).length;
          setTaskStatus(progressEl, 'concepts', 'done', enrichedCount + ' concepts enriched');
        } catch (conceptErr) {
          setTaskStatus(progressEl, 'concepts', 'done', 'skipped (will generate on demand)');
        }
      } else {
        setTaskStatus(progressEl, 'concepts', 'done', '0 concepts');
      }

      // Task 4: Extract sources
      setTaskStatus(progressEl, 'sources', 'active');
      var srcPrompt = prompts.sources || DEFAULT_SOURCES_PROMPT;
      var srcResult = await callClaudeApi(pdfText.text, srcPrompt);
      workflowData.sources = srcResult.sources || [];
      setTaskStatus(progressEl, 'sources', 'done', workflowData.sources.length + ' sources found');

      // Show sources preview
      if (workflowData.sources.length > 0) {
        var srcPreviewLabel = document.createElement('div');
        srcPreviewLabel.style.fontWeight = '600';
        srcPreviewLabel.style.fontSize = '0.8rem';
        srcPreviewLabel.style.opacity = '0.6';
        srcPreviewLabel.style.margin = '10px 0 6px';
        srcPreviewLabel.textContent = 'Sources';
        livePreview.appendChild(srcPreviewLabel);

        var srcPreviewList = document.createElement('div');
        livePreview.appendChild(srcPreviewList);
        animateItemsIn(srcPreviewList, workflowData.sources, function (src) {
          var el = document.createElement('div');
          el.style.cssText = 'padding:4px 8px;border-left:3px solid var(--success,#059669);margin-bottom:4px;font-size:0.85rem;border-radius:2px;background:var(--bg-elev,#f8f8f8)';
          el.textContent = src.title + (src.author ? ' — ' + src.author : '');
          return el;
        }, 100);
      }

      // Auto-advance after showing results
      var advanceDelay = Math.max(workflowData.objectives.length, workflowData.sources.length) * 100 + 1000;
      setTimeout(function () {
        currentStep = 4;
        renderStep();
      }, advanceDelay);

    } catch (err) {
      var errMsg = err.message || 'Processing failed. Please try again.';
      errorEl.textContent = 'Error: ' + errMsg;
      errorEl.style.display = 'block';

      if (errMsg.toLowerCase().indexOf('invite code') !== -1) {
        setTimeout(function () { currentStep = 1; renderStep(); }, 1500);
        return;
      }

      retryBtn.style.display = 'inline-flex';

      ['extract', 'objectives', 'concepts', 'sources'].forEach(function (id) {
        var row = progressEl.querySelector('[data-task="' + id + '"]');
        if (row && row.classList.contains('is-active')) {
          setTaskStatus(progressEl, id, 'error');
        }
      });
    }
  }

  /* ---- PDF.js text extraction ---- */
  var _pdfjsLoadPromise = null;
  async function loadPdfJs() {
    if (window.pdfjsLib) return window.pdfjsLib;
    if (_pdfjsLoadPromise) return _pdfjsLoadPromise;

    _pdfjsLoadPromise = new Promise(function (resolve, reject) {
      var moduleScript = document.createElement('script');
      moduleScript.type = 'module';
      moduleScript.textContent = 'import * as pdfjsLib from "' + PDFJS_CDN + '/pdf.min.mjs"; window.pdfjsLib = pdfjsLib; window.pdfjsLib.GlobalWorkerOptions.workerSrc = "' + PDFJS_CDN + '/pdf.worker.min.mjs"; window.dispatchEvent(new Event("pdfjs-loaded"));';

      window.addEventListener('pdfjs-loaded', function handler() {
        window.removeEventListener('pdfjs-loaded', handler);
        resolve(window.pdfjsLib);
      });

      document.head.appendChild(moduleScript);

      setTimeout(function () {
        _pdfjsLoadPromise = null;
        reject(new Error('PDF.js failed to load. Check your internet connection.'));
      }, 15000);
    });
    return _pdfjsLoadPromise;
  }

  async function extractPdfText(file) {
    var pdfjsLib = await loadPdfJs();
    var arrayBuffer = await file.arrayBuffer();
    var pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    var allText = '';
    var pageCount = pdf.numPages;

    for (var i = 1; i <= pageCount; i++) {
      var page = await pdf.getPage(i);
      var content = await page.getTextContent();
      var pageText = content.items.map(function (item) { return item.str; }).join(' ');
      allText += '\n--- Page ' + i + ' ---\n' + pageText;
    }

    return { text: allText, pageCount: pageCount };
  }

  /* ---- Structured PDF extraction (for Library feature) ---- */

  function getFontSize(transform) {
    return Math.sqrt(transform[0] * transform[0] + transform[1] * transform[1]);
  }

  function groupItemsIntoLines(items) {
    if (!items || items.length === 0) return [];
    var enriched = items.map(function (item) {
      return {
        str: item.str,
        fontName: item.fontName,
        fontSize: getFontSize(item.transform),
        x: item.transform[4],
        y: item.transform[5],
        width: item.width || 0
      };
    });
    // Sort by Y descending (PDF coords: Y=0 at bottom), then X ascending
    enriched.sort(function (a, b) { return b.y - a.y || a.x - b.x; });

    var lines = [];
    var currentLine = [enriched[0]];
    for (var i = 1; i < enriched.length; i++) {
      // Items within 3pt of same Y are on the same line
      if (Math.abs(enriched[i].y - currentLine[0].y) < 3) {
        currentLine.push(enriched[i]);
      } else {
        currentLine.sort(function (a, b) { return a.x - b.x; });
        lines.push(currentLine);
        currentLine = [enriched[i]];
      }
    }
    if (currentLine.length > 0) {
      currentLine.sort(function (a, b) { return a.x - b.x; });
      lines.push(currentLine);
    }

    return lines.map(function (lineItems) {
      var maxFontSize = 0;
      for (var j = 0; j < lineItems.length; j++) {
        if (lineItems[j].fontSize > maxFontSize) maxFontSize = lineItems[j].fontSize;
      }
      return {
        items: lineItems,
        text: lineItems.map(function (it) { return it.str; }).join(' ').trim(),
        indent: lineItems[0].x,
        fontSize: maxFontSize,
        y: lineItems[0].y
      };
    });
  }

  function detectBodyFontSize(pages) {
    var sizeCounts = {};
    for (var p = 0; p < pages.length; p++) {
      var lines = pages[p].lines;
      for (var l = 0; l < lines.length; l++) {
        var items = lines[l].items;
        for (var i = 0; i < items.length; i++) {
          var s = Math.round(items[i].fontSize * 2) / 2; // round to nearest 0.5
          var charCount = (items[i].str || '').length;
          sizeCounts[s] = (sizeCounts[s] || 0) + charCount;
        }
      }
    }
    var bodySize = 0;
    var maxCount = 0;
    var keys = Object.keys(sizeCounts);
    for (var k = 0; k < keys.length; k++) {
      if (sizeCounts[keys[k]] > maxCount) {
        maxCount = sizeCounts[keys[k]];
        bodySize = parseFloat(keys[k]);
      }
    }
    return bodySize;
  }

  function reconstructPageText(page, bodyFontSize) {
    var result = '';
    var lines = page.lines;
    for (var l = 0; l < lines.length; l++) {
      var line = lines[l];
      if (!line.text) continue;
      var prefix = '';
      if (line.fontSize > bodyFontSize * 1.4) {
        prefix = '[H1] ';
      } else if (line.fontSize > bodyFontSize * 1.15) {
        prefix = '[H2] ';
      }
      result += prefix + line.text + '\n';
    }
    return result;
  }

  async function extractPdfStructured(file) {
    var pdfjsLib = await loadPdfJs();
    var arrayBuffer = await file.arrayBuffer();
    var pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    var pageCount = pdf.numPages;
    var pages = [];
    var fullText = '';

    for (var i = 1; i <= pageCount; i++) {
      var page = await pdf.getPage(i);
      var content = await page.getTextContent();
      var lines = groupItemsIntoLines(content.items.filter(function (it) { return it.str && it.str.trim(); }));
      var pageText = lines.map(function (ln) { return ln.text; }).join('\n');
      pages.push({ pageNum: i, lines: lines, text: pageText });
      fullText += '\n--- Page ' + i + ' ---\n' + pageText;
    }

    var bodyFontSize = detectBodyFontSize(pages);

    return {
      pdf: pdf,
      pageCount: pageCount,
      pages: pages,
      fullText: fullText,
      bodyFontSize: bodyFontSize
    };
  }

  /* ---- Title & Author extraction ---- */
  function extractTitleAuthor(pages, bodyFontSize) {
    var title = '';
    var author = '';
    // Examine first 2 pages for largest and second-largest font text
    var candidates = [];
    var limit = Math.min(2, pages.length);
    for (var p = 0; p < limit; p++) {
      var lines = pages[p].lines;
      for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        if (line.text && line.fontSize > bodyFontSize * 1.1) {
          candidates.push({ text: line.text, fontSize: line.fontSize, page: p });
        }
      }
    }
    candidates.sort(function (a, b) { return b.fontSize - a.fontSize; });
    if (candidates.length > 0) title = candidates[0].text;
    // Author is typically the second-largest distinct font size on page 1
    if (candidates.length > 1) {
      for (var c = 1; c < candidates.length; c++) {
        if (candidates[c].fontSize < candidates[0].fontSize * 0.95) {
          author = candidates[c].text;
          break;
        }
      }
    }
    return { title: title, author: author };
  }

  /* ---- TOC Extraction: Tier 1 — PDF Outline/Bookmarks ---- */
  async function extractTocFromOutline(pdf) {
    var outline;
    try {
      outline = await pdf.getOutline();
    } catch (e) {
      console.log('[Library] getOutline() failed:', e.message);
      return null;
    }
    if (!outline || outline.length === 0) return null;

    var tocItems = [];

    async function walkOutline(nodes, level) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var pageNum = null;
        try {
          var dest = node.dest;
          if (typeof dest === 'string') {
            dest = await pdf.getDestination(dest);
          }
          if (dest && dest[0]) {
            var pageIndex = await pdf.getPageIndex(dest[0]);
            pageNum = pageIndex + 1;
          }
        } catch (e) {
          // Skip malformed destinations
        }
        tocItems.push({
          title: (node.title || '').trim(),
          level: level,
          page: pageNum
        });
        if (node.items && node.items.length > 0) {
          await walkOutline(node.items, level + 1);
        }
      }
    }

    await walkOutline(outline, 1);

    // Quality gate: too few entries means outline is sparse/useless
    if (tocItems.length < 3) return null;

    console.log('[Library] Outline extracted: ' + tocItems.length + ' entries');
    return tocItems;
  }

  /* ---- TOC Extraction: Tier 2 — AI with structured text ---- */
  async function extractTocWithAI(pages, bodyFontSize) {
    // Build structured text with heading markers, focusing on first 20 pages
    // plus sampled chapter openings from the rest
    var parts = [];
    var charCount = 0;
    var maxChars = 88000;

    // First 20 pages in full (where TOC usually lives)
    var fullPages = Math.min(20, pages.length);
    for (var i = 0; i < fullPages && charCount < maxChars; i++) {
      var pageHeader = '\n--- Page ' + pages[i].pageNum + ' ---\n';
      var pageText = reconstructPageText(pages[i], bodyFontSize);
      parts.push(pageHeader + pageText);
      charCount += pageHeader.length + pageText.length;
    }

    // Sample remaining pages: first 5 lines of each page (captures chapter headings)
    for (var j = fullPages; j < pages.length && charCount < maxChars; j++) {
      var sampledLines = pages[j].lines.slice(0, 5);
      if (sampledLines.length === 0) continue;
      var sampleHeader = '\n--- Page ' + pages[j].pageNum + ' ---\n';
      var sampleText = '';
      for (var sl = 0; sl < sampledLines.length; sl++) {
        var ln = sampledLines[sl];
        var px = '';
        if (ln.fontSize > bodyFontSize * 1.4) px = '[H1] ';
        else if (ln.fontSize > bodyFontSize * 1.15) px = '[H2] ';
        sampleText += px + ln.text + '\n';
      }
      parts.push(sampleHeader + sampleText);
      charCount += sampleHeader.length + sampleText.length;
    }

    var promptText = 'Document:\n' + parts.join('');
    var tocResult = await callClaudeApi(promptText, DEFAULT_LIBRARY_TOC_PROMPT);
    console.log('[Library] AI TOC response keys:', Object.keys(tocResult || {}));

    var tocItems = extractArray(tocResult, 'toc', ['sections', 'tableOfContents', 'chapters']);
    return { toc: tocItems, title: tocResult.title || '', author: tocResult.author || '' };
  }

  /* ---- TOC Orchestrator ---- */
  async function extractToc(pdf, pages, bodyFontSize) {
    // Tier 1: Try PDF outline
    var outlineToc = await extractTocFromOutline(pdf);
    if (outlineToc && outlineToc.length >= 3) {
      var meta = extractTitleAuthor(pages, bodyFontSize);
      return { title: meta.title, author: meta.author, toc: outlineToc, method: 'outline' };
    }

    // Tier 2: AI with structured text
    var aiResult = await extractTocWithAI(pages, bodyFontSize);
    var meta2 = extractTitleAuthor(pages, bodyFontSize);
    return {
      title: aiResult.title || meta2.title,
      author: aiResult.author || meta2.author,
      toc: aiResult.toc,
      method: 'ai'
    };
  }

  /* ---- Glossary Extraction ---- */
  function findGlossarySection(pages, bodyFontSize) {
    // Scan from ~60% through document for glossary heading
    var startScan = Math.floor(pages.length * 0.6);
    var glossaryPattern = /^(glossary|glossary of terms|key terms|definitions|glossary of key terms|list of terms)$/i;
    for (var p = startScan; p < pages.length; p++) {
      var lines = pages[p].lines;
      for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        if (line.fontSize > bodyFontSize * 1.15 && glossaryPattern.test(line.text.trim())) {
          // Find end: next major heading or end of document
          var endPage = pages.length - 1;
          var endPattern = /^(index|appendix|references|bibliography|answers|solutions)$/i;
          for (var ep = p + 1; ep < pages.length; ep++) {
            var epLines = pages[ep].lines;
            for (var el = 0; el < epLines.length; el++) {
              if (epLines[el].fontSize > bodyFontSize * 1.15 && endPattern.test(epLines[el].text.trim())) {
                endPage = ep - 1;
                break;
              }
            }
            if (endPage < pages.length - 1) break;
          }
          console.log('[Library] Glossary section found: pages ' + pages[p].pageNum + '-' + pages[endPage].pageNum);
          return { startPage: p, endPage: endPage };
        }
      }
    }
    return null;
  }

  async function extractGlossary(pages, fullText, bodyFontSize, onProgress) {
    // Phase 1: Extract just TERM NAMES from the document (small output, ~1 API call)
    // Phase 2: Generate DEFINITIONS from term names alone (no document needed)
    var notify = onProgress || function () {};

    var allTermNames = [];

    // --- Phase 1: Find terms ---
    notify({ phase: 'finding', status: 'Scanning document for key terms…', termCount: 0, definedCount: 0 });

    var glossarySection = findGlossarySection(pages, bodyFontSize);

    if (glossarySection) {
      var sectionText = '';
      for (var p = glossarySection.startPage; p <= glossarySection.endPage; p++) {
        sectionText += '\n--- Page ' + pages[p].pageNum + ' ---\n';
        sectionText += reconstructPageText(pages[p], bodyFontSize);
      }
      var sectionResult = await callClaudeApi('Glossary section:\n' + sectionText.substring(0, 90000), DEFAULT_LIBRARY_GLOSSARY_PROMPT);
      var sectionTerms = extractArray(sectionResult, 'terms', ['glossary', 'concepts']);
      allTermNames = allTermNames.concat(sectionTerms);
      notify({ phase: 'finding', status: 'Found glossary section', termCount: allTermNames.length, definedCount: 0, newTerms: sectionTerms });
    }

    // If glossary section didn't give us enough, scan the document for more terms
    if (allTermNames.length < 30) {
      notify({ phase: 'finding', status: 'Scanning document pages for terms…', termCount: allTermNames.length, definedCount: 0 });

      // Build sampled text from key regions
      var sampledText = '';

      // First 15 pages (introductory definitions)
      var introPages = Math.min(15, pages.length);
      for (var i = 0; i < introPages; i++) {
        sampledText += '\n--- Page ' + pages[i].pageNum + ' ---\n';
        sampledText += reconstructPageText(pages[i], bodyFontSize);
      }

      // Pages with headings from the middle (where terms are introduced)
      for (var m = introPages; m < Math.floor(pages.length * 0.85); m++) {
        var mLines = pages[m].lines;
        var hasHeading = false;
        for (var hl = 0; hl < mLines.length; hl++) {
          if (mLines[hl].fontSize > bodyFontSize * 1.15) { hasHeading = true; break; }
        }
        if (hasHeading) {
          sampledText += '\n--- Page ' + pages[m].pageNum + ' ---\n';
          sampledText += reconstructPageText(pages[m], bodyFontSize);
        }
      }

      // Last 15% of pages (back matter)
      var backStart = Math.max(introPages, Math.floor(pages.length * 0.85));
      for (var b = backStart; b < pages.length; b++) {
        sampledText += '\n--- Page ' + pages[b].pageNum + ' ---\n';
        sampledText += reconstructPageText(pages[b], bodyFontSize);
      }

      console.log('[Library] Phase 1 sampled text: ' + Math.round(sampledText.length / 1000) + 'K chars');

      var chunks = splitTextIntoChunks(sampledText, 90000, 3000);
      for (var ci = 0; ci < chunks.length; ci++) {
        var chunkLabel = chunks.length > 1 ? 'Document (part ' + (ci + 1) + ' of ' + chunks.length + '):\n' : 'Document:\n';
        notify({ phase: 'finding', status: 'Extracting terms' + (chunks.length > 1 ? ' (part ' + (ci + 1) + '/' + chunks.length + ')' : '') + '…', termCount: allTermNames.length, definedCount: 0 });
        var termResult = await callClaudeApi(chunkLabel + chunks[ci], DEFAULT_LIBRARY_GLOSSARY_PROMPT);
        var chunkTerms = extractArray(termResult, 'terms', ['glossary', 'concepts']);
        allTermNames = allTermNames.concat(chunkTerms);
        notify({ phase: 'finding', status: 'Found ' + allTermNames.length + ' terms so far', termCount: allTermNames.length, definedCount: 0, newTerms: chunkTerms });
        console.log('[Library] Phase 1 chunk ' + (ci + 1) + ': ' + chunkTerms.length + ' terms');
      }
    }

    // Deduplicate term names
    var uniqueTerms = deduplicateTerms(allTermNames);
    console.log('[Library] Phase 1 complete: ' + uniqueTerms.length + ' unique terms found');
    notify({ phase: 'finding', status: uniqueTerms.length + ' unique terms identified', termCount: uniqueTerms.length, definedCount: 0 });

    if (uniqueTerms.length === 0) {
      return { glossary: [], method: 'none' };
    }

    // --- Phase 2: Generate definitions (no document text needed, just term list) ---
    var termList = uniqueTerms.map(function (t) {
      return { term: t.term || t.name || t.title || '', page: t.page || null };
    }).filter(function (t) { return t.term; });

    notify({ phase: 'defining', status: 'Generating definitions for ' + termList.length + ' terms…', termCount: termList.length, definedCount: 0 });

    // Batch terms into groups of ~40 to keep output manageable
    var BATCH_SIZE = 40;
    var allDefined = [];
    for (var bi = 0; bi < termList.length; bi += BATCH_SIZE) {
      var batch = termList.slice(bi, bi + BATCH_SIZE);
      var batchNum = Math.floor(bi / BATCH_SIZE) + 1;
      var totalBatches = Math.ceil(termList.length / BATCH_SIZE);
      notify({ phase: 'defining', status: 'Generating definitions' + (totalBatches > 1 ? ' (batch ' + batchNum + '/' + totalBatches + ')' : '') + '…', termCount: termList.length, definedCount: allDefined.length });

      var termListStr = batch.map(function (t, idx) {
        return (idx + 1) + '. ' + t.term + (t.page ? ' (page ' + t.page + ')' : '');
      }).join('\n');

      var defineResult = await callClaudeApi('Define these ' + batch.length + ' actuarial terms:\n\n' + termListStr, DEFAULT_LIBRARY_DEFINE_PROMPT);
      var defined = extractArray(defineResult, 'glossary', ['terms', 'definitions']);
      allDefined = allDefined.concat(defined);
      notify({ phase: 'defining', status: allDefined.length + ' of ' + termList.length + ' definitions complete', termCount: termList.length, definedCount: allDefined.length, newTerms: defined });
      console.log('[Library] Phase 2 batch ' + batchNum + ': ' + defined.length + ' definitions');
    }

    return { glossary: deduplicateTerms(allDefined), method: glossarySection ? 'section+ai' : 'ai' };
  }

  function deduplicateTerms(terms) {
    var seen = {};
    return terms.filter(function (entry) {
      var key = (entry.term || entry.name || entry.title || '').toLowerCase().trim();
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  // Helper: robustly extract an array from an AI response object
  function extractArray(obj, primaryKey, altKeys) {
    if (!obj || typeof obj !== 'object') return [];
    if (Array.isArray(obj[primaryKey]) && obj[primaryKey].length > 0) return obj[primaryKey];
    for (var i = 0; i < altKeys.length; i++) {
      if (Array.isArray(obj[altKeys[i]]) && obj[altKeys[i]].length > 0) return obj[altKeys[i]];
    }
    var keys = Object.keys(obj);
    for (var j = 0; j < keys.length; j++) {
      if (Array.isArray(obj[keys[j]]) && obj[keys[j]].length > 0) return obj[keys[j]];
    }
    return [];
  }

  /* ---- AI API call (via Vercel proxy) ---- */
  async function callClaudeApi(text, systemPrompt) {
    var code = getInviteCode();
    if (!code) throw new Error('No invite code. Please enter your invite code.');

    var body = { text: text };
    if (systemPrompt) body.systemPrompt = systemPrompt;

    var MAX_RETRIES = 3;
    var RETRY_DELAYS = [3000, 8000, 15000]; // exponential-ish backoff

    for (var attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      var response = await fetch(API_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Invite-Code': code
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        return await response.json();
      }

      if (response.status === 401) throw new Error('Invalid invite code. Please check your code and try again.');

      // Retry on 429 (rate limit) and 529/502/503 (overload/temporary)
      if ((response.status === 429 || response.status >= 500) && attempt < MAX_RETRIES) {
        console.log('[API] Got ' + response.status + ', retrying in ' + (RETRY_DELAYS[attempt] / 1000) + 's (attempt ' + (attempt + 1) + '/' + MAX_RETRIES + ')');
        await new Promise(function (r) { setTimeout(r, RETRY_DELAYS[attempt]); });
        continue;
      }

      var errData;
      try { errData = await response.json(); } catch (e) { errData = {}; }
      if (response.status === 429) throw new Error('Rate limit exceeded after retries. Please wait a few minutes and try again.');
      throw new Error(errData.error || 'API error (' + response.status + ')');
    }
  }

  /* ---- Text chunking for large documents ---- */
  function splitTextIntoChunks(text, chunkSize, overlap) {
    if (!text || text.length <= chunkSize) return [text];
    var chunks = [];
    var start = 0;
    while (start < text.length) {
      chunks.push(text.substring(start, start + chunkSize));
      start += chunkSize - overlap;
    }
    return chunks;
  }

  /* ---- Step 4: Review (feedback loop) ---- */
  function renderReviewStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content custom-exam__review';

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = 'Review';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = 'Review the extracted content. Edit name or colour, then save.';

    // Exam title (editable)
    var titleGroup = document.createElement('div');
    titleGroup.className = 'custom-exam__form-group';
    titleGroup.innerHTML = '<label class="custom-exam__label">Exam Name</label>';
    var titleInput = document.createElement('input');
    titleInput.className = 'custom-exam__input';
    titleInput.type = 'text';
    titleInput.value = workflowData.examTitle || '';
    titleInput.addEventListener('input', function () { workflowData.examTitle = titleInput.value; });
    titleGroup.appendChild(titleInput);

    // Colour dropdown (not swatches)
    var colorGroup = document.createElement('div');
    colorGroup.className = 'custom-exam__form-group';
    colorGroup.innerHTML = '<label class="custom-exam__label">Accent Colour</label>';
    var colorSelectRow = document.createElement('div');
    colorSelectRow.style.cssText = 'display:flex;align-items:center;gap:10px';
    var colorDot = document.createElement('span');
    colorDot.style.cssText = 'width:20px;height:20px;border-radius:50%;flex-shrink:0';
    colorDot.style.background = workflowData.color || '#2563eb';
    var colorSelect = document.createElement('select');
    colorSelect.className = 'custom-exam__input';
    colorSelect.style.flex = '1';
    EXAM_COLORS.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      if (c === (workflowData.color || '#2563eb')) opt.selected = true;
      colorSelect.appendChild(opt);
    });
    colorSelect.addEventListener('change', function () {
      workflowData.color = colorSelect.value;
      colorDot.style.background = colorSelect.value;
    });
    colorSelectRow.appendChild(colorDot);
    colorSelectRow.appendChild(colorSelect);
    colorGroup.appendChild(colorSelectRow);

    // Save handler (shared by top and bottom buttons)
    function handleSave() {
      if (!workflowData.examTitle || !workflowData.examTitle.trim()) {
        alert('Please enter an exam name.');
        return;
      }
      saveExamFromWorkflow();
      currentStep = 5;
      renderStep();
    }

    // Top Save button
    var topSaveBtn = document.createElement('button');
    topSaveBtn.className = 'custom-exam__btn custom-exam__btn--primary custom-exam__btn--large';
    topSaveBtn.type = 'button';
    topSaveBtn.textContent = 'Save';
    topSaveBtn.style.cssText = 'margin-top:12px;font-size:1rem;font-weight:700';
    topSaveBtn.addEventListener('click', handleSave);

    // Read-only preview of objectives
    var previewSection = document.createElement('div');
    previewSection.className = 'custom-exam__form-section';
    previewSection.style.marginTop = '16px';
    var previewHeader = document.createElement('div');
    previewHeader.className = 'custom-exam__form-section-header';
    previewHeader.innerHTML = '<span class="custom-exam__form-section-title">Learning Objectives (' + (workflowData.objectives || []).length + ')</span>';
    previewSection.appendChild(previewHeader);

    (workflowData.objectives || []).forEach(function (obj, oi) {
      var card = document.createElement('div');
      card.className = 'custom-exam__obj-card';
      card.style.setProperty('--obj-color', workflowData.color || '#2563eb');

      var cardHeader = document.createElement('div');
      cardHeader.className = 'custom-exam__obj-header';
      cardHeader.style.cursor = 'pointer';
      cardHeader.style.userSelect = 'none';

      var numEl = document.createElement('span');
      numEl.style.fontWeight = '700';
      numEl.style.marginRight = '8px';
      numEl.style.opacity = '0.5';
      numEl.textContent = String(oi + 1) + '.';

      var objTitleEl = document.createElement('span');
      objTitleEl.style.fontWeight = '600';
      objTitleEl.textContent = obj.title;

      if (obj.weight != null) {
        var weightBadge = document.createElement('span');
        weightBadge.style.cssText = 'margin-left:8px;font-size:0.8rem;opacity:0.6;font-weight:400';
        weightBadge.textContent = obj.weight + '%';
        objTitleEl.appendChild(weightBadge);
      }

      var conceptCountBadge = document.createElement('span');
      conceptCountBadge.style.cssText = 'margin-left:auto;font-size:0.75rem;opacity:0.5';
      conceptCountBadge.textContent = (obj.concepts || []).length + ' concepts';

      cardHeader.appendChild(numEl);
      cardHeader.appendChild(objTitleEl);
      cardHeader.appendChild(conceptCountBadge);
      card.appendChild(cardHeader);

      var conceptsList = document.createElement('div');
      conceptsList.className = 'custom-exam__concepts-list';
      conceptsList.style.display = 'none';

      (obj.concepts || []).forEach(function (concept) {
        var row = document.createElement('div');
        row.style.cssText = 'padding:4px 0 4px 16px;font-size:0.85rem;border-bottom:1px solid var(--muted,#eee)';
        row.innerHTML = '<strong>' + escHtml(concept.name) + '</strong>';
        if (concept.description) row.innerHTML += ' — ' + escHtml(concept.description);
        conceptsList.appendChild(row);
      });

      cardHeader.addEventListener('click', function () {
        var open = conceptsList.style.display !== 'none';
        conceptsList.style.display = open ? 'none' : 'block';
      });

      card.appendChild(conceptsList);
      previewSection.appendChild(card);
    });

    // Read-only sources preview
    if ((workflowData.sources || []).length > 0) {
      var srcPreviewHeader = document.createElement('div');
      srcPreviewHeader.className = 'custom-exam__form-section-header';
      srcPreviewHeader.style.marginTop = '12px';
      srcPreviewHeader.innerHTML = '<span class="custom-exam__form-section-title">Sources (' + workflowData.sources.length + ')</span>';
      previewSection.appendChild(srcPreviewHeader);

      workflowData.sources.forEach(function (src) {
        var row = document.createElement('div');
        row.style.cssText = 'padding:6px 8px;font-size:0.85rem;border-bottom:1px solid var(--muted,#eee)';
        row.innerHTML = '<strong>' + escHtml(src.title) + '</strong>';
        if (src.author) row.innerHTML += ' — ' + escHtml(src.author);
        if (src.year) row.innerHTML += ' <span style="opacity:0.6">(' + escHtml(String(src.year)) + ')</span>';
        if (src.chapters) row.innerHTML += ' <span style="opacity:0.6">Ch. ' + escHtml(src.chapters) + '</span>';
        previewSection.appendChild(row);
      });
    }

    // Feedback section
    var feedbackSection = document.createElement('div');
    feedbackSection.className = 'custom-exam__form-group';
    feedbackSection.style.marginTop = '16px';
    feedbackSection.innerHTML = '<label class="custom-exam__label">Feedback (optional)</label>';
    var feedbackInput = document.createElement('textarea');
    feedbackInput.className = 'custom-exam__textarea';
    feedbackInput.rows = 3;
    feedbackInput.placeholder = 'e.g. "Add more detail to objective 2", "The sources list seems incomplete", "Merge objectives 3 and 4"';
    feedbackSection.appendChild(feedbackInput);

    var feedbackErrorEl = document.createElement('div');
    feedbackErrorEl.className = 'custom-exam__error';

    // Feedback + bottom save row
    var feedbackBtnRow = document.createElement('div');
    feedbackBtnRow.className = 'custom-exam__btn-row';
    feedbackBtnRow.style.marginTop = '12px';

    var feedbackBtn = document.createElement('button');
    feedbackBtn.className = 'custom-exam__btn custom-exam__btn--secondary';
    feedbackBtn.type = 'button';
    feedbackBtn.textContent = 'Send Feedback →';
    feedbackBtn.addEventListener('click', async function () {
      var fb = feedbackInput.value.trim();
      if (!fb) { feedbackInput.focus(); return; }

      feedbackBtn.disabled = true;
      feedbackBtn.innerHTML = SVG_SPINNER + ' Refining…';
      feedbackErrorEl.style.display = 'none';

      try {
        var context = JSON.stringify({
          examTitle: workflowData.examTitle,
          examDescription: workflowData.examDescription,
          objectives: workflowData.objectives,
          sources: workflowData.sources
        });
        var refinementText = 'Current content:\n' + context + '\n\nUser feedback: ' + fb;
        var prompts = getCustomPrompts();
        var fbPrompt = prompts.feedback || DEFAULT_FEEDBACK_PROMPT;
        var result = await callClaudeApi(refinementText, fbPrompt);

        if (result.examTitle) workflowData.examTitle = result.examTitle;
        if (result.examDescription) workflowData.examDescription = result.examDescription;
        if (result.objectives) workflowData.objectives = result.objectives;
        if (result.sources) workflowData.sources = result.sources;

        renderReviewStep(body);
      } catch (err) {
        feedbackErrorEl.textContent = 'Error: ' + (err.message || 'Refinement failed');
        feedbackErrorEl.style.display = 'block';
        feedbackBtn.disabled = false;
        feedbackBtn.textContent = 'Send Feedback →';
      }
    });
    feedbackBtnRow.appendChild(feedbackBtn);

    // Bottom Save button
    var bottomSaveBtn = document.createElement('button');
    bottomSaveBtn.className = 'custom-exam__btn custom-exam__btn--primary custom-exam__btn--large';
    bottomSaveBtn.type = 'button';
    bottomSaveBtn.textContent = 'Save';
    bottomSaveBtn.style.cssText = 'font-size:1rem;font-weight:700';
    bottomSaveBtn.addEventListener('click', handleSave);

    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(titleGroup);
    wrap.appendChild(colorGroup);
    wrap.appendChild(topSaveBtn);
    wrap.appendChild(previewSection);
    wrap.appendChild(feedbackSection);
    wrap.appendChild(feedbackErrorEl);
    wrap.appendChild(feedbackBtnRow);
    wrap.appendChild(bottomSaveBtn);

    body.innerHTML = '';
    body.appendChild(wrap);
  }

  function saveExamFromWorkflow() {
    var examId;
    if (editingExamId) {
      var idx = customExams.findIndex(function (ex) { return ex.id === editingExamId; });
      if (idx !== -1) {
        customExams[idx].name = workflowData.examTitle;
        customExams[idx].description = workflowData.examDescription;
        customExams[idx].color = workflowData.color;
        customExams[idx].objectives = workflowData.objectives;
        customExams[idx].sources = workflowData.sources;
        customExams[idx].updatedAt = new Date().toISOString();
        examId = editingExamId;
      }
    } else {
      examId = 'ce_' + Date.now();
      customExams.push({
        id: examId,
        name: workflowData.examTitle,
        description: workflowData.examDescription || '',
        color: workflowData.color || '#2563eb',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        objectives: workflowData.objectives || [],
        sources: workflowData.sources || [],
        pdfText: workflowData.pdfText || '',
        fileName: workflowData.file ? workflowData.file.name : ''
      });
    }
    saveExams();
    addSourcesToLibrary(workflowData.sources || [], examId);
    renderMyExams();
  }

  /** Add exam sources to the document library (skip duplicates by title). */
  function addSourcesToLibrary(sources, examId) {
    if (!sources || sources.length === 0) return;
    var added = false;
    sources.forEach(function (src, i) {
      if (!src.title) return;
      // Skip if a library doc with the same title already exists
      var titleLower = src.title.toLowerCase().trim();
      var exists = libraryDocs.some(function (doc) {
        return (doc.title || '').toLowerCase().trim() === titleLower;
      });
      if (exists) return;

      libraryDocs.push({
        id: 'lib_' + Date.now() + '_' + i,
        title: src.title,
        author: src.author || '',
        year: src.year || null,
        sourceType: src.type || '',
        chapters: src.chapters || '',
        fromExamId: examId || null,
        toc: [],
        glossary: [],
        pdfText: '',
        uploadedAt: Date.now()
      });
      added = true;
    });
    if (added) saveLibrary();
  }

  /* ---- Step 5: Complete ---- */
  function renderCompleteStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content custom-exam__complete';

    var successIcon = document.createElement('div');
    successIcon.className = 'custom-exam__success-icon';
    successIcon.innerHTML = SVG_CHECK_CIRCLE;

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = editingExamId ? 'Exam Updated!' : 'Custom Exam Created!';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = '"' + workflowData.examTitle + '" has been saved. You can view it from the sidebar, edit it anytime, or download a PDF study guide.';

    // Stats
    var stats = document.createElement('div');
    stats.className = 'custom-exam__stats';

    var objCount = (workflowData.objectives || []).length;
    var conceptCount = 0;
    (workflowData.objectives || []).forEach(function (o) { conceptCount += (o.concepts || []).length; });
    var srcCount = (workflowData.sources || []).length;

    [
      { label: 'Objectives', value: objCount },
      { label: 'Concepts', value: conceptCount },
      { label: 'Sources', value: srcCount }
    ].forEach(function (stat) {
      var s = document.createElement('div');
      s.className = 'custom-exam__stat';
      s.innerHTML = '<span class="custom-exam__stat-value">' + stat.value + '</span><span class="custom-exam__stat-label">' + stat.label + '</span>';
      stats.appendChild(s);
    });

    // Buttons
    var btnRow = document.createElement('div');
    btnRow.className = 'custom-exam__btn-row';

    var downloadBtn = document.createElement('button');
    downloadBtn.className = 'custom-exam__btn custom-exam__btn--primary';
    downloadBtn.type = 'button';
    downloadBtn.innerHTML = '<span class="custom-exam__btn-icon">' + SVG_DOWNLOAD + '</span> Download Study Guide PDF';
    downloadBtn.addEventListener('click', function () {
      generatePdf(workflowData);
    });

    var viewBtn = document.createElement('button');
    viewBtn.className = 'custom-exam__btn custom-exam__btn--secondary';
    viewBtn.type = 'button';
    viewBtn.textContent = 'View Exam';
    viewBtn.addEventListener('click', function () {
      var examId = editingExamId || customExams[customExams.length - 1].id;
      closeModal();
      renderExamViewer(examId);
    });

    var addAnotherBtn = document.createElement('button');
    addAnotherBtn.className = 'custom-exam__btn custom-exam__btn--ghost';
    addAnotherBtn.type = 'button';
    addAnotherBtn.textContent = 'Add Another';
    addAnotherBtn.addEventListener('click', function () {
      editingExamId = null;
      workflowData = {};
      currentStep = 2;
      renderStep();
    });

    btnRow.appendChild(downloadBtn);
    btnRow.appendChild(viewBtn);
    btnRow.appendChild(addAnotherBtn);

    wrap.appendChild(successIcon);
    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(stats);
    wrap.appendChild(btnRow);
    body.appendChild(wrap);
  }

  /* ---- PDF Generation (jsPDF) ---- */
  var _jspdfLoadPromise = null;
  async function loadJsPdf() {
    // Normalize namespace: jsPDF UMD may expose as window.jspdf or window.jsPDF
    if (window.jspdf && window.jspdf.jsPDF) return window.jspdf;
    if (window.jsPDF) return { jsPDF: window.jsPDF };
    if (_jspdfLoadPromise) return _jspdfLoadPromise;

    _jspdfLoadPromise = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
      script.onload = function () {
        // Normalize after load
        if (!window.jspdf && window.jsPDF) {
          window.jspdf = { jsPDF: window.jsPDF };
        }
        var script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
        script2.onload = function () { resolve(window.jspdf); };
        script2.onerror = function () { resolve(window.jspdf); };
        document.head.appendChild(script2);
      };
      script.onerror = function () {
        _jspdfLoadPromise = null;
        reject(new Error('Failed to load PDF library. Check your internet connection and try again.'));
      };
      document.head.appendChild(script);
    });
    return _jspdfLoadPromise;
  }

  async function generatePdf(data) {
    try {
      var jspdfLib = await loadJsPdf();
      if (!jspdfLib || !jspdfLib.jsPDF) {
        throw new Error('PDF library not available. Please try again.');
      }
      var doc = new jspdfLib.jsPDF();

      var pageWidth = doc.internal.pageSize.getWidth();
      var margin = 20;
      var contentWidth = pageWidth - 2 * margin;
      var y = margin;

      // Title page
      doc.setFontSize(28);
      doc.setFont(undefined, 'bold');
      doc.text(data.examTitle || 'Custom Exam', pageWidth / 2, 60, { align: 'center' });

      doc.setFontSize(14);
      doc.setFont(undefined, 'normal');
      if (data.examDescription) {
        var descLines = doc.splitTextToSize(data.examDescription, contentWidth);
        doc.text(descLines, pageWidth / 2, 75, { align: 'center' });
      }

      doc.setFontSize(11);
      doc.text('Study Guide', pageWidth / 2, 95, { align: 'center' });
      doc.text('Generated ' + new Date().toLocaleDateString(), pageWidth / 2, 103, { align: 'center' });

      // Objectives section
      doc.addPage();
      y = margin;

      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('Learning Objectives', margin, y);
      y += 12;

      (data.objectives || []).forEach(function (obj, i) {
        if (y > 260) { doc.addPage(); y = margin; }

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        var objTitle = (i + 1) + '. ' + obj.title;
        if (obj.weight) objTitle += ' (' + obj.weight + '%)';
        var titleLines = doc.splitTextToSize(objTitle, contentWidth);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 7 + 4;

        (obj.concepts || []).forEach(function (concept) {
          if (y > 260) { doc.addPage(); y = margin; }

          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          doc.text('  ' + concept.name, margin + 4, y);
          y += 6;

          doc.setFont(undefined, 'normal');
          if (concept.description) {
            var conceptLines = doc.splitTextToSize(concept.description, contentWidth - 12);
            doc.text(conceptLines, margin + 8, y);
            y += conceptLines.length * 5 + 4;
          }
        });

        y += 6;
      });

      // Sources section
      if (data.sources && data.sources.length > 0) {
        if (y > 220) { doc.addPage(); y = margin; }

        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('Sources & References', margin, y);
        y += 12;

        if (doc.autoTable) {
          doc.autoTable({
            startY: y,
            head: [['Title', 'Author', 'Chapters', 'Type']],
            body: data.sources.map(function (s) {
              return [s.title || '', s.author || '', s.chapters || '', s.type || ''];
            }),
            margin: { left: margin, right: margin },
            styles: { fontSize: 10 },
            headStyles: { fillColor: [37, 99, 235] }
          });
        } else {
          data.sources.forEach(function (src) {
            if (y > 270) { doc.addPage(); y = margin; }
            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            doc.text(src.title + ' — ' + src.author + ' (Ch. ' + (src.chapters || 'N/A') + ')', margin, y);
            y += 6;
          });
        }
      }

      // Footer on all pages
      var pageCount = doc.internal.getNumberOfPages();
      for (var p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text('Generated by Actuarial Notes Wiki', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
        doc.text('Page ' + p + ' of ' + pageCount, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
      }

      var filename = (data.examTitle || 'Custom-Exam').replace(/[^a-zA-Z0-9]/g, '-') + '-Study-Guide.pdf';
      doc.save(filename);
    } catch (err) {
      alert('PDF generation failed: ' + err.message);
    }
  }

  /* ---- Remove viewer and restore page content ---- */
  function removeViewer(viewer) {
    document.querySelectorAll('[data-exam-hidden]').forEach(function (el) {
      el.style.display = '';
      delete el.dataset.examHidden;
    });
    if (viewer && viewer.parentElement) viewer.remove();
  }

  /* ---- Exam Viewer (main content area) ---- */
  function showInContentArea(viewer) {
    var center = document.querySelector('.site-body-center-column');
    if (!center) return;
    var contentEl = center.querySelector('.markdown-preview-view') || center.querySelector('.markdown-rendered') || center;

    // Remove any existing viewer first
    var existing = document.querySelector('.custom-exam__viewer');
    if (existing) removeViewer(existing);

    // Remove sticky bars from real exam pages
    document.querySelectorAll('.exam-nav__sticky').forEach(function (s) { s.remove(); });

    // Hide all existing page content
    Array.from(contentEl.children).forEach(function (child) {
      if (!child.classList.contains('custom-exam__viewer')) {
        child.dataset.examHidden = 'true';
        child.style.display = 'none';
      }
    });

    contentEl.appendChild(viewer);
    window.scrollTo(0, 0);
  }

  function renderExamViewer(examId) {
    var exam = customExams.find(function (ex) { return ex.id === examId; });
    if (!exam) return;

    var viewer = document.createElement('div');
    viewer.className = 'custom-exam__viewer';
    viewer.style.setProperty('--exam-color', exam.color || '#2563eb');

    // Toolbar (no back button — it's a wiki page)
    var toolbar = document.createElement('div');
    toolbar.className = 'custom-exam__viewer-toolbar';

    var toolbarActions = document.createElement('div');
    toolbarActions.className = 'custom-exam__viewer-actions';

    var dlBtn = document.createElement('button');
    dlBtn.className = 'custom-exam__btn custom-exam__btn--secondary custom-exam__btn--small';
    dlBtn.type = 'button';
    dlBtn.innerHTML = '<span class="custom-exam__btn-icon">' + SVG_DOWNLOAD + '</span> PDF';
    dlBtn.addEventListener('click', function () {
      generatePdf({ examTitle: exam.name, examDescription: exam.description, objectives: exam.objectives, sources: exam.sources });
    });

    var editBtn = document.createElement('button');
    editBtn.className = 'custom-exam__btn custom-exam__btn--secondary custom-exam__btn--small';
    editBtn.type = 'button';
    editBtn.innerHTML = '<span class="custom-exam__btn-icon">' + SVG_EDIT + '</span> Edit';
    editBtn.addEventListener('click', function () {
      removeViewer(viewer);
      openEditModal(exam.id);
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'custom-exam__btn custom-exam__btn--danger custom-exam__btn--small';
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '<span class="custom-exam__btn-icon">' + SVG_TRASH + '</span> Delete';
    deleteBtn.addEventListener('click', function () {
      if (confirm('Delete "' + exam.name + '"?')) {
        customExams = customExams.filter(function (ex) { return ex.id !== exam.id; });
        saveExams();
        renderMyExams();
        removeViewer(viewer);
      }
    });

    toolbarActions.appendChild(dlBtn);
    toolbarActions.appendChild(editBtn);
    toolbarActions.appendChild(deleteBtn);
    toolbar.appendChild(toolbarActions);

    // Page content (wiki-style)
    var contentWrap = document.createElement('div');

    var titleEl = document.createElement('h2');
    titleEl.style.color = exam.color;
    titleEl.textContent = exam.name;
    contentWrap.appendChild(titleEl);

    if (exam.description) {
      var descEl = document.createElement('p');
      descEl.textContent = exam.description;
      contentWrap.appendChild(descEl);
    }

    // Learning Objectives heading
    var objHeading = document.createElement('h3');
    objHeading.textContent = 'Learning Objectives';
    contentWrap.appendChild(objHeading);

    // Add has-exam-nav class for proper callout tinting
    contentWrap.classList.add('has-exam-nav');

    // Native callout for each objective (matching Obsidian's DOM structure)
    (exam.objectives || []).forEach(function (obj, i) {
      var callout = document.createElement('div');
      callout.className = 'callout is-collapsed';
      callout.setAttribute('data-callout', 'example');
      callout.style.setProperty('--callout-color', exam.color || '#2563eb');

      var calloutTitle = document.createElement('div');
      calloutTitle.className = 'callout-title';
      calloutTitle.style.cursor = 'pointer';

      // Icon element (hidden by CSS but matches native structure)
      var calloutIcon = document.createElement('div');
      calloutIcon.className = 'callout-icon';
      calloutTitle.appendChild(calloutIcon);

      var numEl = document.createElement('data');
      numEl.className = 'callout-obj-num';
      numEl.textContent = String(i + 1);

      var titleInner = document.createElement('div');
      titleInner.className = 'callout-title-inner';
      titleInner.textContent = obj.title;

      var foldEl = document.createElement('div');
      foldEl.className = 'callout-fold';
      foldEl.style.marginLeft = 'auto';
      foldEl.style.display = 'inline-block';
      foldEl.style.transition = 'transform 0.2s ease';
      foldEl.style.transform = 'rotate(0deg)';
      foldEl.textContent = '›';

      calloutTitle.appendChild(numEl);
      calloutTitle.appendChild(titleInner);

      if (obj.weight != null) {
        var pctBadge = document.createElement('span');
        pctBadge.className = 'callout-badge callout-badge--pct';
        pctBadge.textContent = obj.weight + '%';
        calloutTitle.appendChild(pctBadge);
      }

      // Concept count badge
      if ((obj.concepts || []).length > 0) {
        var conceptBadge = document.createElement('span');
        conceptBadge.className = 'callout-concept-count';
        conceptBadge.textContent = (obj.concepts || []).length + ' Concepts';
        calloutTitle.appendChild(conceptBadge);
      }

      calloutTitle.appendChild(foldEl);

      var calloutContent = document.createElement('div');
      calloutContent.className = 'callout-content';

      var conceptList = document.createElement('ol');
      (obj.concepts || []).forEach(function (concept, ci) {
        var li = document.createElement('li');
        var nameLink = document.createElement('a');
        nameLink.href = '#';
        nameLink.style.color = exam.color || '#2563eb';
        nameLink.style.fontWeight = '600';
        nameLink.textContent = concept.name;
        nameLink.addEventListener('click', function (e) {
          e.preventDefault();
          renderConceptPage(exam.id, i, ci);
        });
        li.appendChild(nameLink);
        if (concept.description) {
          li.appendChild(document.createTextNode(' — ' + concept.description));
        }
        conceptList.appendChild(li);
      });

      calloutContent.appendChild(conceptList);

      calloutTitle.addEventListener('click', function () {
        var collapsed = callout.classList.toggle('is-collapsed');
        foldEl.style.transform = collapsed ? 'rotate(0deg)' : 'rotate(90deg)';
      });

      callout.appendChild(calloutTitle);
      callout.appendChild(calloutContent);
      contentWrap.appendChild(callout);
    });

    // Sources table
    if (exam.sources && exam.sources.length > 0) {
      var srcHeading = document.createElement('h3');
      srcHeading.textContent = 'Sources & References';
      contentWrap.appendChild(srcHeading);

      var table = document.createElement('table');
      var thead = document.createElement('thead');
      var headerRow = document.createElement('tr');
      ['Title', 'Author', 'Chapters', 'Type'].forEach(function (col) {
        var th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      var tbody = document.createElement('tbody');
      exam.sources.forEach(function (src, si) {
        var tr = document.createElement('tr');

        var tdTitle = document.createElement('td');
        var srcLink = document.createElement('a');
        srcLink.href = '#';
        srcLink.style.color = exam.color || '#2563eb';
        srcLink.textContent = src.title || '';
        srcLink.addEventListener('click', function (e) {
          e.preventDefault();
          renderSourcePage(exam.id, si);
        });
        tdTitle.appendChild(srcLink);
        tr.appendChild(tdTitle);

        ['author', 'chapters', 'type'].forEach(function (field) {
          var td = document.createElement('td');
          td.textContent = src[field] || '';
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      contentWrap.appendChild(table);
    }

    viewer.appendChild(toolbar);
    viewer.appendChild(contentWrap);

    showInContentArea(viewer);
  }

  /* ---- Concept page ---- */
  function renderConceptPage(examId, objIndex, conceptIndex) {
    var exam = customExams.find(function (ex) { return ex.id === examId; });
    if (!exam) return;
    var obj = (exam.objectives || [])[objIndex];
    if (!obj) return;
    var concept = (obj.concepts || [])[conceptIndex];
    if (!concept) return;

    var viewer = document.createElement('div');
    viewer.className = 'custom-exam__viewer';
    viewer.style.setProperty('--exam-color', exam.color || '#2563eb');

    var toolbar = document.createElement('div');
    toolbar.className = 'custom-exam__viewer-toolbar';

    var backBtn = document.createElement('button');
    backBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--small';
    backBtn.type = 'button';
    backBtn.textContent = '← ' + exam.name;
    backBtn.addEventListener('click', function () {
      removeViewer(viewer);
      renderExamViewer(examId);
    });
    toolbar.appendChild(backBtn);

    var contentWrap = document.createElement('div');

    var breadcrumb = document.createElement('p');
    breadcrumb.style.cssText = 'font-size:0.85rem;opacity:0.6;margin-bottom:0.25rem';
    var examLink = document.createElement('a');
    examLink.href = '#';
    examLink.style.color = exam.color || '#2563eb';
    examLink.textContent = exam.name;
    examLink.addEventListener('click', function (e) { e.preventDefault(); removeViewer(viewer); renderExamViewer(examId); });
    breadcrumb.appendChild(examLink);
    breadcrumb.appendChild(document.createTextNode(' › ' + obj.title));
    contentWrap.appendChild(breadcrumb);

    var titleEl = document.createElement('h1');
    titleEl.style.color = exam.color;
    titleEl.textContent = concept.name;
    contentWrap.appendChild(titleEl);

    if (concept.description) {
      var descEl = document.createElement('p');
      descEl.style.cssText = 'opacity:0.8;font-size:1rem;margin-bottom:1rem';
      descEl.textContent = concept.description;
      contentWrap.appendChild(descEl);
    }

    // Detail content area
    var detailArea = document.createElement('div');
    detailArea.className = 'custom-exam__concept-detail';

    // Linked definition (from library glossary)
    if (concept.linkedDefinition) {
      var linkedWrap = document.createElement('div');
      linkedWrap.className = 'doc-library__linked-definition';

      var linkedHeader = document.createElement('div');
      linkedHeader.className = 'doc-library__linked-header';

      var linkedIcon = document.createElement('span');
      linkedIcon.style.cssText = 'width:16px;height:16px;display:inline-flex;opacity:0.6';
      linkedIcon.innerHTML = SVG_LINK;

      var linkedLabel = document.createElement('span');
      linkedLabel.style.cssText = 'font-size:0.8rem;opacity:0.6;text-transform:uppercase;letter-spacing:0.05em';
      linkedLabel.textContent = 'Linked Definition';

      linkedHeader.appendChild(linkedIcon);
      linkedHeader.appendChild(linkedLabel);
      linkedWrap.appendChild(linkedHeader);

      var linkedTerm = document.createElement('div');
      linkedTerm.className = 'doc-library__linked-term';
      linkedTerm.textContent = concept.linkedDefinition.term;
      linkedWrap.appendChild(linkedTerm);

      var linkedDef = document.createElement('div');
      linkedDef.className = 'doc-library__linked-def-text';
      linkedDef.textContent = concept.linkedDefinition.definition;
      linkedWrap.appendChild(linkedDef);

      var linkedSource = document.createElement('div');
      linkedSource.className = 'doc-library__linked-source';
      linkedSource.textContent = 'Source: ' + (concept.linkedDefinition.sourceDocTitle || 'Unknown');
      linkedWrap.appendChild(linkedSource);

      var linkedActions = document.createElement('div');
      linkedActions.style.cssText = 'display:flex;gap:8px;margin-top:12px';

      var changeBtn = document.createElement('button');
      changeBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--tiny';
      changeBtn.type = 'button';
      changeBtn.innerHTML = SVG_LINK + ' Change';
      changeBtn.addEventListener('click', function () {
        openLinkDefinitionModal(examId, objIndex, conceptIndex);
      });

      var unlinkBtn = document.createElement('button');
      unlinkBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--tiny';
      unlinkBtn.type = 'button';
      unlinkBtn.innerHTML = SVG_UNLINK + ' Unlink';
      unlinkBtn.addEventListener('click', function () {
        delete concept.linkedDefinition;
        saveExams();
        var existingViewer = document.querySelector('.custom-exam__viewer');
        if (existingViewer) removeViewer(existingViewer);
        renderConceptPage(examId, objIndex, conceptIndex);
      });

      linkedActions.appendChild(changeBtn);
      linkedActions.appendChild(unlinkBtn);
      linkedWrap.appendChild(linkedActions);

      detailArea.appendChild(linkedWrap);
    }

    // Existing detail content (from prior AI generation)
    if (concept.detail) {
      renderConceptDetail(detailArea, concept.detail, exam.color);
    } else if (!concept.linkedDefinition) {
      // Link Definition empty state
      var linkWrap = document.createElement('div');
      linkWrap.style.cssText = 'padding:24px;border:2px dashed var(--muted,#333);border-radius:8px;text-align:center;margin:1rem 0';

      var linkHint = document.createElement('p');
      linkHint.style.cssText = 'opacity:0.6;margin-bottom:12px;font-size:0.9rem';
      linkHint.textContent = 'No definition linked yet. Search your document library to link a definition.';
      linkWrap.appendChild(linkHint);

      if (libraryDocs.length === 0) {
        var libHint = document.createElement('p');
        libHint.style.cssText = 'opacity:0.5;margin-bottom:12px;font-size:0.85rem';
        libHint.textContent = 'Upload documents to your library first.';
        linkWrap.appendChild(libHint);

        var goToLibBtn = document.createElement('button');
        goToLibBtn.className = 'custom-exam__btn custom-exam__btn--secondary';
        goToLibBtn.type = 'button';
        goToLibBtn.innerHTML = '<span class="custom-exam__btn-icon" style="width:16px;height:16px;display:inline-flex">' + SVG_BOOK + '</span> Go to Library';
        goToLibBtn.addEventListener('click', function () {
          var existingViewer = document.querySelector('.custom-exam__viewer');
          if (existingViewer) removeViewer(existingViewer);
          renderLibraryViewer();
        });
        linkWrap.appendChild(goToLibBtn);
      } else {
        var linkBtn = document.createElement('button');
        linkBtn.className = 'custom-exam__btn custom-exam__btn--primary';
        linkBtn.type = 'button';
        linkBtn.innerHTML = '<span class="custom-exam__btn-icon" style="width:16px;height:16px;display:inline-flex">' + SVG_LINK + '</span> Link Definition';
        linkBtn.addEventListener('click', function () {
          openLinkDefinitionModal(examId, objIndex, conceptIndex);
        });
        linkWrap.appendChild(linkBtn);
      }

      detailArea.appendChild(linkWrap);
    }
    contentWrap.appendChild(detailArea);

    // Part of
    var partOf = document.createElement('p');
    partOf.style.cssText = 'margin-top:1.5rem;opacity:0.5;font-size:0.85rem';
    partOf.innerHTML = '<strong>Part of:</strong> ' + escHtml(exam.name) + ' › ' + escHtml(obj.title);
    contentWrap.appendChild(partOf);

    viewer.appendChild(toolbar);
    viewer.appendChild(contentWrap);
    showInContentArea(viewer);
  }

  function renderConceptDetail(container, detail, color) {
    var detailEl = document.createElement('div');
    detailEl.style.cssText = 'padding:16px 20px;background:var(--bg-elev,#1a1a2e);border-left:4px solid ' + (color || 'var(--brand,#2563eb)') + ';border-radius:6px;margin:1rem 0;line-height:1.6;font-size:0.95rem';
    detailEl.textContent = detail;
    container.appendChild(detailEl);
  }

  /* =========================================================
     DOCUMENT LIBRARY
     Global document library for supplementary source materials.
     Separate from the exam syllabus — stored independently.
     ========================================================= */

  var SVG_BOOK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a2 2 0 0 1 2 2v12a1.5 1.5 0 0 0-1.5-1.5H2V3z"/><path d="M18 3h-6a2 2 0 0 0-2 2v12a1.5 1.5 0 0 1 1.5-1.5H18V3z"/></svg>';
  var SVG_LINK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 13.5l3-3"/><path d="M11 7l1.5-1.5a2.83 2.83 0 1 1 4 4L15 11"/><path d="M9 13l-1.5 1.5a2.83 2.83 0 1 1-4-4L5 9"/></svg>';
  var SVG_UNLINK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 7l1.5-1.5a2.83 2.83 0 1 1 4 4L15 11"/><path d="M9 13l-1.5 1.5a2.83 2.83 0 1 1-4-4L5 9"/><line x1="4" y1="16" x2="16" y2="4"/></svg>';
  var SVG_SEARCH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="6"/><line x1="13.5" y1="13.5" x2="17" y2="17"/></svg>';

  var DOC_COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#db2777', '#0891b2', '#4f46e5', '#c2410c', '#0d9488', '#6d28d9'];

  function getDocInitials(title) {
    if (!title) return '??';
    var words = title.split(/\s+/).filter(function (w) { return w.length > 0; });
    // Skip common short words for second initial
    var skip = { 'a': 1, 'an': 1, 'the': 1, 'and': 1, 'or': 1, 'of': 1, 'for': 1, 'in': 1, 'on': 1, 'to': 1, '-': 1 };
    var initials = '';
    for (var i = 0; i < words.length && initials.length < 2; i++) {
      if (initials.length === 1 && skip[words[i].toLowerCase()]) continue;
      initials += words[i][0].toUpperCase();
    }
    if (initials.length < 2 && title.length >= 2) initials = title.substring(0, 2).toUpperCase();
    return initials || '??';
  }

  function getDocColor(id) {
    // Simple hash to pick a consistent color
    var hash = 0;
    for (var i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit int
    }
    return DOC_COLORS[Math.abs(hash) % DOC_COLORS.length];
  }

  /* ---- Library viewer page ---- */
  function renderLibraryViewer() {
    var viewer = document.createElement('div');
    viewer.className = 'custom-exam__viewer';

    var toolbar = document.createElement('div');
    toolbar.className = 'custom-exam__viewer-toolbar';

    var titleEl = document.createElement('span');
    titleEl.style.cssText = 'font-size:1.1rem;font-weight:600;display:flex;align-items:center;gap:8px';
    titleEl.innerHTML = '<span style="width:20px;height:20px;display:inline-flex">' + SVG_BOOK + '</span> Document Library';
    toolbar.appendChild(titleEl);

    var toolbarActions = document.createElement('div');
    toolbarActions.className = 'custom-exam__viewer-actions';

    var uploadBtn = document.createElement('button');
    uploadBtn.className = 'custom-exam__btn custom-exam__btn--primary custom-exam__btn--small';
    uploadBtn.type = 'button';
    uploadBtn.innerHTML = '<span class="custom-exam__btn-icon">' + SVG_PLUS + '</span> Upload Document';
    uploadBtn.addEventListener('click', function () { openLibraryUploadModal(); });
    toolbarActions.appendChild(uploadBtn);
    toolbar.appendChild(toolbarActions);

    var contentWrap = document.createElement('div');

    if (libraryDocs.length === 0) {
      // Empty state
      var empty = document.createElement('div');
      empty.style.cssText = 'text-align:center;padding:3rem 1rem;opacity:0.7';
      empty.innerHTML = '<div style="width:48px;height:48px;margin:0 auto 16px;opacity:0.4">' + SVG_BOOK + '</div>' +
        '<p style="font-size:1.1rem;margin-bottom:8px">No documents yet</p>' +
        '<p style="font-size:0.9rem;opacity:0.7;margin-bottom:20px">Upload textbooks, articles, or lecture notes to build your library.</p>';

      var emptyUploadBtn = document.createElement('button');
      emptyUploadBtn.className = 'custom-exam__btn custom-exam__btn--primary';
      emptyUploadBtn.type = 'button';
      emptyUploadBtn.innerHTML = '<span class="custom-exam__btn-icon">' + SVG_PLUS + '</span> Upload Document';
      emptyUploadBtn.addEventListener('click', function () { openLibraryUploadModal(); });
      empty.appendChild(emptyUploadBtn);
      contentWrap.appendChild(empty);
    } else {
      // Card grid
      var grid = document.createElement('div');
      grid.className = 'doc-library__card-grid';

      libraryDocs.forEach(function (doc) {
        var card = document.createElement('div');
        card.className = 'doc-library__card';

        var iconArea = document.createElement('div');
        iconArea.className = 'doc-library__card-icon';
        var docColor = getDocColor(doc.id);
        var docInitials = getDocInitials(doc.title);
        iconArea.innerHTML = '<div class="doc-library__card-avatar" style="background:' + docColor + '">' + escHtml(docInitials) + '</div>';

        var info = document.createElement('div');
        info.className = 'doc-library__card-info';

        var docTitle = document.createElement('div');
        docTitle.className = 'doc-library__card-title';
        docTitle.textContent = doc.title || 'Untitled Document';

        var docAuthor = document.createElement('div');
        docAuthor.className = 'doc-library__card-author';
        docAuthor.textContent = doc.author || '';

        var stats = document.createElement('div');
        stats.className = 'doc-library__card-stats';
        var tocCount = (doc.toc || []).length;
        var glossaryCount = (doc.glossary || []).length;
        stats.textContent = tocCount + ' sections · ' + glossaryCount + ' terms';

        info.appendChild(docTitle);
        if (doc.author) info.appendChild(docAuthor);
        info.appendChild(stats);

        var actions = document.createElement('div');
        actions.className = 'doc-library__card-actions';

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--tiny';
        deleteBtn.type = 'button';
        deleteBtn.title = 'Delete';
        deleteBtn.innerHTML = SVG_TRASH;
        deleteBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (confirm('Delete "' + (doc.title || 'this document') + '"? This cannot be undone.')) {
            libraryDocs = libraryDocs.filter(function (d) { return d.id !== doc.id; });
            saveLibrary();
            removeViewer(viewer);
            renderLibraryViewer();
          }
        });
        actions.appendChild(deleteBtn);

        card.appendChild(iconArea);
        card.appendChild(info);
        card.appendChild(actions);

        card.addEventListener('click', function () {
          removeViewer(viewer);
          renderLibraryDocPage(doc.id);
        });

        grid.appendChild(card);
      });

      contentWrap.appendChild(grid);
    }

    viewer.appendChild(toolbar);
    viewer.appendChild(contentWrap);
    showInContentArea(viewer);
  }

  /* ---- Source-only library document detail page ---- */
  function renderSourceOnlyDocPage(container, doc) {
    var color = getDocColor(doc.id);

    // Cover + info layout (mirrors renderSourcePage)
    var infoLayout = document.createElement('div');
    infoLayout.style.cssText = 'display:flex;gap:1.5rem;align-items:flex-start;margin-bottom:2rem';

    // Cover image area
    var coverWrap = document.createElement('div');
    coverWrap.style.flexShrink = '0';

    var initials = getDocInitials(doc.title);
    var placeholder = document.createElement('div');
    placeholder.style.cssText = 'width:120px;height:160px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.15)';
    placeholder.style.background = color;
    placeholder.textContent = initials;

    var coverImg = document.createElement('img');
    coverImg.style.cssText = 'display:none;width:120px;height:auto;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.2)';

    coverWrap.appendChild(placeholder);
    coverWrap.appendChild(coverImg);

    // Fetch cover from Open Library
    var searchQ = encodeURIComponent((doc.title || '') + ' ' + (doc.author || ''));
    fetch('https://openlibrary.org/search.json?q=' + searchQ + '&limit=1&fields=cover_i')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var coverId = data.docs && data.docs[0] && data.docs[0].cover_i;
        if (coverId) {
          coverImg.src = 'https://covers.openlibrary.org/b/id/' + coverId + '-M.jpg';
          coverImg.onload = function () { coverImg.style.display = 'block'; placeholder.style.display = 'none'; };
        }
      })
      .catch(function () { /* keep placeholder */ });

    // Right side info
    var infoRight = document.createElement('div');
    infoRight.style.flex = '1';

    var titleEl = document.createElement('h1');
    titleEl.style.color = color;
    titleEl.textContent = doc.title || 'Unknown Title';
    infoRight.appendChild(titleEl);

    if (doc.author) {
      var authorEl = document.createElement('p');
      authorEl.style.opacity = '0.7';
      authorEl.textContent = 'By ' + doc.author;
      infoRight.appendChild(authorEl);
    }
    if (doc.chapters) {
      var chapEl = document.createElement('p');
      chapEl.innerHTML = '<strong>Chapters:</strong> ' + escHtml(doc.chapters);
      infoRight.appendChild(chapEl);
    }
    if (doc.sourceType) {
      var typeEl = document.createElement('p');
      typeEl.innerHTML = '<strong>Type:</strong> ' + escHtml(doc.sourceType);
      infoRight.appendChild(typeEl);
    }
    if (doc.year) {
      var yearEl = document.createElement('p');
      yearEl.innerHTML = '<strong>Year Published:</strong> ' + escHtml(String(doc.year));
      infoRight.appendChild(yearEl);
    }

    infoLayout.appendChild(coverWrap);
    infoLayout.appendChild(infoRight);
    container.appendChild(infoLayout);

    // Find This Resource links
    var linksHeading = document.createElement('h3');
    linksHeading.textContent = 'Find This Resource';
    container.appendChild(linksHeading);

    var linksList = document.createElement('ul');
    var searchLinks = [
      { label: 'Search on Google Books', url: 'https://books.google.com/books?q=' + searchQ },
      { label: 'Search online', url: 'https://www.google.com/search?q=' + searchQ }
    ];
    if (doc.sourceType === 'manual' || doc.sourceType === 'syllabus') {
      searchLinks.push({ label: 'SOA study materials', url: 'https://www.soa.org/education/exam-req/' });
      searchLinks.push({ label: 'CAS study materials', url: 'https://www.casact.org/exam/study-tools' });
    }
    searchLinks.forEach(function (link) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.style.color = color;
      li.appendChild(a);
      linksList.appendChild(li);
    });
    container.appendChild(linksList);

    // Link to source exam if available
    if (doc.fromExamId) {
      var exam = customExams.find(function (ex) { return ex.id === doc.fromExamId; });
      if (exam) {
        var examLink = document.createElement('p');
        examLink.style.cssText = 'margin-top:1.5rem;font-size:0.9rem;opacity:0.7';
        examLink.innerHTML = 'Source: <a href="#" style="color:' + (exam.color || color) + '">' + escHtml(exam.name) + '</a>';
        examLink.querySelector('a').addEventListener('click', function (e) {
          e.preventDefault();
          renderExamViewer(doc.fromExamId);
        });
        container.appendChild(examLink);
      }
    }
  }

  /* ---- Library document detail page ---- */
  function renderLibraryDocPage(docId) {
    var doc = libraryDocs.find(function (d) { return d.id === docId; });
    if (!doc) return;

    var viewer = document.createElement('div');
    viewer.className = 'custom-exam__viewer';

    var toolbar = document.createElement('div');
    toolbar.className = 'custom-exam__viewer-toolbar';

    var backBtn = document.createElement('button');
    backBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--small';
    backBtn.type = 'button';
    backBtn.textContent = '← Library';
    backBtn.addEventListener('click', function () {
      removeViewer(viewer);
      renderLibraryViewer();
    });
    toolbar.appendChild(backBtn);

    var toolbarActions = document.createElement('div');
    toolbarActions.className = 'custom-exam__viewer-actions';

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'custom-exam__btn custom-exam__btn--danger custom-exam__btn--small';
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = SVG_TRASH + ' Delete';
    deleteBtn.addEventListener('click', function () {
      if (confirm('Delete "' + (doc.title || 'this document') + '"? This cannot be undone.')) {
        libraryDocs = libraryDocs.filter(function (d) { return d.id !== doc.id; });
        saveLibrary();
        removeViewer(viewer);
        renderLibraryViewer();
      }
    });
    toolbarActions.appendChild(deleteBtn);
    toolbar.appendChild(toolbarActions);

    var contentWrap = document.createElement('div');

    // Source-only document: show rich metadata page instead of TOC/Glossary
    var isSourceOnly = !doc.pdfText && (doc.toc || []).length === 0 && (doc.glossary || []).length === 0;
    if (isSourceOnly) {
      renderSourceOnlyDocPage(contentWrap, doc);
      viewer.appendChild(toolbar);
      viewer.appendChild(contentWrap);
      showInContentArea(viewer);
      return;
    }

    var titleEl = document.createElement('h1');
    titleEl.style.cssText = 'margin-bottom:0.25rem';
    titleEl.textContent = doc.title || 'Untitled Document';
    contentWrap.appendChild(titleEl);

    if (doc.author) {
      var authorEl = document.createElement('p');
      authorEl.style.cssText = 'opacity:0.6;font-size:0.95rem;margin-bottom:0.5rem';
      authorEl.textContent = 'by ' + doc.author;
      contentWrap.appendChild(authorEl);
    }

    var dateEl = document.createElement('p');
    dateEl.style.cssText = 'opacity:0.4;font-size:0.85rem;margin-bottom:1.5rem';
    dateEl.textContent = 'Uploaded ' + new Date(doc.uploadedAt).toLocaleDateString();
    contentWrap.appendChild(dateEl);

    // Table of Contents section
    var tocSection = document.createElement('div');
    tocSection.style.cssText = 'margin-bottom:2rem';

    var tocHeader = document.createElement('h2');
    tocHeader.style.cssText = 'font-size:1.1rem;margin-bottom:0.75rem';
    tocHeader.textContent = 'Table of Contents';
    tocSection.appendChild(tocHeader);

    if ((doc.toc || []).length === 0) {
      var tocEmpty = document.createElement('p');
      tocEmpty.style.cssText = 'opacity:0.5;font-size:0.9rem';
      tocEmpty.textContent = 'No table of contents extracted.';
      tocSection.appendChild(tocEmpty);
    } else {
      var tocList = document.createElement('div');
      tocList.className = 'doc-library__toc-list';
      renderTocItems(tocList, doc.toc);
      tocSection.appendChild(tocList);
    }
    contentWrap.appendChild(tocSection);

    // Glossary section
    var glossarySection = document.createElement('div');
    glossarySection.style.cssText = 'margin-bottom:2rem';

    var totalTerms = (doc.glossary || []).length;
    var glossaryHeader = document.createElement('h2');
    glossaryHeader.style.cssText = 'font-size:1.1rem;margin-bottom:0.75rem';
    glossaryHeader.textContent = 'Glossary (' + totalTerms + ' terms)';
    glossarySection.appendChild(glossaryHeader);

    if (totalTerms === 0) {
      var glossaryEmpty = document.createElement('p');
      glossaryEmpty.style.cssText = 'opacity:0.5;font-size:0.9rem';
      glossaryEmpty.textContent = 'No glossary terms extracted.';
      glossarySection.appendChild(glossaryEmpty);
    } else {
      // Search input
      var glossarySearchRow = document.createElement('div');
      glossarySearchRow.style.cssText = 'position:relative;margin-bottom:12px';

      var searchIcon = document.createElement('span');
      searchIcon.style.cssText = 'position:absolute;left:10px;top:50%;transform:translateY(-50%);width:16px;height:16px;opacity:0.4;display:flex;align-items:center';
      searchIcon.innerHTML = SVG_SEARCH;
      glossarySearchRow.appendChild(searchIcon);

      var glossarySearchInput = document.createElement('input');
      glossarySearchInput.className = 'custom-exam__input';
      glossarySearchInput.type = 'text';
      glossarySearchInput.placeholder = 'Search glossary terms\u2026';
      glossarySearchInput.style.cssText = 'width:100%;padding-left:32px;box-sizing:border-box';
      glossarySearchRow.appendChild(glossarySearchInput);
      glossarySection.appendChild(glossarySearchRow);

      var glossaryList = document.createElement('div');
      glossaryList.className = 'doc-library__glossary-list';

      function renderGlossaryItems(filterText) {
        glossaryList.innerHTML = '';
        var lower = (filterText || '').toLowerCase();
        var count = 0;

        doc.glossary.forEach(function (entry) {
          var vals = Object.values(entry);
          var termText = entry.term || entry.name || entry.title || (typeof vals[0] === 'string' ? vals[0] : '');
          var defText = entry.definition || entry.description || entry.def || (typeof vals[1] === 'string' ? vals[1] : '');
          if (!termText) return;

          if (lower && termText.toLowerCase().indexOf(lower) === -1 && defText.toLowerCase().indexOf(lower) === -1) return;

          var item = document.createElement('div');
          item.className = 'doc-library__glossary-item';

          var term = document.createElement('div');
          term.className = 'doc-library__glossary-term';
          term.textContent = termText;

          var def = document.createElement('div');
          def.className = 'doc-library__glossary-def';
          def.textContent = defText;

          item.appendChild(term);
          item.appendChild(def);
          glossaryList.appendChild(item);
          count++;
        });

        // Update header with filter count
        if (lower && count < totalTerms) {
          glossaryHeader.textContent = 'Glossary (' + count + ' of ' + totalTerms + ' terms)';
        } else {
          glossaryHeader.textContent = 'Glossary (' + totalTerms + ' terms)';
        }

        if (count === 0 && lower) {
          var noMatch = document.createElement('p');
          noMatch.style.cssText = 'opacity:0.5;font-size:0.9rem;text-align:center;padding:1rem';
          noMatch.textContent = 'No matching terms found.';
          glossaryList.appendChild(noMatch);
        }
      }

      var glossaryDebounce = null;
      glossarySearchInput.addEventListener('input', function () {
        clearTimeout(glossaryDebounce);
        glossaryDebounce = setTimeout(function () {
          renderGlossaryItems(glossarySearchInput.value);
        }, 150);
      });

      renderGlossaryItems('');
      glossarySection.appendChild(glossaryList);
    }
    contentWrap.appendChild(glossarySection);

    viewer.appendChild(toolbar);
    viewer.appendChild(contentWrap);
    showInContentArea(viewer);
  }

  function renderTocItems(container, items) {
    // Track counters per level to generate numbering (e.g. 1, 1.1, 1.2, 2, 2.1)
    var counters = [0, 0, 0, 0]; // levels 1-4
    var hasNumbering = /^\d+[\.\):]|^chapter\s+\d/i;

    items.forEach(function (item) {
      var level = Math.min(Math.max(item.level || 1, 1), 4);

      // Update counters
      counters[level - 1]++;
      // Reset deeper levels when a higher level increments
      for (var r = level; r < counters.length; r++) counters[r] = 0;

      var el = document.createElement('div');
      el.className = 'doc-library__toc-item doc-library__toc-item--level-' + level;
      el.style.paddingLeft = ((level - 1) * 20) + 'px';

      // Build number prefix (e.g. "1.", "1.1", "1.1.2") only if title lacks numbering
      var titleText = item.title || '';
      var numberPrefix = '';
      if (!hasNumbering.test(titleText.trim())) {
        var parts = [];
        for (var n = 0; n < level; n++) parts.push(counters[n] || 1);
        numberPrefix = parts.join('.') + '. ';
      }

      var title = document.createElement('span');
      title.textContent = numberPrefix + titleText;
      el.appendChild(title);

      if (item.page) {
        var page = document.createElement('span');
        page.style.cssText = 'opacity:0.4;margin-left:8px;font-size:0.85rem';
        page.textContent = 'p. ' + item.page;
        el.appendChild(page);
      }

      container.appendChild(el);

      if (item.children && item.children.length > 0) {
        renderTocItems(container, item.children);
      }
    });
  }

  /* ---- Library upload modal ---- */
  function openLibraryUploadModal() {
    var libBackdrop = document.createElement('div');
    libBackdrop.className = 'custom-exam__backdrop';

    var libModal = document.createElement('div');
    libModal.className = 'custom-exam__modal';
    libModal.style.maxWidth = '540px';
    libModal.addEventListener('click', function (e) { e.stopPropagation(); });

    // Header
    var header = document.createElement('div');
    header.className = 'custom-exam__modal-header';
    header.innerHTML = '<span class="custom-exam__modal-title">Upload to Library</span>';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'custom-exam__modal-icon-btn';
    closeBtn.type = 'button';
    closeBtn.innerHTML = SVG_CLOSE;
    var closeLibModal = function () {
      libModal.classList.remove('is-visible');
      libBackdrop.classList.remove('is-visible');
      setTimeout(function () {
        if (libModal.parentElement) libModal.parentElement.removeChild(libModal);
        if (libBackdrop.parentElement) libBackdrop.parentElement.removeChild(libBackdrop);
      }, 250);
      document.removeEventListener('keydown', handleLibEsc);
    };
    closeBtn.addEventListener('click', closeLibModal);
    header.appendChild(closeBtn);

    libBackdrop.addEventListener('click', closeLibModal);

    function handleLibEsc(e) { if (e.key === 'Escape') closeLibModal(); }
    document.addEventListener('keydown', handleLibEsc);

    // Body
    var body = document.createElement('div');
    body.className = 'custom-exam__modal-body';
    body.style.padding = '20px';

    // Compact dropzone — no giant icon
    var dropzone = document.createElement('div');
    dropzone.className = 'custom-exam__dropzone';
    dropzone.style.padding = '24px 20px';

    var dropText = document.createElement('p');
    dropText.style.cssText = 'margin:0 0 4px;font-size:0.9rem';
    dropText.textContent = 'Drop a PDF here or click to browse';

    var dropHint = document.createElement('p');
    dropHint.style.cssText = 'opacity:0.5;font-size:0.78rem;margin:0';
    dropHint.textContent = 'Textbooks, articles, lecture notes, etc.';

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.style.display = 'none';

    dropzone.appendChild(dropText);
    dropzone.appendChild(dropHint);
    dropzone.appendChild(fileInput);

    dropzone.addEventListener('click', function () { fileInput.click(); });
    dropzone.addEventListener('dragover', function (e) { e.preventDefault(); dropzone.classList.add('is-dragover'); });
    dropzone.addEventListener('dragleave', function () { dropzone.classList.remove('is-dragover'); });
    dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropzone.classList.remove('is-dragover');
      var files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type === 'application/pdf') {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });

    var selectedFile = null;

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        selectedFile = fileInput.files[0];
        var sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
        // Replace dropzone content with compact file info
        dropzone.style.borderColor = 'var(--success, #059669)';
        dropzone.style.background = 'color-mix(in oklab, var(--success) 4%, var(--bg))';
        dropText.innerHTML = SVG_DOC + ' <strong style="margin-left:6px">' + escHtml(selectedFile.name) + '</strong>';
        dropText.style.cssText = 'margin:0;font-size:0.85rem;display:flex;align-items:center';
        dropText.querySelector('svg').style.cssText = 'width:16px;height:16px;flex-shrink:0';
        dropHint.textContent = sizeMB + ' MB';
        analyzeBtn.disabled = false;
      }
    });

    // Analyze button
    var analyzeBtn = document.createElement('button');
    analyzeBtn.className = 'custom-exam__btn custom-exam__btn--primary';
    analyzeBtn.type = 'button';
    analyzeBtn.style.cssText = 'width:100%;margin-top:12px';
    analyzeBtn.textContent = 'Analyze Document';
    analyzeBtn.disabled = true;

    // Progress area (hidden initially)
    var progressArea = document.createElement('div');
    progressArea.className = 'custom-exam__progress';
    progressArea.style.display = 'none';

    var libTasks = [
      { id: 'extract', label: 'Reading PDF' },
      { id: 'toc', label: 'Analyzing structure' },
      { id: 'glossary', label: 'Finding key terms' },
      { id: 'define', label: 'Generating definitions' }
    ];

    libTasks.forEach(function (task) {
      var row = document.createElement('div');
      row.className = 'custom-exam__progress-task';
      row.setAttribute('data-task', task.id);

      var statusIcon = document.createElement('span');
      statusIcon.className = 'custom-exam__progress-status';
      statusIcon.innerHTML = '<span class="custom-exam__progress-dot"></span>';

      var text = document.createElement('span');
      text.className = 'custom-exam__progress-label';
      text.textContent = task.label;

      var result = document.createElement('span');
      result.className = 'custom-exam__progress-result';

      row.appendChild(statusIcon);
      row.appendChild(text);
      row.appendChild(result);
      progressArea.appendChild(row);
    });

    // Live preview panel (terms appear as they're found)
    var livePreview = document.createElement('div');
    livePreview.className = 'custom-exam__live-preview';
    livePreview.style.display = 'none';

    var libErrorEl = document.createElement('div');
    libErrorEl.className = 'custom-exam__error';

    analyzeBtn.addEventListener('click', async function () {
      if (!selectedFile) return;
      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = SVG_SPINNER + ' Analyzing…';
      dropzone.style.display = 'none';
      progressArea.style.display = '';
      libErrorEl.style.display = 'none';

      try {
        // Step 1: Read PDF
        setTaskStatus(progressArea, 'extract', 'active');
        var structured = await extractPdfStructured(selectedFile);
        setTaskStatus(progressArea, 'extract', 'done', structured.pageCount + ' pages');

        var storedText = structured.fullText.substring(0, 100000);

        // Step 2: Extract TOC
        setTaskStatus(progressArea, 'toc', 'active');
        var tocResult = await extractToc(structured.pdf, structured.pages, structured.bodyFontSize);
        var tocMethodLabel = tocResult.method === 'outline' ? ' (outline)' : ' (AI)';
        setTaskStatus(progressArea, 'toc', 'done', tocResult.toc.length + ' sections' + tocMethodLabel);

        // Show TOC in live preview
        if (tocResult.toc.length > 0) {
          livePreview.style.display = 'block';
          var tocPreviewLabel = document.createElement('div');
          tocPreviewLabel.style.cssText = 'font-weight:600;font-size:0.78rem;opacity:0.5;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em';
          tocPreviewLabel.textContent = 'Table of Contents';
          livePreview.appendChild(tocPreviewLabel);
          var tocList = document.createElement('div');
          livePreview.appendChild(tocList);
          animateItemsIn(tocList, tocResult.toc.slice(0, 12), function (item) {
            var el = document.createElement('div');
            el.style.cssText = 'padding:3px 8px;border-left:3px solid var(--brand,#2563eb);margin-bottom:3px;font-size:0.8rem;border-radius:2px;background:var(--bg-elev,#f8f8f8)';
            el.textContent = item.title || item.name || item;
            return el;
          }, 80);
          if (tocResult.toc.length > 12) {
            setTimeout(function () {
              var more = document.createElement('div');
              more.style.cssText = 'font-size:0.75rem;opacity:0.5;padding:2px 8px';
              more.textContent = '+ ' + (tocResult.toc.length - 12) + ' more sections';
              tocList.appendChild(more);
            }, 12 * 80 + 100);
          }
        }

        // Step 3 + 4: Extract glossary with live progress
        setTaskStatus(progressArea, 'glossary', 'active');

        // Glossary live preview section
        var glossaryLabel = document.createElement('div');
        glossaryLabel.style.cssText = 'font-weight:600;font-size:0.78rem;opacity:0.5;margin:14px 0 6px;text-transform:uppercase;letter-spacing:0.04em;display:none';
        glossaryLabel.textContent = 'Glossary Terms';
        livePreview.appendChild(glossaryLabel);
        var termsList = document.createElement('div');
        livePreview.appendChild(termsList);

        var glossaryTermCount = 0;

        var glossaryResult = await extractGlossary(structured.pages, structured.fullText, structured.bodyFontSize, function (progress) {
          // Update task labels and live preview based on phase
          if (progress.phase === 'finding') {
            glossaryTermCount = progress.termCount;
            var findLabel = 'Finding key terms';
            if (progress.termCount > 0) findLabel += ' (' + progress.termCount + ' found)';
            var glossaryRow = progressArea.querySelector('[data-task="glossary"]');
            if (glossaryRow) {
              var labelEl = glossaryRow.querySelector('.custom-exam__progress-label');
              if (labelEl) labelEl.textContent = findLabel;
            }

            // Animate new terms into the live preview
            if (progress.newTerms && progress.newTerms.length > 0) {
              livePreview.style.display = 'block';
              glossaryLabel.style.display = 'block';
              animateItemsIn(termsList, progress.newTerms, function (t) {
                var el = document.createElement('div');
                el.style.cssText = 'padding:3px 8px;border-left:3px solid var(--warning,#d97706);margin-bottom:3px;font-size:0.8rem;border-radius:2px;background:var(--bg-elev,#f8f8f8)';
                el.textContent = t.term || t.name || t.title || '';
                return el;
              }, 60);
            }
          } else if (progress.phase === 'defining') {
            // Phase 1 done — mark glossary task done, activate define task
            setTaskStatus(progressArea, 'glossary', 'done', glossaryTermCount + ' terms found');
            setTaskStatus(progressArea, 'define', 'active');

            var defineLabel = 'Generating definitions';
            if (progress.definedCount > 0) defineLabel += ' (' + progress.definedCount + '/' + progress.termCount + ')';
            var defineRow = progressArea.querySelector('[data-task="define"]');
            if (defineRow) {
              var defLabelEl = defineRow.querySelector('.custom-exam__progress-label');
              if (defLabelEl) defLabelEl.textContent = defineLabel;
            }

            // Replace term-only items with defined terms as they come in
            if (progress.newTerms && progress.newTerms.length > 0) {
              // Clear previous term-only list and rebuild with definitions
              termsList.innerHTML = '';
              glossaryLabel.textContent = 'Glossary (' + progress.definedCount + ' defined)';
              // Show all defined terms so far (compact)
              var allSoFar = progress.newTerms; // just the new batch, but let's show last few
              animateItemsIn(termsList, allSoFar.slice(-8), function (t) {
                var el = document.createElement('div');
                el.style.cssText = 'padding:4px 8px;border-left:3px solid var(--success,#059669);margin-bottom:3px;font-size:0.8rem;border-radius:2px;background:var(--bg-elev,#f8f8f8)';
                var strong = document.createElement('strong');
                strong.textContent = t.term || '';
                el.appendChild(strong);
                if (t.definition) {
                  var defSpan = document.createElement('span');
                  defSpan.style.cssText = 'opacity:0.7;margin-left:6px';
                  defSpan.textContent = '— ' + (t.definition.length > 80 ? t.definition.substring(0, 80) + '…' : t.definition);
                  el.appendChild(defSpan);
                }
                return el;
              }, 60);
            }
          }
        });

        // Mark final task done
        setTaskStatus(progressArea, 'glossary', 'done', glossaryTermCount + ' terms found');
        var glossaryMethodLabel = glossaryResult.method === 'section' ? ' (glossary section)' : glossaryResult.method === 'section+ai' ? ' (section + AI)' : ' (AI)';
        setTaskStatus(progressArea, 'define', 'done', glossaryResult.glossary.length + ' definitions' + glossaryMethodLabel);

        // Build document object
        var newDoc = {
          id: 'lib_' + Date.now(),
          title: tocResult.title || selectedFile.name.replace(/\.pdf$/i, ''),
          author: tocResult.author || '',
          pdfText: storedText,
          toc: tocResult.toc,
          glossary: glossaryResult.glossary,
          tocMethod: tocResult.method,
          glossaryMethod: glossaryResult.method,
          uploadedAt: Date.now()
        };

        libraryDocs.push(newDoc);
        saveLibrary();

        // Show success
        analyzeBtn.style.display = 'none';

        var successMsg = document.createElement('p');
        successMsg.style.cssText = 'text-align:center;margin-top:14px;font-size:0.9rem';
        successMsg.innerHTML = '<strong>' + escHtml(newDoc.title) + '</strong> added to library';
        body.appendChild(successMsg);

        var doneBtn = document.createElement('button');
        doneBtn.className = 'custom-exam__btn custom-exam__btn--primary';
        doneBtn.style.cssText = 'width:100%;margin-top:10px';
        doneBtn.textContent = 'View in Library';
        doneBtn.addEventListener('click', function () {
          closeLibModal();
          renderLibraryViewer();
        });
        body.appendChild(doneBtn);

      } catch (err) {
        ['extract', 'toc', 'glossary', 'define'].forEach(function (id) {
          var row = progressArea.querySelector('[data-task="' + id + '"]');
          if (row && row.classList.contains('is-active')) {
            setTaskStatus(progressArea, id, 'error');
          }
        });

        libErrorEl.style.display = 'block';
        libErrorEl.textContent = 'Error: ' + (err.message || 'Processing failed');

        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = 'Retry';
        dropzone.style.display = '';
      }
    });

    body.appendChild(dropzone);
    body.appendChild(analyzeBtn);
    body.appendChild(progressArea);
    body.appendChild(livePreview);
    body.appendChild(libErrorEl);

    libModal.appendChild(header);
    libModal.appendChild(body);

    document.body.appendChild(libBackdrop);
    document.body.appendChild(libModal);

    void libModal.offsetHeight;
    libBackdrop.classList.add('is-visible');
    libModal.classList.add('is-visible');
  }

  /* ---- Link Definition modal ---- */
  function openLinkDefinitionModal(examId, objIndex, conceptIndex) {
    var exam = customExams.find(function (ex) { return ex.id === examId; });
    if (!exam) return;
    var obj = (exam.objectives || [])[objIndex];
    if (!obj) return;
    var concept = (obj.concepts || [])[conceptIndex];
    if (!concept) return;

    var libBackdrop = document.createElement('div');
    libBackdrop.className = 'custom-exam__backdrop';

    var libModal = document.createElement('div');
    libModal.className = 'custom-exam__modal';
    libModal.style.maxWidth = '600px';
    libModal.addEventListener('click', function (e) { e.stopPropagation(); });

    // Header
    var header = document.createElement('div');
    header.className = 'custom-exam__modal-header';

    var titleEl = document.createElement('span');
    titleEl.className = 'custom-exam__modal-title';
    titleEl.textContent = 'Link Definition';
    header.appendChild(titleEl);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'custom-exam__modal-icon-btn';
    closeBtn.type = 'button';
    closeBtn.innerHTML = SVG_CLOSE;

    var closeLinkModal = function () {
      libModal.classList.remove('is-visible');
      libBackdrop.classList.remove('is-visible');
      setTimeout(function () {
        if (libModal.parentElement) libModal.parentElement.removeChild(libModal);
        if (libBackdrop.parentElement) libBackdrop.parentElement.removeChild(libBackdrop);
      }, 250);
      document.removeEventListener('keydown', handleLinkEsc);
    };

    closeBtn.addEventListener('click', closeLinkModal);
    header.appendChild(closeBtn);
    libBackdrop.addEventListener('click', closeLinkModal);

    function handleLinkEsc(e) { if (e.key === 'Escape') closeLinkModal(); }
    document.addEventListener('keydown', handleLinkEsc);

    // Body
    var body = document.createElement('div');
    body.className = 'custom-exam__modal-body';
    body.style.padding = '20px';

    var conceptLabel = document.createElement('p');
    conceptLabel.style.cssText = 'opacity:0.6;font-size:0.85rem;margin-bottom:12px';
    conceptLabel.textContent = 'Find a definition for: ' + concept.name;
    body.appendChild(conceptLabel);

    // Search input
    var searchRow = document.createElement('div');
    searchRow.style.cssText = 'position:relative;margin-bottom:16px';

    var searchInput = document.createElement('input');
    searchInput.className = 'custom-exam__input';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search glossary terms…';
    searchInput.value = concept.name;
    searchInput.style.cssText = 'width:100%;padding-left:32px';
    searchRow.innerHTML = '<span style="position:absolute;left:8px;top:50%;transform:translateY(-50%);width:16px;height:16px;opacity:0.4">' + SVG_SEARCH + '</span>';
    searchRow.appendChild(searchInput);
    body.appendChild(searchRow);

    // Results area
    var resultsArea = document.createElement('div');
    resultsArea.style.cssText = 'max-height:350px;overflow-y:auto';
    body.appendChild(resultsArea);

    var debounceTimer = null;

    function doSearch() {
      var query = searchInput.value.trim();
      resultsArea.innerHTML = '';

      if (libraryDocs.length === 0) {
        resultsArea.innerHTML = '<div style="text-align:center;padding:2rem 1rem;opacity:0.6">' +
          '<p style="margin-bottom:8px">No documents in your library.</p>' +
          '<p style="font-size:0.85rem">Upload a document to get started.</p></div>';
        var goToLibBtn = document.createElement('button');
        goToLibBtn.className = 'custom-exam__btn custom-exam__btn--secondary';
        goToLibBtn.style.cssText = 'display:block;margin:0 auto';
        goToLibBtn.textContent = 'Go to Library';
        goToLibBtn.addEventListener('click', function () {
          closeLinkModal();
          renderLibraryViewer();
        });
        resultsArea.appendChild(goToLibBtn);
        return;
      }

      var results = searchGlossary(query);

      if (results.length === 0) {
        resultsArea.innerHTML = '<div style="text-align:center;padding:2rem 1rem;opacity:0.6">' +
          '<p style="margin-bottom:4px">No matching definitions found.</p>' +
          '<p style="font-size:0.85rem">Try a different search term.</p></div>';
        return;
      }

      results.forEach(function (r) {
        var item = document.createElement('div');
        item.className = 'doc-library__search-result';

        var termEl = document.createElement('div');
        termEl.className = 'doc-library__search-result-term';
        termEl.textContent = r.term;

        var defEl = document.createElement('div');
        defEl.className = 'doc-library__search-result-def';
        var defText = r.definition || '';
        defEl.textContent = defText.length > 200 ? defText.substring(0, 200) + '…' : defText;

        var sourceEl = document.createElement('div');
        sourceEl.className = 'doc-library__search-result-source';
        sourceEl.textContent = 'From: ' + (r.sourceDocTitle || 'Unknown');

        item.appendChild(termEl);
        item.appendChild(defEl);
        item.appendChild(sourceEl);

        item.addEventListener('click', function () {
          concept.linkedDefinition = {
            term: r.term,
            definition: r.definition,
            sourceDocId: r.sourceDocId,
            sourceDocTitle: r.sourceDocTitle
          };
          saveExams();
          closeLinkModal();
          // Re-render concept page
          var existingViewer = document.querySelector('.custom-exam__viewer');
          if (existingViewer) removeViewer(existingViewer);
          renderConceptPage(examId, objIndex, conceptIndex);
        });

        resultsArea.appendChild(item);
      });
    }

    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doSearch, 300);
    });

    // Initial search
    doSearch();

    // Focus search input after modal opens
    setTimeout(function () { searchInput.focus(); searchInput.select(); }, 100);

    libModal.appendChild(header);
    libModal.appendChild(body);

    document.body.appendChild(libBackdrop);
    document.body.appendChild(libModal);

    void libModal.offsetHeight;
    libBackdrop.classList.add('is-visible');
    libModal.classList.add('is-visible');
  }

  /* ---- Source page ---- */
  function renderSourcePage(examId, sourceIndex) {
    var exam = customExams.find(function (ex) { return ex.id === examId; });
    if (!exam) return;
    var src = (exam.sources || [])[sourceIndex];
    if (!src) return;

    var viewer = document.createElement('div');
    viewer.className = 'custom-exam__viewer';
    viewer.style.setProperty('--exam-color', exam.color || '#2563eb');

    var toolbar = document.createElement('div');
    toolbar.className = 'custom-exam__viewer-toolbar';

    var backBtn = document.createElement('button');
    backBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--small';
    backBtn.type = 'button';
    backBtn.textContent = '← ' + exam.name;
    backBtn.addEventListener('click', function () {
      removeViewer(viewer);
      renderExamViewer(examId);
    });
    toolbar.appendChild(backBtn);

    var contentWrap = document.createElement('div');

    var breadcrumb = document.createElement('p');
    breadcrumb.style.cssText = 'font-size:0.85rem;opacity:0.6;margin-bottom:0.25rem';
    var examLink = document.createElement('a');
    examLink.href = '#';
    examLink.style.color = exam.color || '#2563eb';
    examLink.textContent = exam.name;
    examLink.addEventListener('click', function (e) { e.preventDefault(); removeViewer(viewer); renderExamViewer(examId); });
    breadcrumb.appendChild(examLink);
    breadcrumb.appendChild(document.createTextNode(' › Sources'));
    contentWrap.appendChild(breadcrumb);

    // Cover + info layout
    var infoLayout = document.createElement('div');
    infoLayout.style.cssText = 'display:flex;gap:1.5rem;align-items:flex-start;margin-bottom:2rem';

    // Cover image area
    var coverWrap = document.createElement('div');
    coverWrap.style.flexShrink = '0';

    var placeholder = document.createElement('div');
    var initials = (src.title || '?').split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    placeholder.style.cssText = 'width:120px;height:160px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.15)';
    placeholder.style.background = exam.color || '#2563eb';
    placeholder.textContent = initials;

    var coverImg = document.createElement('img');
    coverImg.style.cssText = 'display:none;width:120px;height:auto;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.2)';

    coverWrap.appendChild(placeholder);
    coverWrap.appendChild(coverImg);

    // Fetch from Open Library
    var searchQ = encodeURIComponent((src.title || '') + ' ' + (src.author || ''));
    fetch('https://openlibrary.org/search.json?q=' + searchQ + '&limit=1&fields=cover_i')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var coverId = data.docs && data.docs[0] && data.docs[0].cover_i;
        if (coverId) {
          coverImg.src = 'https://covers.openlibrary.org/b/id/' + coverId + '-M.jpg';
          coverImg.onload = function () { coverImg.style.display = 'block'; placeholder.style.display = 'none'; };
        }
      })
      .catch(function () { /* keep placeholder */ });

    // Right side info
    var infoRight = document.createElement('div');
    infoRight.style.flex = '1';

    var titleEl = document.createElement('h1');
    titleEl.style.color = exam.color;
    titleEl.textContent = src.title || 'Unknown Title';
    infoRight.appendChild(titleEl);

    if (src.author) {
      var authorEl = document.createElement('p');
      authorEl.style.opacity = '0.7';
      authorEl.textContent = 'By ' + src.author;
      infoRight.appendChild(authorEl);
    }
    if (src.chapters) {
      var chapEl = document.createElement('p');
      chapEl.innerHTML = '<strong>Chapters:</strong> ' + escHtml(src.chapters);
      infoRight.appendChild(chapEl);
    }
    if (src.type) {
      var typeEl = document.createElement('p');
      typeEl.innerHTML = '<strong>Type:</strong> ' + escHtml(src.type);
      infoRight.appendChild(typeEl);
    }
    if (src.year) {
      var yearEl = document.createElement('p');
      yearEl.innerHTML = '<strong>Year Published:</strong> ' + escHtml(String(src.year));
      infoRight.appendChild(yearEl);
    }

    infoLayout.appendChild(coverWrap);
    infoLayout.appendChild(infoRight);
    contentWrap.appendChild(infoLayout);

    // Search links
    var linksHeading = document.createElement('h3');
    linksHeading.textContent = 'Find This Resource';
    contentWrap.appendChild(linksHeading);

    var linksList = document.createElement('ul');
    var searchLinks = [
      { label: 'Search on Google Books', url: 'https://books.google.com/books?q=' + searchQ },
      { label: 'Search online', url: 'https://www.google.com/search?q=' + searchQ }
    ];
    if (src.type === 'manual' || src.type === 'syllabus') {
      searchLinks.push({ label: 'SOA study materials', url: 'https://www.soa.org/education/exam-req/' });
      searchLinks.push({ label: 'CAS study materials', url: 'https://www.casact.org/exam/study-tools' });
    }
    searchLinks.forEach(function (link) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.style.color = exam.color || '#2563eb';
      li.appendChild(a);
      linksList.appendChild(li);
    });
    contentWrap.appendChild(linksList);

    viewer.appendChild(toolbar);
    viewer.appendChild(contentWrap);
    showInContentArea(viewer);
  }

  /* ---- Init & SPA survival ---- */
  function init() {
    loadExams();
    loadLibrary();
    // No longer builds sidebar buttons — the sidebar tabs system handles UI.
    // Expose functions for the tabs system to call:
    window._getCustomExams = function () { return customExams; };
    window._openCustomExamModal = function () {
      editingExamId = null;
      workflowData = {};
      openModal();
    };
    window._openEditExamModal = function (examId) { openEditModal(examId); };
    window._deleteCustomExam = function (examId) {
      customExams = customExams.filter(function (ex) { return ex.id !== examId; });
      saveExams();
    };
    window._openExamViewer = function (examId) { renderExamViewer(examId); };
    window._getLibraryDocs = function () { return libraryDocs; };
    window._openLibraryViewer = function () { renderLibraryViewer(); };
    window._openLibraryUploadModal = function () { openLibraryUploadModal(); };
    window._openLibraryDocPage = function (docId) { renderLibraryDocPage(docId); };
    // Trigger sidebar tabs refresh after data is ready
    if (window._sidebarTabs && window._sidebarTabs.refresh) {
      window._sidebarTabs.refresh();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 300); });
  } else {
    setTimeout(init, 300);
  }

  // Clean up custom viewer on SPA navigation
  window.addEventListener('popstate', function () {
    var viewer = document.querySelector('.custom-exam__viewer');
    if (viewer) removeViewer(viewer);
  });

})();
