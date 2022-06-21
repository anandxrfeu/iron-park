import React, {useState} from 'react';

//Create context and initialize it
const AuthContext = React.createContext({
    token: '',
    name: '',
    isLoggedIn: false,
    login: (token, name) => {},
    logout: () => {}
});

// Add context providor component
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const initialName = localStorage.getItem('userName')
    const [userName, setUserName] = useState(initialName)
    
    const userIsLoggedIn = !!token; //convers a truthy or falsy value to boolean value
    
    const loginHandler = (token, userName) => {
        setToken(token)
        setUserName(userName)
        localStorage.setItem('token',token)
        localStorage.setItem('userName',userName)

    };
    
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userName')

    };

    // set Context Value
    const contextValue = {
        token: token,
        name: userName,
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