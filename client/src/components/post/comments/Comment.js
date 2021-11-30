
import { Typography, Box, makeStyles } from "@material-ui/core";
import { Delete } from '@material-ui/icons';

import axios from 'axios';

const useStyles = makeStyles({
    component: {
        marginTop: 30,
        background: '#F5F5F5',
        padding: 10
    },
    container: {
        display: 'flex',
        marginBottom: 5
    },
    name: {
        fontWeight: 600,
        fontSize: 18,
        marginRight: 20
    },
    date: {
        fontSize: 14,
        color: '#878787'
    }, 
    delete: {
        marginLeft: 'auto'
    }
})

const Comment = ({ comment,setToggle}) => {
    const classes = useStyles();
    const deleteComment = async (id) => {
        try {
            return await axios.delete(`/comment/delete/${id}`);
        } catch(error) {
            console.log('Error while calling deleteComments API ', error)
        } 
    }
    const removeComment = async () => {
        await deleteComment(comment._id) ;
        setToggle(prev => !prev);
     }

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.name}>{comment.name}</Typography>
                <Typography className={classes.date}>{new Date(comment.date).toDateString()}</Typography>
                <Delete onClick={() => removeComment()}  className={classes.delete}/>
            </Box>
            <Typography>{comment.comments}</Typography>
        </Box>
    )
}

export default Comment;