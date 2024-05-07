const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose')
 // Örnek bir dosya yolu, bu dosya yolunu kendi proje yapılandırmanıza göre ayarlayın.

const app = express();

// TEMPLATE ENGINE 
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/pcat-test-db')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);


  app.get('/', async (req, res) => {
    const photos = await Photo.find({})
    res.render('index',{
      photos
    });

  });

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
