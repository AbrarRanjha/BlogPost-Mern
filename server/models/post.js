const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        // required:true,
    },
    picture:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
        // required:true,
    },
    categories:{
        type:Array,
        // required:true,
    },
    createdDate:{
        type:Date,
        default:Date.now
        
    },
})
const post= mongoose.model('post',PostSchema);
module.exports=post;