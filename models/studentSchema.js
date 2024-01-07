const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        unique : true,
        type : String,
        required : true,
    },
    collage :{
        type : String,
        required : true,
    },
    batchName :{
        type : String,
        required : true,
    },
    dsaScore :{
        type : String,
        required : true,
    },
    webDevScore :{
        type : String,
        required : true,
    },
    reactScore :{
        type : String,
        required : true,
    },
    placement :{
        type : String,
        enum: ["Placed", "No placed"],
        required : true,
    },
    interviews: [
        {
          company: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
          result: {
            type: String,
            enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
          },
        },
      ],
},
{
    timestamps : true,
});

const Student = mongoose.model("Student" , studentSchema);
module.exports = Student ;
