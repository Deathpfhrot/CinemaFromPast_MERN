const Seat = (props) => {
  const updateReservation = () => {
    fetch("http://localhost:9001/seats/updateReservation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.seat.id, booked: !props.seat.booked }),
    })
      .then((res) => res.json())
      .then((result) => {
        props.setSeats(result);

        fetch("http://localhost:9001/reservations")
          .then((res) => res.json())
          .then((result) => props.setReservations(result));
      });
  };

  return (
    <li className="places seatsDimension" key={props.seat.id}>
      {props.seat.booked === true && <div>{props.seat.seat}</div>}

      <div
        onClick={updateReservation}
        className={
          props.seat.booked
            ? "seatTaken"
            : props.seat.class === "Oberschicht"
            ? "seatUpper"
            : "seatLower"
        }
      >
        {props.seat.seat}
      </div>
    </li>
  );
};

export default Seat;
