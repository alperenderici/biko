import { useEffect, useState } from "react";
import { auth, firestore } from "./firebase/firebase";

function MachineListScreen() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      const userRef = firestore.collection("users").doc(auth.currentUser.uid);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        const machineIds = userData.machines;

        const machinesRef = firestore.collection("machines");
        const machineDocs = await Promise.all(machineIds.map((id) => machinesRef.doc(id).get()));
        const machineData = machineDocs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setMachines(machineData);
      }
    };

    if (auth.currentUser) {
      fetchMachines();
    }
  }, []);

  const handleMachineClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      {machines.map((machine) => (
        <button key={machine.id} onClick={() => handleMachineClick(machine.url)}>
          {machine.name}
        </button>
      ))}
    </div>
    // <div>
    //   <h1>Machine List</h1>
    //   <ul>
    //     {machines.map((machine) => (
    //       <li key={machine.id}>
    //         <button onClick={() => window.location.href = machine.url}>{machine.name}</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default MachineListScreen;
