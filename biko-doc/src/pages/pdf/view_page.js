import React, { useEffect } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {useParams, useNavigate} from "react-router-dom";
import getPdfName from '../../api/getPdfName';
import { ReactComponent as BikoLogoBeyaz } from "../../assets/images/BikoLogoBeyaz.svg";

const ViewPage = () => {
    const {fileId} = useParams();
    const [pdfName, setPdfName] = React.useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPdfName = async () => {
            const pdfName = await getPdfName(fileId);
            setPdfName(pdfName);
        }
        fetchPdfName();
    }, [
        fileId
    ])


    return (
        <div className="bg-black min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
            <button onClick={() => navigate(-1)}>Geri</button>
            <BikoLogoBeyaz className="h-12"/>
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className="bg-white rounded p-8 shadow-lg">
                    <div className="text-2xl font-bold mb-4">{pdfName}</div>
                    <div className="flex justify-center items-center mt-8">
                        <div className="bg-white rounded p-8 shadow-lg">
                            <div>
                                <iframe src={"https://drive.google.com/file/d/" + fileId + "/preview"}
                                        width={640} height={480}></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPage;