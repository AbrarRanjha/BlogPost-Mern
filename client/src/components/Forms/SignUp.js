import React, { useEffect, useState } from "react";
import { Grid, Paper, Avatar, Typography, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./signup.css";
import { useParams } from "react-router-dom";
import Validations from "./Validations";
import "react-image-crop/dist/ReactCrop.css";



const Perfect = () => {

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    secretPhrase: "",
  });

  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  let [errors, setErrors] = useState({});
  const ChangeEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var errors = Validations(data);
    setErrors(errors);
    if (!errors.hasErrors) {
     
const { name,phone,email ,password,secretPhrase}=data;
const res= await fetch("/register",{
  method:"POST",
  headers:{
    "Content-Type" : "application/json"

  },
  body:JSON.stringify({
    name,phone,email ,password,secretPhrase
  })
});
const details= await res.json();
console.log(details);
if(res.status === 422 ){
window.alert("INVALID REGISTRATION");
}
else if(details || res.status===201){
  window.alert("Registered Successfully!");
}
    }
  };
 
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill the form to create the account
          </Typography>
        </Grid>
        <form method="POST">
          {/* <div className="img-holder">
            <img src={profileImg} alt="" id="img" className="img" />
          </div>
          <input
            type="file"
            required
            accept="image/*"
            id="input"
            onChange={imageHandler}
          />
          <div className="label">
            <label className="image-upload" htmlFor="input" required>
              <i className="material-icons">add_photo_alternate</i>
              Choose profile
            </label>
          </div> */}

          <TextField
            fullWidth
            label="Name"
            onChange={ChangeEvent}
            name="name"
            value={data.name}
          />
          {errors.name && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.name}
            </p>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            onChange={ChangeEvent}
            name="email"
            value={data.email}
          />
          {errors.email && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.email}
            </p>
          )}

          <TextField
            fullWidth
            label="Mobile No"
            onChange={ChangeEvent}
            name="phone"
            value={data.phone}
          />
          {errors.phone && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.phone}
            </p>
          )}

          <TextField
            fullWidth
            label="Password"
            type="password"
            onChange={ChangeEvent}
            name="password"
            value={data.password}
          />
          {errors.password && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.password}
            </p>
          )}

          <TextField
            fullWidth
            label="SecretPhrase"
            type="password"
            onChange={ChangeEvent}
            name="secretPhrase"
            value={data.secretPhrase}
            gutterBottom
          />
          {errors.secretPhrase && (
            <p style={{ fontSize: "13px", fontWeight: "bold", color: "red" }}>
              {errors.secretPhrase}
            </p>
          )}

        
          <Grid align="center">
          <br/>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Signup
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Perfect;
