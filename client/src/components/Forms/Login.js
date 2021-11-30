import React, { useState,useContext } from "react";
import {useNavigate} from 'react-router-dom'
import LoginValidations from "./LoginValidations";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

const LoginFirst = (handleChange) => {




  let history=useNavigate();
  let [errors, setErrors] = useState({});
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 250,
    margin: "0 auto",
  };
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const BuutonMa = { padding: "20px 2px" };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var errors = LoginValidations(data);
    setErrors(errors);
    if (!errors.hasErrors) {
      // console.log(data);
      // alert("Logged In Successfully!");
      const{email,password}=data;
   const res=await fetch('/login',{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
  
    },
    body:JSON.stringify({
      email ,password
    })
   });
   const details= await res.json();
   if(res.status === 400 || !details){
    window.alert("INVALID Credentials");
    }
    else{
      window.alert("Login Successfully!");
      history('/about');

    }

    }
    
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form method="POST">
          <TextField
            label="Username"
            fullWidth
            name="email"
            value={data.email}
            placeholder="Enter Your Email"
            onChange={handleInput}
          />
          {errors.email && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.email}
            </p>
          )}


          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={data.password}
            placeholder="Enter Your Password"
            onChange={handleInput}
          />
          {errors.password && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.password}
            </p>
          )}

          <Grid align="center" style={BuutonMa}>
            <Button type="submit" variant="contained" color="secondary" onClick={handleSubmit}>
              Log In
            </Button>
          </Grid>
        </form>
        <Typography>
          <Link href="/reset-password">Forgot password ?</Link>
        </Typography>
        <Typography>
          Do you have an account ?
          <Link href="/signup" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LoginFirst;
