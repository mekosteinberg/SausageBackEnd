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

//Seed
sausages.get('/data/seed', (req,res) => {
    Sausage.create(
        [
            {
                image: '',
                type: 'Firecracker',
                description: 'an explosion of flavor, zing!',
                ratings: 3
            },
            {
                image: '',
                type: 'Queso With Pepper Jack Cheese',
                description: 'Cheesy BOOOOI',
                ratings: 4.5
            },
            {
                image: '',
                type: 'Blackened Cajun & Cheddar',
                description: 'different but good',
                ratings: 3.5
            },
            {
                image: '',
                type: 'Beer \'n Brats',
                description: 'yummy',
                ratings: 4.5
            },
            {
                image: '',
                type: 'Jalapeno & Cheddar',
                description: 'the best',
                ratings: 5
            }
        ]
    )
})
module.exports = sausages;