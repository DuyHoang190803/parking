import { useState } from 'react';
import { IoChevronBack, IoTicket, IoTime, IoCheckmarkCircle } from 'react-icons/io5';
import ChangeSessionModal from './ChangeSessionModal';
import './LotDetail.css';

interface LotDetailProps {
  lotNumber: string;
  zoneName: string;
  status?: string;
  onBack: () => void;
  onIssueTicket: () => void;
}

const LotDetail = ({ lotNumber, zoneName, status, onBack, onIssueTicket }: LotDetailProps) => {
  const [showChangeSession, setShowChangeSession] = useState(false);
  
  const lotInfo = {
    registration: 'DEF-789',
    arrivalTime: '11:00 AM',
    paidUntil: '12:00 PM',
    overstayDuration: '1 Hour',
  };

  return (
    <>
      {showChangeSession && (
        <ChangeSessionModal
          lotNumber={lotNumber}
          zoneName={zoneName}
          currentPlate={lotInfo.registration}
          onClose={() => setShowChangeSession(false)}
        />
      )}
      
    <div className="lot-detail">
      <div className="lot-detail-header">
        <button className="back-btn" onClick={onBack}>
          <IoChevronBack size={24} />
        </button>
        <h2>Parking Lot Detail</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="lot-detail-content">
        <div className="info-card">
          <h3>Parking Information</h3>
          <div className="info-row">
            <span className="info-label">Zone:</span>
            <span className="info-value">{zoneName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Lot:</span>
            <span className="info-value">{lotNumber}</span>
          </div>
          <div className="info-row">
            <span className="info-label">License Plate:</span>
            <span className="info-value">{lotInfo.registration}</span>
          </div>
        </div>

        <div className="info-card">
          <h3>Session Details</h3>
          <div className="info-row">
            <span className="info-label">
              <IoTime size={18} />
              Arrival Time:
            </span>
            <span className="info-value">{lotInfo.arrivalTime}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Paid Until:</span>
            <span className="info-value">{lotInfo.paidUntil}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Overstay Duration:</span>
            <span className="info-value">{lotInfo.overstayDuration}</span>
          </div>
        </div>

        {status === 'new-session' ? (
          <>
            <button className="confirm-compliance-btn">
              <IoCheckmarkCircle size={20} />
              Confirm Compliance
            </button>
            <button className="change-session-btn" onClick={() => setShowChangeSession(true)}>
              Change Session Details
            </button>
          </>
        ) : (
          <button className="issue-ticket-btn" onClick={onIssueTicket}>
            <IoTicket size={20} />
            Issue Ticket
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default LotDetail;
