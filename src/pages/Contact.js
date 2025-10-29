import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: form.fname, lastname: form.lname, email: form.email, phone: form.phone, message: form.message })
      });
      if (!res.ok) throw new Error('Failed to submit message');
      setLoading(false);
      alert('Message submitted! Redirecting to Home...');
      window.location.href = '/';
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Submission failed');
      console.error(err);
    }
  };

  return (
    <section>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input name="fname" placeholder="First Name" onChange={handleChange} required />
        <input name="lname" placeholder="Last Name" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone" onChange={handleChange} />
        <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </section>
  );
}