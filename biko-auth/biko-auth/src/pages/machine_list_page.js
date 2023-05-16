import React, {useEffect, useState} from 'react';
import {ReactComponent as BikoLogoBeyaz} from "../assets/images/BikoLogoBeyaz.svg";
import '../assets/fonts/fonts.css';
import { useDispatch} from 'react-redux';
import { logout } from '../service/firebase';
import { logout as logoutAction } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import {getMachines, getCurrentUserUID} from '../service/firebase';

const MachinesListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [machines, setMachines] = useState([]);
    // const currentUserUID = getCurrentUserUID();
    const [currentUserUID, setCurrentUserUID] = useState(''); // State to store the user UID


    useEffect(() => {
        const fetchMachines = async () => {
          const machinesData = await getMachines();
          setMachines(machinesData);
        };
        // fetchMachines();
      }, []);

      

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login', {
    //             replace: true
    //         });
    //     }
    //     const fetchMachines = async () => {
    //         const machines = await getMachines();
    //         setMachines(machines);
    //     }
    //     fetchMachines();
    // }, [user]);

    const handleLogout = async () => {
        await logout();
        dispatch(logoutAction());
        navigate('/auth', {
            replace: true
        });
    }

    useEffect(() => {
        const getUserUID = async () => {
          const uid = await getCurrentUserUID();
          setCurrentUserUID(uid || '');
        };
    
        getUserUID();
      }, []);

  return (
    <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center"> 
            <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
                <div className="text-flex md:text-2xl lg:text-3xl" style={{fontFamily: 'Nexa-Heavy', color:'#001489'}}>{currentUserUID}</div>
                <div>
                <button onClick={handleLogout} style={{fontFamily: 'Nexa-Heavy', color:'#001489'}}>Log Out</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                    {
                    machines.map(machine => (
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}><a href={machine.url}>{machine.name}</a>
                            </div>
                        </div>
                    ),)
                    }
                    </div>
                </div>
            </div>
        </div>
  );
};

export default MachinesListPage;
