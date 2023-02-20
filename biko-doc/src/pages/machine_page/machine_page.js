import React, {useEffect, useState} from 'react';
import getFolders from "../../api/getFolders";
import {useParams} from "react-router-dom";


const MachinePage = () => {
    const [folders, setFolders] = useState([]);
    const {machineId} = useParams();

    useEffect(() => {
        const fetchFolders = async () => {
            const folders = await getFolders(machineId);
            setFolders(folders);
        }

        fetchFolders();
    });

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
                    
                    <div className="grid grid-cols-1 gap-4">
                        {folders.map((folder) => (
                            
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="text-xl font-bold"><a href={`/folders/${folder.id}`}>{folder.name}</a>
                                </div>


                            </div>
                        ))}
                    </div>
                    

                </div>
            </div>
        </div>
    );
}
export default MachinePage;