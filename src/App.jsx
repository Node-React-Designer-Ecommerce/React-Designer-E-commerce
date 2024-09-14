import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';


function App() {

  return (
    <div className='m-2 relative'>
      <BrowserRouter>
        <Navbar className="sticky" />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
