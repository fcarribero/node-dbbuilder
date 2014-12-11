var argv = require('minimist')(process.argv.slice(2));
var dbbuilder = require('../index');
var fs = require('fs');

dbbuilder.initialize(argv.h, argv.u, argv.p, argv.d, JSON.parse(fs.readFileSync('./struct.config.json')));

dbbuilder.update();
