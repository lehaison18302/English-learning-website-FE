import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AntDesignOutlined,
  HomeFilled,
  AudioOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  ShopOutlined,
  UserOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import logo from '../assets/image/logoweb.png';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { to: '/home',       label: 'Học',       icon: <HomeFilled /> },
  { to: '/pronounce',  label: 'Phát âm',       icon: <AudioOutlined /> },
  { to: '/leaderboard',label: 'Bảng xếp hạng', icon: <TrophyOutlined /> },
  { to: '/tasks',      label: 'Nhiệm vụ',      icon: <CheckCircleOutlined /> },
  { to: '/shop',       label: 'Cửa hàng',      icon: <ShopOutlined /> },
  { to: '/profile',    label: 'Hồ sơ',         icon: <UserOutlined /> },
  { to: '/more',       label: 'Xem thêm',      icon: <EllipsisOutlined /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(null);
  const { setCurrentUser } = useAuth?.() || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Xóa thông tin người dùng khỏi phiên (localStorage/sessionStorage nếu có)
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      localStorage.removeItem('completedLessons'); // Xóa completedLessons khi logout
      if (setCurrentUser) setCurrentUser(null);
      navigate('/');
    } catch (error) {
      // Có thể hiển thị thông báo lỗi nếu cần
      console.error('Logout error:', error);
    }
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <img src={logo} alt="Engsy Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item, i) => {
          const active = pathname === item.to;
          const hover = hovered === i;
          const bgColor = active
            ? '#e6f7ff'
            : hover
            ? '#f5f5f5'
            : 'transparent';
          const borderColor = active
            ? '#91d5ff'
            : 'transparent';
          const color = active
            ? '#1890ff'
            : '#595959';

          return (
            <Link
              key={item.to}
              to={item.to}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...styles.navItem,
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                color,
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              <span style={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ flexGrow: 1 }} />

      <button
        onClick={handleLogout}
        className="sidebar-logout-btn"
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          fontWeight: 550,
          background: '#91de62',
          color: '#595959',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '16px',
          cursor: 'pointer',
        }}
      >
        Đăng xuất
      </button>
    </aside>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '240px',
    height: '100vh',
    backgroundColor: '#d3dfbe',
    boxShadow: '2px 0 10px rgba(0,0,0,0.08)',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
  },
  logo: {
    width: '100%',
    padding: '0 24px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  nav: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  navItem: {
    width: '200px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'background-color 0.2s, border 0.2s, color 0.2s',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '20px',
    marginRight: '12px',
  },
  label: {
    flex: 1,
    textAlign: 'left',
  },
};
