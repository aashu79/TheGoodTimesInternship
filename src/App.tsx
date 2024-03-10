import { BrowserRouter, Route, Routes } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import SearchPage from "./pages/SearchPage"


function App() {


  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
