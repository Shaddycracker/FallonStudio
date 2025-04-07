"use client"

import type { NextPage } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import AdminView from "@/components/AdminView"
import { useAuth } from "@/contexts/AuthContext"

interface AdminPageProps {
    darkMode: boolean
    toggleTheme: () => void
}

const AdminPage: NextPage<AdminPageProps> = ({ darkMode, toggleTheme }) => {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return <div> Loading... </div>
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
            <AdminView />
        </Layout>
    )
}

export default AdminPage

