import drive from "./google/drive.js"

async function getFolders(machineId) {
    let folders = [];

    await drive.files.list({
        q: `'${machineId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            files.map((file) => {
                folders.push(file);
            });
        } else {
            console.log('No files found.');
        }
    });

    return folders;
}

export default getFolders;