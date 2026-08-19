document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight the current page in the main nav
  var currentPath = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var linkPath = link.getAttribute('href').split('#')[0].split('?')[0];
    if (!linkPath) return;
    var resolved = new URL(linkPath, window.location.href).pathname.replace(/index\.html$/, '');
    if (resolved && resolved === currentPath) {
      link.classList.add('is-current');
    }
  });

});
