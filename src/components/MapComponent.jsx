import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ location }) {
  useEffect(() => {
    const map = L.map("map").setView(
      [location.latitude, location.longitude],
      13
    );
    // Add a tile layer to the map (using OpenStreetMap tiles)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    var customIcon = L.icon({
      iconUrl: "/images/maps-and-flags.png", // Ganti dengan URL ikon kustom Anda
      // Titik popup anchor
      iconSize: [32, 32],
    });

    L.marker([location.latitude, location.longitude], {
      icon: customIcon,
    })
      .addTo(map)
      .bindPopup("Location may be wrong.<br> And less accurate")
      .openPopup();
    return () => {
      // Clean up: Destroy the map instance
      map.remove();
    };
  }, [location]);

  return (
    <div
      id='map'
      className=' -z-0'
      style={{ width: "100%", height: "500px" }}
    />
  );
}

export default MapComponent;
