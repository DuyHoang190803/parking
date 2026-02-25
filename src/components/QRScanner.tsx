import { useState } from 'react';
import { IoClose, IoCamera, IoCameraOutline } from 'react-icons/io5';
import './QRScanner.css';

interface QRScannerProps {
  onClose: () => void;
  onScan?: (value: string) => void;
  title?: string;
  hint?: string;
  placeholder?: string;
}

const QRScanner = ({ onClose, onScan, title = 'Scan', hint = 'Point camera to scan', placeholder = 'Enter manually...' }: QRScannerProps) => {
  const [manualEntry, setManualEntry] = useState(false);
  const [qrCode, setQrCode] = useState('');

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qr-header">
          <h2>{title}</h2>
          <button className="qr-close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {!manualEntry ? (
          <div className="qr-scanner">
            <div className="scanner-frame">
              <div className="scanner-corners">
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
              </div>
              <IoCamera className="qr-icon" size={80} />
            </div>
            <p className="scanner-hint">{hint}</p>
            <button className="manual-entry-btn" onClick={() => setManualEntry(true)}>
              <IoCameraOutline size={18} />
              <span>Enter manually</span>
            </button>
          </div>
        ) : (
          <div className="manual-entry">
            <input
              type="text"
              placeholder={placeholder}
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              className="manual-input"
              autoFocus
            />
            <div className="manual-actions">
              <button className="cancel-btn" onClick={() => setManualEntry(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={() => {
                if (onScan && qrCode) {
                  onScan(qrCode);
                  onClose();
                }
              }}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
