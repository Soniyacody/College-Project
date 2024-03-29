const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer=require('nodemailer');
const randomstring=require('randomstring');
const config=require('../config/config');
const adminController=require('../controller/adminController');
const sendResetPasswordMail=async(name,email,token)=>{
  try{
    const transport=nodemailer.createTransport({
      host:'stmp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      service:'gmail',
      auth:{
        user:config.emailUSer,
        pass:config.emailPassword
      }
    });
    const mailOptions={
      from:{
        name:'Blog Management System',
        address:config.emailUSer
      },
      to:email,
      subject:'Reset Password',
      html:'<p>Hi'+name+', Please Click here to <a href="http://127.0.0.1:3000/reset-password?token='+token+'">Reset</a> your password</p>'
    }
    transport.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);
      }else{
        console.log('Email has been send :- ',info.response);
      }
    });
  }catch(error){
    console.log(error.message);
  }
}

const loadLogin = async (req, res) => {
  try {
    res.render("LoginForm/login");
  } catch (error) {
    console.log(error.message);
  }
};
const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });
    
    if (userData) {
      console.log(userData);
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        
        req.session.user_id = userData._id;
        req.session.is_admin = userData.is_admin;
        res.cookie(`user`,JSON.stringify(userData));
        if (userData.is_admin == 1) {
          res.redirect("/");
        } else {
          res.redirect("/profile");
        }
      } else {
        console.log("Majboori");
        res.render("LoginForm/login", { message: "Email and password is incorrect" });
      }
    } else {
      res.render("LoginForm/login", { message: "Email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const profile = async (req, res) => {
  try {
    res.send("Hi profile here");
  } catch (error) {
    console.log(error.message);
  }
};
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

const forgetLoad=async(req,res)=>{
  try{
    res.render('forget-password');
  }catch(error){
    console.log(error.message);
  }
}
const forgetPasswordVerify=async(req,res)=>{
  try{
    const email=req.body.email;
    const userData=await User.findOne({email:email});
    console.log(userData);
    if(userData){
      const randomString=randomstring.generate();
      await User.updateOne({email:email},{$set:{token:randomString}});
      sendResetPasswordMail(userData.name,userData.email,randomString);
      res.render('forget-password',{message:"Please check your mail to Reset your Password !"});
    }else{
      res.render('forget-password',{message:'User mail is incorrect'});
    }

  }catch(error){
    console.log(error.message);
  }
}
const resetPasswordLoad=async(req,res)=>{
    try{
      const token=req.query.token;
      const tokenData=await User.findOne({token:token});
      if(tokenData){
        console.log(tokenData._id);
        res.render('reset-password',{user_id:tokenData._id});
      }else{
        res.render('404');
      }
    }catch(error){
      console.log(error.message);
    }
}
const resetPassword=async(req,res)=>{
  try{
      const password=req.body.password;
      const user_id=req.body.user_id;
      const securePassword=await adminController.securePassword(password);
      await User.findByIdAndUpdate({_id:user_id},{$set:{password:securePassword,token:''}});
      res.redirect('/login');
  }catch(error){
    console.log(error.message);
  }
}
module.exports = {
  loadLogin,
  verifyLogin,
  profile,
  logout,
  forgetLoad,
  forgetPasswordVerify,
  resetPasswordLoad,
  resetPassword
};
// SMTP : api-FBB8FE3339F143F0A8126E0486C24FFA