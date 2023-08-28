

import axios from "axios";
import { useState, Context, createContext, useEffect, useContext } from "react";


const AuthContext = createContext();// create a contex object

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth');
        console.log("data", data);
        if (data) {
            const parseData = JSON.parse(data);

            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }


