const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { request } = require('express')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    passwordHash: { type: String, required: true},
}, {timestamps: true, versionKey: false})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.passwordHash)
}

module.exports = mongoose.model('User', userSchema)