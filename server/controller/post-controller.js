const Post =require('../models/post');

//create posts
 const createPost=(req,res)=>{
    const {title,description,picture,username,createdDate,categories}=req.body;
    const post=new Post({title,description,picture,username,createdDate,categories});
    post.save().then(()=>{
        res.status(201).json({message:"post created successfully"});
    }).catch((err)=>{
       
    res.status(500).json({error:"failed to create"})
    })
}

//getAll Posts
const getAllPost= async(req,res)=>{
    let username = req.query.username;
    let category = req.query.category;
    let posts;
    try{
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else
     posts = await Post.find({});
        res.status(200).send(posts);
    }catch( error ){
        res.status(404).send(error)
    }
}


//get post by id
 const getpost=async(req,res)=>{
    try{
        const _id=req.params.id;
const getPostId=await Post.findById({_id});
res.send(getPostId);
    }
    catch(err){
        console.log(err);
    }
};

//update posts
const updatePost=async(req,res)=>{
   
    try{
        const _id=req.params.id;
const getMens=await Post.findByIdAndUpdate(_id,req.body,{
    new:true
});
res.send(getMens);
    }
    catch(err){
        console.log(err);
    }
           
}

//delete posts
const deletePost=async(req,res)=>{
    try{
        
        await Post.deleteOne({_id: req.params.id});
        res.status(201).json("User deleted Successfully");
    } catch (error){
        res.status(409).json({ message: "error occured"});     
    }


}


module.exports={
    createPost,getAllPost,getpost,updatePost,deletePost
};