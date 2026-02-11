import { IoClose, IoPerson, IoNotifications, IoLockClosed, IoHelpCircle, IoLogOut } from 'react-icons/io5';
import { useState } from 'react';
import NotificationModal from './NotificationModal';
import './MenuSidebar.css';

interface MenuSidebarProps {
  onClose: () => void;
}

const MenuSidebar = ({ onClose }: MenuSidebarProps) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
  };

  const menuItems = [
    { icon: IoPerson, label: 'Profile', badge: null, color: null, onClick: () => {} },
    { icon: IoNotifications, label: 'Notifications', badge: 4, color: '#dc2626', onClick: handleNotificationClick },
    { icon: IoLockClosed, label: 'Privacy & Security', badge: null, color: null, onClick: () => {} },
    { icon: IoHelpCircle, label: 'Help & Support', badge: null, color: null, onClick: () => {} },
  ];

  return (
    <>
      <div className="menu-overlay" onClick={onClose} />
      <div className="menu-sidebar">
        <div className="menu-header">
          <div className="menu-logo">INVIPO PARKING</div>
          <button className="menu-close-btn" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className="menu-user-info">
          <div className="user-avatar">
            <IoPerson size={28} />
          </div>
          <div className="user-details">
            <h3>Jan Novák</h3>
            <p>jan.novak@email.cz</p>
          </div>
        </div>

        <div className="menu-items">
          {menuItems.map((item, index) => (
            <button key={index} className="menu-item" onClick={item.onClick}>
              <div className="menu-item-left">
                <item.icon className="menu-item-icon" size={22} />
                <span>{item.label}</span>
              </div>
              <div className="menu-item-right">
                {item.badge && (
                  <span className="menu-badge" style={{ background: item.color || '#dc2626' }}>
                    {item.badge}
                  </span>
                )}
                <span className="menu-arrow">›</span>
              </div>
            </button>
          ))}
        </div>

        <button className="logout-btn">
          <IoLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {showNotificationModal && (
        <NotificationModal onClose={() => setShowNotificationModal(false)} />
      )}
    </>
  );
};

export default MenuSidebar;
