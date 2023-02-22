import React, {useEffect, useState} from 'react';
import getFolders from "../../api/getFolders";
import {useParams} from "react-router-dom";
import getFolderName from "../../api/getFolderName";
import {ReactComponent as BikoLogoBeyaz} from "../../assets/images/BikoLogoBeyaz.svg";
import '../../assets/fonts/fonts.css'; 

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
        <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center">
            <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
                <div className="text-flex md:text-2xl lg:text-3xl" style={{fontFamily: 'Nexa-Heavy', color:'#001489'}}>{machineName}</div>
                <div></div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                        {folders.map((folder) => (
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}><a href={`/folders/${folder.id}`}>{folder.name}</a>
                                </div>
                            </div>
                        ))}
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}><a href="https://www.bikomuhendislik.com" target="_blank"
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