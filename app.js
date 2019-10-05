const express = require('express');
const app = express();
const multer = require('multer');
app.listen(3000, () => console.log('Server start!'))
app.set('view engine', 'ejs')
const upload = multer({ dest: 'upload/' })

app.get('/', (req, res) => {
    res.render('upload');
})

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.send({ file: req.file })
})