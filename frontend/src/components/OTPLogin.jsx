import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OTPLogin() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpLink, setOtpLink] = useState(null);
  // const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (otpLink)
    window.location.href = otpLink;
  }, [otpLink]);

  const handleOTPRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email, phone });
      setOtpLink(response.data.link);
      
    } catch (error) {
      console.error('OTP Request Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: '1500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">OTP Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control mb-3" />
          <button onClick={handleOTPRequest} className="btn btn-primary w-100 mb-3">Get OTP</button>
          {/* {otpLink && <iframe src={otpLink} title="OTP Verification" className="w-100" style={{ height: '800px', border: '1px solid #ccc' }}></iframe>} */}
        </div>
      </div>
    </div>
  );
}
