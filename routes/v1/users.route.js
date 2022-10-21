const express = require('express');
const router = express.Router();
const usersData = require("../../utils/data/users.data.json");
const usersData2 = require("../../data.json");
const fs = require('fs');

router.get("/all", (req, res) => {
    res.send(usersData)
})

// get random user

router.get("/random", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 14);
    const randUser = usersData.find(user => user.index == randomNumber)
    res.send(randUser);
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const find = usersData.find(user => user.index == id);
    res.send(find)
})

router.post("/save", (req, res) => {
    const newUser = req.body;
    const insertUser = usersData.push(newUser);
    res.send(insertUser);
})


router.post("/post", (req, res) => {
    const newUser = JSON.stringify(req.body);
    fs.writeFile('data.json', newUser, (err) => {
        console.log("Error to save data", err)
    })
    res.send("Data Saved");
})


router.post("/postt", (req, res) => {
    const newUser = req.body;
    console.log(newUser)

    fs.readFile('data.json', "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const users = JSON.parse(data);
            users.push(newUser);
            fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
                console.log(err)
            })
        }
    })

    res.send(usersData2);
})





module.exports = router;