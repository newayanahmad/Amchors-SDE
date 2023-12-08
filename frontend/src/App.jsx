import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage, EarningPage } from "./pages"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="earning" element={<EarningPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App