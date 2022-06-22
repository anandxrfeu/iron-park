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
    
    const payLoad = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
    }
    // Add form Validation

    setIsLoading(true)
    let url;

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E'
      axios.post(url, payLoad)
      .then( response => {
        authCtx.login(response.data.idToken, response.data.displayName);
      })
      .catch( err => {
        if(err.response && err.response.data && err.response.data.error && err.response.data.error.message)
        alert(err.response.data.error.message) //you can set error message on state and show on a model
      })


    } else { //sign up
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E'
      axios.post(url, payLoad)
      .then( response => {
        //authCtx.login(response.data.idToken, null);
        console.log('New User created', response.data)
        // update display name
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7a8bSmuRMCQy271QVQ42Qptjg9PWq41E'
        const payload = {
            idToken: response.data.idToken,
            displayName: nameInputRef.current.value,
            photoUrl:'',
            returnSecureToken: true
        }

        axios.post(URL, payload)
            .then(response => {
              authCtx.login(authCtx.token,response.data.displayName );
              console.log('User given user name', response.data)

              // save user information in new db
              


            }).catch(err => {
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