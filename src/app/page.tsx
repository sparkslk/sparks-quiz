import Link from 'next/link';
import { FaLeaf, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <FaLeaf className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SPARKS</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ignite Your <span className="text-indigo-600">Well-Being</span> Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Take our comprehensive 26-question assessment to receive a personalized well-being plan
            tailored specifically to your lifestyle, goals, and preferences.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Start Your Assessment</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <FaCheckCircle className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Assessment</h3>
            <p className="text-gray-600">
              26 carefully crafted questions covering energy, sleep, stress, relationships, and personal goals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FaLeaf className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Plan</h3>
            <p className="text-gray-600">
              Receive customized recommendations based on your unique responses and lifestyle preferences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FaArrowRight className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Actionable Insights</h3>
            <p className="text-gray-600">
              Get practical, science-backed strategies you can implement immediately to improve your well-being.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who have discovered their path to better well-being
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-200"
          >
            <span>Take the Quiz Now</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <FaLeaf className="text-gray-900 text-sm" />
              </div>
              <span className="text-lg font-semibold">SPARKS</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 SPARKS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
