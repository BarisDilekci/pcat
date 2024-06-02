const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers");
const Photo = require('./models/Photo');
const app = express();
const fs = require("fs"); 


//CONNECT DB
const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost/pcat-test-db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
connectDb();

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method", { methods: ["GET", "POST"] }));

//ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/edit/:id", pageController.getEditPage);


const port = process.env.port || 3001;
app.listen(port, () => {
  console.log("Project is up");
});
