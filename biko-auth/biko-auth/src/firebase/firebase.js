import firebase from 'firebase/app' 
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  // your Firebase config goes here
  apiKey: "AIzaSyC6jGMcagdGuBBhEfpejjSA-SG1dptJU4Y",
  authDomain: "biko-2ab5a.firebaseapp.com",
  projectId: "biko-2ab5a",
  storageBucket: "biko-2ab5a.appspot.com",
  messagingSenderId: "390480891346",
  appId: "1:390480891346:web:6df0b59f23fa74df714c0b",
  measurementId: "G-LMTXSSMCBG"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export async function createUser(name, password) {
  const usersRef = firestore.collection("users");

  const newUser = {
    name,
    password,
    machines: []
  };

  const newUserRef = await usersRef.add(newUser);

  return newUserRef.id;
}

export async function createMachine(name, url) {
  const machinesRef = firestore.collection("machines");

  const newMachine = {
    name,
    url
  };

  const newMachineRef = await machinesRef.add(newMachine);

  return newMachineRef.id;
}

export async function addMachineToUser(userId, machineId) {
  const usersRef = firestore.collection("users");
  const machinesRef = firestore.collection("machines");

  const userRef = usersRef.doc(userId);
  const machineRef = machinesRef.doc(machineId);

  await userRef.update({
    machines: firebase.firestore.FieldValue.arrayUnion(machineRef)
  });
}

export async function getMachinesForUser(userId) {
  const usersRef = firestore.collection("users");
  const userRef = usersRef.doc(userId);

  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const userData = userDoc.data();
    const machineRefs = userData.machines;

    const machines = await Promise.all(machineRefs.map((ref) => ref.get()));
    const machineData = machines.map((doc) => ({ id: doc.id, ...doc.data() }));

    return machineData;
  } else {
    throw new Error("User not found");
  }
}