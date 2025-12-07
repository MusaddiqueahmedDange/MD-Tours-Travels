import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import International from "./components/International/International";
import Domestic from "./components/Domestic/Domestic";
import About from "./components/About/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cruise from "./components/Cruise/cruise";
// import DestinationDetail from "./components/International/DestinationDetail";
//import DomesticDetail from "./components/Domestic/DomesticDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/international" element={<International />} />
            <Route path="/domestic" element={<Domestic />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cruise" element={<Cruise />} />
            {/* <Route path="/" element={<International />} /> */}
            {/* <Route path="/international/:id" element={<DestinationDetail />} /> */}
            {/* <Route path="/domestic/:id" element={<DomesticDetail />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
