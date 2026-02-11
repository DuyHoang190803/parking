import { useState } from 'react';
import { IoSearch, IoWarning, IoTime, IoCar } from 'react-icons/io5';
import './VehiclesTab.css';

interface Vehicle {
  registration: string;
  contactNumber: string;
  violationType: string;
  sessionId: string;
  zone: string;
  lot: string;
  date: string;
  outstandingDebt: string;
}

interface VehiclesTabProps {
  onIssueTicket?: () => void;
}

const VehiclesTab = ({ onIssueTicket }: VehiclesTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Vehicle | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (searchQuery.trim()) {
      // Simulate search result
      setSearchResult({
        registration: searchQuery.toUpperCase(),
        contactNumber: '09-xxx-xxx',
        violationType: 'Not Paid',
        sessionId: 'ABCD_1234',
        zone: 'A',
        lot: 'A-042',
        date: '3:00 PM - 4:00 PM 11/2/2026',
        outstandingDebt: '100,000 VND',
      });
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className="vehicles-tab">
      <div className="vehicles-header">
        <h2>Search for Past Violations</h2>
      </div>

      <div className="vehicles-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Enter license plate number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="vehicle-search-input"
          />
          <button className="search-submit-btn" onClick={handleSearch}>
            <IoSearch size={18} />
            <span>Search</span>
          </button>
        </div>

        {searchResult ? (
          <div className="search-results">
            <h3 className="result-title">Past Violation</h3>
            
            <div className="info-card">
              <div className="info-item">
                <span className="info-label">License Plate:</span>
                <span className="info-value">{searchResult.registration}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Contact Number:</span>
                <span className="info-value">{searchResult.contactNumber}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-item">
                <span className="info-label">Violation Type:</span>
                <span className="info-value">{searchResult.violationType}</span>
              </div>
              <div className="info-item">
                <span className="info-label">For Session ID:</span>
                <span className="info-value">{searchResult.sessionId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Zone:</span>
                <span className="info-value">{searchResult.zone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Lot:</span>
                <span className="info-value">{searchResult.lot}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span className="info-value">{searchResult.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Outstanding debt:</span>
                <span className="info-value">{searchResult.outstandingDebt}</span>
              </div>
            </div>

            <button className="issue-ticket-btn" onClick={onIssueTicket}>
              Issue Ticket
            </button>
          </div>
        ) : hasSearched ? (
          <div className="no-results">
            <IoCar size={60} />
            <p>No vehicle found</p>
            <span>Try searching with a different license plate</span>
          </div>
        ) : (
          <div className="search-placeholder">
            <IoCar size={80} />
            <p>Search for a vehicle</p>
            <span>Enter license plate number to lookup vehicle info</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesTab;
