import { Box, Typography, Container,Stack } from "@mui/material"
import Link from "next/link"
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
      <Box
          component="footer"
          sx={{
              py: 4,
              px: 2,
              mt: "auto",
              backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
          }}
      >
          <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                  © {currentYear} Feedback Collector App
              </Typography>

              <Typography variant="body2" color="text.secondary" align="center"  sx={{ mt: 1 }}>
                  Created by <strong>Shadab Ali</strong> — Submission for Feedback Collector Project
              </Typography>

              <Stack direction="row" justifyContent="center" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                  <Link href="https://github.com/shadabali-git" target="_blank" rel="noopener" >
                      GitHub Account (Official)
                  </Link>
                  <Link href="https://github.com/Shaddycracker" target="_blank" rel="noopener">
                      GitHub Account (Unofficial)
                  </Link>
                  <Link href="https://github.com/Shaddycracker/FallonStudio" target="_blank" rel="noopener">
                      Project Repository
                  </Link>
              </Stack>
          </Container>
      </Box>
  )
}

export default Footer

