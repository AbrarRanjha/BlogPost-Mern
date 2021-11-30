import React, { useState} from "react";
import { Grid, Paper, Avatar, Typography, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./signup.css";
import "react-image-crop/dist/ReactCrop.css";
const PasswordForm = (props) => {

  const [data, setData] = useState({
      
    code:"",
    password:""
});
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
const {code,password}=data;
// console.log(data,props);
// Object.assign(data,props);
// console.log(data,props);
const res= await fetch("/change-password",{
  method:"PUT",
  headers:{
    "Content-Type" : "application/json"

  },
  body:JSON.stringify({
          code,password
  })
});
const details= await res.json();
console.log(details);
if(details.status === 422 || !details){
console.log("invalid")
}
else{
 console.log('Password Changed successfully!');
}

  };

  return (
    <Grid>
    
    <form method="PUT">
          <TextField
            fullWidth
            label="Otp"
            type="text"
            onChange={ChangeEvent}
            name="code"
            value={data.code}
          />


<TextField
            fullWidth
            label="password"
            type="password"
            onChange={ChangeEvent}
            name="password"
            value={data.password}
          />     



          <Grid align="center">
          <br/>
            <Button type="submit" variant="contained" color="primary" onClick={checker}>
             update Password
            </Button>
          </Grid>
        </form>
    </Grid>
  );
};

export default PasswordForm;
