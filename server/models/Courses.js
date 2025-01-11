const mongoose= require('mongoose');
const user = require('./user');


const CourseSchema= new mongoose.Schema({

    title:{
        type:string,
        required:true
    },
    prof_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user,
    },
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:user,
        }
    ],
    date:{
        type:Date,
        required:true
    }

});

module.exports= mongoose.model('Courses',CourseSchema)
