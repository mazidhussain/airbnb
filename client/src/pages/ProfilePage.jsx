import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    async function logout() {
        await axios.post('/logout');
        alert('Successfully Logged out');
        setRedirect('/');
        setUser(null);
    }
    if (subpage === undefined) {
        subpage = 'profile';
    }
    if (!ready) {
        return 'Loading....';
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }
    
    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />

                    <button onClick={logout} className="login mt-3 max-w-sm">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}