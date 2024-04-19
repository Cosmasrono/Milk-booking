'use client';
import { useState } from "react";

export default function Home() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [litres, setLitres] = useState("");
  const [bookings, setBookings] = useState<{
    Nid: string; name: string; date: string; time: string; litres: string;
  }[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Reset the error state
    setError("");

    // Check if any field is empty
    if (!id || !name || !date || !time || !litres) {
      setError("Please fill in all fields.");
      return;
    }

    const response = await fetch("/api/bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Nid: id, name, date, litres }),
    });

    if (response.ok) {
      alert("Booking successful!");
      const newBooking = await response.json();
      setBookings([...bookings, { ...newBooking, time }]);
      setId("");
      setName("");
      setDate("");
      setTime("");
      setLitres("");
    } else {
      console.error("Booking failed!");
    }
  };


  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Online Booking System
        </h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            role="alert"
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="id"
            >
              ID
            </label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
      <label
        className="block text-gray-700 font-semibold mb-2"
        htmlFor="litres"
      >
        Litres of Milk
      </label>
      <input
        id="litres"
        type="number"
        value={litres}
        onChange={(e) => setLitres(e.target.value)}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Bookings</h2>
        <ul>
          {bookings.map((booking) => (
           <li
           key={`${booking.Nid}-${booking.date}-${booking.time}-${booking.litres}`}
           className="mb-2 px-4 py-2 bg-gray-100 rounded-md"
         >
           <span className="font-semibold">NID:</span> {booking.Nid},{" "}
           <span className="font-semibold">Name:</span> {booking.name},{" "}
           <span className="font-semibold">Date:</span> {booking.date},{" "}
           <span className="font-semibold">Time:</span> {booking.time},{" "}
           <span className="font-semibold">Litres:</span> {booking.litres}
         </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
