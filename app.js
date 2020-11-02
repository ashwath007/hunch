const express 				= require('express');
const app     				= express();
const mongoose 				= require('mongoose');
const chalk                 = require('chalk');
const bodyParser            = require('body-parser');
const jsonParser            = bodyParser.json();
var cors 					= require('cors');
const fs 					= require('fs');
const Path 					= require('path');
const { v4: uuidv4 } 		= require('uuid');
var randomize 				= require('randomatic');
var cookieParser 			= require('cookie-parser');
const FileType 				= require('file-type');
var detect 					= require('detect-file-type'); //FILE TYPE
var mammoth 				= require("mammoth");
const shortid 				= require('shortid');
var session 				= require('express-session')
var randtoken 				= require('rand-token');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(cookieParser());

const path = require('path');
app.use(express.static('./public'));


//DataBase is connected
// mongoose.connect('mongodb://localhost:27017/hunch', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// 				.then(()=>{
// 					console.log(chalk.bgWhite.bold.red("Connected to DATABASE"));
// 							})
// 				.catch((err)=>{
// 					console.log(err);
// 							});
//
//ROUTES
		//Recuiter
		const recruiter = require('./routers/recruiter/recruiter');//Hunch/routers/recruiter/recruiter.js
//
//Server-Side Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
	  secure: true,
	  httpOnly:true,  
  }
}))
app.get('/',(req,res)=>{
	//CHECKING IF HE/SHE IS NEW OR NOT
	
	const USER_ID = uuidv4();
	const G_ID = shortid.generate();
	res.cookie("USER_ID",USER_ID);
	res.cookie("G_ID",G_ID);
	res.cookie("EVer",0);
	res.cookie("PVer",0);
	res.cookie("Lev",0);
											// LEVEL 1 : Companies
											// LEVEL 2 : Recruiter
											// LEVEL 3 : Admin
											// LEVEL 4 : Emplayer
	res.cookie("Role","a");
	res.cookie("P_complete",0);
	res.cookie("Ecode","");
	if((req.cookies.TOKEN == null) && (req.cookies.TOKEN_ID == null)){
	
	res.cookie("TOKEN","");
	res.cookie("TOKEN_ID","");
		
	}	
		console.log(chalk.bold.yellow(req.cookies.USER_ID+"__"+req.cookies.G_ID+"__"+req.cookies.EVer+"__"+req.cookies.PVer+"__"+req.cookies.P_complete+"__"+req.cookies.Ecode+"__"+req.cookies.TOKEN+"__"+req.cookies.TOKEN_ID));
	
	
	res.render("client");
	
});
app.get('/h',(req,res)=>{
	res.render("home");
	
});
app.get('/q',(req,res)=>{
	res.render("csignin");
	
});

//
app.use("/hire",recruiter);

app.listen(process.env.PORT || 3000,()=>{
	console.log(chalk.bgGreen('Hunch Server Ready'));
	console.log(chalk.bgMagenta('Version 1.0.0'));

});