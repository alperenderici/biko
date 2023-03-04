import React, {useEffect, useState} from 'react';
import {getMachines, getMachine} from "./firebase";
import { Link } from "react-router-dom";
import { classNames } from "classnames/bind";
import { BikoLogoBeyaz } from '../assets/images/biko-logo-beyaz';

const MachinesListPage = () => {
  const [machines, setMachines] = useState([]);

  //get machines list from firebase
    useEffect(() => {
        getMachines().then((machines) => {
            setMachines(machines);
        });
    }, []);


//   useEffect(() => {
//     const unsubscribe = firebase.firestore().collection("machines").onSnapshot(snapshot => {
//       const machinesData = [];
//       snapshot.forEach(doc => {
//         const data = doc.data();
//         machinesData.push({
//           id: doc.id,
//           name: data.name,
//           link: data.link
//         });
//       });
//       setMachines(machinesData);
//     });
//     return unsubscribe;
//   }, []);

  return (
    <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center">
            <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
                <div className="text-flex md:text-2xl lg:text-3xl" style={{fontFamily: 'Nexa-Heavy', color:'#001489'}}>Makina adi</div>
                <div></div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                    {
                    //list of machines
                    machines.map(machine => (
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}><a href={`/pdf/${machine.id}`}>{machine.name}</a>
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
};

export default MachinesListPage;
