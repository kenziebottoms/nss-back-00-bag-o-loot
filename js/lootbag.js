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
                bag.add(args[1], args[2])
                    .then(response => {
                        console.log(response);
                    });
                break;
            case "remove":
                bag.remove(args[1], args[2])
                    .then(response => {
                        console.log();
                    });
                break;
            case "ls":
                if (args[1]) {
                    bag.list(args[1])
                        .then(list => {
                            console.log(`${args[1]}'s Toys:`);
                            console.log(`==================`);
                            list.forEach(l => console.log(l.toy));
                        });
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
                console.log("Usage:");
                console.log("\tjs/lootbag.js add [toy] [child]");
                console.log("\tjs/lootbag.js remove [child] [toy]");
                console.log("\tjs/lootbag.js ls");
                console.log("\tjs/lootbag.js ls [child]");
                console.log("\tjs/lootbag.js delivered [child]");
        }
    })
    .catch(err => {
        console.log("createTable() error", err);
    });