const express = require('express');
const router = express.Router();
const fs = require('fs');
const usersData = require('../../users.data.json');


router.get("/all", (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        const result = usersData.slice(0, limit)
        res.send(result)
    } else {
        res.send(usersData)
    }
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

// Saving data

router.post("/save", (req, res) => {
    const newUser = req.body;
    newUser.index = usersData.length;
    fs.readFile("users.data.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const users = JSON.parse(data);
            users.push(newUser);
            fs.writeFile("users.data.json", JSON.stringify(users, null, 2), (err) => {
                console.log(err)
            })
        }
    })
    res.send("Data Saved!");
})

// Updating data but a error is deleting all data

router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, gender, contact, address, photoUrl } = req.body;
    fs.readFile("users.data.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            res.send("internal error 1st")
        }
        else {
            const users = JSON.parse(data);            
            const updateData = users.find(user => user._id == id);
            if (updateData) {
                    updateData.name = name;                
                    updateData.gender = gender;               
                    updateData.contact = contact;               
                    updateData.address = address = address;                
                    updateData.photoUrl = photoUrl;
                }

            fs.writeFile("users.data.json", JSON.stringify(users, null, 2), (err) => {
                console.log(err)
                res.send("Data Updated!")
            })
        }
    })
})


// Delete Operation Successfully


router.delete("/:id", (req, res) => {
    const id = req.params.id;  
    fs.readFile("users.data.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let users = JSON.parse(data);
            users = users.filter(user =>  user._id !== id);            
            fs.writeFile("users.data.json", JSON.stringify(users, null, 2), (err) => {
                //console.log(err);                
            });
        }
    })
    res.send("Data Deleted!");
})


module.exports = router;