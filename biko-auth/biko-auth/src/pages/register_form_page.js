import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, addMachine, createCompany, getCurrentUserUID} from '../service/firebase';
import { ReactComponent as BikoLogoBeyaz } from "../assets/images/BikoLogoBeyaz.svg";
import '../assets/fonts/fonts.css';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/auth';
import { logout } from '../service/firebase';
import toast from 'react-hot-toast';


const RegisterFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false); // State to control Add User form visibility
  const [showAddMachineForm, setShowAddMachineForm] = useState(false); // State to control Add Machine form visibility
  const [machineID, setMachineID] = useState('');
  const [machineName, setMachineName] = useState('');
  const [machineSerial, setMachineSerial] = useState('');
  const [machineURL, setMachineURL] = useState('');
  const [targetEmail, setTargetEmail] = useState(''); // State to control Add User form visibility

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
    };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
        await register(email, password);
        await createCompany(companyName);
        toast.success('Company name added successfully');

        setEmail('');
        setPassword('');
        setCompanyName('');
      } catch (error) {
        toast.error(error.message);
      }
    setEmail('');
    setPassword('');
    setCompanyName('');
  };

  const handleMachineIDChange = (e) => {
    setMachineID(e.target.value);
    };

    const handleMachineNameChange = (e) => {
    setMachineName(e.target.value);
    };

    const handleMachineSerialChange = (e) => {
    setMachineSerial(e.target.value);
    };

    const handleMachineURLChange = (e) => {
    setMachineURL(e.target.value);
    };

    const handleAddUserMachineChange = (e) => {
    setTargetEmail(e.target.value);
    };


  const handleMachineSubmit = async (e) => {
    e.preventDefault();
    try {
        await addMachine(getCurrentUserUID(targetEmail), machineID, machineName, machineSerial, machineURL);
        toast.success('Machine added successfully');
        console.log(addMachine);
        setTargetEmail('');
        setMachineID('');
        setMachineName('');
        setMachineSerial('');
        setMachineURL('');
        
      } catch (error) {
        toast.error(error.message);
      }
    setTargetEmail('');
    setMachineID('');
    setMachineName('');
    setMachineSerial('');
    setMachineURL('');
  };

  const handleLogout = async () => {
    await logout();
    dispatch(logoutAction());
    navigate('/auth', {
      replace: true
    });
  };

  const handleAddUser = () => {
    setShowAddUserForm(false);
    setShowAddMachineForm(true);
  };

  const handleAddMachine = () => {
    setShowAddUserForm(true);
    setShowAddMachineForm(false);
  };

  return (
    <div className="bg-[#001489] min-h-screen overflow-hidden">
      <div className="bg-white p-2 flex justify-between items-center">
        <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end" />
        <div className="text-flex md:text-2xl lg:text-3xl" style={{ fontFamily: 'Nexa-Heavy', color: '#001489' }}>{'Register page'}</div>
        <div>
          <button onClick={handleLogout} style={{ fontFamily: 'Nexa-Heavy', color: '#001489' }}>Log Out</button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                    <button onClick={handleAddUser} style={{ fontFamily: 'Nexa-Heavy', color: 'white' }}>Add User</button>
          <button onClick={handleAddMachine} style={{ fontFamily: 'Nexa-Heavy', color: 'white' }}>Add Machine</button>
        
        {showAddUserForm && (
          <form className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleMachineSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              User Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="targetEmail"
              type="targetEmail"
              placeholder="User Email"
              value={targetEmail}
              onChange={handleAddUserMachineChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Machine ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="machineID"
              type="machineID"
              placeholder="Machine ID"
              value={machineID}
              onChange={handleMachineIDChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Machine Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="machineName"
              type="machineName"
              placeholder="Machine Name"
              value={machineName}
              onChange={handleMachineNameChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Machine Serial
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="machineSerial"
              type="machineSerial"
              placeholder="Machine Serial"
              value={machineSerial}
              onChange={handleMachineSerialChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
             URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="machineURL"
              type="machineURL"
              placeholder="URL"
              value={machineURL}
              onChange={handleMachineURLChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        )}
        {showAddMachineForm && (
          <form className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleUserSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Company Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={handleCompanyNameChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        )}
                    </div>
                </div>
            </div>
    </div>
  );
};

export default RegisterFormPage;