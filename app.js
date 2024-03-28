const express = require("express");
const app = express();
const port = 4000;
const path = require("path");

app.use('/public',express.static('public'));
app.use('/views',express.static('views'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
// Set the "views" directory to the correct path
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route to render the "mentor1.ejs" template
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/blog_show', (req, res) => {
  res.render('/Blog/blog_show'); // Corrected view name
});

app.get('/Mentoring/mentor-homepage', (req, res) => {
  const data = { Title: 'Mentor' };
  res.render('Mentoring/mentor-homepage', data); 
});
app.get('/Mentoring/mentor-dashboard-page', (req, res) => {
  const data = { Title: 'Mentor' };
  res.render('Mentoring/mentor-dashboard-page', data);
});
app.get('/Mentoring/mentor-booking', (req, res) => {
  const data = { Title: 'Booking Summary' };
  res.render('Mentoring/mentor-booking', data);
});
app.get('/Mentoring/schedule-timing', (req, res) => {
  const data = { Title: 'Booking Summary' };
  res.render('Mentoring/schedule-timing', data);
});

// Start the server
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});


//Side project wala code

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/BMS");
// const express = require("express");
// const app = express();
// var http = require("http").createServer(app);
// var { Server } = require("socket.io");
// var io = new Server(http, {});
// const Like = require("./models/likeModel");
// //global route for User first set blog then blog-setup
// const isBlog = require("./middlewares/isBlog");
// app.use(isBlog.isBlog);

// //for admin route
// const adminRoute = require("./routes/adminRoute");
// app.use("/", adminRoute);

// //for user route
// const userRoute = require("./routes/userRoute");
// app.use("/", userRoute);

// //for Blog route
// const blogRoute = require("./routes/blogRoute");
// app.use("/", blogRoute);
// const Post = require("./models/postModel");
// // const mongoose = require('mongoose'); // Import mongoose
// const { ObjectID } = require("mongodb");
// io.on("connection", function (socket) {
//   console.log("User connected !!!");
//   socket.on("new_post", function (formData) {
//     console.log(formData);
//     socket.broadcast.emit("new_post", formData);
//   });

//   socket.on("new_comment", function (comment) {
//     io.emit("new_comment", comment);
//   });
//   socket.on("new_reply", function (reply) {
//     io.emit("new_reply", reply);
//   });
//   socket.on("delete_post", function (postId) {
//     socket.broadcast.emit("delete_post", postId);
//   });
//   socket.on("increment_page_view", async function (postId) {
//     var data = await Post.findOneAndUpdate(
//       { _id: new mongoose.Types.ObjectId(postId) },
//       {
//         $inc: { views: 1 },
//       },
//       {
//         new: true,
//       }
//     );
//     socket.broadcast.emit("updated_views", data);
//   });

//   socket.on("like", async function (data) {
//     const d = await Like.updateOne(
//       {
//         post_id: data.post_id,
//         user_id: data.user_id,
//       },
//       {
//         type: 1,
//       },
//       {
//         upsert: true,
//       }
//     );

//     const post_id = new mongoose.Types.ObjectId(data.post_id);

//     console.log("Socket data : ", d);
//     const likes = await Like.find({ post_id: post_id, type: 1 }).count();
//     const dislikes = await Like.find({
//       post_id: post_id,
//       type: 0,
//     }).count();

//     console.log("Likes : ", likes, " Dislikes : ", dislikes);
//     io.emit("like_dislike", {
//       post_id: data.post_id,
//       likes: likes,
//       dislikes: dislikes,
//     });
//   });

//   socket.on("dislike", async function (data) {
//     const post_id = new mongoose.Types.ObjectId(data.post_id);
//     await Like.updateOne(
//       {
//         post_id: data.post_id,
//         user_id: data.user_id,
//       },
//       {
//         type: 0,
//       },
//       {
//         upsert: true,
//       }
//     );

//     const likes = await Like.find({ post_id: post_id, type: 1 }).count();
//     const dislikes = await Like.find({
//       post_id: post_id,
//       type: 0,
//     }).count();
//     console.log("Likes : ", likes, " Dislikes : ", dislikes);

//     io.emit("like_dislike", {
//       post_id: data.post_id,
//       likes: likes,
//       dislikes: dislikes,
//     });
//   });
// });

// http.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });

