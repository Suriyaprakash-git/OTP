const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid');
const cros = require('cors');
const app = express();
app.use(express.json());
app.use(cros())

app.post('/api/send-otp', async (req, res) => {
  const { email, phone } = req.body;
  const data = new FormData();
  data.append('channel', 'sms,email');
  data.append('email', email);
  data.append('phone_sms', phone);
  data.append('callback_url', 'https://otp-eight-roan.vercel.app/');
  data.append('success_redirect_url', 'http://localhost:3000/welcome');
  data.append('fail_redirect_url', 'https://otp-eight-roan.vercel.app/error');
  data.append('metadata', JSON.stringify({ order_id: uuidv4(), agent_id: Math.floor(Math.random() * 10000) }));
  data.append('captcha', 'false');
  data.append('hide', 'true');
  data.append('lang', 'en');

  try {
    const response = await axios.post('https://otp.dev/api/verify/', data, {
      headers: {
        'Authorization': 'Basic SU0yeXY1VE9vQWFFTDZqZnBDcUZjN0tuSjNkOGs0SHQ6enZldTVpcHg2M3drdG9mMTlnbHNxMmN5am44NzRtcmI=',
        ...data.getHeaders()
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
