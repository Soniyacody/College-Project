const isLogin=async(req,res,next)=>{
    try{
        if(req.session.user_id && req.session.is_admin==1){
            next();
        }else{
            res.redirect('/LoginForm/login');
        }
        // next(); Youtuber code line
    }catch(error){
        console.log(error.message);
    }
}
const isLogout=async(req,res,next)=>{
    try{
        if(req.session.user_id && req.session.is_admin==1){
          return  res.redirect('/Mentoring/mentor-booking');
        }else{
            next();
        }
    }catch(error){
        console.log(error.message);
    }
}
module.exports={
    isLogin,
    isLogout
}