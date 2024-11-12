import './App.css'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element="Homepage" />
      <Route path="/test" element="Testpage" />
    </Routes>
  )
}

export default App
