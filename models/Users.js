const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    CreatedAt: String
})

module.exports = model('User', userSchema)