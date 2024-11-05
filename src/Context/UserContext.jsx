import { createContext, useContext } from "react";

const UserContext = createContext(null)

export const useUser = ()=> useContext(UserContext);

export const UserProvider = ({ children, userData}) => (
    <UserContext.Provider value={userData}>
        {children}
    </UserContext.Provider>
);
