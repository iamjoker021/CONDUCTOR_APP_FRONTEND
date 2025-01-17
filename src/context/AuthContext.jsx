import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null};
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const user = localStorage.getItem('user') || null;
    const [state, dispatch] = useReducer(authReducer, { user: JSON.parse(user) });

        return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}