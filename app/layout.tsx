'use client';
import Link from 'next/link';
import './globals.css'
import { Toaster } from 'react-hot-toast';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Add any necessary head elements */}
      </head>
      <body className="bg-gray-100">
        <header className="bg-white shadow">
          <nav className="container mx-auto py-4 flex items-center justify-between">
            <div>
              <Link href="/" className="text-blue-500 font-semibold text-xl">
              SWEET Taste milk
              </Link>
            </div>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/home"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/Admin"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  href="/Users"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/Auth"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  sign up
                </Link>
              </li>
            </ul>
            
          </nav>
        </header>
        <main className="container mx-auto py-8">
        <Toaster position="bottom-center" />
          {children}</main>
      </body>
    </html>
  );
}