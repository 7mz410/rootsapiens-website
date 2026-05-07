import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

// QUICK CONFIGURATION - Change your links here!
const CONFIG = {
  amazonKDP: 'https://www.amazon.com/dp/B00EXAMPLE', // Replace with your actual KDP link
  social: {
    instagram: 'https://instagram.com/rootsapiens',
    twitter: 'https://twitter.com/rootsapiens',
    email: 'mailto:info@rootsapiens.com'
  },
  title: 'ROOTSAPIENS'
}

const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  ChevronDown: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  ),
  Github: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22"></path></svg>
  ),
  ExternalLink: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const handleCTA = () => {
    window.open(CONFIG.amazonKDP, '_blank')
  }

  return (
    <div className="app">
      {/* Biological Breach Banner */}
      <div className="breach-banner">
        <div className="banner-scroll">
          <span>CONTAINMENT FAILURE • YELLOW PROTOCOL ACTIVE • BIOLOGICAL BREACH • OSC-PENT-001 • </span>
          <span>CONTAINMENT FAILURE • YELLOW PROTOCOL ACTIVE • BIOLOGICAL BREACH • OSC-PENT-001 • </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <div className="container nav-content">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo"
          >
            ROOTS<span>APIENS</span>
          </motion.div>
          
          <div className="nav-links desktop-only">
            <a href="#story">Story</a>
            <a href="#characters">Characters</a>
            <a href="#issue-01">Issue 01</a>
            <button className="btn-primary" onClick={handleCTA}>Read Now</button>
          </div>

          <button className="menu-toggle mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="mobile-menu mobile-only">
            <a href="#story" onClick={() => setIsMenuOpen(false)}>Story</a>
            <a href="#characters" onClick={() => setIsMenuOpen(false)}>Characters</a>
            <a href="#issue-01" onClick={() => setIsMenuOpen(false)}>Issue 01</a>
            <button className="btn-primary" onClick={handleCTA}>Read Now</button>
          </div>
        )}
      </nav>

      {/* Video Hero Section */}
      <section className="video-top-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="video-wrapper"
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/7c0e36os8ng?autoplay=1&mute=1&loop=1&playlist=7c0e36os8ng&controls=0&modestbranding=1" 
              title="Rootsapiens Trailer" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          style={{ opacity, scale }}
          className="hero-background"
        >
          <div className="overlay"></div>
        </motion.div>
        
        <div className="container hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            ROOTS<span>APIENS</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            26 SCIENTISTS. ONE SECRET PROJECT.<br />
            <span className="highlight">EARTH IS NOT SILENT.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-actions"
          >
            <button className="btn-large" onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })}>
              Explore the Protocol
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-indicator"
        >
          <Icons.ChevronDown />
        </motion.div>
      </section>

      {/* Story Section */}
      <section id="story" className="section-padding story-section">
        <div className="container">
          <div className="story-grid">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="story-text"
            >
              <h2 className="section-title">The Protocol</h2>
              <p className="quote">"THEY WERE CHOSEN TO SAVE HUMANITY. THE EARTH CHOSE TO SAVE ITSELF."</p>
              <p className="description">
                In the heart of Eden City, beneath the OSC-PENT-001 Underground Facility, 
                a biological breach has triggered the Yellow Protocol. The containment has failed.
                The roots remember what humanity has forgotten.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="story-image"
            >
              <div className="image-frame">
                <div className="frame-overlay"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Issue 01 Preview */}


      <section id="issue-01" className="section-padding issue-preview">
        <div className="container">
          <h2 className="section-title text-center">First Chapter: The Breach</h2>
          <div className="preview-container">
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -800 }}
              className="preview-track"
            >
              {[1, 2, 1, 2].map((num, i) => (
                <div key={i} className="preview-page">
                  <img src={`/assets/preview_${num}.png`} alt={`Page ${i + 1}`} />
                </div>
              ))}
            </motion.div>
          </div>
          <div className="text-center mt-4" style={{ marginTop: '3rem' }}>
            <button className="btn-large" onClick={handleCTA}>Buy Full Issue</button>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="section-padding characters-section">
        <div className="container">
          <h2 className="section-title text-center">The Survivors</h2>
          <div className="character-grid">
            {[
              { name: 'N', role: 'Specialist', desc: 'The silent observer of the protocol.', img: '/assets/n_portrait.png' },
              { name: 'Kira', role: 'Lead Scientist', desc: 'The woman who unlocked the earth\'s voice.', img: '/assets/kira_portrait.png' },
              { name: 'T. Thomas', role: 'Security', desc: 'The last line of defense in Eden City.', img: '/assets/thomas_portrait.png' }
            ].map((char, i) => (
              <motion.div 
                key={char.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="character-card"
              >
                <div className="char-portrait" style={{ backgroundImage: `url(${char.img})`, backgroundSize: 'cover' }}></div>
                <h3>{char.name}</h3>
                <span className="char-role">{char.role}</span>
                <p>{char.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">ROOTS<span>APIENS</span></div>
          <div className="footer-links">
            <a href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer"><Icons.ExternalLink /></a>
            <a href={CONFIG.social.twitter} target="_blank" rel="noopener noreferrer"><Icons.ExternalLink /></a>
            <a href={CONFIG.social.email}><Icons.Mail /></a>
          </div>
          <p className="copyright">© 2024 EDEN COMICS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}

export default App





