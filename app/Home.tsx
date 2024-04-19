// 'use client';
// import { useState, useEffect } from "react";


// export default function Home() {
//   const [id, setId] = useState("");
//   const [name, setName] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [bookings, setBookings] = useState<{
//     id: string;
//     Nid: string;
//     name: string;
//     date: string;
//     time: string;
//   }[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await fetch("/api/bookings");
//       const data = await response.json();
//       setBookings(data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();

//     // Reset the error state
//     setError("");

//     // Check if any field is empty
//     if (!id || !name || !date || !time) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     const response = await fetch("/api/bookings/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ Nid: id, name, date, time }),
//     });

//     if (response.ok) {
//       console.log("Booking successful!");
//       const newBooking = await response.json();
//       setBookings([...bookings, newBooking]);
//       setId("");
//       setName("");
//       setDate("");
//       setTime("");
//     } else {
//       console.error("Booking failed!");
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-3xl font-semibold mb-6 text-center">
//           Online Booking System
//         </h1>
//         {error && (
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
//             role="alert"
//           >
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               className="block text-gray-700 font-semibold mb-2"
//               htmlFor="id"
//             >
//               ID
//             </label>
//             <input
//               id="id"
//               type="text"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-semibold mb-2"
//               htmlFor="name"
//             >
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-semibold mb-2"
//               htmlFor="date"
//             >
//               Date
//             </label>
//             <input
//               id="date"
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div>
//             <label
//               className="block text-gray-700 font-semibold mb-2"
//               htmlFor="time"
//             >
//               Time
//             </label>
//             <input
//               id="time"
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Bookings</h2>
//         <table className="w-full table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">NID</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.id} className="border-b">
//                 <td className="px-4 py-2">{booking.Nid}</td>
//                 <td className="px-4 py-2">{booking.name}</td>
//                 <td className="px-4 py-2">{booking.date}</td>
//                 <td className="px-4 py-2">{booking.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
 
//     </div>
//   );
// }