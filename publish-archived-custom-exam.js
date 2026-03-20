/* ===========================================================
   ARCHIVED — Custom Exam Workflow & Document Library

   These features have been removed from the MVP and will need
   future work to refine before re-introduction.

   Contains:
   - Syllabus uploader (Custom Exam): multi-step PDF analysis
     workflow using Claude API to extract learning objectives,
     sources, and concepts
   - Document Library: general document upload with TOC/glossary
     extraction

   To restore: include this file after publish.js and ensure the
   sidebar tabs system registers the appropriate tabs.
   =========================================================== */

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

  var DEFAULT_OBJECTIVES_PROMPT = 'You are an expert actuarial exam content analyst. Analyze the provided document and extract the learning objectives with their EXACT verbatim text.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "examTitle": "Short exam or course name",\n  "examDescription": "1-2 sentence overview of the exam/document",\n  "objectives": [\n    {\n      "title": "Learning Objective Title",\n      "weight": 25,\n      "body": "The EXACT verbatim text of this learning objective section, with key terms wrapped in [[double brackets]]."\n    }\n  ]\n}\n\nRules:\n- weight is a percentage (number) if found in the document, otherwise null\n- Extract ALL learning objectives you can identify\n- CRITICAL: The "body" field must contain the EXACT verbatim text from the document for that learning objective section. Copy EVERY word exactly as written in the source. Do NOT paraphrase, summarize, abbreviate, or rewrite ANY part of the text.\n- Include any introductory sentence, followed by ALL numbered items, exactly as they appear in the document. Preserve the numbering (1., 2., 3., etc.). Separate items with newline characters.\n- Within the verbatim text, wrap important technical terms, methods, proper nouns, and concepts in [[double brackets]] to create wiki links.\n  Example: "Calculate probabilities using [[combinatorics]], such as [[combinations]] and [[permutations]]."\n  Example: "Organize ratemaking data by [[calendar year]], [[policy year]], [[accident year]], and [[report year]]."\n- Only wrap specific technical nouns — do NOT wrap generic words like "data", "methods", "analysis", "process"\n- Use Title Case inside the brackets for proper nouns: [[Calendar Year]] not [[calendar year]], [[Bayes Theorem]] not [[bayes theorem]]\n- If a term appears multiple times in the body, wrap it in [[]] every time';

  var DEFAULT_SOURCES_PROMPT = 'You are an expert actuarial exam content analyst. Analyze the provided document and extract the required sources and references.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "sources": [\n    {\n      "title": "Full Title of the Source",\n      "author": "Author Last Name(s)",\n      "year": "Year published (e.g. 2020) or null if unknown",\n      "coverage": "Chapters 1-8",\n      "exclusions": "Excluding 4.8.4, 5.6.2, 5.6.3" \n    }\n  ]\n}\n\nRules:\n- Extract ALL required readings, textbooks, and references mentioned\n- "coverage" should capture the EXACT chapters, sections, or page ranges specified in the document (e.g. "Chapters 1-8", "Chapters 1-11", "Sections 3.1-3.5")\n- "exclusions" should capture any explicitly excluded sections or chapters mentioned, exactly as written in the document. Use null if no exclusions are specified.\n- For author, use the format from the document (e.g. "Ross", "Wackerly, Mendenhall, & Scheaffer", "Hassett")\n- For year, extract the publication year or edition year if mentioned; use null if not found';

  var DEFAULT_FEEDBACK_PROMPT = 'You are an expert actuarial exam content analyst. The user has reviewed the following extracted exam content and provided feedback. Update the content based on their feedback and return the complete updated JSON.\n\nReturn ONLY valid JSON with this exact structure (no markdown, no code fences):\n{\n  "examTitle": "Short exam or course name",\n  "examDescription": "1-2 sentence overview",\n  "objectives": [\n    {\n      "title": "Learning Objective Title",\n      "weight": 25,\n      "body": "Exact verbatim text from the document with key terms wrapped in [[double brackets]]"\n    }\n  ],\n  "sources": [\n    {\n      "title": "Full Title of the Source",\n      "author": "Author Last Name(s)",\n      "year": "Year published or null",\n      "coverage": "Chapters/sections covered",\n      "exclusions": "Excluded sections or null"\n    }\n  ]\n}';

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
      switchToLibraryTab();
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
      { id: 'concepts', label: 'Resolving wiki links' },
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

      setTaskStatus(progressEl, 'objectives', 'done', workflowData.objectives.length + ' objectives');

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

      // Task 3: Parse [[wiki links]] from objective bodies to extract concepts
      await new Promise(function (r) { setTimeout(r, workflowData.objectives.length * 100 + 200); });
      setTaskStatus(progressEl, 'concepts', 'active');

      var allConceptNames = [];
      workflowData.objectives.forEach(function (o) {
        var bodyText = o.body || '';
        var wikiRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
        var m;
        while ((m = wikiRe.exec(bodyText)) !== null) {
          var cName = m[1].trim();
          if (cName && allConceptNames.indexOf(cName) === -1) {
            allConceptNames.push(cName);
          }
        }
      });
      // Store concept names on workflowData for reference
      workflowData.concepts = allConceptNames;
      setTaskStatus(progressEl, 'concepts', 'done', allConceptNames.length + ' concepts linked');

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
          var srcDisplay = src.title || '';
          if (src.author || src.year) {
            srcDisplay += ' (' + (src.author || '') + (src.author && src.year ? ' - ' : '') + (src.year || '') + ')';
          }
          el.textContent = srcDisplay;
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

      // Count [[wiki links]] in body for concept count badge
      var reviewBodyText = obj.body || '';
      var reviewLinkCount = 0;
      var reviewLinkSeen = {};
      var reviewLinkRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      var reviewLinkMatch;
      while ((reviewLinkMatch = reviewLinkRe.exec(reviewBodyText)) !== null) {
        var rlName = reviewLinkMatch[1].trim();
        if (rlName && !reviewLinkSeen[rlName]) { reviewLinkSeen[rlName] = true; reviewLinkCount++; }
      }

      var conceptCountBadge = document.createElement('span');
      conceptCountBadge.style.cssText = 'margin-left:auto;font-size:0.75rem;opacity:0.5';
      conceptCountBadge.textContent = reviewLinkCount + ' concepts';

      cardHeader.appendChild(numEl);
      cardHeader.appendChild(objTitleEl);
      cardHeader.appendChild(conceptCountBadge);
      card.appendChild(cardHeader);

      var bodyPreview = document.createElement('div');
      bodyPreview.className = 'custom-exam__concepts-list';
      bodyPreview.style.display = 'none';
      bodyPreview.style.cssText += ';padding:8px 12px;font-size:0.85rem;opacity:0.8;white-space:pre-line';

      if (obj.body) {
        // Show body text with [[links]] stripped to plain text for review
        var previewText = obj.body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, target, alias) {
          return alias || target;
        });
        // Truncate if very long
        if (previewText.length > 500) previewText = previewText.substring(0, 500) + '…';
        bodyPreview.textContent = previewText;
      }

      cardHeader.addEventListener('click', function () {
        var open = bodyPreview.style.display !== 'none';
        bodyPreview.style.display = open ? 'none' : 'block';
      });

      card.appendChild(bodyPreview);
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
        var srcDisplay = src.title || '';
        if (src.author || src.year) {
          srcDisplay += ' (' + (src.author || '') + (src.author && src.year ? ' - ' : '') + (src.year || '') + ')';
        }
        row.innerHTML = '<strong>' + escHtml(srcDisplay) + '</strong>';
        var coverage = src.coverage || src.chapters || '';
        if (src.exclusions) coverage += '^[' + src.exclusions + ']';
        if (coverage) row.innerHTML += ' <span style="opacity:0.6">' + escHtml(coverage) + '</span>';
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
        chapters: src.coverage || src.chapters || '',
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
    var conceptCount = (workflowData.concepts || []).length;
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

        // Render body text (strip [[wiki links]] to plain text for PDF)
        if (obj.body) {
          doc.setFontSize(11);
          doc.setFont(undefined, 'normal');
          var pdfBodyText = obj.body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (_, target, alias) {
            return alias || target;
          });
          var bodyLines = doc.splitTextToSize(pdfBodyText, contentWidth - 8);
          bodyLines.forEach(function (bLine) {
            if (y > 260) { doc.addPage(); y = margin; }
            doc.text(bLine, margin + 4, y);
            y += 5;
          });
        } else if (obj.concepts) {
          // Backwards compat: old-format exams
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
        }

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
            head: [['Source', 'Coverage']],
            body: data.sources.map(function (s) {
              var sourceName = s.title || '';
              if (s.author || s.year) {
                sourceName += ' (' + (s.author || '') + (s.author && s.year ? ' - ' : '') + (s.year || '') + ')';
              }
              var coverage = s.coverage || s.chapters || '';
              if (s.exclusions) coverage += ' (Excl. ' + s.exclusions + ')';
              return [sourceName, coverage];
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
            var srcName = src.title || '';
            if (src.author || src.year) srcName += ' (' + (src.author || '') + (src.author && src.year ? ' - ' : '') + (src.year || '') + ')';
            var srcCoverage = src.coverage || src.chapters || '';
            if (src.exclusions) srcCoverage += ' (Excl. ' + src.exclusions + ')';
            doc.text(srcName + ' — ' + srcCoverage, margin, y);
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

  /** Render a body string containing [[wiki links]] as HTML with clickable links.
   *  Splits on newlines and converts [[Name]] or [[Name|Alias]] to <a> tags. */
  function renderWikiBody(container, body, color) {
    var lines = body.split('\n');
    lines.forEach(function (line, li) {
      if (!line.trim()) return; // skip empty lines
      var lineEl = document.createElement('div');
      lineEl.style.cssText = 'margin-bottom:4px;font-size:0.95rem;line-height:1.5';

      // Parse [[wiki links]] and render inline
      var wikiRe = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
      var lastIdx = 0;
      var match;
      while ((match = wikiRe.exec(line)) !== null) {
        // Text before the link
        if (match.index > lastIdx) {
          lineEl.appendChild(document.createTextNode(line.substring(lastIdx, match.index)));
        }
        var linkTarget = match[1].trim();
        var linkDisplay = (match[2] || match[1]).trim();
        var a = document.createElement('a');
        a.className = 'internal-link';
        a.href = '/Concepts/' + encodeURIComponent(linkTarget);
        a.setAttribute('data-href', 'Concepts/' + linkTarget);
        a.style.color = color || '#2563eb';
        a.style.fontWeight = '600';
        a.textContent = linkDisplay;
        lineEl.appendChild(a);
        lastIdx = match.index + match[0].length;
      }
      // Remaining text after last link
      if (lastIdx < line.length) {
        lineEl.appendChild(document.createTextNode(line.substring(lastIdx)));
      }
      container.appendChild(lineEl);
    });
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

      // Concept count badge (count [[links]] in body)
      var bodyConceptCount = 0;
      var bodyText = obj.body || '';
      var ccRe = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
      var ccSeen = {};
      var ccMatch;
      while ((ccMatch = ccRe.exec(bodyText)) !== null) {
        var ccName = ccMatch[1].trim();
        if (ccName && !ccSeen[ccName]) { ccSeen[ccName] = true; bodyConceptCount++; }
      }
      if (bodyConceptCount > 0) {
        var conceptBadge = document.createElement('span');
        conceptBadge.className = 'callout-concept-count';
        conceptBadge.textContent = bodyConceptCount + ' Concepts';
        calloutTitle.appendChild(conceptBadge);
      }

      calloutTitle.appendChild(foldEl);

      var calloutContent = document.createElement('div');
      calloutContent.className = 'callout-content';

      // Render objective body with [[wiki links]] as clickable links
      if (obj.body) {
        renderWikiBody(calloutContent, obj.body, exam.color || '#2563eb');
      } else if (obj.concepts) {
        // Backwards compat: old-format exams with concepts array
        var conceptList = document.createElement('ol');
        (obj.concepts || []).forEach(function (concept) {
          var li = document.createElement('li');
          var nameLink = document.createElement('a');
          nameLink.href = '#';
          nameLink.className = 'internal-link';
          nameLink.style.color = exam.color || '#2563eb';
          nameLink.style.fontWeight = '600';
          nameLink.textContent = concept.name;
          li.appendChild(nameLink);
          if (concept.description) {
            li.appendChild(document.createTextNode(' — ' + concept.description));
          }
          conceptList.appendChild(li);
        });
        calloutContent.appendChild(conceptList);
      }

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
      ['Source', 'Coverage'].forEach(function (col) {
        var th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      var tbody = document.createElement('tbody');
      exam.sources.forEach(function (src, si) {
        var tr = document.createElement('tr');

        // Source column: Title (Author - Year)
        var tdSource = document.createElement('td');
        var displayName = src.title || '';
        if (src.author || src.year) {
          displayName += ' (';
          if (src.author) displayName += src.author;
          if (src.author && src.year) displayName += ' - ';
          if (src.year) displayName += src.year;
          displayName += ')';
        }
        var srcLink = document.createElement('a');
        srcLink.href = '#';
        srcLink.style.color = exam.color || '#2563eb';
        srcLink.textContent = displayName;
        srcLink.addEventListener('click', function (e) {
          e.preventDefault();
          renderSourcePage(exam.id, si);
        });
        tdSource.appendChild(srcLink);
        tr.appendChild(tdSource);

        // Coverage column: chapters + exclusions
        var tdCoverage = document.createElement('td');
        var coverageText = src.coverage || src.chapters || '';
        if (src.exclusions) {
          coverageText += '^[' + src.exclusions + ']';
        }
        tdCoverage.textContent = coverageText;
        tr.appendChild(tdCoverage);

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
  function switchToLibraryTab() {
    activeTab = 'library';
    saveActiveTab();
    var bar = document.querySelector('.sidebar-tabs__bar');
    if (bar) {
      var allTabs = bar.querySelectorAll('.sidebar-tabs__tab');
      for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.toggle('is-active', allTabs[i].dataset.tabId === 'library');
      }
    }
    renderActivePanel();
  }

  function renderLibraryViewer() {
    // No longer shows a separate page — just switch to the Library tab in sidebar
    var existing = document.querySelector('.custom-exam__viewer');
    if (existing) removeViewer(existing);
    switchToLibraryTab();
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
    titleEl.textContent = doc.title || 'Unknown Title';
    infoRight.appendChild(titleEl);

    if (doc.author) {
      var authorEl = document.createElement('p');
      authorEl.className = 'doc-library__doc-author';
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
    contentWrap.className = 'markdown-rendered';

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
    titleEl.textContent = doc.title || 'Untitled Document';
    contentWrap.appendChild(titleEl);

    if (doc.author) {
      var authorEl = document.createElement('p');
      authorEl.className = 'doc-library__doc-author';
      authorEl.textContent = 'by ' + doc.author;
      contentWrap.appendChild(authorEl);
    }

    var dateEl = document.createElement('p');
    dateEl.className = 'doc-library__doc-date';
    dateEl.textContent = 'Uploaded ' + new Date(doc.uploadedAt).toLocaleDateString();
    contentWrap.appendChild(dateEl);

    // Table of Contents section
    var tocSection = document.createElement('div');

    var tocHeader = document.createElement('h2');
    tocHeader.textContent = 'Table of Contents';
    tocSection.appendChild(tocHeader);

    if ((doc.toc || []).length === 0) {
      var tocEmpty = document.createElement('p');
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

    var totalTerms = (doc.glossary || []).length;
    var glossaryHeader = document.createElement('h2');
    glossaryHeader.textContent = 'Glossary (' + totalTerms + ' terms)';
    glossarySection.appendChild(glossaryHeader);

    if (totalTerms === 0) {
      var glossaryEmpty = document.createElement('p');
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
