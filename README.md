# node-dbbuilder

## Install

```sh
$ npm install node-dbbuilder
```

## Introduction

This is a module for managing the DB structure of your Node application. This way you can keep you DB structure in a json file and let this module create/update your tables and fields automatically.

Note: This is a module I made for my own usage...at first. It was intended for only manage MySQL engines, but you can contribute by helping me to make it more flexible, so we can use it with more engines. Take in mind that this module is really experimental.

## Usage

```js
var fs = require('fs');
var dbbuilder = require('node-dbbuilder');

var config = JSON.parse(fs.readFileSync('./database_structure.json'));

dbbuilder.initialize("localhost", "username", "password", "database", config);
dbbuilder.update();
```

## DB structure example

```js
{
    "driver": "mysql",
    "tables": {
        "users": {
            "fields": {
                "id": {
                    "type": "uuid",
                    "primary": true
                },
                "nickname": {
                    "type": "varchar"
                },
                "password": {
                    "type": "varchar"
                },
                "email": {
                    "type": "varchar"
                },
                "points": {
                    "type": "integer"
                }
            }
        },
        "sessions": {
            "fields": {
                "id": {
                    "type": "uuid",
                    "primary": true
                },
                "user_id": {
                    "type": "uuid"
                },
                "last_activity": {
                    "type": "datetime"
                }
            }
        }
    }
}
```

### Field types

Field type can be any of the native types of your DB engine. But there are a some "special" type that simplificate common field types.

* uuid = varchar (36)

### Field options

Actually there is currently just one option and it's "primary". It lets indicate that the field is PRIMARY KEY.