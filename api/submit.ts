import type { VercelRequest, VercelResponse } from '@vercel/node';
import 'dotenv/config';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, scope, message } = req.body;
    const access_key = process.env.WEB3FORMS_ACCESS_KEY;

    if (!access_key) {
      return res.status(500).json({ success: false, message: 'Server configuration error: Missing Access Key' });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key,
        name,
        email,
        scope,
        message,
        from_name: 'Userhood Contact Form',
        subject: `New Project Inquiry: ${scope}`,
      }),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
