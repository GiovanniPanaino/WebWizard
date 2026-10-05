import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuildProject from "./pages/BuildProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<BuildProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;