# OluwaTosin — Portfolio

A one-page personal portfolio for OluwaTosin, built with plain HTML, CSS and JavaScript.
Made for the Web Development lab assessment (Problem Solving, POS102).

There is nothing to install and no build step.

---

## Run it

### Option 1 — open the file

Double-click `index.html`, or drag it into a browser window.

### Option 2 — run a local server (recommended)

A local server makes the page behave the same way it will online.
From the project folder, run **one** of these:

```bash
# Python (built into macOS and most Linux systems)
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then open the address it prints, for example <http://localhost:8000>.

> The fonts load from Google Fonts. Without an internet connection the page still
> works, but uses the computer's default fonts.

---

## Project structure

```
oluwatosin-portfolio/
├── index.html        # the page: all sections and their text
├── css/
│   └── styles.css    # layout, colours, fonts, light and dark theme
├── js/
│   ├── config.js     # settings you can change (speeds, text, limits)
│   ├── data.js       # content shown as cards, timeline and carousel
│   └── main.js       # the 12 JavaScript features, one function each
├── assets/
│   └── images/       # photos used on the page (keep them under ~300 KB each)
└── dist/             # planning notes (not part of the website)
    ├── plan.md
    └── implementation-plan.md
```

The scripts load in this order: `config.js` → `data.js` → `main.js`.
`main.js` needs the other two, so keep that order in `index.html`.

---

## The JavaScript features

Each feature is one function in `js/main.js`. Its settings are in `js/config.js`.

| # | Feature | Function | Settings in `config.js` |
|---|---------|----------|-------------------------|
| 1 | Typing effect in the hero | `initTypingEffect` | `typing` |
| 2 | Phone menu open / close | `initMobileMenu` | `nav.closeOnLinkClick` |
| 3 | Light / dark theme (remembered) | `initThemeToggle` | `theme` |
| 4 | Sections fade in on scroll | `initScrollReveal` | `reveal` |
| 5 | Smooth scroll + active menu link | `initSectionNav` | `nav.offset`, `scroll.behavior` |
| 6 | Scroll progress bar | `initScrollProgress` | `progress` |
| 7 | Area cards built from data + filter | `initAreaCards` | `filters.defaultFilter` |
| 8 | Journey timeline + status filter | `initJourneyTimeline` | `journey.defaultFilter` |
| 9 | Values carousel | `initValuesCarousel` | `carousel` |
| 10 | Contact form checks | `initContactForm` | `form` |
| 11 | Back-to-top button | `initBackToTop` | `backToTop.showAfter` |
| 12 | Current year in the footer | `initFooterYear` | — |

`motion.respectReducedMotion` turns off features 1, 4 and the carousel's autoplay
for visitors whose device asks for less motion.

---

## Common changes

**Change a speed, limit or piece of text** — edit `js/config.js`, save, reload.
For example, set `typing.typeSpeed` to `30` to make the typing faster.

**Add an area, journey item or value** — add an object to the matching list in
`js/data.js`. Copy an existing one and change its text. The page builds the new
card or entry automatically.

Each journey item needs a `status`, and it must be one of these:

- `experience` — something she has actually done
- `developing` — something she is learning now
- `interest` — an area she studies or follows
- `ambition` — a goal, not yet achieved

Only use `experience` for things that have really happened.

**Change colours** — edit the variables at the top of `css/styles.css`
(`:root` for the light theme, `:root[data-theme="dark"]` for the dark theme).

**Change the contact email** — update both `form.recipient` in `js/config.js`
and the email link in the Contact section of `index.html`.

---

## About the contact form

There is no server. When the form is filled in correctly, it opens the visitor's
email app with the message already written, addressed to `form.recipient`.
Set `form.openMailClient` to `false` to only show the thank-you message.

---

## Put it online (optional)

Any static hosting works, because the site is only files:

- **GitHub Pages** — push the repo to GitHub, then go to
  *Settings → Pages* and choose the `main` branch, root folder.
- **Netlify Drop** — drag the project folder onto <https://app.netlify.com/drop>.

---

## Note on `dist/`

`.gitignore` lists `dist/`, so the planning notes in that folder are not saved in Git.
Remove that line from `.gitignore` if you want them tracked.
