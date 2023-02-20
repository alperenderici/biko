import React, {useEffect, useState} from "react";
import getFiles from "../../api/getFiles";
import {useParams} from "react-router-dom";
import getFolderName from "../../api/getFolderName";


const FileList = () => {
    const [files, setFiles] = useState([]);
    const [folderName, setFolderName] = useState("");
    const {folderId} = useParams();

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
                <img
                    src="https://www.bikomuhendislik.com/wp-content/uploads/elementor/thumbs/logobluebgjpg-pzq4u5i4e6vfnr8ynkjkxjth7np54ktko9x3wg70u8.jpg"
                    alt="Brand Logo" className="h-12"/>
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