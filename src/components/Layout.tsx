import type { ReactNode } from "react"
import { Box, Container } from "@mui/material"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: ReactNode
  darkMode: boolean
  toggleTheme: () => void
}

export default function Layout({ children, darkMode, toggleTheme }: LayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}

