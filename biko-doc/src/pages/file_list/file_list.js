import React, {useEffect, useState} from "react";
import getFiles from "../../api/getFiles";
import {useParams, useNavigate} from "react-router-dom";
import getFolderName from "../../api/getFolderName";
import { ReactComponent as BikoLogoBeyaz } from "../../assets/images/BikoLogoBeyaz.svg";

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [folderName, setFolderName] = useState("");
    const {folderId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            const files = await getFiles(folderId);
            const folderName = await getFolderName(folderId);
            setFolderName(folderName);
            setFiles(files);
        }

        fetchFiles();
    }, [
        folderId
    ])

    return (
        <div className="bg-black min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
                 <button onClick={() => navigate(-1)}>Geri</button>
                 {/* <button class="back-button" onClick={() => navigate(-1)}>
                    <span class="arrow"></span>
                    </button> */}

                 <BikoLogoBeyaz className="h-12"/>
            </div>

            <div className="flex justify-center items-center mt-8">
                <div className="bg-white rounded p-8 shadow-lg">
                    <div className="text-2xl font-bold mb-4">{folderName}</div>
                    <div className="grid grid-cols-1 gap-4">
                        {files.map((file) => (
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="bg-gray-100 p-4 rounded">
                                    <div className="text-xl font-bold"><a href={`/pdf/${file.id}`}>{file.name}</a>
                                    </div>
                                </div>
                                
                            </div>
                        ))}

                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default FileList;