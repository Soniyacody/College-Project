const express=require("express");
const user_route=express();
const bodyParser=require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const cookieParser=require('cookie-parser');
user_route.use(cookieParser());

const session=require('express-session');
const config=require('../config/config');
user_route.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true   
}));
user_route.set('view engine','ejs');
user_route.set('views','./views');

const userController=require('../controller/userController');
user_route.use(express.static('public'));
const adminLoginAuth=require('../middlewares/adminLoginAuth');
user_route.get('/login',adminLoginAuth.isLogout,userController.loadLogin);
user_route.post('/login',userController.verifyLogin);
user_route.get('/logout',adminLoginAuth.isLogin,userController.logout);
user_route.get('/profile',userController.profile);

user_route.get('/forget-password',adminLoginAuth.isLogout,userController.forgetLoad);
user_route.post('/forget-password',userController.forgetPasswordVerify);

//Forget
user_route.get('/reset-password',adminLoginAuth.isLogout,userController.resetPasswordLoad);
user_route.post('/reset-password',userController.resetPassword);
module.exports=user_route;