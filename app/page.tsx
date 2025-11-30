import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Magadh Pharmacy</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button>Doctor Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Trusted Medical Supplier for Doctors & Clinics
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Magadh Pharmacy provides genuine medicines with quick supply and verified stock.
            Streamline your medical practice with our efficient ordering system.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="mr-4">Register as Doctor</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">Login</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Genuine Medicines</h3>
            <p className="text-gray-600">We source medicines directly from authorized distributors ensuring authenticity and quality.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Delivery</h3>
            <p className="text-gray-600">Fast and reliable delivery service to ensure your patients get their medicines on time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Stock</h3>
            <p className="text-gray-600">Real-time stock tracking with expiry date monitoring for complete transparency.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 Magadh Pharmacy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}