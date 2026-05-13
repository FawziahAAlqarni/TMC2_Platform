import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('بيانات الدخول غير صحيحة. يرجى المحاولة مجدداً.');
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logoWrap}>
          <div style={S.logoCircle}>TMC2</div>
        </div>
        <h2 style={S.title}>منصة TMC2</h2>
        <p style={S.subtitle}>تسجيل الدخول</p>

        {error && <div style={S.errorBox}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={S.field}>
            <label style={S.label}>البريد الإلكتروني</label>
            <input
              style={S.input}
              type="email"
              required
              placeholder="example@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div style={S.field}>
            <label style={S.label}>كلمة المرور</label>
            <input
              style={S.input}
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={S.btn} disabled={loading}>
            {loading ? 'جاري الدخول...' : '🔐 دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}

const S = {
  page: {
    minHeight: '100vh',
    background: '#FFFBEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    direction: 'rtl',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 8px 32px rgba(0,108,53,0.12)',
  },
  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  logoCircle: {
    background: '#006C35',
    color: 'white',
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  title: {
    color: '#006C35',
    textAlign: 'center',
    margin: '0 0 4px',
    fontSize: '1.6rem',
  },
  subtitle: {
    color: '#888',
    textAlign: 'center',
    margin: '0 0 28px',
    fontSize: '0.95rem',
  },
  errorBox: {
    background: '#fff0f0',
    color: '#c0392b',
    border: '1px solid #f5c6cb',
    borderRadius: '8px',
    padding: '10px 14px',
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'center',
  },
  field: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    color: '#444',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'Arial',
    outline: 'none',
    direction: 'ltr',
    textAlign: 'left',
  },
  btn: {
    width: '100%',
    background: '#006C35',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '13px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
    fontFamily: 'Arial',
  },
};
