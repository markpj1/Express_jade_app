var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', {title: 'Welcome'});
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

app.post('/contact/send', function (req, res) {
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'markpjaramillo@gmail.com',
        pass: ''//need to add password
      }
  });
    var mailOptions = {
      from: 'markPjaramillo <markpjaramillo@gmail.com>',
      to: 'markpj@hotmail.com',
      subject: 'Website Submissions',
      text: 'You have a submission with the following details..Name: ' + req.body.name + 'Email' + req.body.email + 'Message: ' + req.body.message,
      html: '<p>You have a submission with the following details..Name: </p><ul><li>' + req.body.name + '</li> <li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if(error) {
        console.log('Error');
        res.redirect('/');
      }
      else {
        console.log('Message Sent: ' + info.response);
        res.redirect('/');
      }
    });
});

app.listen(3000);
console.log("server is running on port 3000...");
