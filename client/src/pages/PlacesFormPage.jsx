import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from '../Perks'
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirectToPlaces,setRedirectToPlaces] = useState(false);

    function preInput(title, desc) {
        return (
            <>
                <h2 className="text-2xl mt-4">{title}</h2>
                <p className="text-gray-500 text-sm">{desc}</p>
            </>
        )
    }

    async function addNewPalace(ev){
        ev.preventDefault();  
        await axios.post('/places',{
            title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests
        });
        setRedirectToPlaces(true);
    }
    if(redirectToPlaces){
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>
            <form onSubmit={addNewPalace}>
                {preInput('Title', 'Title for your place, should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title for hotel" />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'Select all the perks of your place')}
                <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid sm:grid-cols-3 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max guests numbers</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                </div>
                <button className="login my-4">Save</button>
            </form>
        </div>
    );
}