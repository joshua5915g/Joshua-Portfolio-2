/* ============================================================
   Joshua Jose — portfolio behaviour
   1 render  2 overlay  3 small UI  4 motion (GSAP + Lenis)
   Everything degrades: no GSAP or reduced motion = static page.
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

  /* ---------- 1. render from content.js ---------- */
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

  $("#posts").innerHTML = S.posts.map((p) => `
    <button class="post" type="button" data-post="${esc(p.id)}" data-fade>
      <span class="meta">${esc(p.date)}<br>${esc(p.read)} read</span>
      <span><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></span>
      <span class="arrow" aria-hidden="true">↗</span>
    </button>`).join("");

  /* ---------- 2. overlay (case studies + notes) ---------- */
  const overlay = $("#overlay"), ovBody = $("#ovBody"), ovClose = $("#ovClose");
  let lastFocus = null, ovOrigin = { x: innerWidth / 2, y: innerHeight / 2 }, ovBusy = false;

  const projectHTML = (p) => `
    <p class="ov-kicker ov-r">Case study · ${esc(p.no)}</p>
    <h2 class="ov-title ov-r">${esc(p.name)}<small>${esc(p.tagline)}</small></h2>
    <div class="preview ov-preview ov-r" style="--a:${p.a};--b:${p.b};--angle:${p.angle}deg">${previewHTML(p)}</div>
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
    <div class="ov-actions ov-r">
      <a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Visit live site <span aria-hidden="true">↗</span></a>
      <button class="btn ghost" type="button" data-close>Back to work</button>
    </div>`;

  const postHTML = (p) => `
    <p class="ov-kicker ov-r">${esc(p.tag)} · ${esc(p.date)} · ${esc(p.read)} read</p>
    <h2 class="ov-title ov-r">${esc(p.title)}</h2>
    <div class="ov-article ov-r">${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
    <div class="ov-actions ov-r"><button class="btn ghost" type="button" data-close>Back to notes</button></div>`;

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
    const t = e.target.closest("[data-project],[data-post]");
    if (t) {
      const id = t.dataset.project || t.dataset.post;
      const proj = S.projects.find((p) => p.id === id);
      if (proj) return openOverlay(projectHTML(proj), t);
      const post = S.posts.find((p) => p.id === id);
      if (post) return openOverlay(postHTML(post), t);
    }
    if (e.target.closest("[data-close]")) closeOverlay();
  });
  ovClose.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", (e) => {
    if (overlay.hidden) return;
    if (e.key === "Escape") return closeOverlay();
    if (e.key === "Tab") { // keep focus inside the dialog
      const f = $$("a[href],button:not([disabled])", overlay);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- 3. small UI ---------- */
  const clock = $("#clock");
  const tick = () => { clock.textContent = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }) + " IST"; };
  tick(); setInterval(tick, 20000);

  $("#copy").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(S.email); e.target.textContent = "Copied ✓"; }
    catch { e.target.textContent = S.email; }
    setTimeout(() => (e.target.textContent = "Copy address"), 2200);
  });

  // The form opens the visitor's email app with the message filled in (no server needed).
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

  /* ---------- 4. motion ---------- */
  if (!animated) {
    document.documentElement.classList.add("static");
    $$("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
    $$("a[href^='#']").forEach((a) => a.addEventListener("click", (e) => {
      const t = $(a.getAttribute("href")); if (t) { e.preventDefault(); t.scrollIntoView(); }
    }));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // smooth scroll (optional: page still works if Lenis fails to load)
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$("a[href^='#']").forEach((a) => a.addEventListener("click", (e) => {
    const t = $(a.getAttribute("href")); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(a.getAttribute("href") === "#top" ? 0 : t, { offset: -60, duration: 1.4 });
    else t.scrollIntoView({ behavior: "smooth" });
  }));

  // scroll progress bar
  gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });

  // cursor ring (native cursor stays visible)
  if (fine) {
    const ring = $(".cursor-ring");
    const xTo = gsap.quickTo(ring, "x", { duration: .35, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: .35, ease: "power3" });
    addEventListener("pointermove", (e) => { ring.classList.add("on"); xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    document.addEventListener("pointerover", (e) => ring.classList.toggle("is-hover", !!e.target.closest("a,button,summary,input,textarea")));
    document.documentElement.addEventListener("pointerleave", () => ring.classList.remove("on"));
  }

  // magnetic buttons
  if (fine) $$(".magnetic").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: .5, ease: "elastic.out(1,.5)" });
    const y = gsap.quickTo(el, "y", { duration: .5, ease: "elastic.out(1,.5)" });
    el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .35); });
    el.addEventListener("pointerleave", () => { x(0); y(0); });
  });

  // hero entrance + glow that follows the cursor
  const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro.from(".hero-title .line", { yPercent: 115, duration: 1.5, stagger: .12 }, .1)
       .from(".hero-in", { y: 24, opacity: 0, duration: 1, stagger: .1 }, .6)
       .from(".site-header", { y: -30, opacity: 0, duration: 1 }, .3);
  if (fine) {
    const gx = gsap.quickTo(".glow", "x", { duration: 1.6, ease: "power3" });
    const gy = gsap.quickTo(".glow", "y", { duration: 1.6, ease: "power3" });
    $("#top").addEventListener("pointermove", (e) => { const r = $("#top").getBoundingClientRect(); gx(e.clientX - r.left); gy(e.clientY - r.top); });
  }
  gsap.to(".hero-title", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // masked heading reveals
  $$(".split").forEach((el) => gsap.from($$(".line", el), { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: .09, scrollTrigger: { trigger: el, start: "top 88%" } }));
  // generic fade-ups
  $$("[data-fade]").forEach((el) => gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));

  // about statement: words light up as you scroll
  const st = $("#statement");
  const words = st.textContent.trim().split(/\s+/);
  st.innerHTML = words.map((w) => `<span class="w">${esc(w)} </span>`).join("");
  gsap.fromTo($$(".w", st), { opacity: .16 }, { opacity: 1, stagger: .12, ease: "none", scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 45%", scrub: true } });

  // counters
  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count, o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => (el.textContent = Math.round(o.v)) });
  });

  // stacking project cards (desktop): earlier cards recede as the next one arrives
  const mm = gsap.matchMedia();
  mm.add("(min-width: 901px)", () => {
    const cards = $$("[data-card]");
    cards.forEach((card, i) => {
      const next = cards[i + 1]; if (!next) return;
      const depth = cards.length - 1 - i;
      const tl = gsap.timeline({ scrollTrigger: { trigger: next, start: "top 75%", end: "top 20%", scrub: true } });
      tl.to($(".card-in", card), { scale: 1 - Math.min(depth, 3) * .015 - .04, ease: "none" }, 0)
        .to($(".card-dim", card), { opacity: .55, ease: "none" }, 0);
    });
    // gentle parallax inside each preview image/panel
    $$(".stack .preview").forEach((pv) => gsap.fromTo($(".pv-ui, img", pv), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: pv, start: "top bottom", end: "bottom top", scrub: true } }));
  });
  // subtle tilt on preview panels
  if (fine) $$("[data-tilt]").forEach((pv) => {
    const rx = gsap.quickTo(pv, "rotationX", { duration: .6, ease: "power3" }), ry = gsap.quickTo(pv, "rotationY", { duration: .6, ease: "power3" });
    gsap.set(pv, { transformPerspective: 900 });
    pv.addEventListener("pointermove", (e) => { const r = pv.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 8); rx(-((e.clientY - r.top) / r.height - .5) * 8); });
    pv.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });

  // active nav link
  ["about", "work", "skills", "resume", "notes", "contact"].forEach((id) => {
    ScrollTrigger.create({ trigger: "#" + id, start: "top 55%", end: "bottom 55%",
      onToggle: (s) => { const a = $(`[data-nav="${id}"]`); if (a) a.classList.toggle("active", s.isActive); } });
  });

  addEventListener("load", () => ScrollTrigger.refresh());
})();