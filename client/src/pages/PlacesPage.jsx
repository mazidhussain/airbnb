import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from '../Perks'
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();

    // states for add new place form
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function preInput(title, desc) {
        return (
            <>
                <h2 className="text-2xl mt-4">{title}</h2>
                <p className="text-gray-500 text-sm">{desc}</p>
            </>
        )
    }

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink });
        setAddedPhotos(prev=>{
            return [...prev,filename];
        });
        setPhotoLink('');
    }
    function uploadPhoto(ev){
        ev.preventDefault();
        const files = ev.target.files;
        const data = new FormData();
        for(let i = 0 ; i< files.length ; i++){
            data.append('photos',files[i]);
        }
        axios.post('/upload',data,{
            headers:{'Content-type':'multipart/form-data'}
        }).then(response=>{
            const {data:filenames} = response;
            setAddedPhotos(prev=>{
                return [...prev,...filenames];
            });
        });
    }
    return (
        <div>
            {action !== 'new' && (
                <div className=" text-center">
                    <Link className="bg-primary gap-1 inline-flex text-white rounded-full py-2 px-6" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add my place</Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title','Title for your place, should be short and catchy as in advertisement')}
                        <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="title for hotel" />
                        {preInput('Address','Address to this place')}
                        <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address" />
                        {preInput('Photos','more = better')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} placeholder="Add image using link......jpeg" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                        </div>
                        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link=>(
                                <div className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                            <label className="flex h-32 cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <input type="file" multiple onChange={uploadPhoto} className="hidden" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload</label>
                        </div>
                        {preInput('Description','description of the place')}
                        <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
                        {preInput('Perks','Select all the perks of your place')}
                        <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>
                        {preInput('Extra info','house rules, etc')}
                        <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
                        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
                        <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} placeholder="14" />
                            </div> 
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} placeholder="11"/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max guests numbers</h3>
                                <input type="number" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
                            </div>
                        </div>
                        <button className="login my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}