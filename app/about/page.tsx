export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Magadh Pharmacy</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/about" className="text-blue-600">About</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About Magadh Pharmacy
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in healthcare, providing genuine medicines and exceptional service for over a decade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Magadh Pharmacy has been serving the medical community with dedication and integrity.
              We understand the critical role pharmacies play in healthcare delivery and are committed to maintaining
              the highest standards of service.
            </p>
            <p className="text-gray-600 mb-4">
              Our team consists of experienced pharmacists and healthcare professionals who ensure that every
              prescription is filled accurately and every medicine dispensed is genuine and of the highest quality.
            </p>
          </div>
          <div className="bg-blue-100 p-8 rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Genuine medicines from authorized distributors
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                24/7 availability for emergency supplies
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Experienced pharmacists for consultation
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Fast and reliable delivery service
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Competitive pricing with transparent billing
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Prescription Filling</h4>
              <p className="text-gray-600">Accurate and timely filling of prescriptions with quality medicines.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Home Delivery</h4>
              <p className="text-gray-600">Convenient home delivery service for your medical needs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-gray-600">Round-the-clock customer support for all your healthcare queries.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}