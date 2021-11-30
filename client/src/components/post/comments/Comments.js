import React,{useState,useEffect} from 'react';
import { Box, Typography, TextareaAutosize, Button, makeStyles } from '@material-ui/core';
import Comment from './Comment';
import axios from "axios";
const useStyles = makeStyles({
    container: {
        marginTop: 100,
        display: 'flex',
        '& > *': {
            // padding: '10px '
        }
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: '50%'
    },
    textarea: {
        height: 100,
        width: '100%', 
        margin: '0 20px'
    },
    button: {
        height: 40
    }
})



const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({user}) => {
    const classes = useStyles();
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: user.username,
            postId: user._id,
            comments: e.target.value
        });
        console.log(comment);
         
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    const { name,postId,comments,date}=comment;
    const res= await fetch('/addComment',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
    
      },
      body:JSON.stringify({
        name,postId,comments,date
      })
    });
    const details= await res.json();
    console.log(details);
    if(details.status === 422 || !details){
    window.alert("INVALID Comment");
    }
    else{
      window.alert("Comment added Successfully!");
      setToggle(prev => !prev);
    }
        
      };


      const getComments=async(id)=>{
        id = id || '';
        return await axios.get(`/getComment/${id}`);
       }
          
                useEffect(() => {
                    const GetAllPosts= async ()=>{
                      const response=  await getComments(user._id);
                      setComments(response.data);
                      console.log(response.data);
                          }
                          GetAllPosts();
                 }, [user,toggle]);














    return (
        <>
           <Box>
            <Box className={classes.container}>
                <img src={url} className={classes.image} alt="dp" />   
                <TextareaAutosize 
                    rowsMin={5} 
                    className={classes.textarea} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    className={classes.button}
                    onClick={handleSubmit}
                >Post</Button>             
            </Box>
            <Box>
            {
                    comments && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle}  />
                    ))
                }
            </Box>
        </Box> 
        </>
    )
}

export default Comments
