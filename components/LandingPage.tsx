// pages/index.js
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Welcome to Our Landing Page</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/cow.png"
              alt="Hero Image"
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
            <a
              href="#"
              className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Call to Action
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}