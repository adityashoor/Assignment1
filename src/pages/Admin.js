import { useEffect, useState } from 'react';

function tokenHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export default function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  });
  const [projects, setProjects] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contacts', { headers: tokenHeaders() });
      if (!res.ok) throw new Error('Failed to load contacts (login required?)');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) load(); }, [user]);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) setProjects(await res.json());
    } catch (err) { console.error('loadProjects', err); }
  };

  const loadQualifications = async () => {
    try {
      const res = await fetch('/api/qualifications');
      if (res.ok) setQualifications(await res.json());
    } catch (err) { console.error('loadQualifications', err); }
  };
  useEffect(() => { if (user) { loadProjects(); loadQualifications(); } }, [user]);

  const remove = async (id) => {
    if (!confirm('Delete this contact?')) return;
    const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE', headers: tokenHeaders() });
    if (!res.ok) alert('Failed to delete (are you logged in?)');
    load();
  };

  const removeAll = async () => {
    if (!confirm('Delete ALL contacts?')) return;
    const res = await fetch('/api/contacts', { method: 'DELETE', headers: tokenHeaders() });
    if (!res.ok) alert('Failed to delete all (are you logged in?)');
    load();
  };

  const removeProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: tokenHeaders() });
    if (!res.ok) alert('Failed to delete project');
    loadProjects();
  };

  const removeQualification = async (id) => {
    if (!confirm('Delete this qualification?')) return;
    const res = await fetch(`/api/qualifications/${id}`, { method: 'DELETE', headers: tokenHeaders() });
    if (!res.ok) alert('Failed to delete qualification');
    loadQualifications();
  };

  const login = async (ev) => {
    ev.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setEmail(''); setPassword('');
    } catch (err) { setError(err.message); }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setContacts([]);
  };

  return (
    <main>
      <h2>Admin</h2>
      {!user ? (
        <section>
          <p>Sign in to manage submissions.</p>
          <form onSubmit={login} style={{maxWidth:360}}>
            <div style={{marginBottom:8}}>
              <label>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} style={{width:'100%'}} />
            </div>
            <div style={{marginBottom:8}}>
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{width:'100%'}} />
            </div>
            <div>
              <button type="submit">Sign in</button>
            </div>
            {error && <p style={{color:'red'}}>{error}</p>}
          </form>
        </section>
      ) : (
        <section>
          <p>Signed in as <strong>{user.name}</strong> — <button onClick={logout}>Sign out</button></p>
          <div>
            <button onClick={load} disabled={loading}>Refresh</button>
            <button onClick={removeAll} style={{marginLeft:12}}>Delete All</button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p style={{color:'red'}}>{error}</p>}
          <table style={{width:'100%', marginTop:12, borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th style={{border:'1px solid #ddd', padding:8}}>First</th>
                <th style={{border:'1px solid #ddd', padding:8}}>Last</th>
                <th style={{border:'1px solid #ddd', padding:8}}>Email</th>
                <th style={{border:'1px solid #ddd', padding:8}}>Message</th>
                <th style={{border:'1px solid #ddd', padding:8}}>Created</th>
                <th style={{border:'1px solid #ddd', padding:8}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id}>
                  <td style={{border:'1px solid #ddd', padding:8}}>{c.firstname}</td>
                  <td style={{border:'1px solid #ddd', padding:8}}>{c.lastname}</td>
                  <td style={{border:'1px solid #ddd', padding:8}}>{c.email}</td>
                  <td style={{border:'1px solid #ddd', padding:8}}>{c.message}</td>
                  <td style={{border:'1px solid #ddd', padding:8}}>{new Date(c.createdAt).toLocaleString()}</td>
                  <td style={{border:'1px solid #ddd', padding:8}}><button onClick={() => remove(c._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <section style={{marginTop:20}}>
            <h3>Projects</h3>
            {projects.length === 0 ? <p>No projects</p> : (
              <ul>
                {projects.map(p => (
                  <li key={p._id} style={{marginBottom:8}}>
                    <strong>{p.title}</strong> — {p.description}
                    <div><button onClick={() => removeProject(p._id)}>Delete</button></div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section style={{marginTop:20}}>
            <h3>Qualifications</h3>
            {qualifications.length === 0 ? <p>No qualifications</p> : (
              <ul>
                {qualifications.map(q => (
                  <li key={q._id} style={{marginBottom:8}}>
                    <strong>{q.title}</strong> — {q.description || ''} <br />
                    Completed: {q.completion ? new Date(q.completion).toLocaleDateString() : 'N/A'}
                    <div><button onClick={() => removeQualification(q._id)}>Delete</button></div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      )}
    </main>
  );
}
