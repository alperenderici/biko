import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    register,
    addMachine,
    createCompany,
    getCurrentUserUID,
    deleteAuthUser,
    deleteMachine
} from '../service/firebase';
import {ReactComponent as BikoLogoBeyaz} from "../assets/images/BikoLogoBeyaz.svg";
import '../assets/fonts/fonts.css';
import {useDispatch} from 'react-redux';
import {logout as logoutAction} from '../store/auth';
import {logout} from '../service/firebase';
import toast from 'react-hot-toast';

const RegisterFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email,
        setEmail] = useState('');
    const [password,
        setPassword] = useState('');
    const [companyName,
        setCompanyName] = useState('');
    const [showAddUserForm,
        setShowAddUserForm] = useState(false); // State to control Add User form visibility
    const [showAddMachineForm,
        setShowAddMachineForm] = useState(false); // State to control Add Machine form visibility
    const [showDeleteUserForm,
        setShowDeleteUserForm] = useState(false); // State to control Delete User form visibility
    const [showDeleteMachineForm,
        setShowDeleteMachineForm] = useState(false); // State to control Delete Machine form visibility
    const [machineID,
        setMachineID] = useState('');
    const [machineName,
        setMachineName] = useState('');
    const [machineSerial,
        setMachineSerial] = useState('');
    const [machineURL,
        setMachineURL] = useState('');
    const [targetEmail,
        setTargetEmail] = useState(''); // State to control Add User form visibility
    const [deleteUserEmail,
        setDeleteUserEmail] = useState('');
    const [deleteMachineID,
        setDeleteMachineID] = useState('');
    const [deleteTargetEmail,
        setDeleteTargetEmail] = useState(''); // State to control Add User form visibilityq

    const handleDeleteUserChange = (e) => {
        setDeleteUserEmail(e.target.value);
    };

    const handleDeleteMachineChange = (e) => {
        setDeleteMachineID(e.target.value);
    };

    const handleDeleteUserSubmit = async(e) => {
        e.preventDefault();
        try {
            await deleteAuthUser(deleteUserEmail);
            toast.success('User deleted successfully');
            setDeleteUserEmail('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteTargetEmailChange = (e) => {
        setDeleteTargetEmail(e.target.value);
    };

    const handleDeleteMachineSubmit = async(e) => {
        e.preventDefault();
        try {
            await deleteMachine(deleteTargetEmail, deleteMachineID);
            toast.success('Machine deleted successfully');
            console.log(deleteTargetEmail, deleteMachineID);
            console.log(deleteMachine);

            setDeleteTargetEmail('');
            setDeleteMachineID('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUserSubmit = async(e) => {
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

    const handleMachineSubmit = async(e) => {
        e.preventDefault();
        try {
            await addMachine(getCurrentUserUID(targetEmail), machineID, machineName, machineSerial, machineURL);
            toast.success('Machine added successfully');
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

    const handleLogout = async() => {
        await logout();
        dispatch(logoutAction());
        navigate('/auth', {replace: true});
    };

    const handleAddUser = () => {
        setShowAddUserForm(false);
        setShowAddMachineForm(true);
        setShowDeleteUserForm(false);
        setShowDeleteMachineForm(false);
    };

    const handleAddMachine = () => {
        setShowAddUserForm(true);
        setShowAddMachineForm(false);
        setShowDeleteUserForm(false);
        setShowDeleteMachineForm(false);
    };

    const handleDeleteUser = () => {
        setShowAddUserForm(false);
        setShowAddMachineForm(false);
        setShowDeleteUserForm(true);
        setShowDeleteMachineForm(false);
    };

    const handleDeleteMachine = () => {
        setShowAddUserForm(false);
        setShowAddMachineForm(false);
        setShowDeleteUserForm(false);
        setShowDeleteMachineForm(true);
    };

    return (
        <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center">
                <BikoLogoBeyaz
                    className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
                <div
                    className="text-flex md:text-2xl lg:text-3xl"
                    style={{
                    fontFamily: 'Nexa-Heavy',
                    color: '#001489'
                }}>{'Admin Panel'}</div>
                <div>
                    <button
                        onClick={handleLogout}
                        style={{
                        fontFamily: 'Nexa-Heavy',
                        color: '#001489'
                    }}>Log Out</button>
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">

                        <button
                            onClick={handleAddUser}
                            style={{
                            fontFamily: 'Nexa-Heavy',
                            color: 'white'
                        }}>Add User</button>
                        <button
                            onClick={handleAddMachine}
                            style={{
                            fontFamily: 'Nexa-Heavy',
                            color: 'white'
                        }}>Add Machine</button>
                        <button
                            onClick={handleDeleteUser}
                            style={{
                            fontFamily: 'Nexa-Heavy',
                            color: 'white'
                        }}>Delete User</button>
                        <button
                            onClick={handleDeleteMachine}
                            style={{
                            fontFamily: 'Nexa-Heavy',
                            color: 'white'
                        }}>Delete Machine</button>

                        {showAddUserForm && (
                            <form
                                className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                onSubmit={handleMachineSubmit}>
                                  <div
                                        className="items-center justify-center mb-4"
                                        style={{
                                        fontFamily: 'Nexa-Heavy',
                                        color: '#001489'
                                    }}>Add Machine
                                    </div>
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
                                        required/>
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password">
                                        Machine ID
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="machineID"
                                        type="machineID"
                                        placeholder="Machine ID"
                                        value={machineID}
                                        onChange={handleMachineIDChange}
                                        required/>
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password">
                                        Machine Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="machineName"
                                        type="machineName"
                                        placeholder="Machine Name"
                                        value={machineName}
                                        onChange={handleMachineNameChange}
                                        required/>
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password">
                                        Machine Serial
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="machineSerial"
                                        type="machineSerial"
                                        placeholder="Machine Serial"
                                        value={machineSerial}
                                        onChange={handleMachineSerialChange}
                                        required/>
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password">
                                        URL
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="machineURL"
                                        type="machineURL"
                                        placeholder="URL"
                                        value={machineURL}
                                        onChange={handleMachineURLChange}
                                        required/>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Add Machine
                                    </button>
                                </div>
                            </form>
                        )}
                        {showAddMachineForm && (
                            <form
                                className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                onSubmit={handleUserSubmit}>
                                <div className="mb-4">
                                <div
                                        className="items-center justify-center mb-4"
                                        style={{
                                        fontFamily: 'Nexa-Heavy',
                                        color: '#001489'
                                    }}>Add User
                                    </div>
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
                                        required/>
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required/>
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password">
                                        Company Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="companyName"
                                        type="companyName"
                                        placeholder="Company Name"
                                        value={companyName}
                                        onChange={handleCompanyNameChange}
                                        required/>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Register
                                    </button>
                                </div>
                            </form>
                        )}
                        {showDeleteUserForm && (
                            <form
                                className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                onSubmit={handleDeleteUserSubmit}>
                                  <div
                                        className="items-center justify-center mb-4"
                                        style={{
                                        fontFamily: 'Nexa-Heavy',
                                        color: '#001489'
                                    }}>Delete User
                                    </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="deleteUserEmail">
                                        User Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="deleteUserEmail"
                                        type="email"
                                        placeholder="User Email"
                                        value={deleteUserEmail}
                                        onChange={handleDeleteUserChange}
                                        required/>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Delete User
                                    </button>
                                </div>
                            </form>
                        )}

                        {showDeleteMachineForm && (
                            <form
                                className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                onSubmit={handleDeleteMachineSubmit}>
                                <div className="mb-4">
                                    <div
                                        className="items-center justify-center mb-4"
                                        style={{
                                        fontFamily: 'Nexa-Heavy',
                                        color: '#001489'
                                    }}>Delete Machine
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="deleteTargetEmail">
                                            User Email
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="deleteTargetEmail"
                                            type="deleteTargetEmail"
                                            placeholder="User Email"
                                            value={deleteTargetEmail}
                                            onChange={handleDeleteTargetEmailChange}
                                            required/>
                                    </div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="deleteMachineID">
                                        Machine ID
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="deleteMachineID"
                                        type="text"
                                        placeholder="Machine ID"
                                        value={deleteMachineID}
                                        onChange={handleDeleteMachineChange}
                                        required/>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Delete Machine
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