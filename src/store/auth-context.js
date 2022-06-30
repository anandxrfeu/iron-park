import React, {useState} from 'react';

//Create context and initialize it
const AuthContext = React.createContext({
    token: '',
    name: '',
    userId: '',
    isLoggedIn: false,
    isAdmin: false,
    login: (token, name,userId, isAdmin) => {},
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
    const initialAdmin = localStorage.getItem('isAdmin')
    const [isAdmin, setIsAdmin] = useState(initialAdmin)
    
    const userIsLoggedIn = !!token; //convers a truthy or falsy value to boolean value
    
    const loginHandler = (token, userName, userId, isAdmin) => {
        setToken(token)
        setUserName(userName)
        setUserId(userId)
        setIsAdmin(isAdmin)
        localStorage.setItem('token',token)
        localStorage.setItem('userName',userName)
        localStorage.setItem('userId',userId)        
        localStorage.setItem('isAdmin',isAdmin)
        console.log('type of in context', typeof isAdmin)

    };
    
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        localStorage.removeItem('isAdmin')
    };

    // set Context Value
    const contextValue = {
        token: token,
        name: userName,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        isAdmin: isAdmin,
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