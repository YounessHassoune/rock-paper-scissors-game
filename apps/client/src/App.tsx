import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Lobby from './pages/Lobby'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
