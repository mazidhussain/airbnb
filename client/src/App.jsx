import './App.css'
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { ProfilePage } from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacePage from './pages/PlacePage';
import PlacesFormPage from './pages/PlacesFormPage'
import BookingPage from './pages/BookingPage.jsx';
import BookingsPage from './pages/BookingsPage';
axios.defaults.baseURL = 'https://airbnb-backend-j3cn.onrender.com';
axios.defaults.withCredentials = true;
function App() {

  return ( 
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/account' element={<ProfilePage/>}/>
            <Route path='/account/places' element={<PlacesPage/>}/>
            <Route path='/account/places/new' element={<PlacesFormPage/>}/>
            <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
            <Route path='/account/bookings' element={<BookingsPage/>}/>
            <Route path='/account/bookings/:id' element={<BookingPage/>}/>
            <Route path='/place/:id' element={<PlacePage/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
  )
}

export default App
