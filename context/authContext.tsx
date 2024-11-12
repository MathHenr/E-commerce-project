"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { login, logout, User } from '@/feature/users/login-user'
import { getUserData } from '@/feature/profile/get-user-data'

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}
  
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    const handleLogin = async (email: string, password: string): Promise<void> => {
        try {
            const loggedInUser = await login(email, password);
            setUser(loggedInUser)
            return
        } catch (error) {
            throw new Error("Invalid credentials")
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    }

    useEffect(() => {
        async function getUser () {
            const userData = await getUserData()

            if (!userData) {
                return null //No user is logged in
            }

            setUser(userData)
        }
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, login: handleLogin, logout: handleLogout}}>
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