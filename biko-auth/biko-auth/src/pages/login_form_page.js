import React, {useState} from 'react';
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
        if(user){
            dispatch(loginAction(user));
            navigate('/machines', {
                replace: true
            });
        }
        if (user.user.email === "admin1@admin.com") {
            dispatch(loginAction(user));
            navigate('/register', {
                replace: true
            });
        } else if(user){
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
                        <form className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="email@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
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
                            placeholder="********"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={!email || !password} type="submit"
                          >
                            Sign In
                          </button>
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