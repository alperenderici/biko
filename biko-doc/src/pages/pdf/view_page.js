//create component for PDF view
import React from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {useParams} from "react-router-dom";

const ViewPage = () => {
    const {fileId} = useParams();

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