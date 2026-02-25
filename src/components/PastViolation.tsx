import { IoClose } from 'react-icons/io5';
import './PastViolation.css';

interface PastViolationProps {
  onClose: () => void;
  onIssueTicket: () => void;
}

const PastViolation = ({ onClose, onIssueTicket }: PastViolationProps) => {
  const violations = [
    {
      id: 1,
      type: 'Not Paid',
      sessionId: 'ABCD_1234',
      zone: 'A',
      lot: 'A-042',
      date: '3:00 PM - 4:00 PM 11/2/2026',
      debt: '100,000 VND'
    },
    {
      id: 2,
      type: 'Not Paid',
      sessionId: 'EFGH_5678',
      zone: 'B',
      lot: 'B-056',
      date: '2:00 PM - 5:00 PM 10/2/2026',
      debt: '150,000 VND'
    }
  ];

  return (
    <>
      <div className="past-violation-overlay" onClick={onClose} />
      <div className="past-violation-modal">
        <div className="past-violation-header">
          <h2>Past Violation</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="past-violation-content">
          <div className="vehicle-info-box">
            <div className="info-item">
              <span className="info-label">License Plate:</span>
              <span className="info-value">ABC123</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contact Number:</span>
              <span className="info-value">09-xxx-xxx</span>
            </div>
          </div>

          <div className="violations-list">
            {violations.map((violation) => (
              <div key={violation.id} className="violation-card">
                <div className="violation-item">
                  <span className="item-label">Violation Type:</span>
                  <span className="item-value">{violation.type}</span>
                </div>
                <div className="violation-item">
                  <span className="item-label">For Session ID:</span>
                  <span className="item-value">{violation.sessionId}</span>
                </div>
                <div className="violation-item">
                  <span className="item-label">Zone:</span>
                  <span className="item-value">{violation.zone}</span>
                </div>
                <div className="violation-item">
                  <span className="item-label">Lot:</span>
                  <span className="item-value">{violation.lot}</span>
                </div>
                <div className="violation-item">
                  <span className="item-label">Date:</span>
                  <span className="item-value">{violation.date}</span>
                </div>
                <div className="violation-item">
                  <span className="item-label">Outstanding debt:</span>
                  <span className="item-value debt">{violation.debt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="past-violation-actions">
          <button className="issue-ticket-btn" onClick={onIssueTicket}>
            Issue Ticket
          </button>
        </div>
      </div>
    </>
  );
};

export default PastViolation;
