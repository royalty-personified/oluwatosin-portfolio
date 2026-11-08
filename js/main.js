/*
 * main.js — all interactive features of the portfolio.
 *
 * Each feature is one function, numbered to match the project documentation.
 * Settings come from CONFIG (config.js). Content comes from SITE_DATA (data.js).
 */

// ---------- Shared helpers ----------

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

// True when animations should run. False when the visitor's device asks for less motion.
function motionAllowed() {
  return !(CONFIG.motion.respectReducedMotion && reducedMotionQuery.matches);
}

// Picks a shape for each status, so status is never shown by colour alone.
function getStatusMarker(status) {
  switch (status) {
    case "experience":
      return "●";
    case "developing":
      return "◐";
    case "interest":
      return "○";
    case "ambition":
      return "◇";
    default:
      return "•";
  }
}

// Builds the HTML for one status tag, e.g. "● Experience".
function statusTag(status) {
  const { label } = SITE_DATA.statuses[status];
  return `<span class="status-tag status--${status}"><span aria-hidden="true">${getStatusMarker(status)}</span> ${label}</span>`;
}

// Marks the selected filter button as pressed and all others as not pressed.
function setPressedFilter(filterBar, activeId) {
  filterBar.querySelectorAll(".filter-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === activeId));
  });
}

// ---------- 1. Typing effect ----------

function initTypingEffect() {
  const target = document.querySelector("#typed-text");
  if (!target) return;

  const { phrases, typeSpeed, deleteSpeed, pauseAfterWord, pauseBeforeNext, loop } = CONFIG.typing;

  if (!motionAllowed()) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    charIndex += isDeleting ? -1 : 1;
    target.textContent = current.slice(0, charIndex);

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing this phrase
      if (!loop && phraseIndex === phrases.length - 1) return;
      isDeleting = true;
      delay = pauseAfterWord;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting: move to the next phrase, back to the first after the last
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = pauseBeforeNext;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// ---------- 2. Mobile menu toggle ----------

function initMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (!button || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  if (CONFIG.nav.closeOnLinkClick) {
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      button.focus();
    }
  });

  // Close the phone menu if the window is widened to desktop size
  window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

// ---------- 3. Light / dark theme switch ----------

function initThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  const { storageKey, default: defaultTheme } = CONFIG.theme;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  // localStorage can be blocked (private windows), so every access is wrapped in try/catch
  function readSaved() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The choice just won't be remembered next visit
    }
  }

  function chooseTheme() {
    const saved = readSaved();
    if (saved === "light" || saved === "dark") return saved;
    if (defaultTheme === "light" || defaultTheme === "dark") return defaultTheme;
    return systemDark.matches ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  apply(chooseTheme());

  button.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    save(next);
    apply(next);
  });

  // Follow the device setting live, but only if the visitor hasn't picked a theme
  systemDark.addEventListener("change", () => {
    if (!readSaved()) apply(chooseTheme());
  });
}

// ---------- 4. Scroll reveal animations ----------

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const { threshold, staggerDelay, once } = CONFIG.reveal;

  // Items inside the same group appear one after another
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll(".reveal").forEach((item, index) => {
      item.style.transitionDelay = `${index * staggerDelay}ms`;
    });
  });

  if (!motionAllowed() || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold }
  );

  items.forEach((item) => observer.observe(item));
}

// ---------- 5. Smooth scroll + active nav link ----------

function initSectionNav() {
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  // Smooth scroll for every in-page link, leaving room for the fixed header
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = id.length > 1 ? document.querySelector(id) : null;
      if (!target) return;

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - CONFIG.nav.offset;
      window.scrollTo({ top, behavior: motionAllowed() ? CONFIG.scroll.behavior : "auto" });

      // Move keyboard focus to the section too, so the next Tab continues from there
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      history.pushState(null, "", id);
    });
  });

  // Highlight the nav link of the section currently in the middle of the screen
  const sections = [...navLinks].map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);
          if (isActive) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// ---------- 6. Scroll progress bar ----------

function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  if (CONFIG.progress.color) bar.style.setProperty("--progress-color", CONFIG.progress.color);
  bar.style.setProperty("--progress-height", `${CONFIG.progress.height}px`);

  function update() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${percent}%`;
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

// ---------- 7. Area cards rendered from data + filter ----------

function initAreaCards() {
  const grid = document.querySelector("#areas-grid");
  const filterBar = document.querySelector("#areas-filters");
  const count = document.querySelector("#areas-count");
  if (!grid || !filterBar) return;

  const { areas, areaGroups } = SITE_DATA;
  const groupLabel = (id) => areaGroups.find((group) => group.id === id).label;

  filterBar.innerHTML = areaGroups
    .map((group) => `<button type="button" class="filter-btn" data-filter="${group.id}" aria-pressed="false">${group.label}</button>`)
    .join("");

  function render(filter) {
    const visible = filter === "all" ? areas : areas.filter((area) => area.groups.includes(filter));

    grid.innerHTML = visible
      .map(
        (area, index) => `
        <article class="area-card" style="animation-delay: ${index * 60}ms">
          <p class="area-card__groups">${area.groups.map(groupLabel).join(" · ")}</p>
          <h3 class="area-card__title">${area.title}</h3>
          <p class="area-card__summary">${area.summary}</p>
          <ul class="area-card__topics">${area.topics.map((topic) => `<li>${topic}</li>`).join("")}</ul>
          <div class="status-row">${area.statuses.map(statusTag).join("")}</div>
        </article>`
      )
      .join("");

    setPressedFilter(filterBar, filter);
    if (count) count.textContent = `Showing ${visible.length} of ${areas.length} areas`;
  }

  // One listener on the bar handles every button (event delegation)
  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (button) render(button.dataset.filter);
  });

  render(CONFIG.filters.defaultFilter);
}

// ---------- 8. Journey timeline with status filter ----------

function initJourneyTimeline() {
  const list = document.querySelector("#journey-list");
  const filterBar = document.querySelector("#journey-filters");
  const note = document.querySelector("#journey-note");
  if (!list || !filterBar) return;

  const { journey, statuses } = SITE_DATA;
  const filterIds = ["all", ...Object.keys(statuses)];

  filterIds.forEach((id) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-btn";
    button.dataset.filter = id;
    button.textContent = id === "all" ? "All" : statuses[id].label;
    button.addEventListener("click", () => render(id));
    filterBar.appendChild(button);
  });

  function render(filter) {
    list.replaceChildren();

    journey.forEach((item) => {
      if (filter !== "all" && item.status !== filter) return;

      const entry = document.createElement("li");
      entry.className = `journey-item status--${item.status}`;

      const marker = document.createElement("span");
      marker.className = "journey-item__marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = getStatusMarker(item.status);

      const body = document.createElement("div");
      body.className = "journey-item__body";

      const tag = document.createElement("span");
      tag.className = `status-tag status--${item.status}`;
      tag.textContent = statuses[item.status].label;

      const title = document.createElement("h3");
      title.textContent = item.title;

      const text = document.createElement("p");
      text.textContent = item.text;

      body.append(tag, title, text);
      entry.append(marker, body);
      list.appendChild(entry);
    });

    setPressedFilter(filterBar, filter);
    if (note) note.textContent = filter === "all" ? "From what I have done to where I am heading." : statuses[filter].description;
  }

  render(CONFIG.journey.defaultFilter);
}

// ---------- 9. Values carousel ----------

function initValuesCarousel() {
  const root = document.querySelector(".carousel");
  if (!root) return;

  const slide = root.querySelector("#value-slide");
  const title = root.querySelector("#value-title");
  const text = root.querySelector("#value-text");
  const counter = root.querySelector("#value-counter");
  const dotsBox = root.querySelector("#value-dots");
  const playButton = root.querySelector(".carousel__toggle");

  const { values } = SITE_DATA;
  const { interval, autoplay, pauseOnHover } = CONFIG.carousel;

  let index = 0;
  let timer = null;
  let playing = autoplay && motionAllowed();

  const dots = values.map((value, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Show value ${i + 1}: ${value.title}`);
    dot.addEventListener("click", () => {
      show(i);
      restart();
    });
    dotsBox.appendChild(dot);
    return dot;
  });

  function show(newIndex) {
    // The modulo (%) wraps around: after the last slide comes the first, and before the first comes the last
    index = (newIndex + values.length) % values.length;
    const value = values[index];

    title.textContent = value.title;
    text.textContent = value.text;
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(values.length).padStart(2, "0")}`;
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));

    // Restart the fade-in animation by removing and re-adding its class
    slide.classList.remove("is-entering");
    void slide.offsetWidth;
    slide.classList.add("is-entering");
  }

  function start() {
    stop();
    if (playing) timer = setInterval(() => show(index + 1), interval);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function restart() {
    if (timer) start();
  }

  function updatePlayButton() {
    playButton.setAttribute("aria-pressed", String(!playing));
    playButton.setAttribute("aria-label", playing ? "Pause automatic rotation" : "Start automatic rotation");
    playButton.dataset.state = playing ? "playing" : "paused";
  }

  root.querySelector(".carousel__prev").addEventListener("click", () => {
    show(index - 1);
    restart();
  });
  root.querySelector(".carousel__next").addEventListener("click", () => {
    show(index + 1);
    restart();
  });

  playButton.addEventListener("click", () => {
    playing = !playing;
    updatePlayButton();
    playing ? start() : stop();
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });

  if (pauseOnHover) {
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", (event) => {
      if (!root.contains(event.relatedTarget)) start();
    });
  }

  updatePlayButton();
  show(0);
  start();
}

// ---------- 10. Contact form validation ----------

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const counter = document.querySelector("#message-counter");
  const fields = form.querySelectorAll("input, textarea");
  const { minNameLength, minMessageLength, emailPattern, messages, recipient, openMailClient } = CONFIG.form;

  // Each rule returns true when the value is fine, or an error message when it isn't
  const rules = {
    name: (value) => value.length >= minNameLength || messages.name,
    email: (value) => emailPattern.test(value) || messages.email,
    message: (value) => value.length >= minMessageLength || messages.message.replace("{min}", minMessageLength),
  };

  function validateField(field) {
    const value = field.value.trim();
    const result = value === "" ? messages.required : rules[field.name](value);
    const isValid = result === true;

    form.querySelector(`#${field.name}-error`).textContent = isValid ? "" : result;
    field.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  }

  function updateCounter() {
    const length = form.elements.message.value.trim().length;
    counter.textContent = `${length} / ${minMessageLength} characters minimum`;
    counter.classList.toggle("is-met", length >= minMessageLength);
  }

  fields.forEach((field) => {
    // Check a field when the visitor leaves it, then live as they fix it
    field.addEventListener("blur", () => {
      if (field.value.trim() === "" && !field.dataset.touched) return;
      field.dataset.touched = "true";
      validateField(field);
    });
    field.addEventListener("input", () => {
      if (field.dataset.touched) validateField(field);
      if (field.name === "message") updateCounter();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = [...fields].map((field) => {
      field.dataset.touched = "true";
      return validateField(field);
    });

    if (results.includes(false)) {
      status.textContent = messages.fixErrors;
      status.className = "form-status is-error";
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));

    if (openMailClient) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }

    status.textContent = messages.success.replace("{name}", data.name.trim());
    status.className = "form-status is-success";

    form.reset();
    fields.forEach((field) => {
      delete field.dataset.touched;
      field.removeAttribute("aria-invalid");
    });
    updateCounter();
  });

  updateCounter();
}

// ---------- 11. Back-to-top button ----------

function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  function update() {
    button.classList.toggle("is-visible", window.scrollY > CONFIG.backToTop.showAfter);
  }

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: motionAllowed() ? CONFIG.scroll.behavior : "auto" });
    document.querySelector(".brand").focus({ preventScroll: true });
  });

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// ---------- 12. Footer year ----------

function initFooterYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

// ---------- Start everything once the page has loaded ----------

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initFooterYear();
  initTypingEffect();
  initAreaCards();
  initJourneyTimeline();
  initValuesCarousel();
  initScrollReveal(); // after the cards and timeline exist, so they can be observed
  initSectionNav();
  initScrollProgress();
  initBackToTop();
  initContactForm();
});
