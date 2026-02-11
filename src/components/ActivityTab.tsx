import { useState } from 'react';
import { IoChevronDown, IoCheckmarkCircle } from 'react-icons/io5';
import './ActivityTab.css';

interface Ticket {
  id: string;
  licensePlate: string;
  lot: string;
  zone: string;
  expireIn: string;
  minsUntilExpiry?: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'expiring-soon' | 'recently-expired' | 'unresolved';
}

const ActivityTab = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring-soon' | 'recently-expired' | 'unresolved'>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);

  const tickets: Ticket[] = [
    { id: '1', licensePlate: 'ABC-123', lot: 'B-042', zone: 'Zone A - CBD', expireIn: '12 mins', minsUntilExpiry: 12, priority: 'high', status: 'active' },
    { id: '2', licensePlate: 'DEF-456', lot: 'B-087', zone: 'Zone C', expireIn: '28 mins', minsUntilExpiry: 28, priority: 'medium', status: 'active' },
    { id: '3', licensePlate: 'XYZ-789', lot: 'B-015', zone: 'Zone B', expireIn: '5 mins', minsUntilExpiry: 5, priority: 'critical', status: 'expiring-soon' },
    { id: '4', licensePlate: 'JKL-012', lot: 'C3', zone: 'C', expireIn: '2 min', minsUntilExpiry: 2, priority: 'critical', status: 'expiring-soon' },
    { id: '5', licensePlate: 'MNO-345', lot: 'A7', zone: 'A', expireIn: 'Expired 10 min ago', priority: 'low', status: 'recently-expired' },
    { id: '6', licensePlate: 'PQR-678', lot: 'B2', zone: 'B', expireIn: 'Expired 25 min ago', priority: 'low', status: 'recently-expired' },
    { id: '7', licensePlate: 'STU-901', lot: 'D1', zone: 'D', expireIn: 'Pending action', priority: 'high', status: 'unresolved' },
    { id: '8', licensePlate: 'VWX-234', lot: 'C8', zone: 'C', expireIn: 'Pending action', priority: 'high', status: 'unresolved' },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filter === 'all' || ticket.status === filter;
    const zoneMatch = zoneFilter === 'all' || ticket.zone === zoneFilter;
    return statusMatch && zoneMatch;
  });

  const filterOptions = [
    { value: 'all' as const, label: 'All' },
    { value: 'active' as const, label: 'Active' },
    { value: 'expiring-soon' as const, label: 'Expiring Soon' },
    { value: 'recently-expired' as const, label: 'Recently Expired' },
    { value: 'unresolved' as const, label: 'Unresolved' },
  ];

  const zoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'A', label: 'Zone A' },
    { value: 'B', label: 'Zone B' },
    { value: 'C', label: 'Zone C' },
    { value: 'D', label: 'Zone D' },
  ];

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return 'CRITICAL';
      case 'high': return 'HIGH';
      case 'medium': return 'MEDIUM';
      case 'low': return 'LOW';
      default: return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#f59e0b';
      case 'medium': return '#4A90E2';
      case 'low': return '#10b981';
      default: return '#666';
    }
  };

  return (
    <div className="activity-tab">
      <div className="activity-header">
        <h2>Session</h2>
        <div className="filter-buttons-group">
          <div className="filter-dropdown-container">
            <button 
              className="filter-dropdown-btn"
              onClick={() => setShowZoneDropdown(!showZoneDropdown)}
            >
              <span>Zone Filter</span>
              <IoChevronDown size={18} />
            </button>
            
            {showZoneDropdown && (
              <>
                <div className="dropdown-overlay" onClick={() => setShowZoneDropdown(false)} />
                <div className="filter-dropdown-menu">
                  {zoneOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`dropdown-item ${zoneFilter === option.value ? 'active' : ''}`}
                      onClick={() => {
                        setZoneFilter(option.value);
                        setShowZoneDropdown(false);
                      }}
                    >
                      {option.label}
                      {zoneFilter === option.value && <IoCheckmarkCircle size={18} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="filter-dropdown-container">
            <button 
              className="filter-dropdown-btn"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <span>Status Filter</span>
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
      </div>

      <div className="tickets-list">
        {filteredTickets.length === 0 ? (
          <div className="no-tickets">
            <p>No tickets found</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="ticket-card"
              style={{ 
                borderLeft: `4px solid ${getPriorityColor(ticket.priority)}`,
                background: `linear-gradient(135deg, rgba(${ticket.priority === 'critical' ? '220, 38, 38' : ticket.priority === 'high' ? '245, 158, 11' : ticket.priority === 'medium' ? '74, 144, 226' : '16, 185, 129'}, 0.05), rgba(0, 0, 0, 0.3))`
              }}
            >
              <div className="ticket-header">
                <h3 className="ticket-plate">{ticket.licensePlate}</h3>
                {ticket.minsUntilExpiry && (
                  <div className="ticket-expiry" style={{ color: getPriorityColor(ticket.priority) }}>
                    <span className="expiry-time">{ticket.expireIn}</span>
                    <span className="expiry-label">UNTIL EXPIRY</span>
                  </div>
                )}
              </div>
              <div className="ticket-details">
                <div className="ticket-detail-row">
                  <span className="detail-label">Bay:</span>
                  <span className="detail-value">{ticket.lot}</span>
                </div>
                <div className="ticket-detail-row">
                  <span className="detail-label">Zone:</span>
                  <span className="detail-value">{ticket.zone}</span>
                </div>
              </div>
              <div className="ticket-priority-badge" style={{ 
                backgroundColor: getPriorityColor(ticket.priority),
                color: 'white'
              }}>
                {getPriorityLabel(ticket.priority)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityTab;
