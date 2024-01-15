import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    token: null,
    login: (token) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = (newToken) => {
        localStorage.setItem("authenticated", "true")
        localStorage.setItem("token", newToken)
        setAuthenticated(true);
        console.log("User logged in")
        setToken(newToken);
    };

    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem("token")
        localStorage.setItem("authenticated", "false")
        setToken(null)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
