const mongoose=require('mongoose');
const DB='mongodb+srv://HiraNisar:codeword1023@cluster0.67rft.mongodb.net/BLOG?retryWrites=true&w=majority'
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(()=>{
    console.log('successfull');
}).catch((e)=>{
console.log(e);
});