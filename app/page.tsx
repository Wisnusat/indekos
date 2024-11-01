"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sliders, Building, Star, Wifi, Home, Users, ArrowRight, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RoomSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const suggestions = [
    "Kos Putri Menteng Jakarta",
    "Kos Dekat UI Depok",
    "Kos Furnished Bandung",
    "Kos Premium BSD"
  ];

  const popularLocations = [
    { name: "Jakarta Selatan", count: "2,345 kos" },
    { name: "Bandung", count: "1,892 kos" },
    { name: "Yogyakarta", count: "1,567 kos" },
    { name: "Surabaya", count: "1,234 kos" }
  ];

  const featuredRooms = [
    {
      title: "Kos Premium Menteng",
      location: "Menteng, Jakarta Pusat",
      price: "Rp 3.500.000",
      rating: 4.8,
      reviews: 124,
      amenities: ["WiFi", "AC", "Furnished"],
      type: "Putri",
      image: "https://via.placeholder.com/600x400.png?text=Room+Image"
    },
    {
      title: "Kos Exclusive BSD",
      location: "BSD City, Tangerang",
      price: "Rp 2.800.000",
      rating: 4.7,
      reviews: 98,
      amenities: ["WiFi", "AC", "Dapur"],
      type: "Campur",
      image: "https://via.placeholder.com/600x400.png?text=Room+Image"
    },
    {
      title: "Kos Near Campus",
      location: "Depok, Jawa Barat",
      price: "Rp 1.800.000",
      rating: 4.5,
      reviews: 156,
      amenities: ["WiFi", "Furnished"],
      type: "Putra",
      image: "https://via.placeholder.com/600x400.png?text=Room+Image"
    }
  ];

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Effect to filter suggestions based on search value
  useEffect(() => {
    const filterSuggestions = () => {
      if (searchValue) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions(suggestions);
      }
    };

    const debouncedFilter = debounce(filterSuggestions, 200);
    debouncedFilter();
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) {
      setFilteredSuggestions(suggestions);
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-500">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="text-white text-2xl font-bold">Indekos</div>
        <div className="flex gap-4">
          <a href="#" className="text-white hover:text-indigo-100">Pusat Bantuan</a>
          <a href="#" className="text-white hover:text-indigo-100">Syarat dan Ketentuan</a>
          <button className="bg-white text-indigo-600 px-4 py-1 rounded-full hover:bg-indigo-50">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 pt-16 pb-24">
        <h1 className="text-white text-5xl font-bold mb-3">Temukan Kos Impianmu</h1>
        <p className="text-indigo-100 text-xl mb-8">Ribuan pilihan kos nyaman dengan harga terjangkau</p>

        {/* Search Card */}
        <Card className="w-full max-w-3xl shadow-xl relative">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Masukkan lokasi atau nama kos"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                />
                {searchValue && (
                  <button 
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchValue('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button className="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <Search size={20} />
                Cari
              </button>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-1/2 left-0 right-0 bg-white rounded-b-lg shadow-lg border-t z-10 mt-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => {
                      setSearchValue(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search size={16} className="text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Quick Filters */}
            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Sliders size={16} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Building size={16} />
                Tipe Kos
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Users size={16} />
                Kapasitas
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Searches */}
        <div className="flex gap-3 mt-6">
          <span className="text-indigo-100">Populer:</span>
          <button className="text-white hover:underline">Kos Putri</button>
          <button className="text-white hover:underline">Kos Dekat Kampus</button>
          <button className="text-white hover:underline">Kos Bulanan</button>
        </div>
      </div>

      {/* Popular Locations Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Lokasi Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((location, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-4">{location.count}</p>
                  <button className="text-indigo-600 flex items-center gap-2 hover:text-indigo-700">
                    Lihat Semua <ArrowRight size={16} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Rooms Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Rekomendasi Kos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={room.image} alt={room.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{room.title}</h3>
                      <p className="text-gray-600">{room.location}</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                      {room.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="text-yellow-400" size={16} />
                    <span className="font-semibold">{room.rating}</span>
                    <span className="text-gray-600">({room.reviews} reviews)</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {room.amenities.map((amenity, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-indigo-600">{room.price}</div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      Lihat Detail
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSearch;