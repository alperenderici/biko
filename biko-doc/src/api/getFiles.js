import axios from "axios";

async function getFiles(folderId) {
    const response = await axios.get(`http://localhost:7000/files/${folderId}`);
    const files = response.data;
    return files;
}

export default getFiles;