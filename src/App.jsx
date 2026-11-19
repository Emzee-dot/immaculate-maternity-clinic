import React from "react";
import {useState} from "react";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>

      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Contact />
      <CallToAction />
      <Footer />
      {/* Services */}
     
      {/* About Us */}
     
        {/* Why Choose Us */}
        {/* About Section */}
      
    </div>
    
  );
}

export default App;

