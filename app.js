const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();

// TEMPLATE ENGINE 
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/pcat-test-db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

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

app.get('/photos/:id', async (req,res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photo', (req, res) => {
  res.render('photo');
});


app.post('/photos', async (req, res) => {
  //console.log(req.files.image);
  //res.redirect('/')


  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) { // Bunun için const fs = require('fs'); almamız gerekir.
    fs.mkdirSync(uploadDir);
  }
  
  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, 
    async () => {
      await Photo.create({
        ...req.body ,
        image: '/uploads/' + uploadeImage.name,
      });
      res.redirect('/');
    }
  )
});


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});