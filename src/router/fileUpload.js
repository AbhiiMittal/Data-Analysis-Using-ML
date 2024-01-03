const express = require('express');
const multer = require('multer');

const FileModel = require('../helpers/Model');
const router = express.Router();

router.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'H:\\Data Analysis\\src\\uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only CSV files are allowed.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newFile = new FileModel({
            filename: req.file.originalname,
            path: req.file.path,
          });
          await newFile.save();
      
          res.status(200).json({ message: 'File uploaded successfully!',filePath: req.file.path });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Error uploading file.' });
   }
});
module.exports = {
    router: router,
    upload: upload
};