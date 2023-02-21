import React, {useEffect} from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {useNavigate, useParams} from "react-router-dom";
import getPdfName from '../../api/getPdfName';
import {ReactComponent as BikoLogoBeyaz} from "../../assets/images/BikoLogoBeyaz.svg";
import getPdf from "../../api/getPdf";
import "./view_page.css";
// import '@react-pdf-viewer/core/lib/styles/index.css';
import { FaArrowLeft } from 'react-icons/fa';
import '../../assets/fonts/fonts.css'; 


const ViewPage = () => {
    const {fileId} = useParams();
    const [pdfName, setPdfName] = React.useState("");
    const [pdf, setPdf] = React.useState([]);
    // const [numPages, setNumPages] = React.useState(null);
    // const [pageNumber, setPageNumber] = React.useState(1);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPdfName = async () => {
            const pdf = await getPdf(fileId)
            const pdfName = await getPdfName(fileId);
            var base64 = btoa(
                new Uint8Array(pdf)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setPdf("data:application/pdf;" + base64);
            setPdfName(pdfName);
        }
        fetchPdfName();
    }, [
        fileId
    ])

    // function onDocumentLoadSuccess({numPages}) {
    //     setNumPages(numPages);
    // }

    return (
        <div className="bg-[#001489] min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
                <button className="button-icon" onClick={() => navigate(-1)}>
                <FaArrowLeft />
                </button>
                <div className="text-2xl mb-4" style={{fontFamily:'Nexa-Heavy', color:'#001489'}}>{pdfName}</div>
                <BikoLogoBeyaz className="h-12"/>
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className="rounded p-8">
                    <div className="flex justify-center items-center mt-8">
                        <div className="bg-white rounded p-8 shadow-lg">
                            <div>
                                <iframe title='pdf'
                                    src={"https://drive.google.com/file/d/" + fileId + "/preview"}
                                    height="500px" width="650px"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPage;