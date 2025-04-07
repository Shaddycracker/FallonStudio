"use client"

import { useState, useEffect } from "react"
import type { AppProps } from "next/app"
import { ThemeProvider, createTheme, type ThemeOptions } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider, type EmotionCache } from "@emotion/react"
import createEmotionCache from "@/lib/createEmotionCache"
import { AuthProvider } from "@/contexts/AuthContext"
import "@/styles/globals.css"

// Client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createEmotionCache()

// Create theme options
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#dc004e",
        },
    },
}

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#f48fb1",
        },
    },
}

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

export default function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
    const [darkMode, setDarkMode] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Create theme based on dark mode state
    const theme = createTheme(darkMode ? darkThemeOptions : lightThemeOptions)

    // Toggle dark mode
    const toggleTheme = () => {
        setDarkMode(!darkMode)
        localStorage.setItem("darkMode", (!darkMode).toString())
    }

    // Effect to load dark mode preference from localStorage
    useEffect(() => {
        setMounted(true)
        const savedDarkMode = localStorage.getItem("darkMode") === "true"
        setDarkMode(savedDarkMode)
    }, [])

    // Avoid rendering with incorrect theme on first load
    if (!mounted) {
        return null
    }

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <Component {...pageProps} darkMode={darkMode} toggleTheme={toggleTheme} />
                </AuthProvider>
            </ThemeProvider>
        </CacheProvider>
    )
}

