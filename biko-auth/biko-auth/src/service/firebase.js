import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  onIdTokenChanged
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { getFirestore } from 'firebase/firestore';
import { setDoc, getDoc, doc, updateDoc } from 'firebase/firestore';




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const checkUserAuthStatus = async () => {
    try {
      const user = await getCurrentUserUID();
      if (user) {
        const token = await user.getIdToken();
        if (token) {
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error('Error checking user authentication status:', err);
      return false;
    }
  };
  
  export const getCurrentUserUID = async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      }, reject);
    });
  };

export const deleteAuthUser = async (email) => {
  try {
    const user = await getCurrentUserUID(email);
    await deleteUser(auth, user);
    console.log('Successfully deleted user');
    return user;
  } catch (err) {
    console.error('Error deleting user:', err);
    toast.error(err.message);
    throw err;
  }
};


// export const getCurrentUserUID = async() => {
//     return new Promise((resolve, reject) => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             unsubscribe();
//             if (user) {
//                 resolve(user.uid);
//             } else {
//                 resolve(null);
//             }
//         }, reject);
//     });
// };

export const createCompany = async(companyName) => {
    try {
        const user = await getCurrentUserUID();
        const docRef = doc(db, "machines", user);
        await setDoc(docRef, {
            Name: companyName,
            makinalar: []
        });
        return user;
    } catch (err) {
        toast.error(err.message);
    }
};

export const getMachines = async() => {
    const user = await getCurrentUserUID();
    if (user) {
        const docRef = doc(db, "machines", user);
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    }
};


export const deleteMachine = async (targetUser, machineID) => {
  try {
      const user = await getCurrentUserUID(targetUser);
      const docRef = doc(db, "machines", user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const existingMakinalar = docSnap.data().makinalar || [];
          const machineIndex = existingMakinalar.findIndex(
              (machine) => machine.id === machineID
          );
          if (machineIndex !== -1) {
              existingMakinalar.splice(machineIndex, 1);
              await updateDoc(docRef, { makinalar: existingMakinalar });
          }
      } else {
          toast.error("Makina bulunamadı");
      }
      return user;
  } catch (err) {
      toast.error(err.message);
  }
};

export const addMachine = async(targetUser, id, name, serial, url) => {
    try {
        const user = await getCurrentUserUID(targetUser);
        const docRef = doc(db, "machines", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const machineData = {
                id: id,
                name: name,
                serial: serial,
                url: url
            };
            // Get the existing "makinalar" array from the document
            const existingMakinalar = docSnap
                .data()
                .makinalar || [];
            // Add the new machine data to the array
            existingMakinalar.push(machineData);
            // Update the document with the modified "makinalar" array
            await updateDoc(docRef, {makinalar: existingMakinalar});
        } else {
            // Handle the case when the document doesn't exist Create a new document and add
            // the machine data
            await setDoc(docRef, {
                makinalar: [
                    {
                        id: id,
                        name: name,
                        serial: serial,
                        url: url
                    }
                ]
            });
        }
        return user;
    } catch (err) {
        toast.error(err.message);
    }
};

export const register = async(email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (err) {
        toast.error(err.message);
    }
};

export const login = async(email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (err) {
        toast.error(err.message);
    }
};

export const logout = async() => {
    try {
        await signOut(auth);
        return true;
    } catch (err) {
        toast.error(err.message);
    }
};

export {app, auth, db};
