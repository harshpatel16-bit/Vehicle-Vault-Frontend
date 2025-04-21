import React, { useState } from 'react';
import axios from 'axios';
import { Navbar } from "./Navbar";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/query/postquery", formData);
      console.log(response.data);
      setStatus('Message sent successfully!');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ Height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "40px" }}>
        <div className="container mt-5">
          <h2 className="text-center mb-3">Contact Us</h2>
          <p className="text-center text-muted">
            Have questions or need assistance? Drop us a message and we’ll get back to you shortly.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    id="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Sell My Car">Sell My Car</option>
                    <option value="Buy a Car">Buy a Car</option>
                    <option value="Report a Bug">Report a Bug</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success">Send Message</button>
                </div>
              </form>
              {status && <p className="mt-3 text-center text-info">{status}</p>}
            </div>
          </div>
        </div>

        <div className="container mt-5 text-center text-muted">
          <p>© 2025 Vehicle Vault. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};
