const uploadImage=async(req,res)=>{
    try{

        if(!req.file)
 return res.status(404).json('file not found');
const imageURL=`/file/${req.file.filename}`;
res.status(200).json(imageURL);


    }
    catch(err){
        res.status(200).json(err);
    }

}



module.exports=uploadImage;