/* =====================================================
   NDS-JMU — script.js
   =====================================================
   This file does only three small things:
     1. Marks the page as "JavaScript is on" (for CSS)
     2. Mobile menu open/close
     3. Adds a shadow to the nav once it sticks
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
