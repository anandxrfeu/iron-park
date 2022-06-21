import './App.css';
import {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ShowAllParkings from './pages/ShowAllParkingsPage';
import MakeReservations from './pages/MakeReservationPage';
import ShowReservation from './pages/ShowReservationPage';
import EditReservation from './pages/EditReservationPage';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/layout/Layout'



function App() {

  const authCxt = useContext(AuthContext)

  //make http request to get all parking spots 
  // state 1 : ParkingSpotList -> send it as prop to homePage
  // state 2 : SelectedParkingSpot -> send it as prop to reservation components

  return (
    <Layout>
      <Routes>
          <Route path='/' element={<HomePage />} />
          {authCxt.isLoggedIn && (<Route path='/make-reservation/:parking-id' element={<MakeReservations />} />)}
          {authCxt.isLoggedIn && (<Route path='/show-reservation/:reservation-id' element={<ShowReservation />} />)}
          {authCxt.isLoggedIn && (<Route path='/edit-reservation/:reservation-id' element={<EditReservation />} />)}
          <Route 
                path='/profile' 
                element={ authCxt.isLoggedIn ? <UserProfile /> : <Navigate to="/login"/>} 
          />
          <Route 
                path='/admin/parking-log' 
                element={ authCxt.isLoggedIn ? <ShowAllParkings /> : <Navigate to="/login"/>} 
          />
          {!authCxt.isLoggedIn && (<Route path='/login' element={<AuthPage />} />)}
          <Route path='*' element={<Navigate to="/"/>}  />
        </Routes>
      </Layout>
  );
}

export default App;