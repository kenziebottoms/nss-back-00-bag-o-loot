"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("loot.sqlite");

module.exports.createTable = () => {
    return new Promise((resolve, reject) => {
        db
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