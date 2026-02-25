import { useState } from 'react';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import QRScanner from './QRScanner';
import './ChangeSessionModal.css';

interface ChangeSessionModalProps {
  lotNumber: string;
  zoneName: string;
  currentPlate: string;
  onClose: () => void;
}

const ChangeSessionModal = ({ lotNumber, zoneName, currentPlate, onClose }: ChangeSessionModalProps) => {
  const [step, setStep] = useState(1);
  const [licensePlate, setLicensePlate] = useState(currentPlate);
  const [lotNum, setLotNum] = useState(lotNumber);
  const [zone, setZone] = useState(zoneName);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleNext = () => {
    setStep(2);
  };

  const handleChange = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const handleGetLicensePlate = () => {
    setShowScanner(true);
  };

  const handleScannerClose = () => {
    setShowScanner(false);
  };

  const handleScan = (value: string) => {
    setLicensePlate(value);
    setShowScanner(false);
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
          <h2>Edit Session Details - Step {step}/2</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="step-indicator">
          <div className="step-progress" style={{ width: step === 1 ? '50%' : '100%' }}></div>
        </div>

        {step === 1 ? (
          <div className="change-session-content">
            <div className="input-group">
              <label>License plate number</label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                placeholder="ABC123"
                className="session-input"
              />
            </div>

            <button className="get-plate-btn" onClick={handleGetLicensePlate}>
              Get License Plate
            </button>

            <button className="change-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        ) : (
          <div className="change-session-content">
            <div className="input-group">
              <label>License Plate</label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                placeholder="ABC123"
                className="session-input"
              />
            </div>

            <div className="input-group">
              <label>Lot Number</label>
              <input
                type="text"
                value={lotNum}
                onChange={(e) => setLotNum(e.target.value.toUpperCase())}
                placeholder="B042"
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
        )}
      </div>

      {showScanner && (
        <QRScanner 
          onClose={handleScannerClose} 
          onScan={handleScan}
          title="Get License Plate"
          hint="Scan or enter manually"
          placeholder="Enter license plate..."
        />
      )}
    </>
  );
};

export default ChangeSessionModal;
