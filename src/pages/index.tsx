import type { NextPage } from "next"
import Layout from "@/components/Layout"
import FeedbackForm from "@/components/FeedbackForm"

interface HomeProps {
  darkMode: boolean
  toggleTheme: () => void
}

const Home: NextPage<HomeProps> = ({ darkMode, toggleTheme }) => {
  return (
      <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
        <FeedbackForm />
      </Layout>
  )
}

export default Home

