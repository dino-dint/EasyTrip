import React from "react";
import Navbar from "../../components/layouts/Navbar";

function Hero() {
  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-center object-center  md:bg-center sm:bg-center md:bg-[url('/bg-hero.jpg')] bg-[url('/phone-bg-hero.jpg')]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
    </div>
  );
}

export default Hero;
