const ReservationItem = (props) => {
  const deleteReservation = () => {
    fetch("http://localhost:9001/seats/deleteReservation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.reservation.id }),
    })
      .then((res) => res.json())
      .then((result) => {
        props.setSeats(result);

        fetch("http://localhost:9000/reservations")
          .then((res) => res.json())
          .then((result) => props.setReservations(result));
      });
  };

  return (
    <li className="reservLines" key={props.id}>
      <p>Row: {props.reservation.row}</p>
      <p>Place: {props.reservation.seat}</p>
      <p>Price: {props.reservation.priceback}</p>
      <div onClick={deleteReservation}>Click to Delete</div>
    </li>
  );
};

export default ReservationItem;
