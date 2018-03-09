#!/usr/bin/env node

"use strict";

const { createTable } = require("./createTable");

createTable()
    .catch(err => {
        console.log("createTable() error", err);
    });

const [,,...args] = process.argv;

let command = args[0];

switch (command) {
    case "add":
        // TODO: add [toy] [child]
        break;
    case "remove":
        // TODO: remove [child] [toy]
        break;
    case "ls":
        // TODO: ls
        // TODO: ls [child]
        break;
    case "delivered":
        // TODO: delivered [child]
        break;
    default:
        console.log(`Usage:\n\t./lootbag.js [add, remove, ls, delivered] [params]`);
}