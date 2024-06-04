const Photo = require('../models/Photo');
const fs = require("fs");
const { query } = require("express");


exports.getAllPhotos = async (req, res) => {
    const page = req.query.page || 1;

    const photoPerPage = 1;

    const totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page-1) * photoPerPage)
    .limit(photoPerPage);
  

    res.render('index', {
      photos: photos,
      current: page,
      pages: Math.ceil(totalPhotos / photoPerPage)
    });
  };

  exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    });
  };

  exports.createPhoto = async (req, res) => {
    const uploadDir = "public/uploads";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + "public/uploads/" + uploadeImage.name;
  
    uploadeImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: "/uploads/" + uploadeImage.name,
      });
      res.redirect("/");
    });
  };

  exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
  
    res.redirect(`/photos/${req.params.id}`);
  };

  exports.deletePhoto = async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findOne({ _id: req.params.id });
    let deleteImage = __dirname  + '/public' + photo.image;
    if(fs.existsSync(deleteImage)){ fs.unlinkSync(deleteImage) }
    await Photo.findByIdAndDelete(req.params.id);
    res.redirect('/');
  };