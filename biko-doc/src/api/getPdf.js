import axios from "axios";

async function getPdf(fileId) {
    const response = await axios.get(`http://localhost:7000/files/load/${fileId}`, {
        responseType: 'blob',
        transformResponse: [function (data) {
            let blob = new window.Blob([data], {type: 'application/pdf'})
            return window.URL.createObjectURL(blob)
        }]
    });
    const pdf = response.data;
    return pdf;
}

export default getPdf;