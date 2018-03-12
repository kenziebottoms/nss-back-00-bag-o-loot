"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("loot.sqlite");

// add child; add toy under child.id
// return toy.id
module.exports.add = (toy, child) => {
    return new Promise((resolve, reject) => {
        module.exports.addChild(child)
            .then(childId => {
                return module.exports.addToy(toy, childId);
            })
            .then(toyId => {
                resolve(toyId)
            })
            .catch(err => reject(err));
    });
};

module.exports.remove = (child, toy) => {
    // return new Promise((resolve, reject) => {
    //     module.exports.getChildId(child)
    //         .then(childId => {
    //             deleteToy(toy, childId);
    //         })
    //         .catch(err => reject(err));
    // });
};

module.exports.list = (child) => {
    return [{}];
};

module.exports.delivered = (child) => {

};

// check if child already owns toy; if not, add toy under childId
// returns toy.id
module.exports.addToy = (toy, childId) => {
    return new Promise((resolve, reject) => {
        module.exports.getToy(toy, childId)
            .then(toyId => {
                resolve(toyId);
            })
            .catch(err => {
                db.run(`INSERT INTO bag VALUES(
                        null, "${toy}", ${childId}
                    )`, function (err) {
                        if (err) return reject(err);
                        resolve(this.lastID);
                    })
            });
    });
};

// resolves id of given child name if child exists; if not, rejects
module.exports.getChildId = child => {
    return new Promise((resolve, reject) => {
        if (parseInt(child)) {
            resolve(+child);
        }
        db.all(`SELECT id FROM children WHERE children.name = "${child}"`, (err, data) => {
            if (err) return reject(err);
            data[0] ? resolve(data[0].id) : reject();
        })
    });
}

// checks if child already exists; if not, add child
// returns child.id
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

// returns id of the toy belonging to child
module.exports.getToy = (toy, child) => {
    return new Promise((resolve, reject) => {
        module.exports.getChildId(child)
            .then(childId => {
                db.all(`SELECT * FROM bag
                        WHERE childId = ${childId}
                        AND toy = "${toy}"`,
                    (err, data) => {
                        if (err) return reject(err);
                        if (data[0]) {
                            resolve(data[0].id);
                        } else {
                            reject();
                        }
                    });
            })
            .catch(err => reject(err));
    });
};