import './ProfileForm.css'
import {useRef, useContext} from 'react'
import AuthContext from '../../store/auth-context'

import axios from 'axios'

const ProfileForm = () => {
    
    const newPasswordInputRef = useRef()
    const newNicknameInputRef = useRef()

    const authCxt = useContext(AuthContext)
    
    
    const changePasswordHandler = (event) =>{
        event.preventDefault()
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2pyJD3KZa6NDBfckTBJvA0Dw1rWXLXdM'
        const payload = {
            idToken: authCxt.token,
            password: newPasswordInputRef.current.value,
            returnSecureToken: true
        }

        axios.post(URL, payload)
            .then(response => {
                authCxt.login(response.data.idToken, null);
            }).catch(err => {
                console.log(err)
            })
    }
    
    const changeNameHandler = (event) =>{
        event.preventDefault()
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA2pyJD3KZa6NDBfckTBJvA0Dw1rWXLXdM'
        const payload = {
            idToken: authCxt.token,
            displayName: newNicknameInputRef.current.value,
            photoUrl:'',
            returnSecureToken: true
        }

        axios.post(URL, payload)
            .then(response => {
                authCxt.login(authCxt.token,response.data.displayName );
                // update user name in users collection
                const urlUsers = `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCxt.userId}.json`
                const payloadUsers = {
                    name: newNicknameInputRef.current.value
                }
                console.log(urlUsers)
                axios.patch(urlUsers,payloadUsers)
                .then(response => {
                    console.log('name updated in users ',response.data)
                })
                .catch(err => console.log(err))
                
            
            }).catch(err => {
                console.log(err)
            })

    
        
        
       
    }

    const deleteHandler  = (event) => {
        event.preventDefault()

        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyA2pyJD3KZa6NDBfckTBJvA0Dw1rWXLXdM'
        const payload = {
            idToken: authCxt.token
        }

        axios.post(URL, payload)
            .then(response => {
               
                //set user to isActive = false in users collection
                console.log(authCxt.userId)
                const urlUsers =   `https://iron-park-e654f-default-rtdb.firebaseio.com/users/${authCxt.userId}.json`
                console.log(urlUsers)

                const payloadUsers = {
                    "isActive": false
                }
                axios.patch(urlUsers,payloadUsers)
                .then( response => {
                    console.log(response.data)
                })
                .catch( err => console.log(err))



                authCxt.logout()

            }).catch(err => {
                console.log(err)
            })
    


    }

    return (
        <>
            <form className='form' onSubmit={changeNameHandler}>
                <div className='control'>
                    <label htmlFor='name'>Nickname</label>
                    <input type='text' id='name' ref={newNicknameInputRef}/>
                </div>
                <div className='action'>
                    <button>Change Nickname</button>
                </div>
            </form>


            <form className='form' onSubmit={changePasswordHandler}>
                <div className='control'>
                    <label htmlFor='new-password'>New Password</label>
                    <input type='password' id='new-password' ref={newPasswordInputRef}/>
                </div>
                <div className='action'>
                    <button>Change Password</button>
                </div>
            </form>

            <form className='form' onSubmit={deleteHandler}>
                <div className='action'>
                    <button>Delete Account</button>
                </div>
            </form>



        </>
      );
    }

export default ProfileForm