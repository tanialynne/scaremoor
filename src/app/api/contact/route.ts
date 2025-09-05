import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email sending function using Nodemailer
async function sendEmailViaNodemailer({ to, subject, text, replyTo }: {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
}) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: to || process.env.MAIL_TO,
    subject,
    text,
    replyTo,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      emailAddress,
      message
    } = body;

    // Basic validation
    if (!name?.trim() || !emailAddress?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create email content
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailBody = `
New contact form submission from your website:

Name: ${name}
Email: ${emailAddress}
Message:
${message}

Submitted at: ${new Date().toLocaleString()}
    `.trim();

    // Try to send email using Resend (popular Next.js email service)
    // You'll need to install and configure this: npm install resend
    try {
      // Uncomment and configure when you set up Resend:
      /*
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'noreply@yourdomain.com', // Must be verified domain
        to: 'your-email@yourdomain.com', // Your inbox
        subject: emailSubject,
        text: emailBody,
        reply_to: emailAddress,
      });
      */
      
      // Send via Nodemailer using your existing env vars
      await sendEmailViaNodemailer({
        to: process.env.MAIL_TO || 'tania@scaremoor.com',
        subject: emailSubject,
        text: emailBody,
        replyTo: emailAddress,
      });
      
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails - still log the submission
    }

    // Log the submission for backup
    console.log('Contact form submission:', {
      name,
      emailAddress,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Message sent successfully! We\'ll get back to you soon.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}