import { useState } from 'react';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import './ChangeSessionModal.css';

interface ChangeSessionModalProps {
  lotNumber: string;
  zoneName: string;
  currentPlate: string;
  onClose: () => void;
}

const ChangeSessionModal = ({ lotNumber, zoneName, currentPlate, onClose }: ChangeSessionModalProps) => {
  const [licensePlate, setLicensePlate] = useState(currentPlate);
  const [lotNum, setLotNum] = useState(lotNumber);
  const [zone, setZone] = useState(zoneName);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  if (showSuccess) {
    return (
      <>
        <div className="modal-overlay" onClick={onClose} />
        <div className="success-modal">
          <div className="success-icon">
            <IoCheckmarkCircle size={80} color="#10b981" />
          </div>
          <h2>Session XYZ456 issued successfully!</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="change-session-modal">
        <div className="change-session-header">
          <h2>Change Session Details</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="change-session-content">
          <div className="input-group">
            <label>License Plate</label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
              placeholder="ABC-123"
              className="session-input"
            />
          </div>

          <div className="input-group">
            <label>Lot Number</label>
            <input
              type="text"
              value={lotNum}
              onChange={(e) => setLotNum(e.target.value.toUpperCase())}
              placeholder="B-042"
              className="session-input"
            />
          </div>

          <div className="input-group">
            <label>Zone</label>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="Zone A"
              className="session-input"
            />
          </div>

          <button className="change-btn" onClick={handleChange}>
            Change
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeSessionModal;
