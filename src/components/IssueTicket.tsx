import { useState } from 'react';
import { IoClose, IoCamera, IoTrash, IoCheckmarkCircle } from 'react-icons/io5';
import './IssueTicket.css';

interface IssueTicketProps {
  onClose: () => void;
}

type ViolationType = 'overstay' | 'no-payment' | 'wrong-info' | 'other';

interface Photo {
  id: string;
  type: 'license' | 'vehicle' | 'lot-number';
  url: string;
}

const IssueTicket = ({ onClose }: IssueTicketProps) => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registration, setRegistration] = useState('');
  const [bayNumber, setBayNumber] = useState('B-042');
  const [zoneAuto] = useState('Zone B - North');
  const [violationType, setViolationType] = useState<ViolationType>('overstay');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);

  const violationTypes = [
    { id: 'overstay' as ViolationType, label: 'Overstay' },
    { id: 'no-payment' as ViolationType, label: 'No Payment' },
    { id: 'wrong-info' as ViolationType, label: 'Wrong Info' },
    { id: 'other' as ViolationType, label: 'Other' },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCapture = (type: 'license' | 'vehicle' | 'lot-number') => {
    // Simulate photo capture
    const newPhoto: Photo = {
      id: Date.now().toString(),
      type,
      url: `https://via.placeholder.com/300x200?text=${type}`,
    };
    setPhotos([...photos, newPhoto]);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2500);
  };

  const getPhotosByType = (type: 'license' | 'vehicle' | 'lot-number') => {
    return photos.filter(p => p.type === type);
  };

  return (
    <div className="issue-ticket-overlay" onClick={onClose}>
      <div className="issue-ticket-modal" onClick={(e) => e.stopPropagation()}>
        <div className="issue-ticket-header">
          <h2>New Ticket - Step {step}/4</h2>
          <button className="close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        <div className="issue-ticket-content">
          {step === 1 && (
            <div className="step-content">
              <div className="form-group">
                <label>LICENSE PLATE</label>
                <input
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>BAY NUMBER</label>
                <input
                  type="text"
                  value={bayNumber}
                  onChange={(e) => setBayNumber(e.target.value.toUpperCase())}
                  placeholder="B-042"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>ZONE (AUTO-FILLED)</label>
                <input
                  type="text"
                  value={zoneAuto}
                  readOnly
                  className="form-input readonly"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <div className="form-group">
                <label>VIOLATION TYPE</label>
                <div className="violation-options">
                  {violationTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`violation-btn ${violationType === type.id ? 'active' : ''}`}
                      onClick={() => setViolationType(type.id)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>DATE & TIME</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>NOTES (OPTIONAL)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes..."
                  className="form-textarea"
                  rows={4}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <div className="photo-section">
                <h3>License Plate Photo</h3>
                <div className="photo-capture-area">
                  {getPhotosByType('license').length > 0 ? (
                    <div className="photo-preview">
                      <img src={getPhotosByType('license')[0].url} alt="License plate" />
                      <button className="delete-photo-btn" onClick={() => handleDeletePhoto(getPhotosByType('license')[0].id)}>
                        <IoTrash size={16} />
                      </button>
                    </div>
                  ) : (
                    <button className="capture-btn" onClick={() => handleCapture('license')}>
                      <IoCamera size={40} />
                      <span>Capture License Plate</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="photo-section">
                <h3>Full Vehicle Photo</h3>
                <div className="photo-capture-area">
                  {getPhotosByType('vehicle').length > 0 ? (
                    <div className="photo-preview">
                      <img src={getPhotosByType('vehicle')[0].url} alt="Vehicle" />
                      <button className="delete-photo-btn" onClick={() => handleDeletePhoto(getPhotosByType('vehicle')[0].id)}>
                        <IoTrash size={16} />
                      </button>
                    </div>
                  ) : (
                    <button className="capture-btn" onClick={() => handleCapture('vehicle')}>
                      <IoCamera size={40} />
                      <span>Capture Full Vehicle</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="photo-section">
                <h3>Lot Number Photo</h3>
                <div className="photo-capture-area">
                  {getPhotosByType('lot-number').length > 0 ? (
                    <div className="photo-preview">
                      <img src={getPhotosByType('lot-number')[0].url} alt="Lot number" />
                      <button className="delete-photo-btn" onClick={() => handleDeletePhoto(getPhotosByType('lot-number')[0].id)}>
                        <IoTrash size={16} />
                      </button>
                    </div>
                  ) : (
                    <button className="capture-btn" onClick={() => handleCapture('lot-number')}>
                      <IoCamera size={40} />
                      <span>Capture Lot Number</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="photo-count">{photos.length} photos taken</p>
            </div>
          )}

          {step === 4 && (
            <div className="step-content review">
              <h3>Review Ticket Information</h3>
              
              <div className="review-section">
                <div className="review-row">
                  <span className="review-label">License Plate:</span>
                  <span className="review-value">{registration || 'N/A'}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Bay:</span>
                  <span className="review-value">{bayNumber}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Zone:</span>
                  <span className="review-value">{zoneAuto}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Violation:</span>
                  <span className="review-value highlight">{violationType}</span>
                </div>
                <div className="review-row">
                  <span className="review-label">Photos:</span>
                  <span className="review-value">{photos.length}</span>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="review-photos">
                  <h4>Captured Photos</h4>
                  <div className="photos-grid">
                    {photos.map((photo) => (
                      <div key={photo.id} className="review-photo">
                        <img src={photo.url} alt={photo.type} />
                        <span className="photo-type">{photo.type.replace('-', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="issue-ticket-actions">
          {step > 1 && (
            <button className="action-btn secondary" onClick={handleBack}>
              Back
            </button>
          )}
          {step < 4 ? (
            <button className="action-btn primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="action-btn submit" onClick={handleSubmit}>
              <IoCheckmarkCircle size={20} />
              Issue Ticket
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <IoCheckmarkCircle size={80} />
            </div>
            <h2>Ticket Issued</h2>
            <p>Ticket #{generateTicketId()} has been successfully created.</p>
            <div className="success-progress-bar" />
          </div>
        </div>
      )}
    </div>
  );
};

const generateTicketId = () => {
  return 'VII3FJB4';
};

export default IssueTicket;
