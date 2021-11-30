import React,{useState,useEffect} from 'react'
import { Box, makeStyles, Typography,Button} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link,useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comments from './comments/Comments';
const initialValue = {
    title: '',
    description: '',
    picture: '',
    createdDate:'',
    username: '',
    categories:'',
}
const useStyle = makeStyles(theme =>({
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
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    author: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
        
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));
const DetailView = () => {
const history=useNavigate();
    const classes=useStyle();

    const getUsers = async (id) => {
        id = id || '';
        return await axios.get(`/getPost/${id}`);
    }



    const [user, setUser] = useState(initialValue);
    const {   title,
    description,
    picture,
    createdDate,
    username,
    categories } = user;
    const { id } = useParams();
    


    useEffect(() => {
        loadUserDetails();
    },[]);
    const loadUserDetails = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }
    const deletePost = async (id) => {
        try {
            return await axios.delete(`/deletePost/${id}`);
        } catch(error) {
            console.log('Error while calling deletePost API ', error)
        }
    }


    const deleteBlog = async () => {    
        await deletePost(user._id);
        history('/');
    }



    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    return (
        <>
         <Box className={classes.container}>
            <img src={picture || url} alt="post" className={classes.image} />
            <Box className={classes.icons}> 
                    <>  
                      <Link to={`/update/${user._id}`}> <Edit  className={classes.icon} color="primary"/></Link> 
                     <Link to="/"><Delete  onClick={() => deleteBlog()} className={classes.icon} color="error" /></Link>
                    </>
               
            </Box>
            <Typography className={classes.heading}>{title}</Typography>


            <Box className={classes.author}>
            <Link to={`/?username=${username}`} className={classes.link}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{username}</span></Typography>
               </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(createdDate).toDateString()}</Typography>
            </Box>


            <Typography className={classes.detail}>{description}</Typography>
           <Comments user={user}/>
        </Box>
        </>
    )
}

export default DetailView
