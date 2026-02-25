import { useState } from 'react';
import { IoClose, IoCheckmarkCircle, IoCamera } from 'react-icons/io5';
import QRScanner from './QRScanner';
import './NewSessionModal.css';

interface NewSessionModalProps {
  lotNumber: string;
  zoneName: string;
  onClose: () => void;
}

const NewSessionModal = ({ lotNumber, zoneName, onClose }: NewSessionModalProps) => {
  const [step, setStep] = useState(1);
  const [licensePlate, setLicensePlate] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
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

  const handleCapturePhoto = () => {
    // Simulate photo capture
    const newPhoto = `Photo ${photos.length + 1}`;
    setPhotos([...photos, newPhoto]);
  };

  const handleIssueTicket = () => {
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
          <h2>Session XYZ456 created successfully!</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="new-session-modal">
        <div className="new-session-header">
          <h2>New Session - Step {step}/3</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="step-indicator">
          <div className="step-progress" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        {step === 1 && (
          <div className="new-session-content">
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

            <button className="next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="new-session-content">
            <div className="capture-section">
              <p className="capture-instruction">
                Capture photos of the vehicle for documentation
              </p>
              
              <div className="capture-area" onClick={handleCapturePhoto}>
                <IoCamera size={48} color="#4A9EFF" />
                <p className="capture-title">Tap to Capture Photo</p>
                {photos.length > 0 && (
                  <span className="photo-count">{photos.length} photo{photos.length > 1 ? 's' : ''} captured</span>
                )}
              </div>
              
              {photos.length > 0 && (
                <div className="captured-photos-grid">
                  {photos.map((_, index) => (
                    <div key={index} className="photo-thumbnail">
                      <IoCheckmarkCircle className="photo-check" size={20} />
                      <span className="photo-label">Photo {index + 1}</span>
                      <button 
                        className="remove-photo-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhotos(photos.filter((_, i) => i !== index));
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="button-row">
              <button className="back-btn-modal" onClick={handleBack}>
                Back
              </button>
              <button className="next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="new-session-content">
            <h3 className="review-title">Ticket Review</h3>
            
            <div className="review-card">
              <ul className="review-list">
                <li>License Plate: {licensePlate || 'ABC123'}</li>
                <li>Issue place: {zoneName} - Lot {lotNumber}</li>
                <li>Issue date: 3PM - 24/2/2026</li>
                <li>Photo:</li>
              </ul>

              <div className="review-photos">
                {photos.length > 0 ? (
                  photos.map((photo, index) => (
                    <div key={index} className="review-photo-item">
                      {photo}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="review-photo-placeholder">Photo</div>
                    <div className="review-photo-placeholder">Photo</div>
                    <div className="review-photo-placeholder">Photo</div>
                  </>
                )}
              </div>
            </div>

            <button className="issue-ticket-btn-modal" onClick={handleIssueTicket}>
              Issue Ticket
            </button>
            <button className="back-btn-modal" onClick={handleBack}>
              Back
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

export default NewSessionModal;
