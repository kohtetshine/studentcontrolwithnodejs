const mongoose = require("mongoose")

var studentSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:'This Field is required'
    },
    email:{
        type: String,
        required:'This Field is required'
    },
    mobile:{
        type: Number,
        required:'This Field is required'
    },
    city:{
        type: String,
        required:'This Field is required'
    },
})

mongoose.model('Student', studentSchema);