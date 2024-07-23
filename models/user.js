const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {type: String, require: true},
    comment: {type: String, require: true},
    //createdAt: Date,
    //updatedAt: Date 
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    blogs: [blogSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User
