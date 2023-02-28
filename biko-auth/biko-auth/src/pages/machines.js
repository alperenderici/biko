import React, { useState, useEffect } from 'react';
import { auth, database } from './firebase';

function Machines() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    database.ref(`users/${uid}/machines`).on('value', (snapshot) => {
      const machines = [];
      snapshot.forEach((childSnapshot) => {
        machines.push({
          id: childSnapshot.key,
          name: childSnapshot.val().name,
          url: childSnapshot.val().url,
        });
      });
      setMachines(machines);
    });
  }, []);

  const handleMachineClick = (machine) => {
    window.open(machine.url, '_blank');
  };

  return (
    <div>
      <h1>Machines</h1>
      <ul>
        {machines.map((machine) => (
          <li key={machine.id}>
            <button onClick={() => handleMachineClick(machine)}>{machine.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Machines;
