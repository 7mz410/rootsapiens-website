import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ChevronDown, Rocket, BookOpen, Users, Mail, Github, ExternalLink } from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo"
          >
            ROOTSAPIENS
          </motion.div>
          
          <div className="nav-links desktop-only">
            <a href="#story">Story</a>
            <a href="#characters">Characters</a>
            <a href="#issue-01">Issue 01</a>
            <button className="btn-primary">Read Now</button>
          </div>

          <button className="menu-toggle mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

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
            <button className="btn-large">Explore the Protocol</button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-indicator"
        >
          <ChevronDown size={32} />
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
              {/* Image placeholder or generated asset */}
              <div className="image-frame">
                <div className="frame-overlay"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="section-padding characters-section">
        <div className="container">
          <h2 className="section-title text-center">The Survivors</h2>
          <div className="character-grid">
            {[
              { name: 'N', role: 'Specialist', desc: 'The silent observer of the protocol.', img: '/src/assets/kira_portrait.png' },
              { name: 'Kira', role: 'Lead Scientist', desc: 'The woman who unlocked the earth\'s voice.', img: '/src/assets/kira_portrait.png' },
              { name: 'T. Thomas', role: 'Security', desc: 'The last line of defense in Eden City.', img: '/src/assets/kira_portrait.png' }
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
          <div className="footer-logo">ROOTSAPIENS</div>
          <div className="footer-links">
            <a href="#"><Github size={20} /></a>
            <a href="#"><ExternalLink size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
          <p className="copyright">© 2024 EDEN COMICS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
