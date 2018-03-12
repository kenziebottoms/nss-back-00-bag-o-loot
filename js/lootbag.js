#!/usr/bin/env node

"use strict";

const { createTable } = require("./createTable");
const bag = require("./bag");

createTable()
    .then(response => {
        
        const [,,...args] = process.argv;

        let command = args[0];

        switch (command) {
            case "add":
                bag.add(args[1], args[2]);
                break;
            case "remove":
                bag.remove(args[1], args[2]);
                break;
            case "ls":
                if (args[2]) {
                    bag.list(args[1], args[2]);
                } else {
                    bag.listAll();
                }
                break;
            case "delivered":
                // TODO: delivered [child]
                break;
            default:
                console.log(`Usage:\n\t./lootbag.js [add, remove, ls, delivered] [params]`);
        }
    })
    .catch(err => {
        console.log("createTable() error", err);
    });