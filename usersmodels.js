const mongoose = require("mongoose")

const UsersSchema = mongoose.Schema({

    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    // durationInMonths: {
    //     type: Number,
    //     required: true,
    //     default: 6,
    // },
},{ timeStamp: true })
 
const UsersModel = mongoose.model("Users", UsersSchema)

module.exports = UsersModel;