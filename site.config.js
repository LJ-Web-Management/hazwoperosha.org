// Site settings read by tools/build.js. Courses and checkout are shared with the sister sites;
// this file, data/copy.js, data/guides.js, data/quizzes.js and assets/style.css are HazwoperOSHA.org's own.
const RED = '#c8102e';
// Shield mark: white on the red header, red in the footer.
const shield = (fill, check) => `<svg class="wm-mark" viewBox="0 0 34 38" width="30" height="34" aria-hidden="true"><path d="M17 2 32 7v11c0 9.5-6.4 15.6-15 18C8.4 33.6 2 27.5 2 18V7Z" fill="${fill}"/><path d="M10.5 19.5 15 24l9-10" fill="none" stroke="${check}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

module.exports = {
  url: 'https://www.hazwoperosha.org',
  brand: 'HazwoperOSHA.org',
  legalName: 'HAZWOPER OSHA Training LLC',
  orderFrom: 'hazwoperosha-org',
  themeColor: RED,
  shareImage: 'assets/share.png',
  sameAs: ['https://hazwoper-osha.com/'],
  // Google Analytics 4 (gtag.js). checkout.js and quiz.js send events through window.gtag.
  headExtra: '<script async src="https://www.googletagmanager.com/gtag/js?id=G-H2MZHM31RK"></script>\n'
    + '<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'G-H2MZHM31RK\');</script>\n'
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">\n',
  logo: (rel, where) => `<span class="wm">${where === 'footer' ? shield(RED, '#fff') : shield('#fff', RED)}<span class="wm-text">Hazwoper<b>OSHA</b><small>.org</small></span></span>`,
};
