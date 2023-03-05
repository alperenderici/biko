import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {login} from '../service/firebase';
import {ReactComponent as BikoLogoBeyaz} from "../assets/images/BikoLogoBeyaz.svg";
import '../assets/fonts/fonts.css';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/auth';

const LoginFormPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password);
        if (user) {
            dispatch(loginAction(user));
            navigate('/machines', {
                replace: true
            });
        }
    }

    return (
        <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center">
            <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-end"/>
                <div className="text-flex md:text-2xl lg:text-3xl" style={{fontFamily: 'Nexa-Heavy', color:'#001489'}}>Proses Kontrol</div>
                <div></div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                        {
                        <form onSubmit={handleSubmit}>
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}>
                                <label className='block text-sm font-medium text-gray-700'>
                                    E-mail
                                    </label>
                                <input type='email'
                                className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                placeholder='you@example.com'
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="text-flex md:text-xl lg:text-2xl" style={{fontFamily:'AvantGarde Md BT'}}>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Password
                                    </label>
                                <input type='password'
                                className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                                placeholder='********'
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded">
                                <div className="text-flex md:text-xl lg:text-2xl disabled:opacity-20" style={{fontFamily:'AvantGarde Md BT'}}>
                                    <button disabled={!email || !password} type='submit'>Sign In</button>
                                </div>
                            </div>
                        </form>
                        }
                    </div>
                </div>
            </div>
        </div>

        
            

    );





} 
export default LoginFormPage;