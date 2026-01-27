import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormRateLimit } from '../../lib/rateLimit';
import { validateContactForm } from '../../lib/validation';

// Email sending function using Nodemailer
async function sendEmailViaNodemailer({ to, subject, text, replyTo }: {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
}) {
  console.log('🔧 Creating transporter with config:', {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true',
    hasUser: !!process.env.SMTP_USER,
    hasPass: !!process.env.SMTP_PASS,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Test connection
  console.log('🔍 Testing SMTP connection...');
  await transporter.verify();
  console.log('✅ SMTP connection verified');

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: to || process.env.MAIL_TO,
    subject,
    text,
    replyTo,
  };

  console.log('📧 Sending email with options:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    replyTo: mailOptions.replyTo,
  });

  const result = await transporter.sendMail(mailOptions);
  console.log('📬 Email sent result:', result);
  return result;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitResult = contactFormRateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — silently reject bot submissions
    if (body.website) {
      return NextResponse.json(
        { message: 'Message sent successfully! We\'ll get back to you soon.' },
        { status: 200 }
      );
    }

    // Comprehensive validation
    const validationResult = validateContactForm(body);
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.errors.join(', ') },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Create email content
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailBody = `
New contact form submission from your website:

Name: ${name}
Email: ${email}
Message:
${message}

Submitted at: ${new Date().toLocaleString()}
    `.trim();

    // Send email via Nodemailer
    console.log('Attempting to send email with config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM,
    });
    
    try {
      await sendEmailViaNodemailer({
        to: process.env.MAIL_TO || 'tania@scaremoor.com',
        subject: emailSubject,
        text: emailBody,
        replyTo: email,
      });
      console.log('✅ Email sent successfully');
      
    } catch (emailError) {
      console.error('❌ Email sending failed with detailed error:', {
        error: emailError,
        message: emailError instanceof Error ? emailError.message : 'Unknown error',
        stack: emailError instanceof Error ? emailError.stack : undefined,
      });
      
      // Return error to user if email fails
      return NextResponse.json(
        { error: 'Failed to send email. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    // Log the submission for backup
    console.log('Contact form submission:', {
      name,
      email,
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