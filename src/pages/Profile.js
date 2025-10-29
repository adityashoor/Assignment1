import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(u);
    } catch {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return (
    <main style={{maxWidth:720, margin:'24px auto'}}>
      <h2>Profile</h2>
      <p>You are not signed in.</p>
    </main>
  );

  return (
    <main style={{maxWidth:720, margin:'24px auto'}}>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div style={{marginTop:12}}>
        <button onClick={logout}>Sign out</button>
      </div>
    </main>
  );
}
