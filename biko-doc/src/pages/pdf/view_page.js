//create component for PDF view
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useParams } from "react-router-dom";
import getPDF from "../../api/getPDF";
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdf, setPDF] = useState(null);
    const { fileId } = useParams();

    useEffect(() => {
        const fetchPDF = async () => {
            const pdf = await getPDF(fileId);
            setPDF(pdf);
        }

        fetchPDF();
    }
    );

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }


    function nextPage() {
        changePage(1);
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
                <img
                    src="https://www.bikomuhendislik.com/wp-content/uploads/elementor/thumbs/logobluebgjpg-pzq4u5i4e6vfnr8ynkjkxjth7np54ktko9x3wg70u8.jpg"
                    alt="Brand Logo" className="h-12" />
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className="bg-white rounded p-8 shadow-lg">
                    <div className="text-2xl font-bold mb-4">{"A makinasi"}</div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-xl font-bold"><a href={`/folders/${fileId}`}>{pdf}</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-8">
                        <div className="bg-white rounded p-8 shadow-lg">
                            <Document
                                file={pdf}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <p>
                                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </p>
                            <div className="flex justify-center items-center mt-8">
                                <Button variant="primary" onClick={previousPage} disabled={pageNumber <= 1}>
                                    Previous
                                </Button>
                                <Button variant="primary" onClick={nextPage} disabled={pageNumber >= numPages}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPage;