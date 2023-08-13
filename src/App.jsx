import HomeScreen from "./screen/HomeScreen";
function App() {
  // function viewLocation() {
  //   const options = {
  //     enableHighAccuracy: true, // Menggunakan teknik yang lebih akurat jika tersedia
  //     timeout: 10000, // Batas waktu dalam milidetik untuk mendapatkan lokasi
  //     maximumAge: 0, // Minta data lokasi baru setiap kali
  //   };
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         setLocation({ ...location, latitude, longitude });
  //         console.log(latitude, longitude);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error.message);
  //       },
  //       options
  //     );
  //   }
  // }
  return (
    <div className='App'>
      <HomeScreen />
    </div>
  );
}

export default App;
