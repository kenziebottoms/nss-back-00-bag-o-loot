"use strict";

const { createTable } = require("../js/createTable");
const { assert } = require("chai");
const { add, remove, list, delivered,
        addToy, getChildId, addChild,
        getToy, deleteToy, listAll } = require("../js/bag");

describe("main fnality", () => {
    describe("add()", () => {
        it("is a function", () => {
            assert.isFunction(add);
        });
        it("should add a toy with child_id attached to bag", () => {
            add("zombie doll", "Melanie")
                .then(toyId => {
                    assert.isNumber(toyId);
                });
        });
    });
    describe("remove()", () => {
        it("is a function", () => {
            assert.isFunction(remove);
        });
    });
    describe("list()", () => {
        it("is a function", () => {
            assert.isFunction(list);
        });
        it("returns an array of objects", () => {
            list("Melanie")
                .then(toys => {
                    assert.isArray(toys);
                    assert.isObject(toys[0]);
                })
                .catch(err => console.log("list()", err));
        });
        it("returns the right objects", () => {
            Promise.all([
                add("Buzz", "Andy"),
                add("Woody", "Andy")
            ])
                .then(ids => {
                    list("Andy")
                        .then(toys => {
                            assert.equal(toys.length, 2);
                        })
                        .catch(err => console.log("list()", err));
                })
        });
    });
    describe("listAll()", () => {
        it("is a function", () => {
            assert.isFunction(listAll);
        });
        it("doesn't return children with no toys", () => {
            listAll()
                .then(response => {
                    assert.equal(response.indexOf("Mary"), -1);
                })
                .catch(err => console.log("listAll()", err));
        });
    });
    describe("delivered()", () => {
        it("is a function", () => {
            assert.isFunction(delivered);
        });
    });
});

describe("helper fns", () => {
    describe("addToy()", () => {
        it("is a function", () => {
            assert.isFunction(addToy);
        });
        it("returns a promise", () => {
            assert.typeOf(addToy("ball",4), "promise");
        });
        it("resolves into a number", () => {
            addToy("ball", 4)
                .then(response => {
                    assert.isNumber(response);
                })
                .catch(err => {
                    console.log("addToy() error",err);
                });
        });
        it("doesn't create duplicates", () => {
            let first, second;
            addToy("flying carpet", 6)
                .then(response => {
                    first = response;
                    return addToy("flying carpet", 6);
                })
                .then(response => {
                    second = response;
                    assert.equal(first, second);
                })
                .catch(err => {
                    console.log("addToy() err", err);
                });
        });
    });
    describe("getChildId()", () => {
        it("should return a number", () => {
            getChildId("Millie")
                .then(id => {
                    assert.isNumber(id);
                })
                .catch(err => console.log("getChildId() error", err));
        });
        it("Millie should have ID 4", () => {
            getChildId("Millie")
                .then(id => {
                    assert.equal(id, 4);
                })
                .catch(err => {
                    console.log("getChildId() error", err);
                });
        });
        it("A name with no correspondent in the DB should need catching", () => {
            getChildId("David")
                .then(id => {
                    assert.equal(1,0);
                })
                .catch(err => {
                    assert.equal(1,1);
                });
        });
        it("should return the id if it's given an id", () => {
            getChildId(4)
                .then(id => {
                    assert.equal(id, 4);
                })
                .catch(err => {
                    assert.equal(1, 0);
                });
        });
    });
    describe("addChild()", () => {
        it("is a function", () => {
            assert.isFunction(addChild);
        });
        it("returns a promise", () => {
            assert.typeOf(addChild("Danny"), "promise");
        });
        it("resolves into a number", () => {
            addChild("Mary")
                .then(response => {
                    assert.isNumber(response);
                })
                .catch(err => {
                    console.log("addChild() err", err);
                });
        });
        it("doesn't create duplicates", () => {
            let first, second;
            addChild("Mary")
                .then(response => {
                    first = response;
                    return addChild("Mary");
                })
                .then(response => {
                    second = response;
                    assert.equal(first, second);
                })
                .catch(err => {
                    console.log("addChild() err", err);
                });
        });
    });
    describe("getToy()", () => {
        it("is a fn", () => {
            assert.isFunction(getToy);
        });
        it("getToy('zombie doll', 'Melanie') should return a toy", () => {
            getToy("zombie doll", "Melanie")
                .then(toyId => {
                    assert.equal(1,1);
                })
                .catch(err => {
                    assert.equal(0,1);
                });
        });
    });
    describe("deleteToy()", () => {
        it("is function", () => {
            assert.isFunction(deleteToy);
        });
        it("deletes a toy", () => {
            addToy("iCat", 7)
                .then(toyId => {
                    deleteToy(toyId)
                        .then(response => {
                            getToy("iCat", "Mary")
                                .then(response => {
                                    assert.equal(0,1);
                                })
                                .catch(err => {
                                    assert.equal(1,1);
                                });
                        })
                        .catch(err => console.log("deleteToy()",err));
                });
        });
        it("rejects if a toy doesn't exist", () => {
            deleteToy("whatever",9)
                .then(response => {
                    assert.equal(0,1);
                })
                .catch(err => {
                    assert.equal(1,1);
                });
        });
    });

});