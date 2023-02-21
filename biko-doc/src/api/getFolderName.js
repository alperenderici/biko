import axios from "axios";

async function getFolderName(machineId) {
    const response = await axios.get(`http://localhost:7000/folders/name?folderId=${machineId}`);
    const folders = response.data;
    return folders;
}

export default getFolderName;