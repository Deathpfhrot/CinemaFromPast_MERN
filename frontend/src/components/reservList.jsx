import ReservationItem from "./reservItem";

const ReservList = (props) => {
  return (
    <div>
      <ul>
        {props.reservations.map((reservation) => (
          <ReservationItem
            reservation={reservation}
            setReservations={props.setReservations}
            key={reservation.id}
            setSeats={props.setSeats}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReservList;
