import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9001/seats")
      .then((res) => res.json())
      .then((result) => setSeats(result));
  }, []);

  const getSales = () => {
    let sale = 0;
    seats.map((seat) => {
      if (seat.booked === true) {
        sale += seat.priceback;
      }
    });
    return sale;
  };

  const getFreeSeats = () => {
    const freeSeats = seats.filter((seat) => seat.booked === false);
    return freeSeats.length;
  };

  const reset = () => {
    fetch("http://localhost:9001/seats/clearReserv", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => setSeats(result));
  };

  return (
    <main>
      <h1>Dashboard für Kinobesitzer</h1>
      <div>
        <h3>Freie Plätze</h3>
        <p>{getFreeSeats}</p>
      </div>
      <div>
        <h3>Umsatz</h3>
        <p>{getSales}</p>
      </div>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
      <Link to={"/"}>Go back to Home</Link>
    </main>
  );
};

export default Dashboard;
