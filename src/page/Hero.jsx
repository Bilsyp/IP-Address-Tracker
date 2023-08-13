import { useState } from "react";
import MapComponent from "../components/MapComponent";
import Hero_Header from "../components/Hero_Header";

const Hero = () => {
  const [location, setLocation] = useState({
    latitude: 51.505,
    longitude: -0.09,
  });

  return (
    <div>
      <Hero_Header />
    </div>
  );
};

export default Hero;
