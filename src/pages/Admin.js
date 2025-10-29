import { useEffect, useState } from 'react';

export default function Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contacts');
      if (!res.ok) throw new Error('Failed to load contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this contact?')) return;
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    load();
  };

  const removeAll = async () => {
    if (!confirm('Delete ALL contacts?')) return;
    await fetch('/api/contacts', { method: 'DELETE' });
    load();
  };

  return (
    <main>
      <h2>Admin — Contacts</h2>
      <p>Development admin view to list and delete contact submissions.</p>
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
    </main>
  );
}
