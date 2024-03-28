const mongoose=require('mongoose');
const settingSchema=mongoose.Schema({
    post_limit:{
        type:Number,
        required:true
    }
});
module.exports=mongoose.model('Setting',settingSchema);