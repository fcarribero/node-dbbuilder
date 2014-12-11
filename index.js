#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var dbbuilder = require('./lib/dbbuilder');
var fs = require('fs');
if (!argv._[0] || !argv.u || !argv.p || !argv.d) {
    console.log('Usage: dbbuilder [-h <host>] -u <username> -p <password> <DB structure filepath  q>');
    process.exit();
}
if(!argv.h){
    argv.h = "localhost";
}

dbbuilder.initialize(argv.h, argv.u, argv.p, argv.d, JSON.parse(fs.readFileSync(argv._[0])));

dbbuilder.update();
