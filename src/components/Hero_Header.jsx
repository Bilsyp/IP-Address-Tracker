import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import IpForm from "./IpForm";
import MapComponent from "./MapComponent";

const Hero_Header = () => {
  //   console.log(import.meta.env?.VITE_TEST_VAR);
  const [location, setLocation] = useState({
    latitude: 51.505,
    longitude: -0.09,
  });
  const sizes = useWindowSize();

  return (
    <header
      className={`${
        sizes.width < 678
          ? "bg-[url('/images/pattern-bg-mobile.png')] h-[40vh] "
          : "bg-[url('/images/pattern-bg-desktop.png')] h-[30vh]"
      } bg-cover  `}
    >
      <IpForm setLocation={setLocation} />

      <MapComponent location={location} />
    </header>
  );
};

export default Hero_Header;
