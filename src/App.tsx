import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Starfield from '@/components/Starfield'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import Planets from '@/pages/Planets'
import PlanetDetail from '@/pages/PlanetDetail'
import Missions from '@/pages/Missions'
import Compare from '@/pages/Compare'
import Quiz from '@/pages/Quiz'
import Favorites from '@/pages/Favorites'
import NotFound from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0 }), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Starfield />
      <ScrollToTop />
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<PlanetDetail />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">Cosmos Atlas · данные NASA, округлены · React + TypeScript</footer>
    </>
  )
}
