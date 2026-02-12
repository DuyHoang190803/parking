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

  const violationInfo = {
    licensePlate: 'ABC123',
    contactNumber: '09-xxx-xxxx',
    violationType: 'Not Paid',
    sessionId: 'ABCD_1234',
    zone: 'A',
    lot: 'A-042',
    date: '3:00 PM - 4:00 PM 11/2/2026',
    outstandingDebt: '100,000 VND',
  };

  const isViolation = status === 'violation';

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
        <h2>{isViolation ? 'Past Violation' : 'Parking Lot Detail'}</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="lot-detail-content">
        {isViolation ? (
          // Violation view
          <>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">License Plate:</span>
                <span className="info-value">{violationInfo.licensePlate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Contact Number:</span>
                <span className="info-value">{violationInfo.contactNumber}</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Violation Type:</span>
                <span className="info-value">{violationInfo.violationType}</span>
              </div>
              <div className="info-row">
                <span className="info-label">For Session ID:</span>
                <span className="info-value">{violationInfo.sessionId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Zone:</span>
                <span className="info-value">{violationInfo.zone}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Lot:</span>
                <span className="info-value">{violationInfo.lot}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Date:</span>
                <span className="info-value">{violationInfo.date}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Outstanding debt:</span>
                <span className="info-value" style={{ color: '#dc2626', fontWeight: 700 }}>{violationInfo.outstandingDebt}</span>
              </div>
            </div>

            <button className="issue-ticket-btn" onClick={onIssueTicket}>
              <IoTicket size={20} />
              Issue Ticket
            </button>
          </>
        ) : (
          // Compliant/Overstay view
          <>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Zone:</span>
                <span className="info-value">{zoneName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Lot:</span>
                <span className="info-value">{lotNumber}</span>
              </div>
            </div>

            <div className="info-card">
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
            ) : status === 'compliant' || status === 'overstay' ? (
              // No button for compliant or overstay
              null
            ) : (
              <button className="issue-ticket-btn" onClick={onIssueTicket}>
                <IoTicket size={20} />
                Issue Ticket
              </button>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default LotDetail;
