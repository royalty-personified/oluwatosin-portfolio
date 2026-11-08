/*
 * config.js — every setting you might want to change, in one place.
 *
 * main.js reads these values. Change a value here, save, and reload the page
 * to see the different behaviour. Each value has a comment saying what it does.
 */
const CONFIG = {
  // 1. Typing effect in the hero section
  typing: {
    phrases: [
      "a multidisciplinary thinker.",
      "the founder of Tef Studio.",
      "a creative entrepreneur.",
      "curious about policy & governance.",
      "learning data science.",
    ],
    typeSpeed: 80, // milliseconds between each letter being typed
    deleteSpeed: 40, // milliseconds between each letter being deleted
    pauseAfterWord: 1600, // how long a finished phrase stays on screen
    pauseBeforeNext: 400, // short wait after deleting, before the next phrase
    loop: true, // false = stop on the last phrase instead of starting again
  },

  // 2 + 5. Navigation menu and smooth scrolling
  nav: {
    closeOnLinkClick: true, // close the phone menu after a link is tapped
    offset: 72, // pixels left above a section after scrolling to it (header height)
  },
  scroll: {
    behavior: "smooth", // "smooth" glides to the section, "auto" jumps instantly
  },

  // 3. Light / dark theme
  theme: {
    default: "system", // "system" follows the device setting, or force "light" / "dark"
    storageKey: "ot-theme", // name used to remember the visitor's choice in localStorage
  },

  // Motion preference (affects features 1, 4 and 9)
  motion: {
    respectReducedMotion: true, // true = turn animations off for visitors who ask for less motion
  },

  // 4. Scroll reveal animations
  reveal: {
    threshold: 0.15, // how much of an element (0–1) must be visible before it animates in
    staggerDelay: 90, // milliseconds between items in the same group appearing
    once: true, // false = items hide again when scrolled out of view, and re-animate
  },

  // 6. Scroll progress bar at the top of the page
  progress: {
    color: "", // any CSS colour, e.g. "#2D5C86". Empty = use the site's accent colour
    height: 3, // thickness of the bar in pixels
  },

  // 7. Area cards filter
  filters: {
    defaultFilter: "all", // which filter is selected on load: "all", "think", "create" or "build"
  },

  // 8. Journey timeline filter
  journey: {
    defaultFilter: "all", // "all", "experience", "developing", "interest" or "ambition"
  },

  // 9. Values carousel
  carousel: {
    interval: 5000, // milliseconds each value is shown before moving to the next
    autoplay: true, // false = only move when the visitor clicks next / previous
    pauseOnHover: true, // pause while the mouse is over the carousel or it has keyboard focus
  },

  // 10. Contact form validation
  form: {
    minNameLength: 2, // shortest name accepted
    minMessageLength: 20, // shortest message accepted, in characters
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // rule an email address must match
    recipient: "evelynfalodu@gmail.com", // where messages are addressed
    openMailClient: true, // true = open the visitor's email app with the message filled in
    messages: {
      required: "This field is required.",
      name: "Please enter your name.",
      email: "Please enter a valid email address, like name@example.com.",
      message: "Please write at least {min} characters.",
      fixErrors: "Please fix the highlighted fields.",
      success: "Thank you, {name}. Your email app should open with your message ready to send.",
    },
  },

  // 11. Back-to-top button
  backToTop: {
    showAfter: 600, // pixels scrolled down before the button appears
  },
};
