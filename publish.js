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
      if (window.innerWidth <= 540) {
        document.body.style.overflow = 'hidden';
      }
    }

    function closeSticky() {
      sticky.classList.remove('is-open');
      hideBackdrop();
      document.body.style.overflow = '';
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
    // Append inside the publish container so Obsidian's SPA router handles internal links
    var publishContainer = document.querySelector('.publish-renderer, .site-body, .site-body-center-column') || document.body;
    publishContainer.appendChild(sticky);
    container._stickyEl = sticky;

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
          document.body.style.overflow = '';
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
          document.body.style.overflow = '';
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
        document.body.style.overflow = '';
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

  var COLOR_HEX = {
    sky: '#0284c7', blue: '#2563eb', indigo: '#4f46e5', violet: '#7c3aed',
    purple: '#9333ea', fuchsia: '#c026d3', pink: '#db2777', rose: '#e11d48',
    red: '#dc2626', orange: '#ea580c', amber: '#d97706', yellow: '#ca8a04',
    lime: '#65a30d', green: '#16a34a', emerald: '#059669', teal: '#0d9488',
    cyan: '#0891b2', slate: '#475569'
  };

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
    var electiveDone = 0;
    var hasElectives = false;

    track.sections.forEach(function (sec) {
      if (sec.elective) {
        hasElectives = true;
        sec.items.forEach(function (item) {
          if (getStatus(item.id) === 'completed') electiveDone++;
        });
        return; // don't add to main total yet
      }
      // Collapsed prereq sections count as 1 requirement
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
      total += 4; // always 4 elective slots required
      done += Math.min(electiveDone, 4);
    }

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

    // .site-body-left-column is a flex-row with an inner wrapper that holds
    // site-name, toggles, search, and nav tree. We must insert INSIDE that
    // wrapper, not as a direct child of sidebar (which causes side-by-side).
    //
    // Strategy: find the search input → walk up to the inner wrapper (the
    // direct child of sidebar that contains it) → insert inside that wrapper,
    // right after the search and before the nav tree.
    var searchInput = sidebar.querySelector('input[type="search"], input[type="text"]');
    var innerWrapper = null;

    if (searchInput) {
      // Walk up from search input to find the direct child of sidebar
      var el = searchInput;
      while (el.parentElement && el.parentElement !== sidebar) {
        el = el.parentElement;
      }
      if (el.parentElement === sidebar) {
        innerWrapper = el;
      }
    }

    // If we couldn't find via search, try finding the wrapper that contains the nav tree
    if (!innerWrapper) {
      var children = sidebar.children;
      for (var ci = 0; ci < children.length; ci++) {
        var child = children[ci];
        if (child.querySelector && (child.querySelector('.nav-folder, .tree-item') ||
            child.querySelector('input[type="search"]'))) {
          innerWrapper = child;
          break;
        }
      }
    }

    // Target container: the inner wrapper if found, otherwise sidebar itself
    var container = innerWrapper || sidebar;

    // Inside the container, find the nav tree and insert before it
    var navRoot = container.querySelector('.nav-folder.mod-root') ||
                  container.querySelector('.nav-folder') ||
                  container.querySelector('.tree-item');

    if (navRoot) {
      navRoot.parentElement.insertBefore(trackerEl, navRoot);
    } else {
      // No nav tree yet — insert after the search bar within the container
      if (searchInput) {
        // Walk up to a direct child of container
        var searchAncestor = searchInput;
        while (searchAncestor.parentElement && searchAncestor.parentElement !== container) {
          searchAncestor = searchAncestor.parentElement;
        }
        if (searchAncestor.parentElement === container && searchAncestor.nextSibling) {
          container.insertBefore(trackerEl, searchAncestor.nextSibling);
        } else {
          container.appendChild(trackerEl);
        }
      } else {
        container.appendChild(trackerEl);
      }
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
      if (sec.collapsed) section.classList.add('is-collapsed');

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

      // FSA elective info note (shown once before the first elective section)
      if (sec.elective && !section.parentElement) {
        var prevSections = track.sections.slice(0, track.sections.indexOf(sec));
        var isFirstElective = !prevSections.some(function (s) { return s.elective; });
        if (isFirstElective) {
          var infoNote = document.createElement('div');
          infoNote.className = 'journey-tracker__info-note';
          infoNote.textContent = 'Pick a 101\u2013201 sequence + 2 others';
          sectionsEl.appendChild(infoNote);
        }
      }

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
        if (item.color) row.dataset.examColor = item.color;

        // Status button
        var statusBtn = document.createElement('button');
        statusBtn.className = 'journey-tracker__status';
        statusBtn.type = 'button';
        statusBtn.title = 'Click to change status';
        statusBtn.innerHTML = STATUS_ICONS[getStatus(item.id)];
        statusBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          cycleStatus(item.id);
          var newStatus = getStatus(item.id);
          row.dataset.status = newStatus;
          statusBtn.innerHTML = STATUS_ICONS[newStatus];
          updateProgress();
          if (newStatus === 'in_progress') {
            SoundFX.inProgress();
          } else if (newStatus === 'completed') {
            SoundFX.complete();
          } else {
            SoundFX.click();
          }
        });

        // Name (link if path exists)
        var nameEl;
        if (item.path) {
          nameEl = document.createElement('a');
          nameEl.className = 'journey-tracker__name journey-tracker__link';
          var slug = item.path.replace(/ /g, '+');
          nameEl.href = window.location.origin + '/' + slug;
          nameEl.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            window.open(window.location.origin + '/' + slug, '_self');
          }, true);
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

  // Re-inject if sidebar re-renders (SPA navigation)
  var jtObserver = new MutationObserver(function () {
    if (!document.querySelector('.journey-tracker')) {
      trackerEl = null;
      countEl = null;
      barFillEl = null;
      sectionsEl = null;
      buildTracker();
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
  // calls resume(). Re-run on every gesture because the context can be
  // re-suspended after tab switches, lock-screen, or overlay open/close.
  // Play a silent buffer each time we re-unlock — iOS Safari needs this to
  // fully restore audio after a re-suspension (e.g. caused by body overflow
  // toggling when the mobile nav overlay opens).
  function unlockAudio() {
    var ac = getCtx();
    if (ac.state === 'running') return; // already unlocked, nothing to do
    ac.resume();
    // Silent 1-sample buffer kicks iOS Safari out of the suspended state
    var buf = ac.createBuffer(1, 1, ac.sampleRate);
    var src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(ac.destination);
    src.start(0);
  }
  document.addEventListener('touchstart', unlockAudio, true);
  document.addEventListener('click', unlockAudio, true);

  // Ensure AudioContext is running before scheduling audio.
  // On mobile, resume() is async — scheduling at a frozen currentTime
  // produces silent or quiet playback.  This helper waits for 'running'
  // state so that currentTime is accurate when the callback fires.
  function ensureRunning(cb) {
    var ac = getCtx();
    if (ac.state === 'running') { cb(ac); return; }
    ac.resume().then(function () { cb(ac); });
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
      SoundFX.click();
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

  // Speaker SVGs for mute button
  var SPEAKER_ON_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>' +
    '<path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M18.07 5.93a9 9 0 0 1 0 12.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>';

  var SPEAKER_OFF_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>' +
    '<line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>';

  function buildMuteButton() {
    if (document.querySelector('.mute-toggle-btn')) return;

    var toggleRow = findThemeToggleRow();
    if (!toggleRow) return;

    var btn = document.createElement('button');
    btn.className = 'mute-toggle-btn';
    btn.setAttribute('aria-label', 'Toggle sound effects');
    btn.setAttribute('title', 'Sound Effects');
    btn.type = 'button';

    function updateIcon() {
      btn.innerHTML = SoundFX.isMuted() ? SPEAKER_OFF_SVG : SPEAKER_ON_SVG;
      btn.setAttribute('aria-pressed', SoundFX.isMuted() ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      SoundFX.toggleMute();
      updateIcon();
    });

    updateIcon();
    toggleRow.appendChild(btn);
  }

  function init() {
    applyHighContrast(restorePreference());
    buildToggle();
    buildMuteButton();
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
    if (!document.querySelector('.mute-toggle-btn')) {
      buildMuteButton();
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
  var API_KEY_KEY = 'actuarial-notes-ai-key';
  var PDFJS_VERSION = '4.0.379';
  var PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VERSION;

  /* ---- State ---- */
  var customExams = [];
  var sidebarBtnEl = null;
  var myExamsEl = null;
  var modalEl = null;
  var backdropEl = null;
  var currentStep = 1;
  var workflowData = {};
  var editingExamId = null;

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

  var SVG_EYE = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 10s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z"/><circle cx="10" cy="10" r="3"/></svg>';

  var SVG_EYE_OFF = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.46 3.56A8.4 8.4 0 0 1 10 3c5.5 0 9 7 9 7a14.8 14.8 0 0 1-1.77 2.67M5.94 5.94A14.3 14.3 0 0 0 1 10s3.5 7 9 7a8.3 8.3 0 0 0 4.06-1.06"/><line x1="1" y1="1" x2="19" y2="19"/></svg>';

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

  function getApiKey() {
    try { return localStorage.getItem(API_KEY_KEY) || ''; } catch (e) { return ''; }
  }

  function setApiKey(key) {
    try { localStorage.setItem(API_KEY_KEY, key); } catch (e) { /* ignore */ }
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

    // Insert before journey tracker
    var journeyTracker = container.querySelector('.journey-tracker');
    if (journeyTracker) {
      journeyTracker.parentElement.insertBefore(sidebarBtnEl, journeyTracker);
      journeyTracker.parentElement.insertBefore(myExamsEl, journeyTracker);
    } else {
      // Insert before nav tree
      var navRoot = container.querySelector('.nav-folder.mod-root') || container.querySelector('.nav-folder') || container.querySelector('.tree-item');
      if (navRoot) {
        navRoot.parentElement.insertBefore(sidebarBtnEl, navRoot);
        navRoot.parentElement.insertBefore(myExamsEl, navRoot);
      } else {
        container.appendChild(sidebarBtnEl);
        container.appendChild(myExamsEl);
      }
    }
  }

  function renderMyExams() {
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
      });

      list.appendChild(item);
    });

    myExamsEl.appendChild(list);
  }

  /* ---- Modal system ---- */
  var STEP_LABELS = ['API Key', 'Upload', 'Processing', 'Review', 'Complete'];

  function openModal(startStep) {
    if (modalEl) closeModal(true);

    var hasKey = !!getApiKey();
    if (!startStep) {
      currentStep = hasKey ? 2 : 1;
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
    gearBtn.title = 'API Key Settings';
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
    editingExamId = examId;
    workflowData = {
      examTitle: exam.name,
      examDescription: exam.description || '',
      objectives: JSON.parse(JSON.stringify(exam.objectives)),
      sources: JSON.parse(JSON.stringify(exam.sources)),
      color: exam.color
    };
    openModal(4);
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
      case 1: renderApiKeyStep(body); break;
      case 2: renderUploadStep(body); break;
      case 3: renderProcessingStep(body); break;
      case 4: renderReviewStep(body); break;
      case 5: renderCompleteStep(body); break;
    }
  }

  /* ---- Step 1: API Key ---- */
  function renderApiKeyStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content';

    var icon = document.createElement('div');
    icon.className = 'custom-exam__step-icon';
    icon.innerHTML = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 4-4 2 4 2 2 4 2-4 4-2-4-2-2-4z"/><path d="M10 14l-1.5 3L5 18.5l3.5 1.5L10 23l1.5-3 3.5-1.5L11.5 17 10 14z"/><circle cx="30" cy="30" r="12"/><path d="M26 30l3 3 5-6"/></svg>';

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = 'Connect to Claude AI';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = 'Enter your Anthropic API key to enable AI-powered PDF analysis. Your key is stored locally in your browser and only used to communicate with Anthropic\'s API.';

    var inputWrap = document.createElement('div');
    inputWrap.className = 'custom-exam__input-wrap';

    var label = document.createElement('label');
    label.className = 'custom-exam__label';
    label.textContent = 'Anthropic API Key';

    var fieldWrap = document.createElement('div');
    fieldWrap.className = 'custom-exam__field-wrap';

    var input = document.createElement('input');
    input.className = 'custom-exam__input';
    input.type = 'password';
    input.placeholder = 'sk-ant-api03-...';
    input.value = getApiKey();
    input.autocomplete = 'off';

    var toggleVis = document.createElement('button');
    toggleVis.className = 'custom-exam__input-toggle';
    toggleVis.type = 'button';
    toggleVis.innerHTML = SVG_EYE;
    toggleVis.addEventListener('click', function () {
      var isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      toggleVis.innerHTML = isPass ? SVG_EYE_OFF : SVG_EYE;
    });

    fieldWrap.appendChild(input);
    fieldWrap.appendChild(toggleVis);

    var error = document.createElement('div');
    error.className = 'custom-exam__error';

    var link = document.createElement('a');
    link.href = 'https://console.anthropic.com/settings/keys';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'custom-exam__link';
    link.textContent = 'Get an API key from console.anthropic.com';

    var btn = document.createElement('button');
    btn.className = 'custom-exam__btn custom-exam__btn--primary';
    btn.type = 'button';
    btn.textContent = 'Continue';
    btn.addEventListener('click', function () {
      var key = input.value.trim();
      if (!key.startsWith('sk-ant-')) {
        error.textContent = 'Please enter a valid Anthropic API key (starts with sk-ant-)';
        error.style.display = 'block';
        return;
      }
      error.style.display = 'none';
      setApiKey(key);
      currentStep = 2;
      renderStep();
    });

    inputWrap.appendChild(label);
    inputWrap.appendChild(fieldWrap);
    inputWrap.appendChild(error);
    inputWrap.appendChild(link);

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

    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(dropzone);
    wrap.appendChild(fileInfo);
    wrap.appendChild(error);
    wrap.appendChild(analyzeBtn);
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

    // Progress tasks
    var tasks = [
      { id: 'extract', label: 'Extracting text from PDF' },
      { id: 'analyze', label: 'Identifying learning objectives & sources' },
      { id: 'concepts', label: 'Generating concept breakdowns' }
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
    wrap.appendChild(errorEl);
    wrap.appendChild(retryBtn);
    body.appendChild(wrap);

    // Start processing
    runProcessing(progressEl, errorEl, retryBtn);
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

  async function runProcessing(progressEl, errorEl, retryBtn) {
    try {
      // Task 1: Extract text
      setTaskStatus(progressEl, 'extract', 'active');
      setTaskStatus(progressEl, 'analyze', 'pending');
      setTaskStatus(progressEl, 'concepts', 'pending');

      var pdfText = await extractPdfText(workflowData.file);
      var pageCount = pdfText.pageCount;
      workflowData.pdfText = pdfText.text;
      setTaskStatus(progressEl, 'extract', 'done', pageCount + ' pages extracted');

      // Task 2 + 3: AI analysis
      setTaskStatus(progressEl, 'analyze', 'active');
      var aiResult = await callClaudeApi(pdfText.text);
      workflowData.examTitle = aiResult.examTitle || 'Custom Exam';
      workflowData.examDescription = aiResult.examDescription || '';
      workflowData.objectives = aiResult.objectives || [];
      workflowData.sources = aiResult.sources || [];
      workflowData.color = EXAM_COLORS[Math.floor(Math.random() * EXAM_COLORS.length)];

      var objCount = workflowData.objectives.length;
      var srcCount = workflowData.sources.length;
      var conceptCount = 0;
      workflowData.objectives.forEach(function (o) {
        conceptCount += (o.concepts || []).length;
      });

      setTaskStatus(progressEl, 'analyze', 'done', objCount + ' objectives, ' + srcCount + ' sources');
      setTaskStatus(progressEl, 'concepts', 'done', conceptCount + ' concepts identified');

      // Auto-advance after brief pause
      setTimeout(function () {
        currentStep = 4;
        renderStep();
      }, 800);

    } catch (err) {
      errorEl.textContent = 'Error: ' + (err.message || 'Processing failed. Please try again.');
      errorEl.style.display = 'block';
      retryBtn.style.display = 'inline-flex';

      // Mark current active task as error
      ['extract', 'analyze', 'concepts'].forEach(function (id) {
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

  /* ---- Claude API call ---- */
  async function callClaudeApi(text) {
    var apiKey = getApiKey();
    if (!apiKey) throw new Error('No API key configured. Please set up your Anthropic API key.');

    // Truncate text if too long
    var maxChars = 90000;
    if (text.length > maxChars) {
      text = text.substring(0, maxChars) + '\n\n[Document truncated at ' + maxChars + ' characters]';
    }

    var systemPrompt = 'You are an expert actuarial exam content analyst. Analyze the provided document and extract structured learning content.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "examTitle": "Short exam or course name",\n  "examDescription": "1-2 sentence overview of the exam/document",\n  "objectives": [\n    {\n      "title": "Learning Objective Title",\n      "weight": 25,\n      "concepts": [\n        {\n          "name": "Concept Name",\n          "description": "Clear 1-3 sentence description of this concept"\n        }\n      ]\n    }\n  ],\n  "sources": [\n    {\n      "title": "Source Title",\n      "author": "Author Name",\n      "chapters": "Relevant chapters/sections",\n      "type": "textbook"\n    }\n  ]\n}\n\nRules:\n- weight is a percentage (number) if found in the document, otherwise null\n- Each objective should have 2-8 relevant concepts\n- Sources type should be one of: textbook, paper, manual, online, syllabus\n- Extract ALL learning objectives you can identify\n- Be thorough but accurate — only include what the document supports';

    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        system: systemPrompt,
        messages: [
          { role: 'user', content: 'Analyze this document and extract the learning content:\n\n' + text }
        ]
      })
    });

    if (!response.ok) {
      var errBody = '';
      try { errBody = await response.text(); } catch (e) { /* ignore */ }
      if (response.status === 401) throw new Error('Invalid API key. Please check your Anthropic API key.');
      if (response.status === 429) throw new Error('Rate limited. Please wait a moment and try again.');
      throw new Error('API error (' + response.status + '): ' + (errBody || 'Unknown error'));
    }

    var data = await response.json();
    var content = data.content && data.content[0] && data.content[0].text;
    if (!content) throw new Error('Empty response from AI. Please try again.');

    // Parse JSON from response (handle possible markdown fences)
    var jsonStr = content.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
    }

    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      throw new Error('Failed to parse AI response. The document may be too complex. Please try again.');
    }
  }

  /* ---- Step 4: Review & Edit ---- */
  function renderReviewStep(body) {
    var wrap = document.createElement('div');
    wrap.className = 'custom-exam__step-content custom-exam__review';

    var title = document.createElement('h3');
    title.className = 'custom-exam__step-title';
    title.textContent = 'Review & Edit';

    var desc = document.createElement('p');
    desc.className = 'custom-exam__step-desc';
    desc.textContent = 'Review the AI-extracted content. Edit, add, or remove items before saving.';

    // Exam title
    var titleGroup = document.createElement('div');
    titleGroup.className = 'custom-exam__form-group';
    titleGroup.innerHTML = '<label class="custom-exam__label">Exam Title</label>';
    var titleInput = document.createElement('input');
    titleInput.className = 'custom-exam__input';
    titleInput.type = 'text';
    titleInput.value = workflowData.examTitle || '';
    titleInput.addEventListener('input', function () { workflowData.examTitle = titleInput.value; });
    titleGroup.appendChild(titleInput);

    // Description
    var descGroup = document.createElement('div');
    descGroup.className = 'custom-exam__form-group';
    descGroup.innerHTML = '<label class="custom-exam__label">Description</label>';
    var descInput = document.createElement('textarea');
    descInput.className = 'custom-exam__textarea';
    descInput.rows = 2;
    descInput.value = workflowData.examDescription || '';
    descInput.addEventListener('input', function () { workflowData.examDescription = descInput.value; });
    descGroup.appendChild(descInput);

    // Color picker
    var colorGroup = document.createElement('div');
    colorGroup.className = 'custom-exam__form-group';
    colorGroup.innerHTML = '<label class="custom-exam__label">Accent Color</label>';
    var colorRow = document.createElement('div');
    colorRow.className = 'custom-exam__color-row';
    EXAM_COLORS.forEach(function (c) {
      var swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = 'custom-exam__color-swatch';
      if (workflowData.color === c) swatch.classList.add('is-selected');
      swatch.style.background = c;
      swatch.addEventListener('click', function () {
        workflowData.color = c;
        colorRow.querySelectorAll('.custom-exam__color-swatch').forEach(function (s) { s.classList.remove('is-selected'); });
        swatch.classList.add('is-selected');
      });
      colorRow.appendChild(swatch);
    });
    colorGroup.appendChild(colorRow);

    // Learning objectives
    var objSection = document.createElement('div');
    objSection.className = 'custom-exam__form-section';

    var objHeader = document.createElement('div');
    objHeader.className = 'custom-exam__form-section-header';
    objHeader.innerHTML = '<span class="custom-exam__form-section-title">Learning Objectives (' + (workflowData.objectives || []).length + ')</span>';

    var addObjBtn = document.createElement('button');
    addObjBtn.className = 'custom-exam__btn custom-exam__btn--small';
    addObjBtn.type = 'button';
    addObjBtn.textContent = '+ Add Objective';
    addObjBtn.addEventListener('click', function () {
      workflowData.objectives.push({ title: 'New Objective', weight: null, concepts: [] });
      renderReviewStep(body);
    });
    objHeader.appendChild(addObjBtn);
    objSection.appendChild(objHeader);

    (workflowData.objectives || []).forEach(function (obj, oi) {
      var card = document.createElement('div');
      card.className = 'custom-exam__obj-card';
      card.style.setProperty('--obj-color', workflowData.color || '#2563eb');

      // Objective header
      var cardHeader = document.createElement('div');
      cardHeader.className = 'custom-exam__obj-header';

      var objTitleInput = document.createElement('input');
      objTitleInput.className = 'custom-exam__input custom-exam__input--inline';
      objTitleInput.type = 'text';
      objTitleInput.value = obj.title;
      objTitleInput.addEventListener('input', function () { obj.title = objTitleInput.value; });

      var weightInput = document.createElement('input');
      weightInput.className = 'custom-exam__input custom-exam__input--small';
      weightInput.type = 'number';
      weightInput.min = '0';
      weightInput.max = '100';
      weightInput.placeholder = '%';
      weightInput.value = obj.weight != null ? obj.weight : '';
      weightInput.addEventListener('input', function () {
        obj.weight = weightInput.value ? parseInt(weightInput.value, 10) : null;
      });

      var removeObjBtn = document.createElement('button');
      removeObjBtn.className = 'custom-exam__btn--icon custom-exam__btn--danger';
      removeObjBtn.type = 'button';
      removeObjBtn.title = 'Remove objective';
      removeObjBtn.innerHTML = SVG_TRASH;
      removeObjBtn.addEventListener('click', function () {
        workflowData.objectives.splice(oi, 1);
        renderReviewStep(body);
      });

      cardHeader.appendChild(objTitleInput);
      cardHeader.appendChild(weightInput);
      cardHeader.appendChild(removeObjBtn);
      card.appendChild(cardHeader);

      // Concepts
      var conceptsList = document.createElement('div');
      conceptsList.className = 'custom-exam__concepts-list';

      (obj.concepts || []).forEach(function (concept, ci) {
        var conceptRow = document.createElement('div');
        conceptRow.className = 'custom-exam__concept-row';

        var cName = document.createElement('input');
        cName.className = 'custom-exam__input custom-exam__input--inline';
        cName.type = 'text';
        cName.placeholder = 'Concept name';
        cName.value = concept.name;
        cName.addEventListener('input', function () { concept.name = cName.value; });

        var cDesc = document.createElement('input');
        cDesc.className = 'custom-exam__input custom-exam__input--inline custom-exam__input--desc';
        cDesc.type = 'text';
        cDesc.placeholder = 'Description';
        cDesc.value = concept.description;
        cDesc.addEventListener('input', function () { concept.description = cDesc.value; });

        var removeCBtn = document.createElement('button');
        removeCBtn.className = 'custom-exam__btn--icon custom-exam__btn--danger';
        removeCBtn.type = 'button';
        removeCBtn.innerHTML = SVG_CLOSE;
        removeCBtn.addEventListener('click', function () {
          obj.concepts.splice(ci, 1);
          renderReviewStep(body);
        });

        conceptRow.appendChild(cName);
        conceptRow.appendChild(cDesc);
        conceptRow.appendChild(removeCBtn);
        conceptsList.appendChild(conceptRow);
      });

      var addConceptBtn = document.createElement('button');
      addConceptBtn.className = 'custom-exam__btn custom-exam__btn--tiny';
      addConceptBtn.type = 'button';
      addConceptBtn.textContent = '+ Concept';
      addConceptBtn.addEventListener('click', function () {
        obj.concepts.push({ name: '', description: '' });
        renderReviewStep(body);
      });
      conceptsList.appendChild(addConceptBtn);

      card.appendChild(conceptsList);
      objSection.appendChild(card);
    });

    // Sources section
    var srcSection = document.createElement('div');
    srcSection.className = 'custom-exam__form-section';

    var srcHeader = document.createElement('div');
    srcHeader.className = 'custom-exam__form-section-header';
    srcHeader.innerHTML = '<span class="custom-exam__form-section-title">Sources (' + (workflowData.sources || []).length + ')</span>';

    var addSrcBtn = document.createElement('button');
    addSrcBtn.className = 'custom-exam__btn custom-exam__btn--small';
    addSrcBtn.type = 'button';
    addSrcBtn.textContent = '+ Add Source';
    addSrcBtn.addEventListener('click', function () {
      workflowData.sources.push({ title: '', author: '', chapters: '', type: 'textbook' });
      renderReviewStep(body);
    });
    srcHeader.appendChild(addSrcBtn);
    srcSection.appendChild(srcHeader);

    (workflowData.sources || []).forEach(function (src, si) {
      var row = document.createElement('div');
      row.className = 'custom-exam__src-row';

      var srcTitle = document.createElement('input');
      srcTitle.className = 'custom-exam__input custom-exam__input--inline';
      srcTitle.type = 'text';
      srcTitle.placeholder = 'Title';
      srcTitle.value = src.title;
      srcTitle.addEventListener('input', function () { src.title = srcTitle.value; });

      var srcAuthor = document.createElement('input');
      srcAuthor.className = 'custom-exam__input custom-exam__input--inline custom-exam__input--small';
      srcAuthor.type = 'text';
      srcAuthor.placeholder = 'Author';
      srcAuthor.value = src.author;
      srcAuthor.addEventListener('input', function () { src.author = srcAuthor.value; });

      var srcChap = document.createElement('input');
      srcChap.className = 'custom-exam__input custom-exam__input--inline custom-exam__input--small';
      srcChap.type = 'text';
      srcChap.placeholder = 'Chapters';
      srcChap.value = src.chapters;
      srcChap.addEventListener('input', function () { src.chapters = srcChap.value; });

      var removeSrcBtn = document.createElement('button');
      removeSrcBtn.className = 'custom-exam__btn--icon custom-exam__btn--danger';
      removeSrcBtn.type = 'button';
      removeSrcBtn.innerHTML = SVG_TRASH;
      removeSrcBtn.addEventListener('click', function () {
        workflowData.sources.splice(si, 1);
        renderReviewStep(body);
      });

      row.appendChild(srcTitle);
      row.appendChild(srcAuthor);
      row.appendChild(srcChap);
      row.appendChild(removeSrcBtn);
      srcSection.appendChild(row);
    });

    // Create/Save button
    var createBtn = document.createElement('button');
    createBtn.className = 'custom-exam__btn custom-exam__btn--primary custom-exam__btn--large';
    createBtn.type = 'button';
    createBtn.textContent = editingExamId ? 'Save Changes' : 'Create Exam';
    createBtn.addEventListener('click', function () {
      if (!workflowData.examTitle || !workflowData.examTitle.trim()) {
        alert('Please enter an exam title.');
        return;
      }
      saveExamFromWorkflow();
      currentStep = 5;
      renderStep();
    });

    wrap.appendChild(title);
    wrap.appendChild(desc);
    wrap.appendChild(titleGroup);
    wrap.appendChild(descGroup);
    wrap.appendChild(colorGroup);
    wrap.appendChild(objSection);
    wrap.appendChild(srcSection);
    wrap.appendChild(createBtn);

    body.innerHTML = '';
    body.appendChild(wrap);
  }

  function saveExamFromWorkflow() {
    if (editingExamId) {
      var idx = customExams.findIndex(function (ex) { return ex.id === editingExamId; });
      if (idx !== -1) {
        customExams[idx].name = workflowData.examTitle;
        customExams[idx].description = workflowData.examDescription;
        customExams[idx].color = workflowData.color;
        customExams[idx].objectives = workflowData.objectives;
        customExams[idx].sources = workflowData.sources;
        customExams[idx].updatedAt = new Date().toISOString();
      }
    } else {
      customExams.push({
        id: 'ce_' + Date.now(),
        name: workflowData.examTitle,
        description: workflowData.examDescription || '',
        color: workflowData.color || '#2563eb',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        objectives: workflowData.objectives || [],
        sources: workflowData.sources || []
      });
    }
    saveExams();
    renderMyExams();
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
    if (window.jspdf) return window.jspdf;
    if (_jspdfLoadPromise) return _jspdfLoadPromise;

    _jspdfLoadPromise = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
      script.onload = function () {
        var script2 = document.createElement('script');
        script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
        script2.onload = function () { resolve(window.jspdf); };
        script2.onerror = function () { resolve(window.jspdf); };
        document.head.appendChild(script2);
      };
      script.onerror = function () { _jspdfLoadPromise = null; reject(new Error('Failed to load jsPDF')); };
      document.head.appendChild(script);
    });
    return _jspdfLoadPromise;
  }

  async function generatePdf(data) {
    try {
      var jspdfLib = await loadJsPdf();
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

  /* ---- Exam Viewer (main content area) ---- */
  function renderExamViewer(examId) {
    var exam = customExams.find(function (ex) { return ex.id === examId; });
    if (!exam) return;

    var center = document.querySelector('.site-body-center-column');
    if (!center) return;

    var contentEl = center.querySelector('.markdown-preview-view') || center.querySelector('.markdown-rendered') || center;

    // Remove any existing custom viewer
    var existing = document.querySelector('.custom-exam__viewer');
    if (existing) existing.remove();

    // Also remove any existing sticky bars from actual exam pages
    document.querySelectorAll('.exam-nav__sticky').forEach(function (s) { s.remove(); });

    var viewer = document.createElement('div');
    viewer.className = 'custom-exam__viewer';
    viewer.style.setProperty('--exam-color', exam.color || '#2563eb');

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.className = 'custom-exam__viewer-toolbar';

    var backBtn = document.createElement('button');
    backBtn.className = 'custom-exam__btn custom-exam__btn--ghost custom-exam__btn--small';
    backBtn.type = 'button';
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', function () { viewer.remove(); });

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
      viewer.remove();
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
        viewer.remove();
      }
    });

    toolbarActions.appendChild(dlBtn);
    toolbarActions.appendChild(editBtn);
    toolbarActions.appendChild(deleteBtn);
    toolbar.appendChild(backBtn);
    toolbar.appendChild(toolbarActions);

    // Title
    var titleEl = document.createElement('h1');
    titleEl.className = 'custom-exam__viewer-title';
    titleEl.textContent = exam.name;
    titleEl.style.color = exam.color;

    var descEl = document.createElement('p');
    descEl.className = 'custom-exam__viewer-desc';
    descEl.textContent = exam.description || '';

    // Learning objectives
    var objSection = document.createElement('div');
    objSection.className = 'custom-exam__viewer-section';

    var objTitle = document.createElement('h2');
    objTitle.className = 'custom-exam__viewer-section-title';
    objTitle.textContent = 'Learning Objectives';
    objSection.appendChild(objTitle);

    (exam.objectives || []).forEach(function (obj, i) {
      var card = document.createElement('div');
      card.className = 'custom-exam__viewer-obj';

      var cardHeader = document.createElement('div');
      cardHeader.className = 'custom-exam__viewer-obj-header';
      cardHeader.innerHTML = '<span class="custom-exam__viewer-obj-num">' + (i + 1) + '</span>' +
        '<span class="custom-exam__viewer-obj-title">' + escHtml(obj.title) + '</span>' +
        (obj.weight ? '<span class="custom-exam__viewer-obj-weight">' + escHtml(obj.weight) + '%</span>' : '');

      var cardBody = document.createElement('div');
      cardBody.className = 'custom-exam__viewer-obj-body';
      cardBody.style.display = 'none';

      (obj.concepts || []).forEach(function (concept) {
        var conceptEl = document.createElement('div');
        conceptEl.className = 'custom-exam__viewer-concept';
        conceptEl.innerHTML = '<div class="custom-exam__viewer-concept-name">' + escHtml(concept.name) + '</div>' +
          '<div class="custom-exam__viewer-concept-desc">' + escHtml(concept.description) + '</div>';
        cardBody.appendChild(conceptEl);
      });

      cardHeader.style.cursor = 'pointer';
      cardHeader.addEventListener('click', function () {
        var isOpen = cardBody.style.display !== 'none';
        cardBody.style.display = isOpen ? 'none' : 'block';
        card.classList.toggle('is-open', !isOpen);
      });

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      objSection.appendChild(card);
    });

    // Sources table
    var srcSection = document.createElement('div');
    srcSection.className = 'custom-exam__viewer-section';

    if (exam.sources && exam.sources.length > 0) {
      var srcTitle = document.createElement('h2');
      srcTitle.className = 'custom-exam__viewer-section-title';
      srcTitle.textContent = 'Sources & References';

      var table = document.createElement('table');
      table.className = 'custom-exam__viewer-table';
      table.innerHTML = '<thead><tr><th>Title</th><th>Author</th><th>Chapters</th><th>Type</th></tr></thead>';

      var tbody = document.createElement('tbody');
      exam.sources.forEach(function (src) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + escHtml(src.title) + '</td><td>' + escHtml(src.author) + '</td><td>' + escHtml(src.chapters) + '</td><td>' + escHtml(src.type) + '</td>';
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      srcSection.appendChild(srcTitle);
      srcSection.appendChild(table);
    }

    viewer.appendChild(toolbar);
    viewer.appendChild(titleEl);
    viewer.appendChild(descEl);
    viewer.appendChild(objSection);
    viewer.appendChild(srcSection);

    contentEl.insertBefore(viewer, contentEl.firstChild);
    viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---- Init & SPA survival ---- */
  function init() {
    loadExams();
    buildSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 300); });
  } else {
    setTimeout(init, 300);
  }

  // Re-inject if sidebar re-renders (debounced)
  var _ceObserverTimeout = null;
  var ceObserver = new MutationObserver(function () {
    clearTimeout(_ceObserverTimeout);
    _ceObserverTimeout = setTimeout(function () {
      if (!document.querySelector('.custom-exam__sidebar-btn')) {
        sidebarBtnEl = null;
        myExamsEl = null;
        buildSidebar();
      }
    }, 200);
  });

  function observeSidebar() {
    var target = document.querySelector('.site-body-left-column');
    if (target) {
      ceObserver.observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(observeSidebar, 350); });
  } else {
    setTimeout(observeSidebar, 350);
  }

  // Clean up custom viewer on SPA navigation
  window.addEventListener('popstate', function () {
    var viewer = document.querySelector('.custom-exam__viewer');
    if (viewer) viewer.remove();
  });

})();
