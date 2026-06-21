import './App.css'
import Home from './pages/Home';
import Navbar from './componens/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Watchlist from './pages/Watchlist';


function App() {

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
