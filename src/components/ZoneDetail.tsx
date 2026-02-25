import { useState } from 'react';
import { IoChevronBack, IoFunnel, IoCheckmarkCircle, IoEllipsisVertical, IoWarning } from 'react-icons/io5';
import { BsCheckCircle, BsPencil, BsTicketPerforated } from 'react-icons/bs';
import ChangeSessionModal from './ChangeSessionModal';
import NewSessionModal from './NewSessionModal';
import PastViolation from './PastViolation';
import IssueTicket from './IssueTicket';
import './ZoneDetail.css';

interface ParkingLot {
  id: string;
  number: string;
  registration: string;
  status: 'compliant' | 'violation' | 'new-session' | 'overstay' | 'empty';
  expireIn?: string;
  hasWarning?: boolean;
}

interface ZoneDetailProps {
  zoneName: string;
  onBack: () => void;
  onSelectLot: (lotNumber: string, status?: string, hasWarning?: boolean) => void;
}

const ZoneDetail = ({ zoneName, onBack, onSelectLot }: ZoneDetailProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showChangeSessionModal, setShowChangeSessionModal] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showPastViolation, setShowPastViolation] = useState(false);
  const [showIssueTicket, setShowIssueTicket] = useState(false);
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);

  const parkingLots: ParkingLot[] = [
    { id: '1', number: 'B-042', registration: 'ABC-123', status: 'compliant', expireIn: '08:48' },
    { id: '2', number: 'B-056', registration: 'GHI-321', status: 'new-session', expireIn: '46:30', hasWarning: true },
    { id: '3', number: 'B-129', registration: 'MNO-987', status: 'compliant', expireIn: '05:22' },
    { id: '4', number: 'B-034', registration: 'DEF-456', status: 'overstay', expireIn: '00:00' },
    { id: '5', number: 'B-078', registration: 'XYZ-789', status: 'new-session', expireIn: '30:00', hasWarning: true },
    { id: '6', number: 'B-091', registration: 'JKL-234', status: 'new-session', expireIn: '25:00', hasWarning: true },
    { id: '7', number: 'B-105', registration: 'PQR-567', status: 'overstay', expireIn: '15:30' },
    { id: '8', number: 'B-143', registration: 'STU-890', status: 'new-session', expireIn: '20:00', hasWarning: true },
    { id: '9', number: 'B-155', registration: '', status: 'empty' },
    { id: '10', number: 'B-167', registration: '', status: 'empty' },
    { id: '11', number: 'B-201', registration: 'XYZ-111', status: 'new-session', expireIn: '55:00' },
    { id: '12', number: 'B-202', registration: 'ABC-222', status: 'new-session', expireIn: '40:00' },
  ];

  const filteredLots = parkingLots.filter(lot => {
    if (filter === 'all') return true;
    if (filter === 'violation') {
      // Violation filter shows new-session with warning
      return lot.status === 'new-session' && lot.hasWarning;
    }
    if (filter === 'new-session') {
      // New session filter shows new-session WITHOUT warning
      return lot.status === 'new-session' && !lot.hasWarning;
    }
    return lot.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'new-session', label: 'New Session Created' },
    { value: 'overstay', label: 'Overstay' },
    { value: 'empty', label: 'Empty' },
    { value: 'violation', label: 'Violation' },
    { value: 'compliant', label: 'Compliant' },
  ];

  const getStatusDot = (status: string) => {
    let dotClass = '';
    switch (status) {
      case 'compliant':
        dotClass = 'compliant';
        break;
      case 'new-session':
        dotClass = 'new-session';
        break;
      case 'overstay':
        dotClass = 'warning';
        break;
      case 'violation':
        dotClass = 'violation';
        break;
      case 'empty':
        dotClass = 'empty';
        break;
    }
    return <span className={`status-dot ${dotClass}`}></span>;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'COMPLIANT';
      case 'new-session':
        return 'NEW SESSION';
      case 'overstay':
        return 'OVERSTAY';
      case 'violation':
        return 'VIOLATION';
      case 'empty':
        return 'EMPTY';
      default:
        return '';
    }
  };

  const handleMenuClick = (e: React.MouseEvent, lotId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === lotId ? null : lotId);
  };

  const handleMenuAction = (e: React.MouseEvent, action: string, lotNumber: string) => {
    e.stopPropagation();
    setOpenMenuId(null);
    const lot = parkingLots.find(l => l.number === lotNumber);
    
    if (action === 'edit') {
      setSelectedLot(lot || null);
      setShowChangeSessionModal(true);
    } else if (action === 'add-session') {
      setSelectedLot(lot || null);
      setShowNewSessionModal(true);
    } else if (action === 'issue-ticket') {
      setSelectedLot(lot || null);
      setShowPastViolation(true);
    } else if (action === 'confirm') {
      console.log(`Confirm for lot: ${lotNumber}`);
    }
  };

  const handleIssueTicketFromPastViolation = () => {
    setShowPastViolation(false);
    setShowIssueTicket(true);
  };

  return (
    <div className="zone-detail">
      <div className="zone-detail-header">
        <button className="back-btn" onClick={onBack}>
          <IoChevronBack size={24} />
        </button>
        <div className="zone-title">
          <h2>{zoneName}</h2>
          <p>10 bays</p>
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
          <div key={lot.id} className="lot-card-wrapper">
            <div
              className={`lot-card ${lot.status} ${lot.hasWarning ? 'has-warning' : ''}`}
            >
              {/* Only show 3-dot menu for new-session */}
              {lot.status === 'new-session' && (
                <button 
                  className="lot-menu-btn"
                  onClick={(e) => handleMenuClick(e, lot.id)}
                >
                  <IoEllipsisVertical size={18} />
                </button>
              )}
              
              <div 
                className="lot-card-content"
                onClick={() => onSelectLot(lot.number, lot.status, lot.hasWarning)}
              >
                <div className="lot-number-row">
                  <div className="lot-number">{lot.number}</div>
                  {/* Warning icon next to lot number */}
                  {lot.hasWarning && (
                    <div className="lot-warning-icon">
                      <IoWarning size={18} />
                    </div>
                  )}
                </div>
                {lot.registration && (
                  <div className="lot-registration">{lot.registration}</div>
                )}
                
                <div className="lot-status">
                  {getStatusDot(lot.status)}
                  <span className={`status-label ${lot.status}`}>
                    {getStatusLabel(lot.status)}
                  </span>
                </div>
                
                {lot.expireIn && (
                  <div className="lot-remaining">
                    <div className="remaining-label">EXPIRED</div>
                    <div className="remaining-time">{lot.expireIn}</div>
                  </div>
                )}
              </div>
              
              {/* Action buttons for different statuses */}
              {(lot.status === 'compliant' || lot.status === 'overstay') && (
                <button 
                  className="lot-action-btn end-session"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuAction(e, 'end-session', lot.number);
                  }}
                >
                  End session
                </button>
              )}
              
              {lot.status === 'empty' && (
                <button 
                  className="lot-action-btn add-session"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuAction(e, 'add-session', lot.number);
                  }}
                >
                  Add session
                </button>
              )}
            </div>
            
            {openMenuId === lot.id && lot.status === 'new-session' && (
              <>
                <div className="lot-menu-overlay" onClick={() => setOpenMenuId(null)} />
                <div className="lot-menu-dropdown">
                  <button 
                    className="lot-menu-item"
                    onClick={(e) => handleMenuAction(e, 'confirm', lot.number)}
                  >
                    <BsCheckCircle size={18} />
                    <span>Confirm</span>
                  </button>
                  <button 
                    className="lot-menu-item"
                    onClick={(e) => handleMenuAction(e, 'edit', lot.number)}
                  >
                    <BsPencil size={18} />
                    <span>Edit</span>
                  </button>
                  {lot.hasWarning && (
                    <button 
                      className="lot-menu-item issue-ticket"
                      onClick={(e) => handleMenuAction(e, 'issue-ticket', lot.number)}
                    >
                      <BsTicketPerforated size={18} />
                      <span>Issue Ticket</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showChangeSessionModal && selectedLot && (
        <ChangeSessionModal
          lotNumber={selectedLot.number}
          zoneName={zoneName}
          currentPlate={selectedLot.registration}
          onClose={() => setShowChangeSessionModal(false)}
        />
      )}

      {showNewSessionModal && selectedLot && (
        <NewSessionModal
          lotNumber={selectedLot.number}
          zoneName={zoneName}
          onClose={() => setShowNewSessionModal(false)}
        />
      )}

      {showPastViolation && (
        <PastViolation
          onClose={() => setShowPastViolation(false)}
          onIssueTicket={handleIssueTicketFromPastViolation}
        />
      )}

      {showIssueTicket && (
        <IssueTicket
          onClose={() => setShowIssueTicket(false)}
        />
      )}
    </div>
  );
};

export default ZoneDetail;
