import { useState } from 'react';
import { IoKey, IoCheckmarkCircle } from 'react-icons/io5';
import './TokenInput.css';

interface TokenInputProps {
  onTokenValid: (token: string) => void;
}

const TokenInput = ({ onTokenValid }: TokenInputProps) => {
  const [token, setToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const validateToken = async () => {
    if (!token.trim()) {
      setError('Please enter a Mapbox token');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      // Validate token by making a test request to Mapbox
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/test.json?access_token=${token}`
      );

      if (response.ok) {
        localStorage.setItem('mapbox_token', token);
        onTokenValid(token);
      } else {
        setError('Invalid token. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to validate token. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="token-screen">
      <div className="token-container">
        <div className="token-header">
          <IoKey className="token-icon" />
          <h1>Smart Parking</h1>
          <p>Enter your Mapbox access token to continue</p>
        </div>

        <div className="token-input-group">
          <input
            type="text"
            className="token-input"
            placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && validateToken()}
          />
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            className="validate-btn"
            onClick={validateToken}
            disabled={isValidating}
          >
            {isValidating ? (
              <span>Validating...</span>
            ) : (
              <>
                <IoCheckmarkCircle size={20} />
                <span>Continue</span>
              </>
            )}
          </button>
        </div>

        <div className="token-help">
          <p>Don't have a token?</p>
          <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer">
            Get one from Mapbox
          </a>
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
