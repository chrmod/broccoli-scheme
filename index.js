var BiwaScheme = require("biwascheme");

function Scheme(deps) {
  Object.keys(deps).forEach(function (fnName) {
    BiwaScheme.define_libfunc(fnName, 1, 2, function (args) {
      var options;
      if (args[1]) {
        options = BiwaScheme.alist_to_js_obj(args[1]);
      }
      return new deps[fnName](args[0], options);
    });
  });
}

Scheme.prototype.loadTree = BiwaScheme.run_file;

module.exports = Scheme;
