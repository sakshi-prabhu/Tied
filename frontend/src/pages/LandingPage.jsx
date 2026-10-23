import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import FAQ from '../components/FAQ.jsx'
import Footer from '../components/Footer.jsx'

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  )
}

export default LandingPage