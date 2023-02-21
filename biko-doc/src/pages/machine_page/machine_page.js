import React, {useEffect, useState} from 'react';
import getFolders from "../../api/getFolders";
import {useParams} from "react-router-dom";
import getFolderName from "../../api/getFolderName";
import {ReactComponent as BikoLogoBeyaz} from "../../assets/images/BikoLogoBeyaz.svg";

const MachinePage = () => {
    const [folders, setFolders] = useState([]);
    const [machineName, setMachineName] = useState("");
    const {machineId} = useParams();

    useEffect(() => {
        const fetchFolders = async () => {
            const folders = await getFolders(machineId);
            const machineName = await getFolderName(machineId);
            setMachineName(machineName);
            setFolders(folders);
        }
        fetchFolders();
    }, [machineId]);

    return (
        <div className="bg-[#001489] min-h-screen">
            <div className="bg-white p-4 flex justify-between items-center">
                <div></div>
                <div className="text-2xl font-bold mb-4 ">{machineName}</div>
                <BikoLogoBeyaz className="h-12 justify-end"/>
            </div>
            <div className="flex justify-center items-center mt-8">
                <div className=" rounded p-8 shadow-lg">


                    <div className="grid grid-cols-1 gap-4">
                        {folders.map((folder) => (

                            <div className="bg-gray-100 p-4 rounded">
                                <div className="text-xl font-bold"><a href={`/folders/${folder.id}`}>{folder.name}</a>
                                </div>
                            </div>
                        ))}
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-xl font-bold"><a href="https://www.bikomuhendislik.com" target="_blank"
                                                                  rel="noopener noreferrer">Proses Kontrol</a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
export default MachinePage;