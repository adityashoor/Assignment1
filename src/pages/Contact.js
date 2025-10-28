import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ fname:"", lname:"", email:"", phone:"", message:"" });

  // Update form state on input change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // For the purposes of the assignment the form will capture data,
  // log it to the console and redirect back to Home.
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Contact form submitted:', form);
    alert("Message submitted! Redirecting to Home...");
    window.location.href = "/";
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
        <button type="submit">Send</button>
      </form>
    </section>
  );
}