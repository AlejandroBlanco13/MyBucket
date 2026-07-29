import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Alejandria } from './pages/Alejandria'
import { Portfolio } from './pages/Portfolio'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Alejandria />} />
        <Route path="/mybucket" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
