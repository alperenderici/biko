// simple express backend
const express = require('express');
const drive = require("./google/drive");
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/folders/:id', async (req, res) => {
    const folders = [];
    const id = req.params.id;
    console.log(id)
    await drive.files.list({
        q: `'${id}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
    }, (err, _res) => {
        if (err) return res.status(500).json({message: "The API returned an error: " + err});
        const files = _res.data.files;
        if (files.length) {
            files.map((file) => {
                folders.push(file);
            });
        } else {
            res.status(404).json({message: "No files found."});
        }

        res.status(200).json(folders);
    })
})

app.get('/files/:id', async (req, res) => {
    const files = [];
    const id = req.params.id;
    await drive.files.list({
        q: `'${id}' in parents and mimeType = 'application/pdf'`,
        fields: 'files(id, name)',
    }, (err, _res) => {
        if (err) return res.status(500).json({message: "The API returned an error: " + err});
        const files = _res.data.files;
        if (files.length) {
            files.map((file) => {
                files.push(file);
            });
        } else {
            res.status(404).json({message: "No files found."});
        }

        res.status(200).json(files);
    })
})
app.listen(7000, () => console.log('Example app listening on port 7000!'));
