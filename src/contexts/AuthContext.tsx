"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/router"
import { getCookie, setCookie, deleteCookie } from "cookies-next"

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    login: () => {},
    logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check if user is authenticated on initial load
        const checkAuth = async () => {
            try {
                const token = getCookie("token")

                if (!token) {
                    setIsAuthenticated(false)
                    setIsLoading(false)
                    return
                }

                // Verify token with the server
                const response = await fetch("/api/auth/verify")

                if (response.ok) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    deleteCookie("token")
                }
            } catch (error) {
                setIsAuthenticated(false)
                deleteCookie("token")
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = (token: string) => {
        setCookie("token", token, {
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        })
        setIsAuthenticated(true)
    }

    const logout = () => {
        deleteCookie("token")
        setIsAuthenticated(false)
        router.push("/")
    }

    return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

