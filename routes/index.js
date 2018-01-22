const express = require('express'),
      multer  = require('multer'),
      path    = require('path'),
      fs      = require('fs'),
      router  = express.Router();
      
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 100000000
    }
}).single('uploadfile');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.file === undefined) {
                res.json({error: 'No file selected!'});
            } else {
                res.json({size: req.file.size});
                fs.unlink(path.join(__dirname, '/../public/uploads/' + req.file.filename), err => { if (err) throw err; });
            }
        }
    });
});

module.exports = router;