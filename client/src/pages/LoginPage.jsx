import {useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../UserContext";
export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} =  useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login',{email,password});
            alert('Login Successful');
            setUser(data);
            setRedirect(true);
        }catch(e){
            console.log(e);
            alert('Login Failed');
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4 mt-6">Login</h1>
                <form className="max-w-md border-none mx-auto border" onSubmit={handleLoginSubmit}>
                    <input type='email' placeholder="email@gmail.com" value={email} onChange={ev=>setEmail(ev.target.value)}/>
                    <input type='password' placeholder="Enter your password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
                    <button className="login">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?  <Link className="underline text-black" to={'/register'}>Register now</Link></div>
                </form>
            </div>
        </div>
    );
}