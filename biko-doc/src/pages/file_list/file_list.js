import React, {useEffect, useState} from "react";
import getFiles from "../../api/getFiles";
import {useNavigate, useParams} from "react-router-dom";
import getFolderName from "../../api/getFolderName";
import {ReactComponent as BikoLogoBeyaz} from "../../assets/images/BikoLogoBeyaz.svg";
import {FaArrowLeft} from "react-icons/fa";
import "./file_list.css";
import '../../assets/fonts/fonts.css'; 


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
        <div className="bg-[#001489] min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
            <button className="button-icon" onClick={() => navigate(-1)}>
                <FaArrowLeft />
                </button>
                <div className="text-2xl mb-4 text-color:[#001489]" style={{fontFamily:'Nexa-Heavy', color:'#001489'}} >{folderName}</div> 
                <BikoLogoBeyaz className="h-12"/>
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className="rounded p-8">
                    <div className="grid grid-cols-1 gap-4">
                        {files.map((file) => (
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="bg-gray-100 p-4 rounded">
                                    <div className="text-xl" style={{fontFamily:'AvantGarde Md BT'}}><a href={`/pdf/${file.id}`}>{file.name}</a>
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