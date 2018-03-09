"use strict";

const { createTable } = require("../js/createTable");
const { assert } = require("chai");
const { add, remove, list, delivered } = require("../js/bag");

describe("add()", () => {
    it("is a function", () => {
        assert.isFunction(add);
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
});
describe("delivered()", () => {
    it("is a function", () => {
        assert.isFunction(delivered);
    });
});