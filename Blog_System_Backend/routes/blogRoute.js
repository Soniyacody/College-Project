const express=require('express');
const blog_route=express();
blog_route.set('view engine','ejs');
blog_route.set('views','./views');
blog_route.set(express.static('public'));

const blogController=require('../controller/blogController');
blog_route.get('/',blogController.loadBlog);
blog_route.get('/post/:id',blogController.loadPost);
blog_route.post('/add-comment',blogController.addComment);
blog_route.post('/do-reply',blogController.doReply);

blog_route.get('/get-post/:start/:limit',blogController.getPosts);
module.exports=blog_route;