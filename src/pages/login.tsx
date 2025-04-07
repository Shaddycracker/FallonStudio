"use client"

import type { NextPage } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import LoginForm from "@/components/LoginForm"
import { useAuth } from "@/contexts/AuthContext"

interface LoginPageProps {
    darkMode: boolean
    toggleTheme: () => void
}

const LoginPage: NextPage<LoginPageProps> = ({ darkMode, toggleTheme }) => {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push("/admin")
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <LoginForm />
        </Layout>
    )
}

export default LoginPage

