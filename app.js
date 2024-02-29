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
  res.render('blog_show'); // Corrected view name
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
