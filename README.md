# node-dbbuilder

## Install

```sh
$ npm install node-dbbuilder
```

## Introduction

This is a node.js module for managing you DB structure. This way you can keep you DB structure in a json file and let this module create/update your tables and fields automatically.

## Usage

```js
var fs = require('fs');
var dbbuilder = require('node-dbbuilder');

var config = JSON.parse(fs.readFileSync('./database_structure.json'));

dbbuilder.initialize("localhost","username","password","database", config);
dbbuilder.update();
```
