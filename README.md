# broccoli-scheme

is an experimental tool that allows to declare [broccoli](https://github.com/broccolijs/broccoli)
trees using Scheme programming language instead of Javascript.

## Example

broccoli-scheme does not alter broccoli plugins APIs, it just wrappes bare
plugin modules in scheme procedures. The resulting APIs may look crude and
will probably be changed in the future.

Currently to try out broccoli-scheme you may create something like follows:

Brocfile.js
```javascript
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

var Scheme = require('broccoli-scheme');

var scheme = new Scheme({
  "funnel": Funnel,
  "merge-trees": MergeTrees
});

module.exports = scheme.loadTree('Brocfile.scm');
```

Brocfile.scm
```scheme
(merge-trees (vector (funnel "tests"
                             '(("include" . #("*.js"))
                               ("exclude" . #("xxx.js"))))
                     (funnel "src"))
             '(("overwrite" . #t)))
```

above tree declared in Javascript may look like this:
```javascript
var testTree = new Funnel("tests", {
  include: ["*.js"],
  exclude: ["somefile.js"]
});
var srcTree = new Funnel("src");
var trees = new MergeTree([testTree, srcTree], {
  overwrite: true
});
module.exports = trees;
```

## Motivation

The structure of typical Brocfile looks like this:
* broccoli plugin imports
* decalation of input nodes (watched and unwatched dirs)
* "classification" funnels - preparing trees for upcoming transformations
* higher order trees - that "do the job" like transpilers
* restructurization funnels and tree merges
* final trasformations like file concatenation, uglification
* final tree merge - that defines output tree structure

Such structure may be highly organized but in fact only the final tree
declaration has a more or less fixed place in a Brocfile as it probably is
created around `module.exports`. All other "layers" can and often are
overlapping each other, which makes Brocfile hard to read.

As Broccoli operates on trees of files, it make sense for me to declare entire
structure as one big tree. Using Scheme/LISP for this purpose seems just about
right as the nature of the language should be supporting the nature of Broccoli.

With broccoli-scheme I'm trying to figure out if Brocfiles can be organized in
more meaningul way. Currently core ideas are:
* top-down tree declaration
* avoiding variables and conditionals
* separation tooling code from tree structure

## License

MIT
