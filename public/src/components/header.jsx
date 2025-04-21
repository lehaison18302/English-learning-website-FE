import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>    
        <img
          src="/path-to-logo.png"
          alt="Logo"
          style={styles.logo}
        />
        <a href="/home" style={styles.link}>Home</a>
        <a href="/courses" style={styles.link}>Courses</a>
        <a href="/practice" style={styles.link}>Practice</a>
      </div>
      <div style={styles.rightSection}>
        <button style={styles.notificationButton}>
          🔔
        </button>
        <div style={styles.userMenu}>
          <span style={styles.greeting}>Sơn</span>
          <div style={styles.dropdown}>
            <a href="/profile" style={styles.dropdownItem}>Profile</a>
            <a href="/settings" style={styles.dropdownItem}>Settings</a>
            <a href="/logout" style={styles.dropdownItem}>Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffffff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e5e5e5',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  logo: {
    height: '40px',
    cursor: 'pointer',
  },
  link: {
    color: '#4caf50',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: "'Roboto', sans-serif",
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  notificationButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  userMenu: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  greeting: {
    color: '#4caf50',
    fontSize: '16px',
    fontFamily: "'Roboto', sans-serif",
    marginRight: '10px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    display: 'none',
    flexDirection: 'column',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#4caf50',
    fontSize: '14px',
    fontFamily: "'Roboto', sans-serif",
    cursor: 'pointer',
  },
};

// Add interactivity for dropdown menu (optional)
document.addEventListener('click', (e) => {
  const userMenu = document.querySelector('[style*="userMenu"]');
  const dropdown = userMenu?.querySelector('[style*="dropdown"]');
  if (userMenu?.contains(e.target)) {
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
  } else if (dropdown) {
    dropdown.style.display = 'none';
  }
});

export default Header;