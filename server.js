const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const path=require('path');

const  connectDB=require('./server/database/connection')

const app=express(); 
dotenv.config({path:'config.env'});
const port=process.env.port||8080

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set('view engine','ejs')
//app.set('views'.path.resolve(__dirname,'vieewa/ejs'));// when we create another folder inside views store all ejs file inside it then this statement is used.

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))//for virtual address
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))//for virtual address
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))//for virtual address



//load routers
app.use('/',require('./server/routes/router'));



app.listen(port,()=>{console.log(`server is running on http://localhost:${port}`)});

