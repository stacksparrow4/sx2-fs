const express = require('express');
const { formidable } = require('formidable');
const cookieParser = require('cookie-parser');
const fs = require('fs');

require("dotenv").config();

if (!fs.existsSync('u')) {
    fs.mkdirSync('u');
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('static'));
app.use('/u', express.static('u'));

app.post('/api/login', (req, res) => {
    if (req.body.password === process.env.PASSWORD) {
        res.cookie('password', req.body.password);
        res.redirect('/upload.html');
    } else {
        res.send('Login failed <a href="/">back</a>');
    }
})

const parseForm = (req) => {
    return new Promise((res, rej) => {
        const form = formidable({uploadDir: 'u', keepExtensions: true});

        form.parse(req, (err, fields, files) => {
            if (err) {
                rej(err);
            } else {
                res({ fields, files });
            }
        });
    })
}

app.post('/api/upload', async (req, res) => {
    if (req.cookies['password'] !== process.env.PASSWORD) {
        res.status(403);
        res.json({error: "permission denied"});
        return;
    }

    const { files } = await parseForm(req);

    const { newFilename } = files.uploadFile[0];

    res.json({ newFilename });
});

app.listen(3000, "0.0.0.0", () => {
    console.log('Server listening on http://localhost:3000 ...');
});