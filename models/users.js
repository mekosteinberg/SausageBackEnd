const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type: String, required: false, unique: false, trim: true},
    email: {type: String, required: true, unique:true, lowercase: true, trim: true},
    pwd:{type: String, required: true, min: 6, max: 64, trime: true},
    role: {type: String, default: 'user'},
    resetCode: "",
}, { timestamps: true });

const users = mongoose.model('User', userSchema);
module.exports = users;