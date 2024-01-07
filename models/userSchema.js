const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    name :{
        type : String,
        required : true,
    },
    email : {
        type : String ,
        unique : true,
        required : true,
    },
    
    password :{
        type : String,
        required: true
    },
    idNo :{
        type : String,
        required: true,
        unique : true
    },
    
    company :{
        type : String,
        required: true,

    }
 
},
{
    timestamps : true
}
)


const User = mongoose.model("User" , userSchema)

module.exports = User;