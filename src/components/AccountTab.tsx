import { useState } from 'react';
import { IoPersonCircle, IoNotifications, IoShield, IoHelpCircle, IoLogOut } from 'react-icons/io5';
import NotificationModal from './NotificationModal';
import './AccountTab.css';

const AccountTab = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <>
      {showNotificationModal && (
        <NotificationModal onClose={() => setShowNotificationModal(false)} />
      )}

    <div className="account-tab">
      <div className="account-header">
        <div className="profile-section">
          <div className="profile-avatar">
            <IoPersonCircle size={80} />
          </div>
          <div className="profile-info">
            <h2>Sarah Johnson</h2>
            <p className="employee-id">Employer ID: EO-2847</p>
          </div>
        </div>
      </div>

      <div className="account-content">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">Number of Zone assigned</div>
            <div className="info-value">2</div>
          </div>
          <div className="info-card">
            <div className="info-label">Shift Status:</div>
            <div className="info-value on-duty">On Duty</div>
          </div>
        </div>

        <div className="shift-hour-card">
          <div className="info-label">Shift Hour:</div>
          <div className="info-value">4:00 pm - 11:00 pm</div>
        </div>

        <div className="assigned-zones-section">
          <h3 className="section-title">Assigned Zones</h3>
          <div className="zones-list">
            <div className="zone-item">
              <div className="zone-color" style={{ background: '#8b4513' }}></div>
              <div className="zone-info">
                <div className="zone-name">Zone A – CBD</div>
                <div className="zone-lots">48 parking lots</div>
              </div>
            </div>
            <div className="zone-item">
              <div className="zone-color" style={{ background: '#ff8c00' }}></div>
              <div className="zone-info">
                <div className="zone-name">Zone B – North District</div>
                <div className="zone-lots">36 parking lots</div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-section">
          <button className="menu-item" onClick={() => setShowNotificationModal(true)}>
            <IoNotifications size={22} />
            <span>Notifications</span>
            <div className="badge">3</div>
          </button>
          <button className="menu-item">
            <IoShield size={22} />
            <span>Privacy Settings</span>
          </button>
          <button className="menu-item">
            <IoHelpCircle size={22} />
            <span>Help & Support</span>
          </button>
        </div>

        <button className="logout-btn">
          <IoLogOut size={20} />
          Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default AccountTab;
