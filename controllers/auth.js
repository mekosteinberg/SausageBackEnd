const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

users.post('/register', async (req, res) => {
    const {email, pwd} = req.body;
    try{
        const userExists = await User.findOne({email});
        //validation
        if(userExists) {
            return res.json({err: "email is taken"});
        }
        // if (!username.trim()) {
        //     return res.json({err: "Username is required"});
        // } 
        //USERNAMES NO LONGER REQUIRED

        if(!email.trim()) {
            return res.json({err: "email is required and must be unique"});
        }
        if(pwd && pwd?.length < 6) {
            return res.json({err: "Password is required and must be at least 6 characters long"})
        }
        if (pwd && pwd?.length > 64) {
            return res.json({err: "Password must be less than 64 characters"});
        }
    } catch (err) {
        console.log('caught' + err);
    }
    
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
        
    
    // });
    
    //
    req.body.pwd = bcrypt.hashSync(req.body.pwd, bcrypt.genSaltSync(12));
    
    User.create(req.body, (err, createdUser) => {
        res.json(createdUser);
    }).catch((err)=>{
        console.log('caught ' + err);
    });
});
// });

users.get('/users', (req, res) => {
    User.find({},{email: 1} , (err, allUsers) => {
        res.json(allUsers);
    });
});


users.get("/user/:id", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.json(foundUser);
    });
});

users.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        res.json(updatedUser);
    });
})

users.post('/login', async (req, res) => {
    const { username, pwd, email } = req.body;
    if (!email || !pwd) {
        return res.json({err: 'please make sure all fields are correct'})
    }
    const user = await User.findOne({email: email});
    if(!user) {
        return res.json({err: 'User not found'});
    }
    const matchPassword = await bcrypt.compare(pwd, user.pwd);
    if(matchPassword) {
        const userSession = { email: user.email }
        req.session.user = userSession;
        return res.json({msg: 'You have logged in successfully', userSession });
    } else {
        return res.json({ err: 'Invalid Credential'});
    }
});



module.exports = users;