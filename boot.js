// boot.js — loads JSON content files, builds the nav, then renders the page.
// You should never need to edit this file.
//
// Each page declares what it needs *before* this script runs, e.g.:
//   <script>
//     window.PAGE_NEEDS = ['bio', 'publications', 'wip'];
//     window.initPage   = function () { renderPublications('publications'); };
//   </script>
//   <script src="boot.js"></script>

(function () {
  function load(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Could not load ' + url);
      return r.json();
    });
  }

  var needs = window.PAGE_NEEDS || [];
  var has   = function (k) { return needs.indexOf(k) > -1; };

  // Nav + front-page data always loaded.
  var keys = ['nav'];
  var jobs = [load('data/nav.json')];
  function want(key, file) { if (has(key)) { keys.push(key); jobs.push(load('data/' + file)); } }

  want('frontpage',    'front-page.json');
  want('publications', 'publications.json');
  want('wip',          'wip.json');
  want('bio',          'research-bio.json');
  want('talks',        'talks.json');
  want('teaching',     'teaching.json');
  want('workshops',    'workshops.json');
  want('cv',           'cv.json');

  Promise.all(jobs).then(function (results) {
    var data = {};
    keys.forEach(function (k, i) { data[k] = results[i]; });

    // Nav globals
    var nav = data.nav || {};
    window.NAV_ITEMS     = nav.items      || [];
    window.NAV_WORKSHOPS = nav.workshops  || [];
    window.NAV_TEACHING  = nav.teaching   || [];

    // Content globals
    if (data.frontpage)    window.FRONT_PAGE   = data.frontpage;
    if (data.publications) window.PUBLICATIONS = data.publications.items || data.publications;
    if (data.wip)          window.WIP          = data.wip.items || data.wip;
    if (data.bio)          window.RESEARCH_BIO = data.bio.text || '';
    if (data.bio)          window.RESEARCH_BIO_JUSTIFY = data.bio.justify || false;
    if (data.talks)        window.TALKS        = data.talks.items || data.talks;
    if (data.teaching)     window.TEACHING     = data.teaching.items || data.teaching;
    if (data.workshops)    window.WORKSHOPS    = data.workshops.items || data.workshops;
    if (data.cv)           window.CV_DATA      = data.cv;

    if (typeof buildNav   === 'function') buildNav();
    if (typeof window.initPage === 'function') window.initPage();

    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }).catch(function (err) {
    console.error('Failed to load site data:', err);
  });
})();
