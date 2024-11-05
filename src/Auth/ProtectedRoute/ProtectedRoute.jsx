import React, { useState, useEffect } from "react";
import { checkAuth } from "../checkAuth";
import { Navigate } from 'react-router-dom'
import { UserProvider } from "../../Context/UserContext";


export const ProtectedRoute = ({ children, allowedRoles }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuthenticated = async () => {
            const result = await checkAuth();
            setAuth(result);
        }
        checkAuthenticated()
    }, []);

    if (auth === null) return <div>Loading...</div>


    if(auth && auth.role && !allowedRoles.includes(auth.role)) {
            return <Navigate to={'/unauthorized'} />
    }else if(!auth || !auth.role){
        return <Navigate to={'/'} /> 
    }
    
    if (auth) {
        return (
            <UserProvider userData={auth}>
                {children}
            </UserProvider>
        )
    } else{
        return <Navigate to={'/'} />
    }
}