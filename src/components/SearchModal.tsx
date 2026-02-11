import { useState } from 'react';
import { IoSearch, IoTime, IoLocationSharp, IoClose } from 'react-icons/io5';
import './SearchModal.css';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [searchText, setSearchText] = useState('');

  const recentSearches = [
    { id: 1, name: 'Náměstí Míru', zone: 'Zone A' },
    { id: 2, name: 'Zlín centrum', zone: 'Zone B1' },
    { id: 3, name: 'Bartošova čtvrt', zone: 'Zone B1' },
  ];

  const savedPlaces = [
    { id: 1, name: 'Zlaté jablko', address: 'Náměstí Míru 174 • Zone A' },
    { id: 2, name: 'Obchodní dům', address: 'Bartošova 12 • Zone A' },
    { id: 3, name: 'Krajský úřad', address: 'třída Tomáše Bati • Zone S' },
    { id: 4, name: 'Nemocnice', address: 'Havlíčkovo nábřeží • Zone B2' },
  ];

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <h2>Search Location</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="search-input-container">
          <IoSearch className="search-input-icon" size={20} />
          <input
            type="text"
            placeholder="Enter address or place..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
            className="search-modal-input"
          />
        </div>

        <div className="search-sections">
          <div className="search-section">
            <div className="section-header">
              <IoTime size={18} />
              <h3>Recent Searches</h3>
            </div>
            <div className="search-items">
              {recentSearches.map((item) => (
                <button key={item.id} className="search-item">
                  <IoLocationSharp className="item-icon" />
                  <div className="item-content">
                    <span className="item-name">{item.name}</span>
                    <span className="item-zone">{item.zone}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="search-section">
            <div className="section-header">
              <IoLocationSharp size={18} />
              <h3>Saved Places</h3>
            </div>
            <div className="search-items">
              {savedPlaces.map((item) => (
                <button key={item.id} className="search-item">
                  <IoLocationSharp className="item-icon" />
                  <div className="item-content">
                    <span className="item-name">{item.name}</span>
                    <span className="item-address">{item.address}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
