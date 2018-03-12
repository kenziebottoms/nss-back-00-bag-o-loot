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
                    bag.listAll()
                        .then(response => {
                            console.log("All Children receiving gifts");
                            console.log("============================");
                            response.forEach(r => console.log(r.name));
                        });
                }
                break;
            case "delivered":
                bag.delivered(args[1]);
                break;
            default:
                console.log(`Usage:\n\tjs/lootbag.js [add, remove, ls, delivered] [params]`);
        }
    })
    .catch(err => {
        console.log("createTable() error", err);
    });