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
const upload = multer({ storage })

app.get('/', (req, res) => {
    res.render('upload');
})

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send({ file: req.file })
})