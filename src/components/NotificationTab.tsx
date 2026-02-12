import { useState } from 'react';
import { IoChevronDown, IoCheckmarkCircle } from 'react-icons/io5';
import './NotificationTab.css';

interface Notification {
  id: string;
  licensePlate: string;
  lot: string;
  zone: string;
  status: 'no-payment' | 'overstay' | 'violated-vehicle-presence' | 'new-session-created';
  timestamp: string;
}

const NotificationTab = () => {
  const [filter, setFilter] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const notifications: Notification[] = [
    { id: '1', licensePlate: 'ABC-123', lot: 'A1', zone: 'A', status: 'no-payment', timestamp: '5 min ago' },
    { id: '2', licensePlate: 'ABC-123', lot: 'A1', zone: 'A', status: 'overstay', timestamp: '12 min ago' },
    { id: '3', licensePlate: 'ABC-123', lot: 'A1', zone: 'A', status: 'violated-vehicle-presence', timestamp: '25 min ago' },
    { id: '4', licensePlate: 'ABC-123', lot: 'A1', zone: 'A', status: 'no-payment', timestamp: '35 min ago' },
    { id: '5', licensePlate: 'DEF-456', lot: 'B5', zone: 'B', status: 'new-session-created', timestamp: '1 hour ago' },
    { id: '6', licensePlate: 'GHI-789', lot: 'C3', zone: 'C', status: 'overstay', timestamp: '2 hours ago' },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'new-session-created', label: 'New Session Created' },
    { value: 'overstay', label: 'Overstay' },
    { value: 'violated-vehicle-presence', label: 'Violated Vehicle Presence' },
    { value: 'no-payment', label: 'No Payment' },
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'no-payment':
        return 'No Payment';
      case 'overstay':
        return 'Overstay';
      case 'violated-vehicle-presence':
        return 'Violated Vehicle Presence';
      case 'new-session-created':
        return 'New Session Created';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'no-payment':
        return '#dc2626';
      case 'overstay':
        return '#f59e0b';
      case 'violated-vehicle-presence':
        return '#dc2626';
      case 'new-session-created':
        return '#4A90E2';
      default:
        return '#999';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.status === filter);

  return (
    <div className="notification-tab">
      <div className="notification-tab-header">
        <h2>Notifications</h2>
      </div>

      <div className="notification-tab-filter-section">
        <div className="filter-dropdown-container">
          <button 
            className="filter-dropdown-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <span>Filter</span>
            <IoChevronDown size={18} />
          </button>
          
          {showFilterDropdown && (
            <>
              <div className="dropdown-overlay" onClick={() => setShowFilterDropdown(false)} />
              <div className="filter-dropdown-menu">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`dropdown-item ${filter === option.value ? 'active' : ''}`}
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
        </div>
      </div>

      <div className="notification-tab-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification-tab-card">
              <div className="notification-main">
                <div className="notification-info-row">
                  <span className="notification-label">License Plate Number:</span>
                  <span className="notification-value">{notification.licensePlate}</span>
                </div>
                <div className="notification-info-row">
                  <span className="notification-label">Lot:</span>
                  <span className="notification-value">{notification.lot}</span>
                </div>
                <div className="notification-info-row">
                  <span className="notification-label">Zone:</span>
                  <span className="notification-value">{notification.zone}</span>
                </div>
                <div className="notification-info-row">
                  <span className="notification-label">Status:</span>
                  <span 
                    className="notification-status" 
                    style={{ color: getStatusColor(notification.status) }}
                  >
                    {getStatusLabel(notification.status)}
                  </span>
                </div>
              </div>
              <div className="notification-timestamp">{notification.timestamp}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationTab;
