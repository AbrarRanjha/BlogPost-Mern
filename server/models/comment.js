const mongoose=require('mongoose');

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
      
    },
    postId: {
        type: String,
      
    },
    date: {
        type: String,
     
    },
    comments: {
        type: String,
        required: true
    }
});


const comment = mongoose.model('comment', CommentSchema);

module.exports= comment;