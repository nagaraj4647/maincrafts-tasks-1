document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile hamburger menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  function closeMobileMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  function toggleMobileMenu() {
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  }

  navToggle.addEventListener('click', toggleMobileMenu);

  /* Close mobile menu when a plain nav link is tapped */
  primaryNav.querySelectorAll('.nav-link:not(.dropdown-trigger)').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });
  primaryNav.querySelectorAll('.dropdown-menu a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- Services dropdown ---------- */
  var dropdownItem = document.querySelector('.has-dropdown');
  var dropdownTrigger = document.getElementById('servicesTrigger');

  function isMobile() {
    return window.matchMedia('(max-width: 760px)').matches;
  }

  function openDropdown() {
    dropdownItem.classList.add('open');
    dropdownTrigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdownItem.classList.remove('open');
    dropdownTrigger.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    var isOpen = dropdownItem.classList.contains('open');
    if (isOpen) { closeDropdown(); } else { openDropdown(); }
  }

  /* Click / keyboard toggle works on both desktop and mobile */
  dropdownTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleDropdown();
  });

  /* Desktop: open on hover too, for a smoother feel */
  dropdownItem.addEventListener('mouseenter', function () {
    if (!isMobile()) openDropdown();
  });
  dropdownItem.addEventListener('mouseleave', function () {
    if (!isMobile()) closeDropdown();
  });

  /* Close dropdown on outside click */
  document.addEventListener('click', function (e) {
    if (!dropdownItem.contains(e.target)) closeDropdown();
  });

  /* Close dropdown on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown();
      closeMobileMenu();
    }
  });

  /* Reset menu/dropdown state on resize across the mobile breakpoint */
  window.addEventListener('resize', function () {
    if (!isMobile()) {
      closeMobileMenu();
    }
  });

});
