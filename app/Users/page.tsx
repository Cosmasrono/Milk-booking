'use client';
import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  Nid: string;
  name: string;
  litres: string;
  date: string;
  time: string;
  approved: boolean;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        setError(null); // Reset error state
        const response = await fetch('/api/users/');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings');
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchBookings();
  }, []);

  // Render error message if error is not null
  if (error) {
    return <div>{error}</div>;
  }

  // Render loading indicator if isLoading is true
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleApprove = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/users/${bookingId}/approve`, {
        method: 'PUT',
      });

      if (response.ok) {
        
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, approved: true } : booking
          )
        );
      } else {
        console.error('Failed to approve booking');
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  // const handleDisapprove = async (bookingId: string) => {
  //   try {
  //     const response = await fetch(`/api/users/${bookingId}/disapprove`, {
  //       method: 'PUT',
  //     });

  //     if (response.ok) {
  //       setBookings((prevBookings) =>
  //         prevBookings.map((booking) =>
  //           booking.id === bookingId ? { ...booking, approved: false } : booking
  //         )
  //       );
  //     } else {
  //       console.error('Failed to disapprove booking');
  //     }
  //   } catch (error) {
  //     console.error('Error disapproving booking:', error);
  //   }
  // };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Dashboard</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">NID</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Litres</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{booking.Nid}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{booking.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{booking.litres}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{booking.date}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{booking.time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {booking.approved ? (
                    <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                  ) : (
                    <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {!booking.approved && (
                    <>
                      {/* <button
                        onClick={() => handleApprove(booking.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Approve
                      </button> */}
                      {/* <button
                        onClick={() => handleDisapprove(booking.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Disapprove
                      </button> */}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}