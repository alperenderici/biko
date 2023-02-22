import React, {useEffect} from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {useNavigate, useParams} from "react-router-dom";
import getPdfName from '../../api/getPdfName';
import {ReactComponent as BikoLogoBeyaz} from "../../assets/images/BikoLogoBeyaz.svg";
import getPdf from "../../api/getPdf";
import "./view_page.css";
import { FaArrowLeft } from 'react-icons/fa';
import '../../assets/fonts/fonts.css'; 


const ViewPage = () => {
    const {fileId} = useParams();
    const [pdfName, setPdfName] = React.useState("");
    const [,setPdf] = React.useState([]);
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

    return (
        <div className="bg-[#001489] min-h-screen overflow-hidden"> 
            <div className="bg-white p-2 flex justify-between items-center">
                <button className="button-icon text-flex md:text-2xl lg:text-3xl" onClick={() => navigate(-1)}>
                <FaArrowLeft />
                </button>
                <div className="text-flex md:text-2xl lg:text-3xl p-2" style={{fontFamily:'Nexa-Heavy', color:'#001489'}}>{pdfName}</div>
                <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-2">
                    <div className="flex justify-center items-center ">
                        <div className="bg-white rounded p-2 shadow-lg relative">
                            <div className='h-[500px] sm:h-[700px] sm:max-w-full sm:w-[700px] md:h-[1000px] md:max-w-full md:w-[700px] lg:h-[1200px] lg:max-w-full lg:w-[800px]'>
                                <iframe title='pdf'
                                    src={"https://drive.google.com/file/d/" + fileId + "/preview"}
                                    allowFullScreen height='100%' width='100%'></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default ViewPage;