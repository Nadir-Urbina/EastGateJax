import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const COMMUNITY_LEADERS = [
  'drjoshuatodd@eastgatejax.com',
  'nurbinabr@eastgatejax.com',
];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    groupId, groupTitle, groupEmail, leaders, zip,
    name, email, phone, referral, message
  } = body;
  if (!groupEmail || !name || !email || !referral) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
} 