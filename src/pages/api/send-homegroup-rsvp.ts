import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COMMUNITY_LEADERS = [
  'drjoshuatodd@eastgatejax.com',
  'nurbinabr@eastgatejax.com',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    groupId, groupTitle, groupEmail, leaders, zip,
    name, email, phone, referral, message
  } = req.body;
  if (!groupEmail || !name || !email || !referral) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const recipients = [groupEmail, ...COMMUNITY_LEADERS];
  const subject = `New RSVP for Home Group: ${groupTitle}`;
  const text = `A new RSVP has been submitted for the home group "${groupTitle}" (Zip: ${zip}).\n\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nHow did you learn about us?: ${referral}\nMessage: ${message || '-'}\n\nLeaders: ${leaders}`;
  try {
    await resend.emails.send({
      from: 'noreply@eastgatejax.com',
      to: recipients,
      subject,
      text,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email.' });
  }
} 