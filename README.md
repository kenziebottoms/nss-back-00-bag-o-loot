# Bag o' Loot

![](https://img.shields.io/badge/modularity-node-green.svg)
![](https://img.shields.io/badge/mvp-working-green.svg)
![](https://img.shields.io/badge/testing-chai+mocha-a40802.svg)

### Run locally

```bash
git clone git@github.com:kenziebottoms/nss-back-01-bag-o-loot.git
cd nss-back-01-bag-o-loot
./lootbag.js ...
```

---

You have an acquaintance whose job is to, once a year, delivery presents to the best kids around the world. They have a problem, though. There are so many good boys and girls in the world now, that their old paper accounting systems just don't cut it anymore. They want you to write a program that will let them do the following tasks.

- [x] Add a toy to the bag o' loot, and label it with the child's name who will receive it.

    ```bash
    ./lootbag.js add kite suzy
    ./lootbag.js add baseball michael
    ```

- [x] Remove a toy from the bag o' loot in case a child's status changes before delivery starts.

    ```bash
    ./lootbag.js remove suzy kite
    ./lootbag.js remove michael baseball
    ```

- [x] Produce a list of children currently receiving presents.

    ```bash
    ./lootbag.js ls
    ```

- [x] List toys in the bag o' loot for a specific child.

    ```bash
    ./lootbag.js ls suzy
    ```

- [x] Specify when a child's toys have been delivered.

    ```bash
    ./lootbag.js delivered suzy
    ```

## Requirements

**Write a test before you write implementation code**

- [x] Items can be added to bag.
- [x] Items can be removed from bag, per child only. Removing a ball from the bag should not be allowed. A child's name must be specified.
- [x] Must be able to list all children who are getting a toy.
- [x] Must be able to list all toys for a given child's name.
- [x] Must be able to set the `delivered` property of a child, which defaults to `false`.

## Bonus Features

- [x] Write a help response that lists all of the possible arguments, and what they do.
- [ ] Create a shortcut for removing all toys from the bag for a child who has been deemed naughty.