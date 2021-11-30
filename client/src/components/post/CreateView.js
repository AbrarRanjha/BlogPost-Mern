import React,{useState,useEffect}from 'react';
import axios from 'axios';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import { AddCircle as Add} from '@material-ui/icons';
const useStyle = makeStyles(theme => ({
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    }
}));




const initialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'uzair',
    categories: 'All',
    createdDate: new Date().toDateString(),
}
const CreateView = () => {
    const [post,setPost]=useState(initialValues);
const [file,setFile]=useState('');
const classes=useStyle();
    const url =   post.picture ? post.picture :'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';




const handleChange=(e)=>{
    setPost({...post,[e.target.name]:e.target.value});
    console.log(post);
}

const handleSubmit = async (e) => {
    e.preventDefault();
const { title,description,username,categories,picture}=post;
const res= await fetch("/createPost",{
  method:"POST",
  headers:{
    "Content-Type" : "application/json"

  },
  body:JSON.stringify({
    title,description,username,categories,picture
  })
});
const details= await res.json();
console.log(details);
if(details.status === 422 || !details){
window.alert("INVALID POST");
}
else{
  window.alert("Post Registered Successfully!");
}
    
  };

  
const uploadFile=async(data)=>{
try{
 return await axios.post('/file/upload',data);

}catch(err){
console.log(err);
}


}




useEffect(()=>{
const getImage=async()=>{
const data=new FormData();
data.append("name",file.name);
data.append("file",file);
await uploadFile(data);

}
getImage();
},[file])

















    return (
        <>
           <Box className={classes.container}>
            <img src={url} alt="post" className={classes.image} />

            <FormControl className={classes.title}>
                <label htmlFor="fileInput">
                    <Add  fontSize="large" color="action" />
                </label>
                <input
                 
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e)=>setFile(e.target.files[0])}
                   
                />
                <InputBase name='title' placeholder="Title" className={classes.textfield}  onChange={(e)=>handleChange(e)}/>
                <Button  variant="contained" color="primary" onClick={handleSubmit}>Publish</Button>
            </FormControl>

            <TextareaAutosize
                 
                rowsMin={5}
                placeholder="Tell your story..."
                className={classes.textarea}
                name='description'
               onChange={(e)=>handleChange(e)}
            />
        </Box>
        </>
    )
}

export default CreateView
