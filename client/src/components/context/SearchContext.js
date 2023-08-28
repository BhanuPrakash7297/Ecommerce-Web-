

import { useState, createContext, useContext } from "react";


const SearchContext = createContext();// create a contex object

const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keywork: "",
        results: []
    });


    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}


// custom hook

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider }


