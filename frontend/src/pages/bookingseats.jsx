import { Link } from "react-router-dom";
import sonic from "../sonic.jpeg";
import popey from "../popey.jpeg";
import morbius from "../morbius.jpeg";
import wonderwoman from "../wonderwoman.jpeg";

const Booking = () => {
  fetch("http://localhost:9001/seats")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <main>
      <section>
        <img src={sonic} alt="soniceboom" />
        <img src={popey} alt="spinat" />
        <img src={morbius} alt="venom enemy" />
        <img src={wonderwoman} alt="hot" />
      </section>
      <h1>Would you like to bookmark some seats for the upcoming movie?</h1>
      <article>
        <div>
          <Link to="/bookingSite">Go to Bookingsite</Link>
        </div>
        <div>
          <Link to="/dashboard">Visit the Dashboard</Link>
        </div>
      </article>
    </main>
  );
};

export default Booking;
