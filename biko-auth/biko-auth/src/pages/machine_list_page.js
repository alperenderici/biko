import React, {useEffect, useState} from 'react';
// import { Link } from "react-router-dom";
import {ReactComponent as BikoLogoBeyaz} from "../assets/images/BikoLogoBeyaz.svg";
import '../assets/fonts/fonts.css';
import { useDispatch, useSelector} from 'react-redux';
import { logout } from '../service/firebase';
import { logout as logoutAction } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const MachinesListPage = () => {
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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


  return (
    <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center">
            <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
                <div className="text-flex md:text-2xl lg:text-3xl" style={{fontFamily: 'Nexa-Heavy', color:'#001489'}}>Makina adi</div>
                <div>
                <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                    {
                    //list of machines
                    machines.map(machine => (
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}><a href={machine.url}>{machine.name}</a>
                            </div>
                        </div>
                    )

        //             machines.map(machine => (
        //   <Link key={machine.id} to={machine.link}>
        //     <button
        //       className={classNames(
        //         "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        //         { "opacity-50 cursor-not-allowed": !machine.link }
        //       )}
        //       disabled={!machine.link}
        //     >
        //       {machine.name}
        //     </button>
        //   </Link>
        // )
                    )}
                      
                    </div>
                </div>
            </div>
        </div>
  );
};

export default MachinesListPage;
