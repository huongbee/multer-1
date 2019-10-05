const express = require('express');
const app = express();
const multer = require('multer');
app.listen(3000, () => console.log('Server start!'))
app.set('view engine', 'ejs')
// const upload = multer({ dest: 'upload/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
function fileFilter(req, file, cb) {
    if (file.mimetype != 'image/gif' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
        //return cb(null, false);
        return cb(new Error('File not allow!'))
    }
    cb(null, true);
}
const upload = multer({ storage, fileFilter })

app.get('/', (req, res) => {
    res.render('upload');
})

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send({ file: req.file })
})
