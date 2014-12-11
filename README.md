# node-dbbuilder

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]

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

[npm-image]: https://img.shields.io/npm/v/mysql.svg?style=flat
[npm-url]: https://npmjs.org/package/node-dbbuilder
[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_0.6-brightgreen.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[downloads-image]: https://img.shields.io/npm/dm/node-dbbuilder.svg?style=flat
[downloads-url]: https://npmjs.org/package/node-dbbuilder
