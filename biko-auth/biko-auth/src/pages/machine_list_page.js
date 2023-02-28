import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Link } from "react-router-dom";
import { classNames } from "classnames/bind";

const MachinesListPage = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection("machines").onSnapshot(snapshot => {
      const machinesData = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        machinesData.push({
          id: doc.id,
          name: data.name,
          link: data.link
        });
      });
      setMachines(machinesData);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Client Machines</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {machines.map(machine => (
          <Link key={machine.id} to={machine.link}>
            <button
              className={classNames(
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                { "opacity-50 cursor-not-allowed": !machine.link }
              )}
              disabled={!machine.link}
            >
              {machine.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MachinesListPage;
