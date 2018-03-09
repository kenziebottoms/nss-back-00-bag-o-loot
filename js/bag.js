"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("loot.sqlite");

module.exports.add = (toy, child) => {
    return new Promise((resolve, reject) => {
        module.exports.addChild(child)
            .then(id => {
                return module.exports.addToy(toy, id);
            })
            .then(toyId => {
                resolve(toyId)
            })
            .catch(err => reject(err));
    });
};

module.exports.remove = (child, toy) => {

};

module.exports.list = (child) => {
    return [{}];
};

module.exports.delivered = (child) => {

};

module.exports.addToy = (toy, childId) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM bag WHERE toy = "${toy}" AND childId = ${childId}`, (err, data) => {
            if (err) return reject(err);
            if (data[0]) resolve(data[0].id);
        });
        db.run(`INSERT INTO bag VALUES(
            null, "${toy}", ${childId}
        )`, function(err) {
            if (err) return reject(err);
            resolve(this.lastID);
        })
    });
};

module.exports.getChildId = child => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id FROM children WHERE children.name = "${child}"`, (err, data) => {
            if (err) return reject(err);
            data[0] ? resolve(data[0].id) : reject();
        })
    });
}

module.exports.addChild = child => {
    return new Promise((resolve, reject) => {
        module.exports.getChildId(child)
            .then(id => {
                resolve(id);
            })
            .catch(err => {
                db.run(`INSERT INTO children VALUES(
                    null, "${child}", "false"
                )`, function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                });
            });
    });
};