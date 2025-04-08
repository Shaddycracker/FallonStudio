import { Box, Typography, Container } from "@mui/material"
import Link from "next/link"
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Feedback Collector App
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Created by Shadab Ali  - Submission for Feedback Collector Project
        </Typography>
          <Link href="https://github.com/shadabali-git">github Account Official </Link>
          <Link href="https://github.com/Shaddycracker">github Account Unofficial </Link>
          <Link href="https://github.com/Shaddycracker/FallonStudio"> Project Repo </Link>
          <Link href="https://fallon.netlify.app"> Netlify Deployed Link </Link>
      </Container>
    </Box>
  )
}

export default Footer

