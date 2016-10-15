var fs = require('fs');

// Read and eval library
filedata = fs.readFileSync('./node_modules/qi/messaging.js','utf8');
eval(filedata);

/* The quadtree.js file defines a class 'QuadTree' which is all we want to export */

exports.session = QiSession;
