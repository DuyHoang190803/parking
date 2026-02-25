import { useState } from 'react';
import { IoClose, IoCamera, IoCheckmarkCircle } from 'react-icons/io5';
import './IssueTicket.css';

interface IssueTicketProps {
    onClose: () => void;
}

interface Photo {
    id: string;
    label: string;
}

const IssueTicket = ({ onClose }: IssueTicketProps) => {
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([
        { id: '1', label: 'Previously Captured License Plate Photo' },
        { id: '2', label: 'Previously Captured Full Frame Photo' },
        { id: '3', label: 'Previously Captured Lot Number Photo' },
    ]);

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleCapturePhoto = () => {
        // Simulate photo capture
        const newPhoto: Photo = {
            id: Date.now().toString(),
            label: 'Captured Vehicle Photo',
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

    return (
        <div className="issue-ticket-overlay" onClick={onClose}>
            <div className="issue-ticket-modal" onClick={(e) => e.stopPropagation()}>
                <div className="issue-ticket-header">
                    <h2>Issue Ticket - Step {step}/2</h2>
                    <button className="close-btn" onClick={onClose}>
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${(step / 2) * 100}%` }} />
                </div>

                <div className="issue-ticket-content">
                    {step === 1 && (
                        <div className="step-content">
                            <div className="capture-main-area" onClick={handleCapturePhoto}>
                                <IoCamera size={48} color="#4A9EFF" />
                                <p>Capture Vehicle Photo</p>
                            </div>

                            {photos.length > 0 && (
                                <div className="previously-captured-section">
                                    {photos.map((photo) => (
                                        <div key={photo.id} className="captured-photo-item">
                                            <span>{photo.label}</span>
                                            <button 
                                                className="delete-photo-x"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeletePhoto(photo.id);
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-content review">
                            <h3>Ticket Review</h3>

                            <div className="review-info-box">
                                <div className="review-item">
                                    <span className="bullet">•</span>
                                    <span>License Plate: ABC123</span>
                                </div>
                                <div className="review-item">
                                    <span className="bullet">•</span>
                                    <span>Issue place: Zone A - Lot A1</span>
                                </div>
                                <div className="review-item">
                                    <span className="bullet">•</span>
                                    <span>Issue date: 3PM - 24/2/2026</span>
                                </div>
                                <div className="review-item">
                                    <span className="bullet">•</span>
                                    <span>Photo:</span>
                                </div>

                                <div className="review-photos-preview">
                                    {photos.slice(0, 3).map((_, index) => (
                                        <div key={index} className="photo-placeholder">
                                            Photo
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="past-violations-section">
                                <p>Details of Past Violations</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="issue-ticket-actions">
                    {step === 1 ? (
                        <div className="button-row-issue">
                            <button className="action-btn secondary" onClick={handleBack}>
                                Back
                            </button>
                            <button className="action-btn primary" onClick={handleNext}>
                                Next
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="action-btn submit" onClick={handleSubmit}>
                                Issue Ticket
                            </button>
                            <button className="action-btn secondary full-width" onClick={handleBack}>
                                Back
                            </button>
                        </>
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
                        <h2>Ticket XY2456 issued successfully!</h2>
                        <div className="success-progress-bar" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueTicket;
