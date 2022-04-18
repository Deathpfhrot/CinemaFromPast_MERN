// import { useEffect } from "react";
// import { useState } from "react";
import "./App.css";
import Booking from "./pages/bookingseats";
import Header from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookingsite from "./pages/bookingSite";
import Dashboard from "./pages/dashboard";

function App() {
  // const [seats, setSeats] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:9001/kino1/seats/all")
  //     .then((resp) => resp.json())
  //     .then((bookedArray) => {
  //       setSeats(bookedArray);
  //     });
  // }, []); // wird nur einaml durchgeführt

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/bookingSite" element={<Bookingsite />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
