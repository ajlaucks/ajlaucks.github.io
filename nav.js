/* =============================================================
   nav.js — shared across all pages
   Handles:
     1. Active link highlighting in both desktop and mobile nav
     2. Mobile burger menu open/close
     3. Mobile image carousel dot indicators
   ============================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {


    /* ── 1. ACTIVE LINK HIGHLIGHTING ─────────────────────────
       Compares the current URL path to each nav link href.
       Marks the matching link .is-active (bold in CSS).
    ──────────────────────────────────────────────────────── */

    var currentPath = window.location.pathname
      .replace(/\/$/, '')
      .replace(/\/index\.html$/, '');

    // Also derive the parent category from the URL if we're on a project page.
    // e.g. /projects/architecture/things-fall-apart.html → parent is "architecture"
    var parentCat = null;
    var projectMatch = currentPath.match(/\/projects\/([^\/]+)\//);
    if (projectMatch) parentCat = projectMatch[1]; // e.g. "architecture"

    // All nav links across desktop topnav, mobile overlay, and the site name
    var allNavLinks = document.querySelectorAll(
      '.topnav__name, .topnav__links a, .mob-nav__name, .mob-nav__links a'
    );

    allNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPath = new URL(href, window.location.href).pathname
        .replace(/\/$/, '')
        .replace(/\/index\.html$/, '');

      // Exact match — this is the current page
      if (linkPath === currentPath) {
        link.classList.add('is-active');
        return;
      }

      // Parent match — we're inside this category's project subfolder
      if (parentCat && linkPath.endsWith('/' + parentCat + '.html')) {
        link.classList.add('is-active');
      }
    });


    /* ── 2. MOBILE BURGER MENU ───────────────────────────────
       .mob-burger (fixed bar at top) toggles .mob-nav overlay.
    ──────────────────────────────────────────────────────── */

    var burger  = document.querySelector('.mob-burger');
    var mobNav  = document.querySelector('.mob-nav');
    var mobClose = document.querySelector('.mob-nav__close');

    function openNav() {
      if (!mobNav) return;
      mobNav.classList.add('is-open');
    }

    function closeNav() {
      if (!mobNav) return;
      mobNav.classList.remove('is-open');
    }

    if (burger) {
      burger.addEventListener('click', function () {
        if (mobNav.classList.contains('is-open')) {
          closeNav();
        } else {
          openNav();
        }
      });
    }

    if (mobClose) {
      mobClose.addEventListener('click', closeNav);
    }

    // Also close when a link inside the overlay is tapped
    if (mobNav) {
      mobNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeNav);
      });
    }


    /* ── 3. MOBILE CAROUSEL ──────────────────────────────────
       Watches scroll position of .proj-carousel__track and
       updates the dot indicators to show the active slide.
    ──────────────────────────────────────────────────────── */

    var track = document.querySelector('.proj-carousel__track');
    var dots  = document.querySelectorAll('.proj-carousel__dot');

    if (track && dots.length > 0) {

      function updateDots() {
        var slideWidth = track.querySelector('.proj-carousel__slide');
        if (!slideWidth) return;
        var w = slideWidth.offsetWidth + 12; // 12px gap
        var index = Math.round(track.scrollLeft / w);
        dots.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === index);
        });
      }

      // Set first dot active on load
      if (dots[0]) dots[0].classList.add('is-active');

      track.addEventListener('scroll', updateDots, { passive: true });
    }

  });

}());