import React from 'react';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { login } from '../service/firebase';
import {ReactComponent as BikoLogoBeyaz} from "../assets/images/BikoLogoBeyaz.svg";

const LoginFormPage = () => {
    //

    //useForm hook
    const {handleSubmit, errors } = useForm();
    // //useNavigate hook
    const navigate = useNavigate();

   //call login function and show machines page if user id = machine id if not show error
    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/machines');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-[#001489] min-h-screen overflow-hidden">
            <div className="bg-white p-2 flex justify-between items-center">
            <button className="button-icon text-flex md:text-2xl lg:text-3xl" 
            onClick={
                () => {}
                // () => navigate(-1)
            }>
                <FaArrowLeft />
                </button>
                <div className="text-flex md:text-2xl lg:text-3xl" style={{fontFamily:'Nexa-Heavy', color:'#001489'}} >Proses Kontrol</div> 
                <BikoLogoBeyaz className="h-12 sm:h-8 md:h-10 lg:h-12 xl:h-16 w-auto justify-start"/>
            </div>
            <div className="flex justify-center items-center mt-4">
                <div className="rounded p-4">
                    <div className="grid grid-cols-1 gap-4">
                        {
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={
                                    login({
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Email is invalid',
                                        },
                                    })
                                }
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
        
                                type="password"
                                name="password"
                                id="password"
                                ref={
                                    login({
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })
                                    }
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <button type="submit">Login</button>
                    </form>
                        }
                    </div>
                </div>
            </div>
        </div>

        
            

    );





} 
export default LoginFormPage;