
var drivers = {
    mysql: require('./drivers/mysql')
};

var config = {};

exports.initialize = function (hostname, username, password, database, db_struct) {
    config = db_struct;
    if (!drivers[config.driver]) {
        throw new Error("DB Driver not implemented");
    }
    drivers[config.driver].initialize(hostname, username, password, database);
}

exports.update = function (table) {
    if (table === undefined) {
        for (var table in config.tables) {
            exports.update(table);
        }
    } else {
        drivers[config.driver].query("SHOW TABLES LIKE '" + table + "'", (function (table) {
            return function (rows) {
                if (rows.length > 0) {
                    for (var field in config.tables[table].fields) {
                        drivers[config.driver].query("SHOW COLUMNS FROM `" + table + "` LIKE '" + field + "'", (function (field) {
                            return function (rows) {
                                if (rows.length > 0) {
                                    exports.update_field(table, field, config.tables[table].fields[field]);
                                } else {
                                    exports.create_field(table, field, config.tables[table].fields[field]);
                                }
                            };
                        })(field));
                    }
                } else {
                    exports.create_table(table, config.tables[table]);
                }
            };
        })(table));
    }
}

exports.build_field_type = function (type, length) {
    switch (type) {
        case 'uuid':
            return 'varchar (36)';
            break;
        case 'boolean':
            return 'tinyint (1)';
            break;
        default:
            if (type === 'varchar' && !length) {
                length = 255;
            }
            return type + (length ? " (" + length + ")" : "");
    }
}

exports.create_table = function (table, data) {
    var fields = [];
    for (var field in data.fields) {
        var f = "";
        f += "`" + field + "` ";
        f += " " + exports.build_field_type(data.fields[field].type, data.fields[field].length);

        if (data.fields[field].primary) {
            f += " PRIMARY KEY";
            if (data.fields[field].type === 'int') {
                f += " AUTO_INCREMENT";
            }
        }
        f += " NOT NULL";
        fields.push(f);
    }

    drivers[config.driver].query("CREATE TABLE `" + table + "` (" + fields.join(', ') + ") ENGINE=InnoDB", function () {
        //Todo: default rows
    });
}

exports.create_field = function (table, field, data) {
    var query = "ALTER TABLE `" + table + "` ADD `" + field + "` ";
    query += exports.build_field_type(data.type, data.length);
    if (data.primary) {
        query += " PRIMARY KEY";
        if (data.type === 'int') {
            query += " AUTO_INCREMENT";
        }
    }
    query += " NOT NULL";
    drivers[config.driver].query(query, function () {
    });
}

exports.update_field = function (table, field, data) {
    var query = "ALTER TABLE `" + table + "` CHANGE `" + field + "` `" + field + "` ";
    query += exports.build_field_type(data.type, data.length);
    if (data.primary && data.type === 'int') {
        query += " AUTO_INCREMENT";
    }
    query += " NOT NULL";
    drivers[config.driver].query(query, function () {
    });
}

exports.reset = function (table) {
    if (table === undefined) {
        for (var table in config.tables) {
            exports.reset(table);
        }
    } else {
        drivers[config.driver].query("DROP TABLE `" + table + "`", function () {
            create_table(table, config.tables[table]);
        });
    }
}