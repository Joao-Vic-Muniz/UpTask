import {
  createContext,
  useState,
  useEffect,
} from "react";

import type {
    ReactNode
} from "react";


import type {
    User,
    LoginResponse,
} from "../types/auth";

import { api } from "../services/api";

interface AuthContextType {
    user: User | null;
    token: string | null;

    signIn: (
        email: string,
        password: string,
    ) => Promise<void>;

    logout: () => void;
}    
    
export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );

interface Props {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: Props) {
    const [user, setUser] = useState<User | null>(null);

    const [token, setToken] = useState<string | null>(null);

    async function signIn(
        email: string,
        password: string,
    ) {
        const response =
        await api.post<LoginResponse>(
            "/users/login",
            {
                email,
                password,
            }
        );

        const { user, token } =
        response.data;

        localStorage.setItem(
            "token",
            token
        );

        setUser(user);
        setToken(token);
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    useEffect(() => {
        const token =
        localStorage.getItem("token");

        if (token) {
            setToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                signIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
