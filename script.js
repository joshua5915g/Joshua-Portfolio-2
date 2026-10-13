/* ============================================================
   Joshua Jose — portfolio behaviour
   ============================================================ */
(() => {
  const S = window.SITE;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const animated = hasGsap && !reduce;
  let lenis = null;

  /* ---------- 1. Tab-Title Personality ---------- */
  const origTitle = document.title;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "Come back 👋 · Joshua";
    } else {
      document.title = origTitle;
    }
  });

  /* ---------- 2. Time-Aware Greeting ---------- */
  function updateTimeGreeting() {
    const el = $("#timeGreeting");
    if (!el) return;
    const hour = new Date().getHours();
    let greeting = "Good evening";
    if (hour >= 5 && hour < 12) greeting = "Good morning";
    else if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    el.textContent = `${greeting} from Kerala`;
  }
  updateTimeGreeting();

  /* ---------- 3. Calm Mode Toggle ---------- */
  const calmBtn = $("#calmToggle");
  if (calmBtn) {
    calmBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("calm-mode");
      const isActive = document.documentElement.classList.contains("calm-mode");
      calmBtn.classList.toggle("active", isActive);
      calmBtn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  /* ---------- 4. Save My Contact (vCard) ---------- */
  const vcardBtn = $("#saveContact");
  if (vcardBtn) {
    vcardBtn.addEventListener("click", () => {
      const vcardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Jose;Joshua;;;",
        "FN:Joshua Jose",
        "TITLE:Developer & Designer",
        "EMAIL;TYPE=INTERNET,HOME:joshua5915g@gmail.com",
        "URL:https://wattwise-energy.vercel.app/",
        "NOTE:Developer & Computer Science Student from Kerala, India",
        "END:VCARD"
      ].join("\n");

      const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Joshua_Jose.vcf";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* ---------- 5. Blur-up Image Smooth Loading ---------- */
  function setupBlurUpImages() {
    $$("img").forEach((img) => {
      img.classList.add("blur-up");
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", () => img.classList.add("loaded"));
      }
    });
  }

  /* ---------- 6. Render Dynamic Sections ---------- */
  function previewHTML(p) {
    const inner = p.img
      ? `<img src="${esc(p.img)}" alt="Screenshot of ${esc(p.name)}" loading="lazy" decoding="async">`
      : `<div class="pv-ui" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span class="pv-num" aria-hidden="true">${esc(p.no)}</span>`;
    return `<span class="pv-host">${esc(p.host)}</span>${inner}`;
  }

  $("#stack").innerHTML = S.projects.map((p, i) => `
    <article class="card" style="--i:${i}" data-card>
      <div class="card-in">
        <div class="preview" style="--a:${p.a};--b:${p.b};--angle:${p.angle}deg" data-tilt>${previewHTML(p)}</div>
        <div class="card-info">
          <div class="card-top"><span>${esc(p.no)} / ${esc(String(S.projects.length).padStart(2, "0"))}</span><span>${esc(p.year)}</span></div>
          <h3>${esc(p.name)}<small>${esc(p.sub)} · ${esc(p.kind)}</small></h3>
          <p>${esc(p.tagline)}</p>
          <ul class="tags">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="card-actions">
            <button class="btn magnetic" type="button" data-project="${esc(p.id)}">Case study <span aria-hidden="true">→</span></button>
            <a class="btn ghost magnetic" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Live site <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="card-dim" aria-hidden="true"></div>
      </div>
    </article>`).join("");

  $("#exp").innerHTML = S.experiments.map((e) => `
    <a class="exp" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer" data-fade>
      <h3>${esc(e.name)}<span>${esc(e.year)}</span></h3>
      <p>${esc(e.text)}</p>
      <span class="go">Watch on YouTube ↗</span>
    </a>`).join("");

  if ($("#certs")) {
    $("#certs").innerHTML = (S.certificates || []).map((c) => `
      <button class="cert-card" type="button" data-cert="${esc(c.id)}" data-fade>
        <span class="cert-thumb"><img src="${esc(c.img)}" alt="${esc(c.title)} certificate" loading="lazy" decoding="async"></span>
        <span class="cert-meta"><small>${esc(c.issuer)}</small><b>${esc(c.title)}</b><span>${esc(c.kind)} · ${esc(c.date)}</span></span>
      </button>`).join("");
  }

  $("#posts").innerHTML = S.posts.map((p) => `
    <button class="post" type="button" data-post="${esc(p.id)}" data-fade>
      <span class="meta">${esc(p.date)}<br>${esc(p.read)} read</span>
      <span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.excerpt)}</p>
        <div style="margin-top:10px;">
          <button class="share-btn" onclick="window.copyNoteLink('${esc(p.id)}', event)">🔗 Share link</button>
        </div>
      </span>
      <span class="arrow" aria-hidden="true">↗</span>
    </button>`).join("");

  setupBlurUpImages();

  /* ---------- 7. Mouse Hover Project Preview ---------- */
  const hoverPreview = $("#hoverPreview");
  const hoverImg = hoverPreview ? $("img", hoverPreview) : null;    if (hoverPreview && hoverImg && fine) { document.addEventListener("mousemove", (e) => { if (!hoverPreview.hidden) { hoverPreview.style.left = e.clientX + "px"; hoverPreview.style.top = (e.clientY - 15) + "px"; } });      $$("[data-card]").forEach((card) => {
      const projId = $("[data-project]", card)?.dataset.project;
      const proj = S.projects.find((p) => p.id === projId);
      card.addEventListener("mouseenter", () => {
        if (proj && proj.img) {
          hoverImg.src = proj.img;
          hoverPreview.hidden = false;
          hoverPreview.style.opacity = "1";
        }
      });
      card.addEventListener("mouseleave", () => {
        hoverPreview.style.opacity = "0";
        setTimeout(() => { hoverPreview.hidden = true; }, 200);
      });
    });
  }

  /* ---------- 8. Back-To-Top SVG Progress Ring ---------- */
  const progressCircle = $("#topProgressCircle");
  if (progressCircle) {
    const circumference = 2 * Math.PI * 18;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    window.addEventListener("scroll", () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollCurrent = window.scrollY;
      const scrollFraction = Math.max(0, Math.min(1, scrollCurrent / Math.max(1, scrollTotal)));
      const offset = circumference - scrollFraction * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }, { passive: true });
  }

  /* ---------- 9. Overlay & Mini-Demos ---------- */
  const overlay = $("#overlay"), ovBody = $("#ovBody"), ovClose = $("#ovClose");
  let lastFocus = null, ovOrigin = { x: innerWidth / 2, y: innerHeight / 2 }, ovBusy = false;

  const projectHTML = (p) => {
    let demoHTML = "";
    if (p.id === "pdfzero") {
      demoHTML = `
        <div class="demo-container">
          <p class="demo-title">⚡ Try PDFZero locally: File Page Counter</p>
          <div class="drop-zone" id="pdfDropZone">
            <p>Drop a local PDF here or <b>click to test</b></p>
            <input type="file" id="pdfInput" accept="application/pdf" hidden>
            <div id="pdfResult" style="margin-top:12px; font-weight:600; color:var(--ember)"></div>
          </div>
        </div>`;
    } else if (p.id === "nutrigrade") {
      demoHTML = `
        <div class="demo-container">
          <p class="demo-title">⚡ Interactive Sample Label Inspector</p>
          <div class="nutri-picker">
            <button class="nutri-btn active" onclick="window.inspectSample('bar', event)">Protein Bar</button>
            <button class="nutri-btn" onclick="window.inspectSample('soda', event)">Diet Soda</button>
          </div>
          <div id="nutriResult" style="font-size:0.95rem; line-height:1.6; color:#cfc8c2;">
            <b>NutriGrade: B+</b> · Flags: High Sucralose, Added Palm Oil.
          </div>
        </div>`;
    }

    const metricsHTML = p.metrics
      ? `<div class="ov-metrics">${p.metrics.map((m) => `<div class="metric-box"><label>${esc(m.label)}</label><span>${esc(m.val)}</span></div>`).join("")}</div>`
      : "";

    return `
      <div data-project-id="${esc(p.id)}">
        <p class="ov-kicker ov-r">Case study · ${esc(p.no)}</p>
        <h2 class="ov-title ov-r">${esc(p.name)}<small>${esc(p.tagline)}</small></h2>
        <div class="preview ov-preview ov-r" style="--a:${p.a};--b:${p.b};--angle:${p.angle}deg">${previewHTML(p)}</div>
        
        ${metricsHTML}
        
        <dl class="ov-facts ov-r">
          <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
          <div><dt>Type</dt><dd>${esc(p.kind)}</dd></div>
          <div><dt>Role</dt><dd>Design &amp; development</dd></div>
          <div><dt>Status</dt><dd>Live</dd></div>
        </dl>
        <div class="ov-cols ov-r">
          <div><h3>Overview</h3><p class="ov-summary">${esc(p.summary)}</p>
            <h3 style="margin-top:28px">Stack</h3><ul class="tags">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
          <div><h3>What I built</h3><ul class="hl">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
        </div>
        
        ${demoHTML}
        
        <div class="ov-actions ov-r">
          <a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Visit live site <span aria-hidden="true">↗</span></a>
          <button class="btn ghost" type="button" data-close>Back to work</button>
        </div>
      </div>`;
  };

  const postHTML = (p) => `
    <p class="ov-kicker ov-r">${esc(p.tag)} · ${esc(p.date)} · ${esc(p.read)} read</p>
    <h2 class="ov-title ov-r">${esc(p.title)}</h2>
    <div class="ov-article ov-r">${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
    <div class="ov-actions ov-r"><button class="btn ghost" type="button" data-close>Back to notes</button></div>`;

  const certHTML = (c) => `
    <p class="ov-kicker ov-r">${esc(c.kind)}</p>
    <h2 class="ov-title ov-r">${esc(c.title)}<small>${esc(c.issuer)} · ${esc(c.date)}</small></h2>
    <div class="ov-cert ov-r"><img src="${esc(c.img)}" alt="${esc(c.title)} certificate issued to Joshua Jose"></div>
    <div class="ov-actions ov-r">
      ${c.verify ? `<a class="btn" href="${esc(c.verify)}" target="_blank" rel="noopener noreferrer">Verify online <span aria-hidden="true">↗</span></a>` : ""}
      <button class="btn ghost" type="button" data-close>Back to resume</button>
    </div>`;

  function openOverlay(html, origin) {
    if (ovBusy) return;
    ovBusy = true;
    lastFocus = document.activeElement;
    ovBody.innerHTML = html;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    overlay.scrollTop = 0;
    document.documentElement.classList.add("lock");
    if (lenis) lenis.stop();
    const r = origin ? origin.getBoundingClientRect() : null;
    ovOrigin = r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 };
    if (animated) {
      gsap.fromTo(overlay, { clipPath: `circle(0px at ${ovOrigin.x}px ${ovOrigin.y}px)` },
        { clipPath: `circle(160% at ${ovOrigin.x}px ${ovOrigin.y}px)`, duration: 1, ease: "power3.inOut",
          onComplete: () => { overlay.style.clipPath = "none"; ovBusy = false; } });
      gsap.from($$(".ov-r", ovBody), { y: 40, opacity: 0, duration: .9, ease: "power3.out", stagger: .08, delay: .45 });
    } else { ovBusy = false; }
    setTimeout(() => ovClose.focus({ preventScroll: true }), animated ? 500 : 0);
  }

  function closeOverlay() {
    if (overlay.hidden || ovBusy) return;
    const done = () => {
      overlay.hidden = true; overlay.setAttribute("aria-hidden", "true"); overlay.style.clipPath = "";
      ovBody.innerHTML = ""; document.documentElement.classList.remove("lock");
      if (lenis) lenis.start();
      ovBusy = false;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    ovBusy = true;
    if (animated) {
      gsap.fromTo(overlay, { clipPath: `circle(160% at ${ovOrigin.x}px ${ovOrigin.y}px)` },
        { clipPath: `circle(0px at ${ovOrigin.x}px ${ovOrigin.y}px)`, duration: .8, ease: "power3.inOut", onComplete: done });
    } else done();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-project],[data-post],[data-cert]");
    if (t && !e.target.closest(".share-btn")) {
      const id = t.dataset.project || t.dataset.post || t.dataset.cert;
      const cert = S.certificates?.find((c) => c.id === id);
      if (cert) return openOverlay(certHTML(cert), t);
      const proj = S.projects.find((p) => p.id === id);
      if (proj) return openOverlay(projectHTML(proj), t);
      const post = S.posts.find((p) => p.id === id);
      if (post) return openOverlay(postHTML(post), t);
    }
    if (e.target.closest("[data-close]")) closeOverlay();
  });
  ovClose.addEventListener("click", closeOverlay);

  /* ---------- 10. Tech Stack Filter ---------- */
  document.addEventListener("click", (e) => {
    const tagEl = e.target.closest(".tags li");
    if (!tagEl || overlay.getAttribute("aria-hidden") === "false") return;

    const selectedTag = tagEl.textContent.trim();
    const allTags = $$(".tags li"); const allCards = $$("[data-card]");

    if (tagEl.classList.contains("active-filter")) {
      allTags.forEach((t) => t.classList.remove("active-filter"));
      allCards.forEach((c) => c.classList.remove("dimmed"));
    } else {
      allTags.forEach((t) => t.classList.remove("active-filter"));
      tagEl.classList.add("active-filter");

      S.projects.forEach((proj) => {
        const cardEl = $(`[data-project="${proj.id}"]`)?.closest("[data-card]");
        if (!cardEl) return;

        const hasTech = proj.stack.some((s) => s.toLowerCase() === selectedTag.toLowerCase());
        if (hasTech) cardEl.classList.remove("dimmed");
        else cardEl.classList.add("dimmed");
      });
    }
  });

  /* ---------- 11. Live GitHub API Activity ---------- */
  async function fetchGitHubActivity() {
    const feed = $("#githubContent");
    if (!feed) return;

    try {
      const res = await fetch("https://api.github.com/users/joshua5915g/events/public");
      if (!res.ok) throw new Error("API Limit");
      const events = await res.json();

      const pushes = events.filter((e) => e.type === "PushEvent").slice(0, 3);
      if (!pushes.length) {
        feed.innerHTML = '<span class="muted">No recent public commits found.</span>';
        return;
      }

      feed.innerHTML = pushes.map((p) => {
        const repoName = p.repo.name.replace("joshua5915g/", "");
        const commitMsg = p.payload.commits?.[0]?.message || "Updated repository";
        const date = new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `
          <div class="github-item">
            <b>${esc(repoName)}</b>: "${esc(commitMsg)}" <span class="muted">· ${date}</span>
          </div>`;
      }).join("");
    } catch (err) {
      feed.innerHTML = '<span class="muted">Connected via GitHub API (joshua5915g).</span>';
    }
  }
  fetchGitHubActivity();

  /* ---------- 12. Audio-Reactive Atmosphere ---------- */
  let audioCtx = null, analyser = null, isAudioPlaying = false;
  const audioBtn = $("#audioToggle");

  if (audioBtn) {
    audioBtn.addEventListener("click", () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;

        const freqs = [261.63, 329.63, 392.00, 493.88, 587.33];
        freqs.forEach((freq) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(analyser);
          analyser.connect(audioCtx.destination);
          osc.start();
        });
      }

      if (audioCtx.state === "suspended") audioCtx.resume();

      isAudioPlaying = !isAudioPlaying;
      audioBtn.classList.toggle("active", isAudioPlaying);
      audioBtn.innerHTML = isAudioPlaying
        ? `<span class="live" style="background:var(--ember)"></span> Atmosphere Active`
        : `<span class="live" style="background:var(--ember); opacity:0.6;"></span> Enable Piano Atmosphere`;

      if (isAudioPlaying) animateGlowPulse();
    });
  }

  function animateGlowPulse() {
    if (!isAudioPlaying || !analyser) return;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const glow = $(".glow");
    if (glow) {
      const scale = 1 + (avg / 255) * 0.25;
      glow.style.transform = `translate(60vw, 30vh) scale(${scale})`;
    }
    requestAnimationFrame(animateGlowPulse);
  }

  /* ---------- 13. Mini Demo Handlers ---------- */
  document.addEventListener("change", (e) => {
    if (e.target.id === "pdfInput") {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const res = evt.target.result;
        const count = (res.match(/\/Type\s*\/Page\b/g) || []).length;
        $("#pdfResult").innerHTML = `📄 ${esc(file.name)} — <b>${count || 1} page(s) detected</b> (0 KB sent to server)`;
      };
      reader.readAsText(file);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === "pdfDropZone" || e.target.closest("#pdfDropZone")) {
      $("#pdfInput")?.click();
    }
  });

  window.inspectSample = function(type, evt) {
    const result = $("#nutriResult"); const btns = $$(".nutri-btn");
    btns.forEach((b) => b.classList.remove("active"));
    
    if (type === 'bar') {
      evt.target.classList.add("active");
      result.innerHTML = "<b>NutriGrade: B+</b> · Flags: High Sucralose, Added Palm Oil.";
    } else {
      evt.target.classList.add("active");
      result.innerHTML = "<b>NutriGrade: D</b> · Flags: Aspartame, Caramel Color IV, Synthetic Phosphoric Acid.";
    }
  };

  /* ---------- 14. Command Palette (Ctrl+K) ---------- */
  const cmdPalette = $("#cmdPalette");
  const cmdInput = $("#cmdInput");
  const cmdList = $("#cmdList");

  const cmdActions = [
    { title: "Jump to About", category: "Section", action: () => scrollToSection("#about") },
    { title: "Jump to Journey Timeline", category: "Section", action: () => scrollToSection("#journey") },
    { title: "Jump to Work / Projects", category: "Section", action: () => scrollToSection("#work") },
    { title: "Jump to Skills", category: "Section", action: () => scrollToSection("#skills") },
    { title: "Jump to Resume", category: "Section", action: () => scrollToSection("#resume") },
    { title: "Jump to Notes", category: "Section", action: () => scrollToSection("#notes") },
    { title: "Jump to Contact", category: "Section", action: () => scrollToSection("#contact") },
    { title: "Copy Email Address", category: "Action", action: () => { navigator.clipboard.writeText(S.email); alert("Copied email: " + S.email); } },
    { title: "Download Resume PDF", category: "Action", action: () => { window.open("resume.pdf", "_blank"); } },
    ...S.projects.map((p) => ({
      title: `Project: ${p.name}`,
      category: "Case Study",
      action: () => { const btn = $(`[data-project="${p.id}"]`); if (btn) btn.click(); }
    })),
    ...S.posts.map((post) => ({
      title: `Note: ${post.title}`,
      category: "Writing",
      action: () => { const btn = $(`[data-post="${post.id}"]`); if (btn) btn.click(); }
    }))
  ];

  let selectedCmdIdx = 0;

  function scrollToSection(selector) {
    const target = $(selector);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  function renderCmdList(filter = "") {
    const query = filter.toLowerCase().trim();
    const filtered = cmdActions.filter((item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));

    if (!filtered.length) {
      cmdList.innerHTML = `<li class="cmd-item" style="color:var(--muted)">No matching actions found.</li>`;
      return;
    }

    cmdList.innerHTML = filtered.map((item, i) => `
      <li class="cmd-item ${i === selectedCmdIdx ? "selected" : ""}" data-cmd-idx="${i}">
        <span>${esc(item.title)}</span>
        <small>${esc(item.category)}</small>
      </li>`).join("");
  }

  function openCommandPalette() {
    cmdPalette.hidden = false;
    cmdInput.value = "";
    selectedCmdIdx = 0;
    renderCmdList();
    setTimeout(() => cmdInput.focus(), 50);
  }

  function closeCommandPalette() {
    cmdPalette.hidden = true;
  }

  if (cmdInput) {
    cmdInput.addEventListener("input", (e) => {
      selectedCmdIdx = 0;
      renderCmdList(e.target.value);
    });

    cmdInput.addEventListener("keydown", (e) => {
      const items = $$(".cmd-item", cmdList); if (!items.length) return;        if (e.key === "ArrowDown") { e.preventDefault(); selectedCmdIdx = (selectedCmdIdx + 1) \% items.length; renderCmdList(cmdInput.value); } else if (e.key === "ArrowUp") { e.preventDefault(); selectedCmdIdx = (selectedCmdIdx - 1 + items.length) \% items.length; renderCmdList(cmdInput.value); } else if (e.key === "Enter") { e.preventDefault(); const query = cmdInput.value.toLowerCase().trim(); const filtered = cmdActions.filter((item) => item.title.toLowerCase().includes(query) \vert{}\vert{} item.category.toLowerCase().includes(query)); if (filtered[selectedCmdIdx]) { filtered[selectedCmdIdx].action(); closeCommandPalette(); } } }); }    if (cmdList) { cmdList.addEventListener("click", (e) => { const itemEl = e.target.closest(".cmd-item"); if (!itemEl) return; const idx = +itemEl.dataset.cmdIdx; const query = cmdInput.value.toLowerCase().trim(); const filtered = cmdActions.filter((item) => item.title.toLowerCase().includes(query) \vert{}\vert{} item.category.toLowerCase().includes(query)); if (filtered[idx]) { filtered[idx].action(); closeCommandPalette(); } }); }    document.addEventListener("keydown", (e) => { if ((e.metaKey \vert{}\vert{} e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); if (cmdPalette.hidden) openCommandPalette(); else closeCommandPalette(); } if (e.key === "Escape" && !cmdPalette.hidden) closeCommandPalette(); });    if (cmdPalette) { cmdPalette.addEventListener("click", (e) => { if (e.target === cmdPalette) closeCommandPalette(); }); }    /* ---------- 15. Scroll-Spy Sync ---------- */ const spyDots = $$(".scroll-spy-dots a");

  ["top", "about", "journey", "work", "skills", "resume", "notes", "contact"].forEach((id) => {
    ScrollTrigger.create({
      trigger: "#" + id,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (s) => {
        if (s.isActive) {
          spyDots.forEach((dot) => dot.classList.toggle("active", dot.dataset.spy === id));
          const a = $(`[data-nav="${id}"]`);
          if (a) a.classList.toggle("active", true);
          const mobA = $(`[href="#${id}"]`, $(".mobile-nav"));
          if (mobA) mobA.classList.toggle("active", true);
        }
      }
    });
  });

  /* ---------- 16. Deep Linking & Note Share ---------- */
  window.copyNoteLink = function(noteId, evt) {
    evt.stopPropagation();
    const link = `${location.origin}${location.pathname}?note=${noteId}`;
    navigator.clipboard.writeText(link).then(() => {
      const btn = evt.target.closest("button");
      if (btn) btn.textContent = "Link copied! ✓";
      setTimeout(() => { if (btn) btn.textContent = "🔗 Share link"; }, 2000);
    });
  };

  function checkDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const noteId = params.get("note");
    const projId = params.get("project");

    if (noteId) {
      const postBtn = $(`[data-post="${noteId}"]`);
      if (postBtn) setTimeout(() => postBtn.click(), 400);
    } else if (projId) {
      const projBtn = $(`[data-project="${projId}"]`);
      if (projBtn) setTimeout(() => projBtn.click(), 400);
    }
  }
  checkDeepLink();

  /* ---------- 17. Keyboard Shortcuts & Easter Egg ---------- */
  let gKeyPressed = false, gTimeout = null, pianoBuffer = "";

  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) || !cmdPalette.hidden) return;

    const key = e.key.toLowerCase();

    pianoBuffer += key;
    if (pianoBuffer.length > 10) pianoBuffer = pianoBuffer.slice(-10);
    if (pianoBuffer.endsWith("piano")) {
      pianoBuffer = "";
      triggerChurchPianoHarmonic();
    }

    if (key === "g" && !gKeyPressed) {
      gKeyPressed = true;
      clearTimeout(gTimeout);
      gTimeout = setTimeout(() => { gKeyPressed = false; }, 1000);
      return;
    }

    if (gKeyPressed) {
      gKeyPressed = false;
      if (key === "w") scrollToSection("#work");
      if (key === "a") scrollToSection("#about");
      if (key === "r") scrollToSection("#resume");
      if (key === "n") scrollToSection("#notes");
      if (key === "c") scrollToSection("#contact");
      if (key === "j") scrollToSection("#journey");
      if (key === "h") scrollToSection("#top");
      return;
    }

    const isOverlayOpen = overlay.getAttribute("aria-hidden") === "false";
    if (isOverlayOpen) {
      const currentProjId = ovBody.querySelector("[data-project-id]")?.dataset.projectId;
      if (currentProjId) {
        const idx = S.projects.findIndex((p) => p.id === currentProjId);
        if (idx !== -1) {
          if (e.key === "ArrowRight") {
            const nextProj = S.projects[(idx + 1) % S.projects.length];
            const btn = $(`[data-project="${nextProj.id}"]`);
            if (btn) btn.click();
          } else if (e.key === "ArrowLeft") {
            const prevProj = S.projects[(idx - 1 + S.projects.length) % S.projects.length];
            const btn = $(`[data-project="${prevProj.id}"]`);
            if (btn) btn.click();
          }
        }
      }
    }
  });

  function triggerChurchPianoHarmonic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const chord = [261.63, 329.63, 392.00, 493.88, 587.33];

    chord.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08 / (index + 1), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.04);
      osc.stop(ctx.currentTime + 3.6);
    });

    const toast = document.createElement("div");
    toast.className = "piano-toast";
    toast.textContent = "🎹 Easter Egg: Church Piano Resonance unlocked.";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  /* ---------- 18. UI Clock, Form & Motion Engine ---------- */
  const clock = $("#clock");
  const tick = () => { clock.textContent = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) + " IST"; };
  tick(); setInterval(tick, 20000);

  $("#copy").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(S.email); e.target.textContent = "Copied ✓"; }
    catch { e.target.textContent = S.email; }
    setTimeout(() => (e.target.textContent = "Copy address"), 2200);
  });

  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, st = $("#status");
    const name = f.name.value.trim(), email = f.email.value.trim(), msg = f.msg.value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) { st.className = "form-status err"; st.textContent = "Please fill in your name, a valid email and a message."; return; }
    st.className = "form-status";
    st.textContent = "Opening your email app. If nothing happens, email me directly at " + S.email + ".";
    const body = `${msg}\n\n— ${name} (${email})`;
    location.href = `mailto:${S.email}?subject=${encodeURIComponent("Hello from " + name)}&body=${encodeURIComponent(body)}`;
  });

  if (!animated) {
    document.documentElement.classList.add("static");
    $$("[data-count]").forEach((el) => (el.textContent = el.dataset.count)); $$
("a[href^='#']").forEach((a) => a.addEventListener("click", (e) => {
      const t = $(a.getAttribute("href")); if (t) { e.preventDefault(); t.scrollIntoView(); } })); return; }    gsap.registerPlugin(ScrollTrigger);    if (window.Lenis) { lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true }); lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }    $$("a[href^='#']").forEach((a) => a.addEventListener("click", (e) => {
    const t = $(a.getAttribute("href")); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(a.getAttribute("href") === "#top" ? 0 : t, { offset: -60, duration: 1.4 });
    else t.scrollIntoView({ behavior: "smooth" });
  }));

  gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });

  if (fine) {
    const ring = $(".cursor-ring"); const xTo = gsap.quickTo(ring, "x", { duration: .35, ease: "power3" }); const yTo = gsap.quickTo(ring, "y", { duration: .35, ease: "power3" }); addEventListener("pointermove", (e) => { ring.classList.add("on"); xTo(e.clientX); yTo(e.clientY); }, { passive: true }); document.addEventListener("pointerover", (e) => ring.classList.toggle("is-hover", !!e.target.closest("a,button,summary,input,textarea"))); document.documentElement.addEventListener("pointerleave", () => ring.classList.remove("on")); }    if (fine) $$(".magnetic").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: .5, ease: "elastic.out(1,.5)" });
    const y = gsap.quickTo(el, "y", { duration: .5, ease: "elastic.out(1,.5)" });
    el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .35); });
    el.addEventListener("pointerleave", () => { x(0); y(0); });
  });

  const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro.from(".hero-title .line", { yPercent: 115, duration: 1.5, stagger: .12 }, .1)
       .from(".hero-in", { y: 24, opacity: 0, duration: 1, stagger: .1 }, .6)
       .from(".site-header", { y: -30, opacity: 0, duration: 1 }, .3);

  if (fine) {
    const gx = gsap.quickTo(".glow", "x", { duration: 1.6, ease: "power3" });
    const gy = gsap.quickTo(".glow", "y", { duration: 1.6, ease: "power3" });
    $("#top").addEventListener("pointermove", (e) => { const r = $("#top").getBoundingClientRect(); gx(e.clientX - r.left); gy(e.clientY - r.top); }); }    gsap.to(".hero-title", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } }); $$(".split").forEach((el) => gsap.from($$(".line", el), { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: .09, scrollTrigger: { trigger: el, start: "top 88\%" } })); $$("[data-fade]").forEach((el) => gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));

  const st = $("#statement");
  const words = st.textContent.trim().split(/\s+/);
  st.innerHTML = words.map((w) => `<span class="w">${esc(w)} </span>`).join("");
  gsap.fromTo($$(".w", st), { opacity: .16 }, { opacity: 1, stagger: .12, ease: "none", scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 45%", scrub: true } });

  $$("[data-count]").forEach((el) => { const end = +el.dataset.count, o = { v: 0 }; gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90\%" }, onUpdate: () => (el.textContent = Math.round(o.v)) }); });    const mm = gsap.matchMedia(); mm.add("(min-width: 901px)", () => { const cards = $$
("[data-card]");
    cards.forEach((card, i) => {
      const next = cards[i + 1]; if (!next) return;
      const depth = cards.length - 1 - i;
      const tl = gsap.timeline({ scrollTrigger: { trigger: next, start: "top 75%", end: "top 20%", scrub: true } });
      tl.to($(".card-in", card), { scale: 1 - Math.min(depth, 3) * .015 - .04, ease: "none" }, 0)
        .to($(".card-dim", card), { opacity: .55, ease: "none" }, 0); }); $$(".stack .preview").forEach((pv) => gsap.fromTo($(".pv-ui, img", pv), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: pv, start: "top bottom", end: "bottom top", scrub: true } })); });    if (fine) $$("[data-tilt]").forEach((pv) => {
    const rx = gsap.quickTo(pv, "rotationX", { duration: .6, ease: "power3" }), ry = gsap.quickTo(pv, "rotationY", { duration: .6, ease: "power3" });
    gsap.set(pv, { transformPerspective: 900 });
    pv.addEventListener("pointermove", (e) => { const r = pv.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 8); rx(-((e.clientY - r.top) / r.height - .5) * 8); });
    pv.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });

  addEventListener("load", () => ScrollTrigger.refresh());
})();