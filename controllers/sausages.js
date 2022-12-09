const express = require('express');
const sausages = express.Router();
const Sausage = require('../models/sausages.js');
const bcrypt = require('bcrypt');

//new
sausages.post('/new', (req, res) => {
    Sausage.create(req.body, (err, createdSausage) => {
        res.json(createdSausage)
        if(err){
            console.log(err)
        }
    });
});

//index
sausages.get('/', (req, res) => {
    Sausage.find({}, (err, allSausages) => {
        res.json(allSausages);
    });
});

//delete
sausages.delete('/:id', (req, res) => {
    Sausage.findByIdAndRemove(req.params.id, (err, deletedSausage) => {
        res.json(deletedSausage);
    });
});

//edit
sausages.put('/:id', (req, res) => {
    Sausage.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSausage) => {
        res.json(updatedSausage);
    });
});
module.exports = sausages;