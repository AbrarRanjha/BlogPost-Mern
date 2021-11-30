import React, { useState} from "react";
import { Grid, Paper, Avatar, Typography, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./signup.css";
import "react-image-crop/dist/ReactCrop.css";
import PasswordForm from "./PasswordForm";
const ResetForm = () => {

  const [data, setData] = useState({email:""});
const [otpForm,showOtpForm]=useState(true);
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const ChangeEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const checker = async (e) => {
    e.preventDefault();
const {email}=data;
console.log(data);
const res= await fetch("/email-send",{
  method:"POST",
  headers:{
    "Content-Type" : "application/json"

  },
  body:JSON.stringify({
         email 
  })
});
const details= await res.json();
console.log(details);
if(details.status === 422 || !details){
console.log("invalid")
}
else{
 console.log('registered');
 showOtpForm(false);
}

  };

  return (
    <Grid>
      <br/><br/>
      <br/>
      <br/>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill the form to create the account
          </Typography>
        </Grid>
        {otpForm? <form method="POST">
          <TextField
            fullWidth
            label="Email"
            type="email"
            onChange={ChangeEvent}
            name="email"
            value={data.email}
          />
          <Grid align="center">
          <br/>
            <Button type="submit" variant="contained" color="primary" onClick={checker}>
             SEND OTP
            </Button>
          </Grid>
        </form>
        :<PasswordForm email={data.email}/>}
      </Paper>
    </Grid>
  );
};

export default ResetForm;
