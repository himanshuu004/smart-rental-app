import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Auth from './Auth';

const LandingPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'renter' | 'owner'>('renter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Smart Rental</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => { setAuthType('renter'); setShowAuth(true); }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Rent Vehicles
              </button>
              <button
                onClick={() => { setAuthType('owner'); setShowAuth(true); }}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                List Your Vehicle
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Rental
            <span className="block text-indigo-600">Ride Anywhere, Return Anywhere</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The future of vehicle rental is here. Rent bikes and scooters for your trips, 
            return them at any location, and earn rewards for helping balance our fleet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setAuthType('renter'); setShowAuth(true); }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => { setAuthType('owner'); setShowAuth(true); }}
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Earn with Your Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Smart Rental?</h2>
            <p className="text-xl text-gray-600">Revolutionary features that make vehicle rental smarter</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Return Locations</h3>
              <p className="text-gray-600">Return your vehicle at any nearby location. Get incentives for returning to under-served areas.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Booking</h3>
              <p className="text-gray-600">AI-powered predictions suggest optimal pick-up and drop-off points based on demand patterns.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pay Only When You Use</h3>
              <p className="text-gray-600">Affordable hourly rates starting from just ₹25/hour. No hidden charges, no monthly commitments.</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dynamic Rebalancing</h3>
              <p className="text-gray-600">Our smart system automatically moves vehicles between locations to meet demand.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Peer-to-Peer Returns</h3>
              <p className="text-gray-600">Connect with other users traveling in opposite directions to help return vehicles.</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Agency Network</h3>
              <p className="text-gray-600">Return vehicles to any connected agency near your destination. Seamless experience across cities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Affordable Rates</h2>
            <p className="text-xl text-gray-600">Pay only for what you use, when you use it</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Scooter</h3>
                <div className="text-4xl font-bold text-indigo-600 mb-4">₹25<span className="text-lg text-gray-500">/hour</span></div>
                <ul className="text-gray-600 space-y-2">
                  <li>✓ Perfect for city rides</li>
                  <li>✓ Easy to park</li>
                  <li>✓ Fuel efficient</li>
                  <li>✓ Available 24/7</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bike</h3>
                <div className="text-4xl font-bold text-indigo-600 mb-4">₹40<span className="text-lg text-gray-500">/hour</span></div>
                <ul className="text-gray-600 space-y-2">
                  <li>✓ Great for longer rides</li>
                  <li>✓ Comfortable seating</li>
                  <li>✓ Higher speed</li>
                  <li>✓ GPS enabled</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Bike</h3>
                <div className="text-4xl font-bold text-indigo-600 mb-4">₹60<span className="text-lg text-gray-500">/hour</span></div>
                <ul className="text-gray-600 space-y-2">
                  <li>✓ Latest models</li>
                  <li>✓ Premium features</li>
                  <li>✓ Enhanced safety</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">Join thousands of users who are already enjoying smart vehicle rental</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setAuthType('renter'); setShowAuth(true); }}
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Now
            </button>
            <button
              onClick={() => { setAuthType('owner'); setShowAuth(true); }}
              className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              List Your Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Smart Rental</h3>
            <p className="text-gray-400 mb-4">The future of vehicle rental is here</p>
            <p className="text-gray-500">&copy; 2024 Smart Rental. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {authType === 'renter' ? 'Rent Vehicles' : 'List Your Vehicle'}
              </h2>
              <button
                onClick={() => setShowAuth(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Auth authType={authType} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
