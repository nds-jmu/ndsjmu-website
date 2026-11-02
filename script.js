/* =====================================================
   NDS-JMU — script.js
   =====================================================
   This file does only four small things:
     1. Marks the page as "JavaScript is on" (for CSS)
     2. Mobile menu open/close
     3. Adds a shadow to the nav once it sticks
     4. Turns the "Where Our Members Go" logos into a scrolling banner
   The whole site still works if JavaScript is disabled —
   smooth scrolling is handled by CSS, not by this file.
   ===================================================== */

// 1. Tell CSS that JavaScript is available.
//    (CSS uses this to show the mobile menu button.)
document.documentElement.classList.add("js");

// 2. Mobile menu toggle
var toggleButton = document.querySelector(".nav-toggle");
var navLinks = document.querySelector(".nav-links");

if (toggleButton && navLinks) {
  toggleButton.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggleButton.textContent = isOpen ? "CLOSE" : "MENU";
  });

  // Close the menu after tapping any link in it
  navLinks.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.textContent = "MENU";
    }
  });
}

// 3. Add a soft shadow to the nav bar once the user scrolls past the hero
var nav = document.querySelector(".site-nav");

if (nav && "IntersectionObserver" in window) {
  // A 1px invisible marker sits right above the nav; when it scrolls
  // out of view, we know the nav is "stuck" to the top.
  var marker = document.createElement("div");
  nav.parentNode.insertBefore(marker, nav);

  new IntersectionObserver(function (entries) {
    nav.classList.toggle("is-stuck", !entries[0].isIntersecting);
  }).observe(marker);
}

// 4. "Where Our Members Go" scrolling logo banner
//    Reads the logos from the <ul class="logo-list"> in index.html.
//    Up to data-row-threshold logos = one row; more = two rows that
//    scroll in opposite directions. Skipped for visitors who have
//    "reduce motion" turned on (they see a still row of logos).
var marquee = document.querySelector(".logo-marquee");
var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (marquee && !reduceMotion) {
  var logos = Array.prototype.slice.call(marquee.querySelectorAll(".logo-list li"));
  var threshold = parseInt(marquee.getAttribute("data-row-threshold"), 10) || 8;
  var SPEED = 40;   // pixels per second

  function buildMarquee() {
    marquee.querySelectorAll(".marquee-row").forEach(function (row) { row.remove(); });
    marquee.classList.remove("is-animated");
    if (logos.length === 0) return;
    var TILE = logos[0].offsetWidth + 20;  // one tile's width plus the 20px gap

    var rows = logos.length > threshold
      ? [logos.slice(0, Math.ceil(logos.length / 2)), logos.slice(Math.ceil(logos.length / 2))]
      : [logos];

    rows.forEach(function (rowLogos, index) {
      // Repeat the logos until one group is wider than the screen,
      // so the loop never shows a gap.
      var repeats = Math.max(1, Math.ceil(marquee.offsetWidth / (rowLogos.length * TILE)));
      var row = document.createElement("div");
      row.className = "marquee-row" + (index === 1 ? " is-reverse" : "");
      var track = document.createElement("div");
      track.className = "marquee-track";

      for (var copy = 0; copy < 2; copy++) {
        var group = document.createElement("ul");
        group.className = "marquee-group";
        if (copy === 1) group.setAttribute("aria-hidden", "true");  // screen readers hear each logo once
        for (var r = 0; r < repeats; r++) {
          rowLogos.forEach(function (li) {
            var clone = li.cloneNode(true);
            if (copy === 1 || r > 0) clone.setAttribute("aria-hidden", "true");
            group.appendChild(clone);
          });
        }
        track.appendChild(group);
      }
      var groupWidth = rowLogos.length * repeats * TILE;
      track.style.setProperty("--marquee-duration", Math.round(groupWidth / SPEED) + "s");
      row.appendChild(track);
      marquee.appendChild(row);
    });
    marquee.classList.add("is-animated");
  }

  buildMarquee();

  // Rebuild if the screen width changes a lot (e.g. rotating a phone)
  var lastWidth = marquee.offsetWidth, resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (Math.abs(marquee.offsetWidth - lastWidth) > 100) {
        lastWidth = marquee.offsetWidth;
        buildMarquee();
      }
    }, 250);
  });
}
