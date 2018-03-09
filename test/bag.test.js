"use strict";

const { createTable } = require("../js/createTable");
const { assert } = require("chai");
const { add, remove, list, delivered,
        addToy, getChildId, addChild } = require("../js/bag");

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
            let ls = list();
            assert.isArray(ls);
            assert.isObject(ls[0]);
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
            assert.typeOf(addToy("ball",1), "promise");
        });
        it("resolves into a number", () => {
            addToy("ball", 1)
                .then(response => {
                    assert.isNumber(response);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe("getChildId()", () => {
        it("should return a number", () => {
            getChildId("Millie")
                .then(id => {
                    assert.isNumber(id);
                })
                .catch(err => console.log(err));
        });
        it("Millie should have ID 1", () => {
            getChildId("Millie")
                .then(id => {
                    assert.equal(id, 1);
                })
                .catch(err => {
                    console.log(err);
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
    });
});