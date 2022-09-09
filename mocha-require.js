const {JSDOM} = require('jsdom');

const dom = new JSDOM('<div class="root" id="#root"><div>', {url: 'http://localhost'});
global.window = dom.window;
global.document = dom.window.document;
