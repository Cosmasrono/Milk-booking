'use client';
import { useState, useEffect } from 'react';
import { Camera, Loader } from 'lucide-react';
interface Booking {
  id: string;
  Nid: string;
  name: string;
  date: string;
  time: string;
  approved: boolean;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        setError(null); // Reset error state
        const response = await fetch('/api/admin/');
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
    setApproving(true);
    try {
      const response = await fetch(`/api/admin/approved`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId }),
      });
  
      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, approved: true } : booking
          )
        );
        setApproving(false);
      } else {
        console.error('Failed to approve booking');
        setApproving(false);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
      setApproving(false);
    }
  };

  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Admin Dashboard</h1>
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">NID</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="md:table-row flex flex-col md:flex-row">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:border-none">
                  <span className="font-semibold md:hidden">NID:</span> {booking.Nid}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:border-none">
                  <span className="font-semibold md:hidden">Name:</span> {booking.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:border-none">
                  <span className="font-semibold md:hidden">Date:</span> {booking.date}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:border-none">
                  <span className="font-semibold md:hidden">Time:</span> {booking.time}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:border-none">
                  <span className="font-semibold md:hidden">Status:</span>
                  {booking.approved ? (
                    <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                  ) : (
                    <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 md:border-none">
                  <span className="font-semibold md:hidden">Actions:</span>
                  {!booking.approved && (
                    <div className="flex flex-col md:flex-row">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mb-2 md:mb-0 md:mr-2"
                      >
                        {approving && booking.id === booking.id ? (
                          <div className="flex items-center">
                            <Loader className="animate-spin h-4 w-4 mr-2" />
                            Approving...
                            </div>
                            ) : (
                              'Approve'
                            )}
                      </button>
                      {/* <button
                        onClick={() => handleDisapprove(booking.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Disapprove
                      </button> */}
                    </div>
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