
const express = require('express');
const drive = require("./google/drive");
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/pdf/name', async (req, res) => {
    const fileId = req.query.fileId;

    await drive.files.get({
        fileId: fileId,
        fields: 'name'
    }, (err, _res) => {
        if (err) return res.status(500).json({message: "The API returned an error: " + err});
        const pdfName = _res.data.name;
        return res.status(200).json(pdfName);
    })
})

app.get('/folders/name', async (req, res) => {
    const folderId = req.query.folderId;

    await drive.files.get({
        fileId: folderId,
        fields: 'name'
    }, (err, _res) => {
        if (err) return res.status(500).json({message: "The API returned an error: " + err});
        const folderName = _res.data.name;

        return res.status(200).json(folderName);
    })

})

app.get('/folders/:id', async (req, res) => {
    const folders = [];
    const id = req.params.id;

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
            return res.status(404).json({message: "No files found."});
        }

        return res.status(200).json(folders);
    })
})

app.get('/files/load/:id', async (req, res) => {
    const id = req.params.id;
    const response = await drive.files.get({
        fileId: id,
        mimeType: 'application/pdf',
        alt: 'media'
    })

    const responseFile = response.data;
    if (responseFile) {
        return res.status(200).send(response.data);
    }

    return res.status(404).json({message: "No files found."});
})

app.get('/files/:id', async (req, res) => {
    const files = [];
    const id = req.params.id;
    await drive.files.list({
        q: `'${id}' in parents and mimeType = 'application/pdf'`,
        fields: 'files(id, name)',
    }, (err, _res) => {
        if (err) return res.status(500).json({message: "The API returned an error: " + err});
        const responseFiles = _res.data.files;

        if (responseFiles.length) {
            responseFiles.map((file) => {
                files.push(file);
            });
        } else {
            return res.status(404).json({message: "No files found."});
        }

        return res.status(200).json(files);
    })
})

app.listen(7000, () => console.log('Example app listening on port 7000!'));
