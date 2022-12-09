/* I’m thinking 
Image on top, 
Type of brat, 
description and thoughts, 
then ratings on the bottom. */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sausageSchema = new Schema ({
    image: String,
    type: {type: String, required: true},
    description: {type: String},
    ratings: {type: Number}
});

const sausages = mongoose.model('Sausage', sausageSchema);
module.exports = sausages;