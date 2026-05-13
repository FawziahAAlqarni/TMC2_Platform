import React from 'react';
import { useNavigate } from 'react-router-dom';

const pages = [
  { label: 'ARIS Committee Data', path: '/aris' },
  { label: 'Change', path: '/change' },
  { label: 'Database Transformation', path: '/db-transformation' },
  { label: 'Strategy Map Database Structure', path: '/strategy-map' },
  { label: 'هيئة الخطط', path: '/plans' },
  { label: 'TOM', path: '/tom' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>منصة TMC2</h1>
      <p style={styles.subtitle}>اختاري القسم المطلوب</p>
      <div style={styles.grid}>
        {pages.map((page) => (
          <button
            key={page.path}
            style={styles.card}
            onClick={() => navigate(page.path)}
            onMouseEnter={e => e.currentTarget.style.background = '#004d26'}
            onMouseLeave={e => e.currentTarget.style.background = '#006C35'}
          >
            {page.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    direction: 'rtl',
    minHeight: 'calc(100vh - 60px)',
    background: '#FFFBEE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    color: '#006C35',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  card: {
    background: '#006C35',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '30px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontFamily: 'Arial, sans-serif',
  },
};
