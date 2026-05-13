import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email) {
        setUserEmail(data.session.user.email);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div style={S.bar}>
      {/* يسار: مرحبا + تسجيل خروج */}
      <div style={S.right}>
        <button onClick={handleLogout} style={S.logoutBtn}>↩ خروج</button>
        {userEmail && (
          <span style={S.welcome}>مرحباً، <strong>{userEmail}</strong></span>
        )}
      </div>

      {/* يمين: شعار */}
      <div style={S.left} onClick={() => navigate('/')} title="الصفحة الرئيسية">
        <div style={S.logoCircle}>TMC2</div>
        <span style={S.logoText}>منصة TMC2</span>
      </div>
    </div>
  );
}

const S = {
  bar: {
    direction: 'rtl',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#006C35',
    padding: '0 28px',
    height: '60px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    fontFamily: 'Arial, sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logoCircle: {
    background: '#FFFBEE',
    color: '#006C35',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  logoText: {
    color: 'white',
    fontSize: '17px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  welcome: {
    color: 'white',
    fontSize: '14px',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '6px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'Arial',
  },
};
