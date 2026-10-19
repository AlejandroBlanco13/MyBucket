import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Alejandria } from './pages/Alejandria'
import { Anime } from './pages/Anime'
import { Portfolio } from './pages/Portfolio'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Alejandria />} />
        <Route path="/mybucket" element={<Portfolio />} />
        <Route path="/anime" element={<Anime />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
