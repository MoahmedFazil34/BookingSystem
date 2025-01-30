import React, { useState } from "react";

// Rows and seats per row
const rows = 6;
const seatsPerRow = 10;

// Create seat data
const generateSeats = () => {
  const seatData = [];
  for (let row = 0; row < rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      const seatId = String.fromCharCode(65 + row) + (seat + 1); // Example: A1, A2, B1...
      let type = "";
      let price = 0;

      if (row < 2) {
        type = "platinum";
        price = 200;
      } else if (row < 4) {
        type = "gold";
        price = 150;
      } else {
        type = "silver";
        price = 100;
      }

      seatData.push({ id: seatId, type, price, isSelected: false });
    }
  }
  return seatData;
};

const SeatLayout = () => {
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleSeatSelection = (seatId, price) => {
    // Find the seat by ID
    const updatedSeats = seats.map((seat) =>
      seat.id === seatId
        ? { ...seat, isSelected: !seat.isSelected }
        : seat
    );

    setSeats(updatedSeats);

    // Update selected seats and total price
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
      setTotalPrice((prev) => prev - price);
    } else {
      if (selectedSeats.length >= 8) {
        alert("You can only select up to 8 seats");
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
      setTotalPrice((prev) => prev + price);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
    } else {
      alert(`Booking successful!\nSeats: ${selectedSeats.join(", ")}\nTotal: ₹${totalPrice}`);
    }
  };

  return (
    <div>
      <div className="seat-layout">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.type} ${seat.isSelected ? "selected" : ""}`}
            onClick={() => toggleSeatSelection(seat.id, seat.price)}
          >
            {seat.id}
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Selected Seats: <span>{selectedSeats.join(", ") || "None"}</span></p>
        <p>Total Price: <span>₹{totalPrice}</span></p>
      </div>

      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default SeatLayout;
