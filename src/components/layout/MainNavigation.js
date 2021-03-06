import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';
import './MainNavigation.css'

const MainNavigation = () => {

  const authCxt = useContext(AuthContext)
  const isLoggedIn = authCxt.isLoggedIn
  const isAdmin = authCxt.isAdmin
  const loggedInUserName = authCxt.name;
  
  const logoutHandler = () => {
    authCxt.logout()
  }

  return (
    <header className='header'>
      <Link to='/'>
        <div className='logo'>Iron Park</div>
      </Link>
      <nav>
      
        <ul>
          {isLoggedIn && isAdmin && (
          <li>
            <Link to='/admin/parking-log'>Parking Log</Link>
          </li>
        )}


        {!isLoggedIn && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}

        {isLoggedIn  && (
          <li>
            <Link to='/profile'>{ loggedInUserName!=null ? `Hi, ${loggedInUserName}` :'Profile'}</Link>
          </li>
        )}

        {isLoggedIn  && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
          
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;