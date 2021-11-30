import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import {useParams} from 'react-router-dom'
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


const initialValue = {
    username: '',
    title: '',
     description: '',
     picture:'',
}
const UpdateView = () => {

const classes=useStyle();
    const url =  'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';



    const getUsers = async (id) => {
        id = id || '';
        return await axios.get(`/getpost/${id}`);
    }

    const [user, setUser] = useState(initialValue);
    const { username,title,picture,description} = user;
    const { id } = useParams();


    useEffect(() => {
        loadUserDetails();
    },[]);

    const loadUserDetails = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }


    const editUser = async (id, user) => {
        return await axios.put(`/updatePost/${id}`, user)
    }
      const editUserDetails = async() => {
     
         await editUser(id, user);
         window.alert('record updated successfully');
    

      }

      const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }






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
                    onChange={(e) => onValueChange(e)}
                    
                />
                <InputBase name='title' placeholder="Title" value={title} className={classes.textfield} onChange={(e) => onValueChange(e)} />
                <Button  variant="contained" color="primary" onClick={() => editUserDetails()}>UPDATE</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                value={description}
                onChange={(e) => onValueChange(e)}
                placeholder="Tell your story..."
                className={classes.textarea}
                name='description'
               
            />
        </Box>
        </>
    )
}

export default UpdateView
