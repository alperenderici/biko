import axios from "axios";

async function getFolders(machineId) {
    const response = await axios.get(`http://localhost:7000/folders/${machineId}`);
    const folders = response.data;

    return folders;
}

export default getFolders;