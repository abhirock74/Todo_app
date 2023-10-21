const express = require('express')
const app = express.Router();
const crud= require('./UserCRUD')
const multer = require('multer');
const path = require('path');

let register = require('./Register/Register')
app.use('/register', register)

let login = require('./Login/Login')
app.use('/login', login)

const storage = multer.diskStorage({
    destination: './uploads', // where to store the files
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
// image uploading
// Set up a storage engine for multer

  // Initialize multer with the storage engine
app.put("/:_id/updateUser",multer({storage}).single('file'), crud.updateUser);
app.delete("/:_id/deleteUser", crud.deleteUser);

module.exports = app;