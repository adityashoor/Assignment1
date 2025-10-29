import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email, password } : { name, email, password };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        const text = await res.text();
        throw new Error(`Unexpected response: ${res.status} ${text}`);
      }
      if (!res.ok) {
        const msg = data && data.message ? data.message : `Request failed (${res.status})`;
        throw new Error(msg);
      }
      // store token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // navigate to home
      navigate('/');
    } catch (err) {
      console.error('Auth error', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{maxWidth:720, margin:'24px auto'}}>
      <h2>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
      <p style={{marginBottom:16}}>Use this form to {mode === 'login' ? 'sign in' : 'create a new account'} for admin actions.</p>
      <div style={{marginBottom:12}}>
        <button onClick={() => setMode('login')} disabled={mode==='login'}>Sign in</button>
        <button onClick={() => setMode('register')} disabled={mode==='register'} style={{marginLeft:8}}>Register</button>
      </div>

      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        {mode === 'register' && (
          <div>
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>
        )}

        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
        </div>

        <div>
          <button type="submit" disabled={loading}>{loading ? 'Please wait...' : (mode === 'login' ? 'Sign in' : 'Create account')}</button>
        </div>

        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </main>
  );
}
