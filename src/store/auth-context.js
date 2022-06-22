import React, {useState} from 'react';

//Create context and initialize it
const AuthContext = React.createContext({
    token: '',
    name: '',
    userId: '',
    isLoggedIn: false,
    login: (token, name,userId) => {},
    logout: () => {}
});

// Add context providor component
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const initialName = localStorage.getItem('userName')
    const [userName, setUserName] = useState(initialName)
    const initialUserId = localStorage.getItem('userId')
    const [userId, setUserId] = useState(initialUserId)
    
    const userIsLoggedIn = !!token; //convers a truthy or falsy value to boolean value
    
    const loginHandler = (token, userName, userId) => {
        setToken(token)
        setUserName(userName)
        setUserId(userId)
        localStorage.setItem('token',token)
        localStorage.setItem('userName',userName)
        localStorage.setItem('userId',userId)


    };
    
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')


    };

    // set Context Value
    const contextValue = {
        token: token,
        name: userName,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;