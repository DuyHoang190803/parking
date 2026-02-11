import { IoClose } from 'react-icons/io5';
import './ZonePopup.css';

interface ZonePopupProps {
  zone: {
    name: string;
    available: number;
    total: number;
    pricePerHour: string;
  };
  onClose: () => void;
  onBookNow: () => void;
}

const ZonePopup = ({ zone, onClose, onBookNow }: ZonePopupProps) => {
  const percentage = Math.round((zone.available / zone.total) * 100);

  return (
    <div className="zone-popup-overlay" onClick={onClose}>
      <div className="zone-popup" onClick={(e) => e.stopPropagation()}>
        <button className="zone-popup-close" onClick={onClose}>
          <IoClose size={24} />
        </button>
        
        <h3 className="zone-popup-title">{zone.name}</h3>
        
        <div className="zone-popup-info">
          <div className="zone-popup-row">
            <span className="zone-popup-label">Available:</span>
            <span className="zone-popup-value">{zone.available}/{zone.total} ({percentage}%)</span>
          </div>
          <div className="zone-popup-row">
            <span className="zone-popup-label">Price:</span>
            <span className="zone-popup-value">{zone.pricePerHour}/hour</span>
          </div>
        </div>
        
        <button className="zone-popup-book-btn" onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ZonePopup;
