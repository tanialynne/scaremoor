import { NextResponse } from 'next/server';

export async function GET() {
  // Test endpoint to check environment variables
  const envCheck = {
    SMTP_HOST: !!process.env.SMTP_HOST ? '✅ Set' : '❌ Missing',
    SMTP_PORT: !!process.env.SMTP_PORT ? '✅ Set' : '❌ Missing', 
    SMTP_USER: !!process.env.SMTP_USER ? '✅ Set' : '❌ Missing',
    SMTP_PASS: !!process.env.SMTP_PASS ? '✅ Set' : '❌ Missing',
    MAIL_FROM: !!process.env.MAIL_FROM ? '✅ Set' : '❌ Missing',
    MAIL_TO: !!process.env.MAIL_TO ? '✅ Set' : '❌ Missing',
    SMTP_SECURE: process.env.SMTP_SECURE || 'Not set',
    
    // Show actual values (safely)
    values: {
      SMTP_HOST: process.env.SMTP_HOST || 'undefined',
      SMTP_PORT: process.env.SMTP_PORT || 'undefined',
      SMTP_SECURE: process.env.SMTP_SECURE || 'undefined',
      MAIL_FROM: process.env.MAIL_FROM || 'undefined',
      MAIL_TO: process.env.MAIL_TO || 'undefined',
    }
  };

  return NextResponse.json(envCheck);
}