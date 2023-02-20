//create component for PDF view
import React, {useEffect, useState} from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {useParams} from "react-router-dom";
import getPdf from "../../api/getPdf";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';

const ViewPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdf, setPDF] = useState(null);

    const {fileId} = useParams();

    useEffect(() => {
            const fetchPDF = async () => {
                const pdfData = await getPdf(fileId);
                setPDF(pdfData);
            }

            fetchPDF();
        }
        , [fileId]);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
                <img
                    src="https://www.bikomuhendislik.com/wp-content/uploads/elementor/thumbs/logobluebgjpg-pzq4u5i4e6vfnr8ynkjkxjth7np54ktko9x3wg70u8.jpg"
                    alt="Brand Logo" className="h-12"/>
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className="bg-white rounded p-8 shadow-lg">
                    <div className="text-2xl font-bold mb-4">{"A makinasi"}</div>
                    <div className="flex justify-center items-center mt-8">
                        <div className="bg-white rounded p-8 shadow-lg">
                            <div>
                                {!pdf && <span>Loading...</span>}

                                <Document file={{url: pdf}} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber}/>
                                </Document>
                                <p>
                                    Page {pageNumber} of {numPages}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPage;