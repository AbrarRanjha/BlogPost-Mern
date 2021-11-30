import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core';
const useStyle = makeStyles({
    image: {
        width: '100%',
        background: `url(${'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg'}) center/55% repeat-x black`,
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& :first-child': {
            fontSize: 70,
            color: 'white',
            lineHeight: 1
        },
        '& :last-child': {
            fontSize: 20,
            background: 'white',
        }
    }
})
const Banner = () => {
    const classes = useStyle();
    const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeP-1kElXyYuV2xDH1WI8rpF5QLitC_NYF5g&usqp=CAU';
    return (
        <>
            <Box className={classes.image}>
                <Typography>BLOG</Typography>
                <Typography>Code for Interview</Typography>
            </Box>
        </>
    )
}

export default Banner
