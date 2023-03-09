import { useEffect, useState } from "react"
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import {useContext} from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";


export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');

    const {user} = useContext(UserContext);
    useEffect(()=>{
        if(user){
            setName(user.name); 
        }
    },[user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }
    async function bookThisPlace(){
        const response = await axios.post('/booking',{place:place._id,checkIn,checkOut,numberOfGuests,name,phone,price:numberOfNights*place.price});
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
    if(redirect){
        return <Navigate to={redirect} />
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price : ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex border-b">
                    <div className="my-4 200 py-2 px-4">
                        <label>Check In:</label>
                        <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="date" />
                    </div>
                    <div className="my-4 200 py-2 px-4 border-l">
                        <label>Check Out:</label>
                        <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="date" />
                    </div>
                </div>
                <div className="my-4 200 py-2 px-4 border-l">
                    <label>Number of Guests:</label>
                    <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="my-4 200 py-2 px-4 border-l">
                        <label>Your FullName:</label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                        <label>Phone Number:</label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} /> 
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="login mt-4">
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}