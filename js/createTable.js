"use strict";

const sqlite3 = require("sqlite3").verbose();

module.exports.db = new sqlite3.Database("loot.sqlite", () => {
    createTable()
        .then(data => {
        })
        .catch(err => console.log("createTable() err", err));
});

const createTable = () => {
    return new Promise((resolve, reject) => {
        module.exports.db
            .run(`DROP TABLE IF EXISTS children`, (err) => {
                if (err) {
                    console.log("children dropping error", err);
                    return reject(err);
                }
                resolve();
            })
            .run(`DROP TABLE IF EXISTS toys`, (err) => {
                if (err) {
                    console.log("toys dropping error", err);
                    return reject(err);
                }
                resolve();
            })
            .run(`CREATE TABLE IF NOT EXISTS children(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                naughty BOOLEAN
            )`, (err) => {
                if (err) {
                    console.log("children table creation error", err);
                    return reject(err);
                }
                resolve();
            })
            .run(`CREATE TABLE IF NOT EXISTS toys(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            )`, (err) => {
                if (err) {
                    console.log("toy table creation error", err);
                    return reject(err);
                }
                resolve();
            });
    });
};