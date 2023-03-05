import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function RegisterUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register',{
                name,
                email,
                password
            });
            alert('Registration successful . Now you can login');
        }catch(e){
            alert('Registration Failed please try again later');
        }
    }

    return (

        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4 mt-6">Register</h1>
                <form className="max-w-md border-none mx-auto border" onSubmit={RegisterUser}>
                    <input type='text' placeholder="Enter your name" value={name} onChange={ev=>setName(ev.target.value)} />
                    <input type='email' placeholder="email@gmail.com" value={email} onChange={ev=>setEmail(ev.target.value)} />
                    <input type='password' placeholder="Enter your password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
                    <button className="login">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?  <Link className="underline text-black" to={'/login'}>Login</Link></div>
                </form>
            </div>
        </div>
    );
}