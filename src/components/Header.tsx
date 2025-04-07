"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import MenuIcon from "@mui/icons-material/Menu"
import { useAuth } from "@/contexts/AuthContext"

interface HeaderProps {
  darkMode: boolean
  toggleTheme: () => void
}

const Header = ({ darkMode, toggleTheme }: HeaderProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    handleClose()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Feedback Collector
        </Typography>

        {isMobile ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleTheme} size="large">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              {isAuthenticated ? (
                [
                  <MenuItem key="admin" onClick={() => handleNavigation("/admin")}>
                    Admin Dashboard
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>,
                ]
              ) : (
                <MenuItem onClick={() => handleNavigation("/login")}>Admin Login</MenuItem>
              )}
            </Menu>
          </Box>
        ) : (
          <>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleTheme} color="default" />}
              label={darkMode ? "Light Mode" : "Dark Mode"}
            />
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} href="/admin" sx={{ mr: 1 }}>
                  Admin Dashboard
                </Button>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} href="/login">
                Admin Login
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header

