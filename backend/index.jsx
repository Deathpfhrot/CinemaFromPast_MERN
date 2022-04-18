const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bookingData = require("./bookingData.json");
const { readData, writeData } = require("./data-functions");
const { sendMail } = require("./mail-functions");
const { reservationMessage } = require("./mail-message");

// const { readBookedSeats, writeBookedSeats } = require("./bookingList");

console.log(bookingData);

let reservArray = [];

const PORT = 9001;
const app = express();

app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.BOOKING_API_KEY;

// Middleware
app.use((req, _, next) => {
  console.log("New Request -", req.method, req.url);
  next();
});

// GET

app.get("/seats", (_, res) => {
  readData(__dirname + "/bookingData.json").then((result) => res.json(result));
});

app.get("/reservations", (_, res) => {
  console.log("Array value from Get", reservArray);
  res.json(reservArray);
});

// POST

app.post("/Reservation", (req, res) => {
  const order = req.body.order;
  const mailAddress = req.body.email;

  sendMail({
    to: mailAddress,
    subject: "New seat has been reserved",
    message: reservationMessage(order),
  })
    .then(() => {
      reservArray = [];
    })
    .catch((err) => {
      res.status(400).json({ error: "Error during reservation" });
    });
});

//PUT

app.put("/seats/updateReservation", (req, res) => {
  const targetId = req.body.id;
  const newOne = req.body.booked;
  let newReservation = {};

  readData(__dirname + "/bookingData.json")
    .then((seats) => {
      const updatedSeatsArray = seats.map((seat) => {
        if (seat.id === targetId) {
          newReservation = {
            id: seat.id,
            row: seat.row,
            seatNumber: seat.seat,
            price: seat.priceback,
          };
          return { ...seat, booked: newOne };
        } else {
          return seat;
        }
      });
      return updatedSeatsArray;
    })
    .then((updatedSeatsArray) =>
      writeData(updatedSeatsArray, __dirname + "/bookingData.json")
    )
    .then((result) => {
      reservArray.push(newOne);
      res.json(result);
    })
    .catch((_) =>
      res.status(500).json({ err: "Unkown error while reader/wreating" })
    );
});

app.put("/seats/deleteReservation", (req, res) => {
  const targetId = req.body.id;

  readData(__dirname + "/bookingData.json")
    .then((seats) => {
      const updatedSeatsArray = seats.map((seat) => {
        if (seat.id === targetId) {
          return { ...seat, booked: false };
        } else {
          return seat;
        }
      });
      return updatedSeatsArray;
    })
    .then((updatedSeatsArray) =>
      writeData(updatedSeatsArray, __dirname + "/bookingData.json")
    )
    .then((result) => {
      console.log(result);
      reservArray = reservArray.filter(
        (reservArray) => reservArray.id !== targetId
      );
      res.json(result);
    })
    .catch((_) =>
      res.status(500).json({ err: "Unkown error while read/write" })
    );
});

app.put("/seats/clearAll", (_, res) => {
  readData(__dirname + "/bookingData.json")
    .then((seats) => {
      const tempSeatArray = seats.map((seat) => {
        if (seat.booked === true) {
          return { ...seat, booked: false };
        } else {
          return seat;
        }
      });
      return tempSeatArray;
    })
    .then((updatedSeatsArray) =>
      writeData(updatedSeatsArray, __dirname + "/bookingData.json")
    )
    .then((result) => {
      reservArray = [];
      res.json(result);
    })
    .catch((_) =>
      res.status(500).json({ err: "Unknown Err whilte write/read" })
    );
});

// DELETE

app.delete("/seats/clearReserv", (_, res) => {
  reservArray = [];
  res.end();
});

// ERR
app.use((_, res) => {
  res.status(404).json({ error: "Not found." });
});

app.listen(PORT, () => console.log("Server listening to port :", PORT));
