import React, { useState } from 'react';
import { Flight, Booking } from '../types';
import { INITIAL_FLIGHTS, INITIAL_BOOKINGS } from '../data/profileData';
import { Plane, Search, Plus, Trash2, CheckCircle, Database, Terminal, UserCheck, RefreshCw, X } from 'lucide-react';

export const FlightManagementDemo: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>(INITIAL_FLIGHTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedFlightId, setSelectedFlightId] = useState<string>(flights[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [passengerName, setPassengerName] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);
  
  // New flight modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newFlightNo, setNewFlightNo] = useState<string>('6E-909');
  const [newOrigin, setNewOrigin] = useState<string>('Delhi (DEL)');
  const [newDestination, setNewDestination] = useState<string>('Goa (GOI)');
  const [newDepTime, setNewDepTime] = useState<string>('10:00 AM');
  const [newArrTime, setNewArrTime] = useState<string>('12:30 PM');
  const [newPrice, setNewPrice] = useState<number>(4200);

  // Live SQL query logs mimicking MySQL terminal
  const [sqlLogs, setSqlLogs] = useState<string[]>([
    '-- MySQL Initialized: schema flight_db connected',
    'SELECT * FROM flights WHERE status = "ACTIVE";',
    'SELECT * FROM bookings ORDER BY booking_date DESC LIMIT 5;'
  ]);

  const addSqlLog = (query: string) => {
    setSqlLogs((prev) => [query, ...prev.slice(0, 14)]);
  };

  const currentFlight = flights.find((f) => f.id === selectedFlightId) || flights[0];

  // Destination-wise search filter
  const filteredFlights = flights.filter((f) =>
    f.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSeat = (seatNo: number) => {
    if (currentFlight.bookedSeats.includes(seatNo)) return;
    setSelectedSeat(seatNo === selectedSeat ? null : seatNo);
  };

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeat || !passengerName.trim()) return;

    const newBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      bookingId: newBookingId,
      flightNumber: currentFlight.flightNumber,
      passengerName: passengerName.trim(),
      seatNumber: selectedSeat,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };

    // Update flight booked seats
    const updatedFlights = flights.map((f) => {
      if (f.id === currentFlight.id) {
        return {
          ...f,
          bookedSeats: [...f.bookedSeats, selectedSeat].sort((a, b) => a - b)
        };
      }
      return f;
    });

    setFlights(updatedFlights);
    setBookings([newBooking, ...bookings]);

    // SQL logs
    addSqlLog(
      `INSERT INTO bookings (booking_id, flight_number, passenger_name, seat_no, booking_date) VALUES ('${newBookingId}', '${currentFlight.flightNumber}', '${passengerName.trim()}', ${selectedSeat}, CURDATE());`
    );
    addSqlLog(
      `UPDATE flights SET booked_seats_count = booked_seats_count + 1 WHERE flight_number = '${currentFlight.flightNumber}';`
    );

    setBookingSuccessMsg(`Seat #${selectedSeat} successfully booked for ${passengerName}! (Booking ID: ${newBookingId})`);
    setPassengerName('');
    setSelectedSeat(null);

    setTimeout(() => setBookingSuccessMsg(null), 4000);
  };

  const handleDeleteFlight = (flightId: string, flightNo: string) => {
    if (flights.length <= 1) return;
    setFlights(flights.filter((f) => f.id !== flightId));
    if (selectedFlightId === flightId) {
      const remaining = flights.filter((f) => f.id !== flightId);
      setSelectedFlightId(remaining[0].id);
    }
    addSqlLog(`DELETE FROM flights WHERE id = '${flightId}' AND flight_number = '${flightNo}';`);
  };

  const handleCreateFlight = (e: React.FormEvent) => {
    e.preventDefault();
    const newFlight: Flight = {
      id: `fl-${Date.now().toString().slice(-4)}`,
      flightNumber: newFlightNo.trim() || 'AI-100',
      origin: newOrigin.trim() || 'DEL',
      destination: newDestination.trim() || 'BOM',
      departureTime: newDepTime,
      arrivalTime: newArrTime,
      price: Number(newPrice) || 3500,
      totalSeats: 30,
      bookedSeats: [],
      status: 'Scheduled'
    };

    setFlights([...flights, newFlight]);
    setSelectedFlightId(newFlight.id);
    setShowAddModal(false);

    addSqlLog(
      `INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time, price, total_seats) VALUES ('${newFlight.flightNumber}', '${newFlight.origin}', '${newFlight.destination}', '${newFlight.departureTime}', '${newFlight.arrivalTime}', ${newFlight.price}, 30);`
    );
  };

  const handleCancelBooking = (bookingId: string, flightNo: string, seatNo: number) => {
    setBookings(bookings.filter((b) => b.bookingId !== bookingId));
    setFlights(
      flights.map((f) => {
        if (f.flightNumber === flightNo) {
          return {
            ...f,
            bookedSeats: f.bookedSeats.filter((s) => s !== seatNo)
          };
        }
        return f;
      })
    );
    addSqlLog(`DELETE FROM bookings WHERE booking_id = '${bookingId}';`);
    addSqlLog(`UPDATE flights SET booked_seats_count = booked_seats_count - 1 WHERE flight_number = '${flightNo}';`);
  };

  return (
    <div id="flight-demo" className="p-5 sm:p-7 rounded-2xl bg-slate-900/80 border border-indigo-900/50 shadow-2xl">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Plane className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-white">
              ✈️ Flight Management System
            </h3>
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs">
              Python + MySQL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulated interactive implementation featuring destination search, seat grid management, passenger booking, and live MySQL queries.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Flight (SQL Insert)
        </button>
      </div>

      {/* Main interactive grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Flight Search & List */}
        <div className="lg:col-span-4 space-y-4">
          {/* Destination Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search destination (e.g. Mumbai, Goa)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value) {
                  addSqlLog(`SELECT * FROM flights WHERE destination LIKE '%${e.target.value}%';`);
                }
              }}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex justify-between items-center px-1">
            <span>Available Routes ({filteredFlights.length})</span>
            <span className="text-indigo-400">Click to inspect</span>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {filteredFlights.map((flight) => {
              const isSelected = flight.id === currentFlight?.id;
              const availableSeats = flight.totalSeats - flight.bookedSeats.length;
              return (
                <div
                  key={flight.id}
                  onClick={() => {
                    setSelectedFlightId(flight.id);
                    setSelectedSeat(null);
                    addSqlLog(`SELECT * FROM flights WHERE id = '${flight.id}';`);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-white">
                      {flight.flightNumber}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        flight.status === 'On Time'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : flight.status === 'Boarding'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {flight.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div>
                      <span className="font-medium text-white">{flight.origin}</span>
                      <span className="text-slate-500 mx-1.5">➔</span>
                      <span className="font-medium text-white">{flight.destination}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>₹{flight.price.toLocaleString()}</span>
                    <span className={availableSeats < 10 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {availableSeats} seats left
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center column: Seat Management & Passenger Booking */}
        <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  Seat Grid: {currentFlight.flightNumber}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {currentFlight.origin} to {currentFlight.destination} ({currentFlight.departureTime})
                </p>
              </div>

              {flights.length > 1 && (
                <button
                  onClick={() => handleDeleteFlight(currentFlight.id, currentFlight.flightNumber)}
                  className="text-xs text-rose-400 hover:text-rose-300 p-1.5 rounded bg-rose-950/30 border border-rose-900/40 hover:bg-rose-900/40 transition-colors"
                  title="Delete flight (SQL DELETE)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Seat Map Legend */}
            <div className="flex items-center gap-3 text-[10px] font-mono mb-3 text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span> Available
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-indigo-600 border border-indigo-500"></span> Selected
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-rose-900/60 border border-rose-800"></span> Booked
              </span>
            </div>

            {/* Seat Grid: 30 seats (6 rows x 5 cols with aisle) */}
            <div className="grid grid-cols-6 gap-1.5 max-w-xs mx-auto p-3 rounded-lg bg-slate-900/70 border border-slate-800">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((seatNo) => {
                const isBooked = currentFlight.bookedSeats.includes(seatNo);
                const isSelected = selectedSeat === seatNo;

                return (
                  <button
                    key={seatNo}
                    disabled={isBooked}
                    onClick={() => handleSelectSeat(seatNo)}
                    className={`h-8 rounded text-[11px] font-mono font-medium transition-all ${
                      isBooked
                        ? 'bg-rose-950/50 text-rose-500/70 border border-rose-900/40 cursor-not-allowed line-through'
                        : isSelected
                        ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 scale-105 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/80 cursor-pointer'
                    }`}
                  >
                    {seatNo}
                  </button>
                );
              })}
            </div>

            {/* Booking Feedback */}
            {bookingSuccessMsg && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{bookingSuccessMsg}</span>
              </div>
            )}
          </div>

          {/* Passenger Booking Form */}
          <form onSubmit={handleBookTicket} className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Selected Seat:</span>
              <span className="text-indigo-400 font-bold">
                {selectedSeat ? `#${selectedSeat}` : 'None (Click seat above)'}
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Passenger name..."
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!selectedSeat || !passengerName.trim()}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Book (SQL Insert)
              </button>
            </div>
          </form>
        </div>

        {/* Right column: SQL Console & Live Database Records */}
        <div className="lg:col-span-3 space-y-4">
          {/* Simulated MySQL Terminal */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                MySQL Query Log
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="p-3 font-mono text-[10px] text-indigo-300 h-44 overflow-y-auto space-y-1.5 bg-slate-950/90">
              {sqlLogs.map((log, index) => (
                <div key={index} className="leading-tight">
                  <span className="text-slate-600 select-none">&gt; </span>
                  <span className={log.startsWith('--') ? 'text-slate-500' : 'text-indigo-200'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Passenger Bookings Table */}
          <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3">
            <span className="text-[11px] font-mono text-slate-400 block mb-2 font-semibold">
              Recent Bookings ({bookings.length})
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {bookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px] flex items-center justify-between font-mono"
                >
                  <div>
                    <span className="text-white font-bold block">{b.passengerName}</span>
                    <span className="text-slate-400 text-[10px]">
                      {b.flightNumber} • Seat #{b.seatNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCancelBooking(b.bookingId, b.flightNumber, b.seatNumber)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-950/40 rounded transition-colors"
                    title="Cancel Booking (DELETE)"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Flight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-indigo-400" />
                Add New Flight (MySQL INSERT)
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFlight} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Flight Number</label>
                <input
                  type="text"
                  value={newFlightNo}
                  onChange={(e) => setNewFlightNo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Origin</label>
                  <input
                    type="text"
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Destination</label>
                  <input
                    type="text"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Departure</label>
                  <input
                    type="text"
                    value={newDepTime}
                    onChange={(e) => setNewDepTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Arrival</label>
                  <input
                    type="text"
                    value={newArrTime}
                    onChange={(e) => setNewArrTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Fare (INR ₹)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  Execute INSERT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
