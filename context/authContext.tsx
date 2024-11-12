// import { createContext, useContext, useState } from "react";
// import { NewUser } from "@/feature/users/create-user"

// interface AuthContextType {
//     user: NewUser | null,
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<NewUser | null>(null)

//     const handleLogin = async (email: string, pass: string) => {
//         try {
//             const loggedInUser = await login(email, pass)

//         } catch (error) {
            
//         }
//     }
// }