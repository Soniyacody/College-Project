const mongoose=require("mongoose");
const blogSettingSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    user_logo:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
   
    // blog_title:{
    //     type:String,
    //     required:true
    // },
    // blog_logo:{
    //     type:String,
    //     required:true
    // },
    // blog_tag:{
    //     type:String,
    // },
    // description:{
    //     type:String,
    //     required:true
    // }
   
})
module.exports=mongoose.model('BlogSetting',blogSettingSchema);