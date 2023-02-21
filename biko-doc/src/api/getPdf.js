import axios from "axios";

async function getPdf(fileId) {
    const response = await axios.get(`http://localhost:7000/files/load/${fileId}`, {
        responseType: 'arraybuffer'
    });

    const pdf = response.data;
    return pdf;
}

export default getPdf;