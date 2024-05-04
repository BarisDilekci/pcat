const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();


//TEMPLATE ENGINE 
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
