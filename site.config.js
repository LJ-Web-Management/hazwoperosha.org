// Site settings read by tools/build.js. Courses, guides, quizzes and checkout are shared with the
// sister sites; this file and assets/style.css give HazwoperOSHA.org its own identity.
module.exports = {
  url: 'https://lj-web-management.github.io/hazwoperosha.org',
  brand: 'HazwoperOSHA.org',
  legalName: 'HAZWOPER OSHA Training LLC',
  orderFrom: 'hazwoperosha-org',
  themeColor: '#0f2742',
  shareImage: 'assets/share.png',
  sameAs: ['https://hazwoper-osha.com/'],
  headExtra: '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Source+Sans+3:wght@400;600;700&display=swap">\n',
  logo: () => `<span class="wm"><svg class="wm-mark" viewBox="0 0 34 38" width="34" height="38" aria-hidden="true"><path d="M17 2 32 7v11c0 9.5-6.4 15.6-15 18C8.4 33.6 2 27.5 2 18V7Z" fill="#0f766e"/><path d="M10.5 19.5 15 24l9-10" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="wm-text">Hazwoper<b>OSHA</b><small>.org</small></span></span>`,
};
