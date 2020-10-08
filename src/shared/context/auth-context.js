import { createContext } from "react";

export const AuthContext = createContext(
    {
        isLoggedin: false,
        userId: null,
        login: () => {},
        logout: () => {}
    }
)