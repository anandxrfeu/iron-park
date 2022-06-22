import axios from 'axios';
import { useState, useRef , useContext} from 'react';
import AuthContext from '../../store/auth-context';
import {Navigate} from 'react-router-dom'
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading]= useState(false);

  // connect context
  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();  
  const nameInputRef = useRef();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    let payloadAuth = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
    }
    // Add form Validation

    setIsLoading(true)
    let urlAuth;

    if (isLogin) {
      urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2pyJD3KZa6NDBfckTBJvA0Dw1rWXLXdM'
      axios.post(urlAuth, payloadAuth)
      .then( response => {
        authCtx.login(response.data.idToken, response.data.displayName);
      })
      .catch( err => {
        if(err.response && err.response.data && err.response.data.error && err.response.data.error.message)
        alert(err.response.data.error.message) //you can set error message on state and show on a model
      })


    } else { //sign up
      urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2pyJD3KZa6NDBfckTBJvA0Dw1rWXLXdM'
      axios.post(urlAuth, payloadAuth)
      .then( response => {
        //authCtx.login(response.data.idToken, null);
        console.log('New User created', response.data)
        // update display name
        urlAuth = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2pyJD3KZa6NDBfckTBJvA0Dw1rWXLXdM'
        payloadAuth = {
            idToken: response.data.idToken,
            displayName: nameInputRef.current.value,
            photoUrl:'',
            returnSecureToken: true 
        }
        axios.post(urlAuth, payloadAuth)
            .then(response => {
              authCtx.login(authCtx.token,response.data.displayName );
              console.log('User given user name', response.data)
            }).catch(err => {
                console.log(err)
            })


        const urlUsers = "https://iron-park-e654f-default-rtdb.firebaseio.com/users.json"
        const payloadUsers = {
              auth_id: response.data.localId,
              name: nameInputRef.current.value,
              isActive : true,
              isAdmin: false,
              reservations: []
        }
        axios.post(urlUsers,payloadUsers)
        .then(response => {
              console.log('Userdata in Users collection', response.data)
        })
        .catch(err => {
          console.log(err)
        })
        

      })
      .catch( err => {
        if(err.response && err.response.data && err.response.data.error && err.response.data.error.message)
        alert(err.response.data.error.message) //you can set error message on state and show on a model
      })
      
    }

   
    setIsLoading(false)

  }

  return (

  <>
    {authCtx.isLoggedIn && <Navigate to="/" replace={true} />}
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
      <div className={!isLogin ? 'control' : 'hide'}>
          <label htmlFor='name'>Your Name</label>
          <input 
            type='text' 
            ref={nameInputRef} 
            id='name' />
        </div>

        <div className={'control'}>
          <label htmlFor='email'>Your Email</label>
          <input 
            type='email' 
            ref={emailInputRef} 
            id='email' required />
        </div>
        <div className='control'>
          <label htmlFor='password'>Your Password</label>
          <input 
            type='password' 
            ref={passwordInputRef} 
            id='password' required />
        </div>
        <div className='actions'>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request..</p>}
          <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'OR, Create new account' : 'OR, Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  </>
  );
};

export default AuthForm;