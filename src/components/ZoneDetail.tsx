import { useState } from 'react';
import { IoChevronBack, IoFunnel, IoCheckmarkCircle, IoWarning, IoCloseCircle, IoChevronDown } from 'react-icons/io5';
import './ZoneDetail.css';

interface ParkingLot {
  id: string;
  number: string;
  registration: string;
  status: 'compliant' | 'warning' | 'violation' | 'new-session' | 'overstay' | 'no-payment';
}

interface ZoneDetailProps {
  zoneName: string;
  onBack: () => void;
  onSelectLot: (lotNumber: string, status?: string) => void;
}

const ZoneDetail = ({ zoneName, onBack, onSelectLot }: ZoneDetailProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const parkingLots: ParkingLot[] = [
    { id: '1', number: 'B-042', registration: 'ABC-123', status: 'compliant' },
    { id: '2', number: 'B-056', registration: 'GHI-321', status: 'new-session' },
    { id: '3', number: 'B-129', registration: 'MNO-987', status: 'compliant' },
    { id: '4', number: 'B-034', registration: 'DEF-456', status: 'overstay' },
    { id: '5', number: 'B-078', registration: 'XYZ-789', status: 'violation' },
    { id: '6', number: 'B-091', registration: 'JKL-234', status: 'no-payment' },
    { id: '7', number: 'B-105', registration: 'PQR-567', status: 'warning' },
    { id: '8', number: 'B-143', registration: 'STU-890', status: 'violation' },
  ];

  const filteredLots = parkingLots.filter(lot => 
    filter === 'all' || lot.status === filter
  );

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'new-session', label: 'New Session Created' },
    { value: 'overstay', label: 'Overstay' },
    { value: 'violation', label: 'Violated Vehicle Presence' },
    { value: 'no-payment', label: 'No Payment' },
    { value: 'compliant', label: 'Compliant' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <IoCheckmarkCircle className="status-icon compliant" size={24} />;
      case 'new-session':
        return <IoCheckmarkCircle className="status-icon new-session" size={24} />;
      case 'warning':
      case 'overstay':
        return <IoWarning className="status-icon warning" size={24} />;
      case 'violation':
      case 'no-payment':
        return <IoCloseCircle className="status-icon violation" size={24} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'COMPLIANT';
      case 'new-session':
        return 'NEW SESSION';
      case 'warning':
        return 'WARNING';
      case 'overstay':
        return 'OVERSTAY';
      case 'violation':
        return 'VIOLATION';
      case 'no-payment':
        return 'NO PAYMENT';
      default:
        return '';
    }
  };

  return (
    <div className="zone-detail">
      <div className="zone-detail-header">
        <button className="back-btn" onClick={onBack}>
          <IoChevronBack size={24} />
        </button>
        <div className="zone-title">
          <h2>{zoneName}</h2>
          <p>2 bays</p>
        </div>
        <button className="filter-btn" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
          <IoFunnel size={20} />
        </button>
      </div>

      {showFilterDropdown && (
        <>
          <div className="filter-dropdown-overlay" onClick={() => setShowFilterDropdown(false)} />
          <div className="filter-dropdown-menu">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-dropdown-item ${filter === option.value ? 'active' : ''}`}
                onClick={() => {
                  setFilter(option.value);
                  setShowFilterDropdown(false);
                }}
              >
                {option.label}
                {filter === option.value && <IoCheckmarkCircle size={18} />}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="lots-grid">
        {filteredLots.map((lot) => (
          <button
            key={lot.id}
            className={`lot-card ${lot.status}`}
            onClick={() => onSelectLot(lot.number, lot.status)}
          >
            <div className="lot-number">{lot.number}</div>
            <div className="lot-registration">{lot.registration}</div>
            <div className="lot-status">
              {getStatusIcon(lot.status)}
              <span className={`status-label ${lot.status}`}>
                {getStatusLabel(lot.status)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ZoneDetail;
