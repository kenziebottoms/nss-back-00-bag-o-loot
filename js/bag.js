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

// removes from bag the given toy belonging to the given child
// rejects if the toy doesn't exist
module.exports.remove = (child, toy) => {
    return new Promise((resolve, reject) => {
        module.exports.getToy(toy, child)
            .then(toyId => {
                return deleteToy(toyId);
            })
            .catch(err => console.log("this toy doesn't exist"));
    });
};

module.exports.list = (child) => {
    return new Promise((resolve, reject) => {
        module.exports.getChildId(child)
            .then(childId => {
                db.all(`SELECT * FROM bag
                        WHERE childId = ${childId}`,
                    (err, data) => {
                        if (err) return reject(err);
                        if (data[0]) {
                            resolve(data);
                        } else {
                            reject("No results");
                        }
                    });
            })
            .catch(err => reject(err));
    });
    return [{}];
};

// returns list of children who are receiving gifts
module.exports.listAll = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT c.name FROM children c
                JOIN bag b
                    ON b.childId = c.id
                GROUP BY c.name`,
            (err, data) => {
                if (err) return reject(err);
                if (data[0]) {
                    resolve(data);
                } else { reject() }
            });
    });
};

module.exports.delivered = (child) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT bag`)
    });
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

// resolves id of given child name if child exists
// rejects if child doesn't exist
module.exports.getChildId = child => {
    return new Promise((resolve, reject) => {
        let id = parseInt(child);
        if (id == id) {
            resolve(id);
        } else {
            db.all(`SELECT id FROM children WHERE children.name = "${child}"`, (err, data) => {
                if (err) return reject(err);
                data[0] ? resolve(data[0].id) : reject();
            })
        }
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
                    null, "${child}", "false", "false"
                )`, function (err) {
                        if (err) return reject(err);
                        resolve(this.lastID);
                    });
            });
    });
};

// returns id of the toy belonging to child
// rejects if none
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
                            reject("No results");
                        }
                    });
            })
            .catch(err => reject(err));
    });
};  

// removes given index of bag table
module.exports.deleteToy = toyId => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM bag WHERE id = ${toyId}`, function(err) {
            if (err) {
                return reject(err);
            } else {
                resolve(toyId);
            }
        });
    });
};