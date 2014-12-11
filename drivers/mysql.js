var mysql = require('mysql');

var db = null;
var config = {
    reconnect: false
};

exports.initialize = function (hostname, username, password, database) {
    config.hostname = hostname;
    config.username = username;
    config.password = "" + password;
    config.database = database;
};

exports.connect = function (callback) {
    db = mysql.createConnection({
        host: config.hostname,
        user: config.username,
        password: config.password,
        database: config.database
    });
    db.connect(function (err) {
        if (err) {
            if (config.reconnect) {
                setTimeout(function () {
                    exports.connect(callback);
                }, 5000);
            } else {
                throw err;
            }
        } else {
            callback();
        }
    });
};

var db_timeout;
exports.query = function (query, options, callback) {
    if (typeof (options) === 'function') {
        callback = options;
        options = null;
    }
    if (!db || db.destroyed) {
        exports.connect(function () {
            exports.query(query, options, callback);
        });
    } else {
        db.query(query, options, function (error, result) {
            if (error) {
                throw error;
            }
            callback(result);
        });
    }
    clearTimeout(db_timeout);
    db_timeout = setTimeout(function () {
        exports.close();
    }, 1000);
};

exports.close = function () {
    db.end();
    db.destroyed = true;
};
