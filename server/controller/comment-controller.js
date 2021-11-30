const Comment=require('../models/comment');

const createComment=(req,res)=>{
    const {name,postId,date,comments}=req.body;
    const comment=new Comment({name,postId,date,comments});
    comment.save().then(()=>{
        res.status(201).json({message:"post created successfully"});
    }).catch((err)=>{
       
    res.status(500).json({error:"failed to create"})
    })
}

const getComment=async(req,res)=>{

    try{
   const comments = await Comment.find({ postId: req.params.id });
        res.status(200).send(comments);
    }catch( error ){
        res.status(404).send(error)
    }
}


const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        await comment.delete()

        res.status(200).json('comment deleted successfully');
    } catch (error) {
        res.status(500).json(error)
    }
}




module.exports={
    createComment,getComment,deleteComment
};