import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface Vehicle {
  id: string;
  name: string;
  type: 'scooter' | 'bike' | 'premium-bike';
  location: string;
  rate: number;
  status: 'available' | 'rented' | 'maintenance';
  owner: string;
  image: string;
}

interface Rental {
  id: string;
  vehicleId: string;
  vehicleName: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  status: 'active' | 'completed' | 'cancelled';
}

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleFormData, setVehicleFormData] = useState({
    name: '',
    type: 'scooter' as 'scooter' | 'bike' | 'premium-bike',
    location: '',
    rate: '',
    image: ''
  });
  const [rentalFormData, setRentalFormData] = useState({
    startTime: '',
    endTime: '',
    duration: ''
  });
  const { currentUser, logout } = useAuth();

  // Demo data for vehicles
  const demoVehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Honda Activa 6G',
      type: 'scooter',
      location: 'Mumbai Central',
      rate: 25,
      status: 'available',
      owner: 'Smart Rental',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: '2',
      name: 'Bajaj Pulsar 150',
      type: 'bike',
      location: 'Delhi Airport',
      rate: 40,
      status: 'available',
      owner: 'Smart Rental',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: '3',
      name: 'Royal Enfield Classic 350',
      type: 'premium-bike',
      location: 'Bangalore City Center',
      rate: 60,
      status: 'available',
      owner: 'Smart Rental',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: '4',
      name: 'TVS Jupiter',
      type: 'scooter',
      location: 'Chennai Beach',
      rate: 25,
      status: 'rented',
      owner: 'Smart Rental',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: '5',
      name: 'Yamaha FZ-S',
      type: 'bike',
      location: 'Pune Station',
      rate: 40,
      status: 'available',
      owner: 'Smart Rental',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    }
  ];

  useEffect(() => {
    // Load demo vehicles
    setVehicles(demoVehicles);
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'rentals'));
      const rentalsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Rental[];
      setRentals(rentalsData);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    }
  };

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'vehicles'), {
        ...vehicleFormData,
        rate: parseFloat(vehicleFormData.rate),
        status: 'available',
        owner: currentUser?.email || 'Unknown'
      });
      setVehicleFormData({ name: '', type: 'scooter', location: '', rate: '', image: '' });
      setShowVehicleForm(false);
      // Add to local state for demo
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        ...vehicleFormData,
        rate: parseFloat(vehicleFormData.rate),
        status: 'available',
        owner: currentUser?.email || 'Unknown'
      };
      setVehicles([...vehicles, newVehicle]);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleRentalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    const startTime = new Date(rentalFormData.startTime);
    const endTime = new Date(rentalFormData.endTime);
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // hours
    const totalCost = duration * selectedVehicle.rate;

    try {
      await addDoc(collection(db, 'rentals'), {
        vehicleId: selectedVehicle.id,
        vehicleName: selectedVehicle.name,
        startTime: rentalFormData.startTime,
        endTime: rentalFormData.endTime,
        totalCost,
        status: 'active',
        userId: currentUser?.uid
      });

      // Update vehicle status
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id ? { ...v, status: 'rented' } : v
      ));

      setRentalFormData({ startTime: '', endTime: '', duration: '' });
      setShowRentalForm(false);
      setSelectedVehicle(null);
      fetchRentals();
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  };

  const getVehicleTypeColor = (type: string) => {
    switch (type) {
      case 'scooter': return 'bg-blue-100 text-blue-800';
      case 'bike': return 'bg-green-100 text-green-800';
      case 'premium-bike': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Smart Rental</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {currentUser?.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Vehicles</h2>
            <button
              onClick={() => setShowVehicleForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              List Your Vehicle
            </button>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 mb-2">{vehicle.location}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVehicleTypeColor(vehicle.type)}`}>
                    {vehicle.type.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>
                <p className="text-lg font-semibold text-green-600 mb-4">₹{vehicle.rate}/hour</p>
                <button
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    setShowRentalForm(true);
                  }}
                  disabled={vehicle.status !== 'available'}
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                    vehicle.status === 'available'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {vehicle.status === 'available' ? 'Rent Now' : 'Not Available'}
                </button>
              </div>
            ))}
          </div>

          {/* Active Rentals */}
          {rentals.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Active Rentals</h3>
              <div className="space-y-4">
                {rentals.map((rental) => (
                  <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{rental.vehicleName}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(rental.startTime).toLocaleString()} - {new Date(rental.endTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₹{rental.totalCost}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rental.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rental.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showVehicleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">List Your Vehicle</h3>
            <form onSubmit={handleVehicleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                <input
                  type="text"
                  value={vehicleFormData.name}
                  onChange={(e) => setVehicleFormData({...vehicleFormData, name: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={vehicleFormData.type}
                  onChange={(e) => setVehicleFormData({...vehicleFormData, type: e.target.value as any})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="scooter">Scooter</option>
                  <option value="bike">Bike</option>
                  <option value="premium-bike">Premium Bike</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={vehicleFormData.location}
                  onChange={(e) => setVehicleFormData({...vehicleFormData, location: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rate per Hour (₹)</label>
                <input
                  type="number"
                  value={vehicleFormData.rate}
                  onChange={(e) => setVehicleFormData({...vehicleFormData, rate: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowVehicleForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  List Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rental Modal */}
      {showRentalForm && selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rent {selectedVehicle.name}</h3>
            <form onSubmit={handleRentalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  value={rentalFormData.startTime}
                  onChange={(e) => setRentalFormData({...rentalFormData, startTime: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="datetime-local"
                  value={rentalFormData.endTime}
                  onChange={(e) => setRentalFormData({...rentalFormData, endTime: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Rate: ₹{selectedVehicle.rate}/hour</p>
                <p className="text-sm text-gray-600">Location: {selectedVehicle.location}</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRentalForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Confirm Rental
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;