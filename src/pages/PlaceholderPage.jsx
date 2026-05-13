import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  const navigate = useNavigate();
  return (
    <div style={{ direction: 'rtl', padding: '40px', fontFamily: 'Arial', background: '#FFFBEE', minHeight: '100vh' }}>
      <button
        onClick={() => navigate('/')}
        style={{ background: '#006C35', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', marginBottom: '30px' }}
      >
        ← العودة للرئيسية
      </button>
      <h1 style={{ color: '#006C35' }}>{title}</h1>
      <p style={{ color: '#666' }}>هذه الصفحة قيد الإنشاء</p>
    </div>
  );
}
