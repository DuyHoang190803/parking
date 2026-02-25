import { useState, useEffect } from 'react'
import './App.css'
import TokenInput from './components/TokenInput'
import MapView from './components/MapView'
import SearchModal from './components/SearchModal'
import QRScanner from './components/QRScanner'
import MenuSidebar from './components/MenuSidebar'
// import ActivityTab from './components/ActivityTab'
// import VehiclesTab from './components/VehiclesTab'
import AccountTab from './components/AccountTab'
import NotificationTab from './components/NotificationTab'
import ZoneDetail from './components/ZoneDetail'
import LotDetail from './components/LotDetail'
import PastViolation from './components/PastViolation'
import IssueTicket from './components/IssueTicket'
import { IoMap, IoNotifications, IoPerson, IoQrCode } from 'react-icons/io5'

interface ParkingSpot {
  id: number;
  name: string;
  address: string;
  price: number;
  available: boolean;
  distance: number;
  capacity: number;
  occupied: number;
}

type View = 'map' | 'list' | 'notification' | 'account';
// type View = 'map' | 'list' | 'activity' | 'vehicles' | 'account';

function App() {
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [filter, setFilter] = useState<'all' | 'available' | 'full'>('all');
  
  // Modal states
  const [showSearch, setShowSearch] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showZoneDetail, setShowZoneDetail] = useState(false);
  const [showLotDetail, setShowLotDetail] = useState(false);
  const [showPastViolation, setShowPastViolation] = useState(false);
  const [showIssueTicket, setShowIssueTicket] = useState(false);
  
  // Navigation state
  const [selectedZone, setSelectedZone] = useState<{name: string; available: number; total: number; pricePerHour: string} | null>(null);
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const [selectedLotStatus, setSelectedLotStatus] = useState<string | undefined>(undefined);
  const [selectedLotHasWarning, setSelectedLotHasWarning] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  const handleTokenValid = (token: string) => {
    setMapboxToken(token);
  };

  if (!mapboxToken) {
    return <TokenInput onTokenValid={handleTokenValid} />;
  }

  const parkingSpots: ParkingSpot[] = [
    { id: 1, name: 'Central Parking Lot', address: '123 Nguyen Hue, District 1', price: 15000, available: true, distance: 0.5, capacity: 50, occupied: 23 },
    { id: 2, name: 'Parkson Hung Vuong', address: '126 Hung Vuong, District 5', price: 20000, available: true, distance: 1.2, capacity: 100, occupied: 78 },
    { id: 3, name: 'Vincom Center', address: '72 Le Thanh Ton, District 1', price: 25000, available: false, distance: 0.8, capacity: 80, occupied: 80 },
    { id: 4, name: 'Diamond Plaza', address: '34 Le Duan, District 1', price: 30000, available: true, distance: 1.5, capacity: 120, occupied: 95 },
    { id: 5, name: 'Bitexco Financial', address: '2 Hai Trieu, District 1', price: 35000, available: true, distance: 0.9, capacity: 150, occupied: 67 },
    { id: 6, name: 'Saigon Centre', address: '65 Le Loi, District 1', price: 28000, available: false, distance: 1.1, capacity: 90, occupied: 90 },
    { id: 7, name: 'Landmark 81', address: '720A Dien Bien Phu, Binh Thanh', price: 40000, available: true, distance: 3.2, capacity: 200, occupied: 156 },
    { id: 8, name: 'Crescent Mall', address: '101 Ton Dat Tien, District 7', price: 22000, available: true, distance: 5.5, capacity: 180, occupied: 89 },
  ];

  const filteredSpots = parkingSpots.filter(spot => {
    const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          spot.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'available' && spot.available) || 
                         (filter === 'full' && !spot.available);
    return matchesSearch && matchesFilter;
  });

  const handleBooking = (spot: ParkingSpot) => {
    if (spot.available) {
      setSelectedSpot(spot);
      setShowBooking(true);
    }
  };

  const confirmBooking = () => {
    alert(`Booking successful at ${selectedSpot?.name}!`);
    setShowBooking(false);
    setSelectedSpot(null);
  };

  const handleZoneClick = (zone: {name: string; available: number; total: number; pricePerHour: string}) => {
    setSelectedZone(zone);
    setShowZoneDetail(true);
  };

  const handleSelectLot = (lotNumber: string, status?: string, hasWarning?: boolean) => {
    setSelectedLot(lotNumber);
    setSelectedLotStatus(status);
    setSelectedLotHasWarning(hasWarning);
    setShowLotDetail(true);
  };

  const handleIssueTicket = () => {
    setShowPastViolation(true);
  };

  const handleIssueTicketFromPastViolation = () => {
    setShowPastViolation(false);
    setShowIssueTicket(true);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setShowZoneDetail(false);
    setShowLotDetail(false);
    setShowIssueTicket(false);
  };

  return (
    <div className="app">
      {/* Modals */}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showQRScanner && <QRScanner onClose={() => setShowQRScanner(false)} />}
      {showMenu && <MenuSidebar onClose={() => setShowMenu(false)} />}
      {showZoneDetail && (
        <ZoneDetail 
          zoneName={selectedZone?.name || 'Zone'} 
          onBack={() => setShowZoneDetail(false)}
          onSelectLot={handleSelectLot}
        />
      )}
      {showLotDetail && (
        <LotDetail 
          lotNumber={selectedLot || 'B-302'} 
          zoneName={selectedZone?.name || 'Zone B - North'}
          status={selectedLotStatus}
          hasWarning={selectedLotHasWarning}
          onBack={() => setShowLotDetail(false)}
          onIssueTicket={handleIssueTicket}
        />
      )}
      {showPastViolation && (
        <PastViolation
          onClose={() => setShowPastViolation(false)}
          onIssueTicket={handleIssueTicketFromPastViolation}
        />
      )}
      {showIssueTicket && (
        <IssueTicket onClose={() => setShowIssueTicket(false)} />
      )}

      {/* Map View or List View */}
      {currentView === 'map' ? (
        <div className="map-container">
          {/* Map Header Overlay */}
          <div className="map-header-overlay">
            {/* <button className="map-header-btn search-btn" onClick={() => setShowSearch(true)}>
              <IoSearch size={22} />
            </button> */}
            <button className="map-header-btn qr-btn" onClick={() => setShowQRScanner(true)}>
              <IoQrCode size={22} />
            </button>
            {/* <button className="map-header-btn menu-btn" onClick={() => setShowMenu(true)}>
              <IoMenu size={22} />
            </button> */}
          </div>
          <MapView mapboxToken={mapboxToken} onZoneClick={handleZoneClick} />
        </div>
      // ) : currentView === 'activity' ? (
      //   <ActivityTab />
      // ) : currentView === 'vehicles' ? (
      //   <VehiclesTab onIssueTicket={handleIssueTicket} />
      ) : currentView === 'notification' ? (
        <NotificationTab />
      ) : currentView === 'account' ? (
        <AccountTab />
      ) : (
        <>
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search parking lots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button 
              className={`tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`tab ${filter === 'available' ? 'active' : ''}`}
              onClick={() => setFilter('available')}
            >
              Available
            </button>
            <button 
              className={`tab ${filter === 'full' ? 'active' : ''}`}
              onClick={() => setFilter('full')}
            >
              Full
            </button>
          </div>

          {/* Parking Spots List */}
          <div className="spots-container">
            {filteredSpots.length === 0 ? (
              <div className="no-results">
                <p>No parking lots found</p>
              </div>
            ) : (
              filteredSpots.map(spot => (
                <div key={spot.id} className="spot-card">
                  <div className="spot-header">
                    <h3>{spot.name}</h3>
                    <span className={`status ${spot.available ? 'available' : 'full'}`}>
                      {spot.available ? '✓ Available' : '✕ Full'}
                    </span>
                  </div>
                  
                  <div className="spot-info">
                    <p className="address">📍 {spot.address}</p>
                    <div className="info-row">
                      <span className="distance">📏 {spot.distance} km</span>
                      <span className="price">💰 {spot.price.toLocaleString('vi-VN')}đ/giờ</span>
                    </div>
                    <div className="capacity-bar">
                      <div className="capacity-info">
                        <span>Capacity: {spot.occupied}/{spot.capacity}</span>
                        <span>{Math.round((spot.capacity - spot.occupied) / spot.capacity * 100)}% available</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(spot.occupied / spot.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button 
                    className={`book-btn ${!spot.available ? 'disabled' : ''}`}
                    onClick={() => handleBooking(spot)}
                    disabled={!spot.available}
                  >
                    {spot.available ? 'Book Now' : 'No Space'}
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Booking Modal */}
      {showBooking && selectedSpot && (
        <div className="modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Booking</h2>
            <div className="modal-content">
              <h3>{selectedSpot.name}</h3>
              <p>📍 {selectedSpot.address}</p>
              <p>💰 Price: ${selectedSpot.price.toLocaleString()}/hour</p>
              <p>📏 Distance: {selectedSpot.distance} km</p>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowBooking(false)}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={confirmBooking}>
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${currentView === 'map' ? 'active' : ''}`}
          onClick={() => handleViewChange('map')}
        >
          <IoMap className="nav-icon" size={22} />
          <span className="nav-label">Map</span>
        </button>
        {/* <button 
          className={`nav-item ${currentView === 'activity' ? 'active' : ''}`}
          onClick={() => handleViewChange('activity')}
        >
          <IoStatsChart className="nav-icon" size={22} />
          <span className="nav-label">Activity</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'vehicles' ? 'active' : ''}`}
          onClick={() => handleViewChange('vehicles')}
        >
          <IoCar className="nav-icon" size={22} />
          <span className="nav-label">Vehicles</span>
        </button> */}
        <button 
          className={`nav-item ${currentView === 'notification' ? 'active' : ''}`}
          onClick={() => handleViewChange('notification')}
        >
          <IoNotifications className="nav-icon" size={22} />
          <span className="nav-label">Notification</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'account' ? 'active' : ''}`}
          onClick={() => handleViewChange('account')}
        >
          <IoPerson className="nav-icon" size={22} />
          <span className="nav-label">Account</span>
        </button>
      </nav>
    </div>
  )
}

export default App
