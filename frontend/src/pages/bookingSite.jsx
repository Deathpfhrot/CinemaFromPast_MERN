import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SeatList from "../components/seatList";
import ReservList from "../components/reservList";

const Bookingsite = () => {
  const [seats, setSeats] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9001/seats")
      .then((res) => res.json())
      .then((result) => setSeats(result));

    fetch("http://localhost:9001/seats/clearResvArr", { method: "DELETE" });
  }, []);
  return (
    <body>
      <main className="bookingMainSeats">
        <section>
          <h1>
            Hier haben sie die möglichkeit Ihren persönlichen Sitzplatz
            auszusuchen im Kino!
          </h1>
          <article className="placeOptions">
            <aside className="places">
              <div className="circle blue"></div>
              <h3>Seat Upper Class</h3>
            </aside>
            <aside className="places">
              <div className="circle yellow"></div>
              <h3>Seat Down Class</h3>
            </aside>
            <aside className="places">
              <div className="circle red"></div>
              <h3>Seatplace Reserved</h3>
            </aside>
            <aside className="places">
              <div className="block tomato"></div>
              <h3>Movie Canvas</h3>
            </aside>
          </article>
        </section>
        <article>
          <div>
            <SeatList
              seats={seats}
              setSeats={setSeats}
              reservations={reservations}
              setReservations={setReservations}
            />
          </div>
          <div id="leinwand" className="tomato">
            Leinwand
          </div>
        </article>
        <article>
          <div>
            <h3>Reservierungen:</h3>
            <ReservList
              reservations={reservations}
              setReservations={setReservations}
              setSeats={setSeats}
            />
          </div>
        </article>
        <Link className="linkBooking" to={"/"}>
          Go back to Home
        </Link>
      </main>
    </body>
  );
};

export default Bookingsite;
