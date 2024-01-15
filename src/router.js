const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer  = require('multer');
const path = require('path');
 

// Set up storage with custom filename
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, 'uploads/'); // Destination folder
   },
   filename: (req, file, cb) => {
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       const extension = path.extname(file.originalname);
       cb(null, file.fieldname + '-' + uniqueSuffix + extension);
   },
});

const upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
       if (file.mimetype.startsWith('text/')) {
           cb(null, true); // Accept the file
       } else {
           cb(new Error('Only text files are allowed!'), false); // Reject the file
       }
   },
});

const fileUpload = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error
            res.status(400).json({ error: true, message: err.message });
        } else if (err) {
            // Other errors
            res.status(500).json({ error: true, message: err.message });
        } else {
           next();
        }
    });
}

router.post('/upload',fileUpload,controller.insertFileDetails);


router.post('/analysis',controller.getFileDetails)


router.post('/analysisResult', controller.getTaskDetails)

 
module.exports = router;