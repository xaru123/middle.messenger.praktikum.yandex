import Handlebars from 'handlebars';

Handlebars.registerHelper('stringifyFunc', function (fn) {
  if (!fn) {
    return null;
  }
  return new Handlebars.SafeString('(' + fn.toString().replace(/\"/g, "'") + ')()');
});
