import React,{useState,useEffect} from 'react'
import Post from './Post'
import { Grid } from '@material-ui/core';
import {Link,useLocation} from 'react-router-dom'
const Posts = () => {
  const {search}=useLocation();
    const[allposts,setPosts]=useState([]);
 const getPostss=async(params)=>{
  try{
    const res=await fetch(`/getAllPosts${params}`,{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    });
    
    const data=await res.json();
    console.log(data);
    setPosts(data);
    if(!res.status=== 200 ){
      const error= new Error(res.error);
      throw error;
    }
    }
    catch(err){
    console.log(err);
    }
 }



    const GetAllPosts= async ()=>{
      await getPostss(search);
        }
          useEffect(() => {
          GetAllPosts();
           }, [search]);


    return (
        <>
        {allposts.map(post=>(
            <Grid item lg={3} sm={4} xs={12}>
                <Link style={{textDecoration: 'none', color: 'inherit'}} 
              to= {`/details/${post._id}`}>
            <Post post={post}/>
            </Link>
            </Grid>
        )

    )}
       
        </>
    )
}

export default Posts
