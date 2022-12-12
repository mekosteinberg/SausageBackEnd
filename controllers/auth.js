const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

users.post('/register', async (req, res) => {
    const {username, pwd, email} = req.body;
    try{
        const userExists = await User.findOne({email});
        //validation
        if(userExists) {
            return res.json({err: "email is taken"});
        }
        if (!username.trim()) {
            return res.json({err: "Username is required"});
        }
        if(!email.trim()) {
            return res.json({err: "email is required and must be unique"});
        }
        if(pwd && pwd?.length < 6) {
            return res.json({err: "Password is required and must be at least 6 characters long"})
        }
    } catch (err) {
        console.log(err);
    }
    
});
    
    // let userCheck = new Promise((resolve, reject) => {
    //     const existingUser = User.findOne({},{email:email}, (err, foundUser) => {
    //         if(existingUser){
    //             resolve(existingUser);
    //         } else {
    //             reject('no users found')
    //         }
    //     });
    // });

    // userCheck.then((message) => {
    //     console.log(message);
    // });

    /////////////////////////////////////////////////////////
    //////// this is what i want to happen
        
    
    //     // if (pwd && pwd?.length > 64) {
    //     //     return res.json({err: "Password must be less than 64 characters"});
    //     // }
    //     res.json({});
    // });
    
    //
    // req.body.pwd = bcrypt.hashSync(req.body.pwd, bcrypt.genSaltSync(12));
    // User.create(req.body, (err, createdUser) => {
    //     res.json(createdUser);
    //     if(err){
    //         console.log(err);
    //     }
    // });
// });

users.get('/users', (req, res) => {
    User.find({},{username: 1} , (err, allUsers) => {
        res.json(allUsers);
    });
});


users.get("/user/:username", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.json(foundUser);
    });
});

users.put('/users/:username', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        res.json(updatedUser);
    });
})



module.exports = users;