"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { UserLoginFunction } from "@/feature/users/services/UserValidationService";
import { getUserData } from '@/feature/profile/get-user-data';
import { useRouter } from 'next/navigation';

import type{ IUserData } from '@/feature/users/validators/UserValidator';

interface AuthContextType {
    user: IUserData | null;
    login: (email: string, password: string) => Promise<boolean>;
    // logout: () => void
}
  
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<IUserData | null>(null)

    const handleLogin = async (email: string, password: string): Promise<boolean> => {
        const loggedInUser = await UserLoginFunction({ email, password });
        if (loggedInUser[0] === false){
            throw new Error(loggedInUser[1] as string);
        }
        setUser(loggedInUser[1] as IUserData);
        router.push("/");
        return true;
    };

    // const handleLogout = () => {
    //     logout();
    //     setUser(null);
    // }

    useEffect(() => {
        async function getUser () {
            const userData = await getUserData()

            if (!userData) {
                return null //No user is logged in
            }

            setUser(userData as IUserData)
        }
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, login: handleLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext (): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }
    return context
}