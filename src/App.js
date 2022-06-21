import './App.css';
import {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/profile/UserProfile'
import Layout from './components/layout/Layout'



function App() {

  const authCxt = useContext(AuthContext)


  return (
    <Layout>
      <Routes>
          <Route path='/' element={<HomePage />} />
           {!authCxt.isLoggedIn && (<Route path='/login' element={<AuthPage />} />)}
          <Route 
                path='/profile' 
                element={ authCxt.isLoggedIn ? <UserProfile /> : <Navigate to="/login"/>} 
          />
          <Route path='*' element={<Navigate to="/"/>}  />
        </Routes>
      </Layout>
  );
}

export default App;