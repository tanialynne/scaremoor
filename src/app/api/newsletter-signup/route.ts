import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { newsletterRateLimit } from "../../lib/rateLimit";
import { validateNewsletterSignup } from "../../lib/validation";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitResult = newsletterRateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Comprehensive validation
    const validationResult = validateNewsletterSignup(body);
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.errors.join(', ') },
        { status: 400 }
      );
    }

    const { email, source, timestamp } = body;

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send notification to site owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Newsletter Signup - ${source}`,
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
      `,
    });

    // Send welcome email with free chapter to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🎭 Your FREE Chapter of The Mask Room is Here!",
      html: `
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%); color: #f5deb3; font-family: Arial, sans-serif; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: rgba(139, 69, 19, 0.1); border: 1px solid #8b4513; border-radius: 12px; padding: 30px;">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ff6b35; font-size: 28px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                🎭 Welcome to Scaremoor! 🎭
              </h1>
              <p style="color: #deb887; font-size: 16px; margin: 10px 0 0 0;">
                Your spine-tingling adventure begins now...
              </p>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35;">
              <h2 style="color: #ff6b35; margin: 0 0 15px 0;">The Mask Room - Chapter 1</h2>
              <p style="line-height: 1.6; margin: 0;">
                Something sinister lurks behind the old theater masks at Westbrook Middle School. 
                When Emma discovers the abandoned drama room, she finds more than dusty costumes and forgotten props. 
                The masks seem to watch her every move, and soon she realizes they're not just decorations...
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.scaremoor.com/free-chapter" 
                 style="background: linear-gradient(135deg, #ff6b35, #d2001f); 
                        color: white; 
                        text-decoration: none; 
                        padding: 15px 30px; 
                        border-radius: 25px; 
                        font-weight: bold; 
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                        transition: all 0.3s ease;">
                📖 Read Your Free Chapter
              </a>
            </div>

            <div style="background: rgba(139, 69, 19, 0.2); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #ff6b35; margin: 0 0 10px 0;">What's Next?</h3>
              <ul style="color: #deb887; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>🎧 Listen to free podcast episodes</li>
                <li>📚 Discover the complete Scaremoor series</li>
                <li>🎪 Get exclusive content and behind-the-scenes stories</li>
                <li>👻 Join our community of brave young readers</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #8b4513;">
              <p style="color: #deb887; font-size: 14px; margin: 0;">
                Happy reading!<br>
                <strong style="color: #ff6b35;">T.L. Griffith</strong><br>
                Author of the Scaremoor Series
              </p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #a0522d; font-size: 12px;">
                Don't want to receive these emails? 
                <a href="https://www.scaremoor.com/unsubscribe" style="color: #ff6b35;">Unsubscribe here</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}