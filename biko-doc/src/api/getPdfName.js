import axios from "axios";

async function getPdfName(fileId) {
    const response = await axios.get(`http://localhost:7000/folders/name?folderId=${fileId}`);
    const pdfName = response.data;
    return pdfName;
}

export default getPdfName;