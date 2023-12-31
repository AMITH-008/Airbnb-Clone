import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const UserContext = createContext({});


export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        
        if(!user) {
            
            axios.get('/api/user/profile').then(({data}) => {
                setUser(data);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
        }
    }, [])
    return (
    <UserContext.Provider value={{user, setUser,loading}}>
        {children}
    </UserContext.Provider>
    )
}