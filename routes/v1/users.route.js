const express = require('express');
const router = express.Router();
const fs = require('fs');
const usersData = require('../../users.data.json');


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
    newUser.index = usersData.length;    
    fs.readFile("users.data.json" , "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const users = JSON.parse(data);
            users.push(newUser);
            fs.writeFile( "users.data.json" , JSON.stringify(users, null, 2), (err) => {
                console.log(err)
            })
        }
    })
    res.send("Data Saved!");
})

router.patch ('/update/:id', (req, res)=> {
    const {id} = req.params;
    const {name, gender, contact, address, photoUrl} = req.body;

    console.log(id)

    const updateData = usersData.find(user => user._id == id);

    JSON.parse(updateData)

    updateData.name = name;
    updateData.gender = gender;
    updateData.contact = contact;
    updateData.address = address;
    updateData.photoUrl = photoUrl;

    res.send("Data updated!")  
})

module.exports = router;