const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('dateTimeTest', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('textMan', (text) => {
  return text.toUpperCase();
});


app.use((req, res , next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  })
  next();
});

// app.use((req,res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    name: 'Hrvoje',
    prezime: 'Cavar',
    stack: [
      'MEAN'
    ],
    welcomeMessage: 'Hello stranger'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    name: 'Hrvoje',
    pageTitle : 'About page'
    //currentYear: new Date().getFullYear()
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
