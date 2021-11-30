const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const app=express();
dotenv.config({path:'./config.env'});
require('./database/db');
app.use(express.json());
app.use(require('./routes/route'));



app.listen(8000,()=>{
    console.log('conenction built');
})