import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Components
import Navbar from './components/Navbar';

//import pages
import Home from './pages/Home';
import Registration from './pages/Registration';


function App() {

  return (
    <div className='m-2 relative'>
      <BrowserRouter>
        <Navbar className="sticky" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Registration />} />

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
