const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const router=express.Router();
router.use(cookieParser());
const User=require('../models/userSchema');
const Post=require('../models/post');
const Comment=require('../models/comment');
require('../database/db');
const {createPost,getAllPost,getpost,updatePost,deletePost}=require('../controller/post-controller');
const {createComment,getComment,deleteComment}=require('../controller/comment-controller.js');
const uploadImage=require('../controller/image-controller.js');
const upload=require('../utils/upload.js');

const authenticate=require('../middleware/authenticate');


router.post('/register',(req,res)=>{
    const {name,email,phone,secretPhrase,password}=req.body;
   if(!name||!email||!phone||!secretPhrase||!password){
          return res.status(422).json({error:"please fill fields properly"});
      }
  User.findOne({email:email}).then((UserExist)=>{
  if(UserExist){
      return res.status(422).json({error:"Email already exist"});
               }
  const user=new User({name,email,phone,secretPhrase,password});
  
  user.save().then(()=>{
      res.status(201).json({message:"user registered successfully"});
  }).catch((err)=>{
     
  res.status(500).json({error:"failed to registered"})
  })
  
  }).catch((err)=>{
  console.log(err);
  })
  });
  
  //Login route
  router.post('/login',async(req,res)=>{
  
  try{
      let token;
  const {email,password}=req.body;
  if(!email || !password){
      return res.status(400).json({error:"plz fill the fields"});
  }
  const userLogin=await User.findOne({email:email});
  if(userLogin){
      const isMatch=await bcrypt.compare(password,userLogin.password);
      
   //generate token
    token= await userLogin.generateAuthToken();
   console.log(token);
   //store in cookies
   res.cookie("jwtoken",token,{
       expires:new Date(Date.now()+2589200000),
       httpOnly:true
   });
   //credential check
      console.log(userLogin);
      if(!isMatch){
          res.status(400).json({error:"sign in error password "});
      }
      else{
          res.status(201).json({message:"sign in "});
      }
  }
  else{
      res.status(400).json({error:"sign in error "});
  }
  
  
  }
  catch(err){
  console.log(err);
  }
  }
  )



router.post('/createPost',createPost);
router.get('/getAllPosts',authenticate,getAllPost);
router.get('/getpost/:id',getpost);
router.put('/updatePost/:id',updatePost);
router.delete('/deletePost/:id',deletePost);



router.post('/file/upload',upload.single('file'),uploadImage);


router.post('/addComment',createComment);


router.get('/getComment/:id',getComment);
router.delete('/comment/delete/:id',deleteComment);

module.exports=router;