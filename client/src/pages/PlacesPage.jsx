import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceImg from '../PlaceImg';

import AccountNav from "../AccountNav";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        });
    }, []);
    return (
        <div>
            <AccountNav />
            <div className=" text-center">
                <Link className="bg-primary gap-1 inline-flex text-white rounded-full py-2 px-6" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add my place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} className="flex gap-4 mt-2 cursor-pointer bg-gray-200 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                           <PlaceImg place={place}/>
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="mt-2 text-sm">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}