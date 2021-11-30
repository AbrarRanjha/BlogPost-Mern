const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},

email:{
    type:String,
    required:true
},

phone:{
    type:String,
    required:true
},

secretPhrase:{
    type:String,
    required:true
},

password:{
    type:String,
    required:true
},



date:{
    type:Date,
    default:Date.now
},


tokens:[
    { 
        token:{
            type:String,
            required:true 
        }
         
    }
]


});

//hashing the password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
        // this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    
    next();
    });

//generating the token
userSchema.methods.generateAuthToken=async function(){
    try{
        //generate the token
     let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
     //now add into your document
     this.tokens=this.tokens.concat({token:token});
     //save it into database collection
     await this.save();
     return token;
    }
    catch(err){
console.log(err);
    }
}



const User =new mongoose.model('USER',userSchema);
module.exports=User;


