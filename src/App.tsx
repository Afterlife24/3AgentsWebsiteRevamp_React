import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './app/contexts/LanguageContext'
import Home from './app/pages/Home'
import About from './app/pages/About'
import Pricing from './app/pages/Pricing'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App

