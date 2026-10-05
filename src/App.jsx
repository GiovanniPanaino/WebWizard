import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuildProject from "./pages/BuildProject";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<BuildProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
