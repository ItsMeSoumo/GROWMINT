import mongoose from 'mongoose';
import contactModel from '../../models/contact.model.js';
import { resend } from '../../lib/resend.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      // Make sure you have a MONGODB_URI in your .env file
      await mongoose.connect(process.env.MONGODB_URI);
    }

    console.log('Received form data:', req.body);

    // Create contact document with explicit field assignment
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      company: req.body.company,
      projectType: req.body.projectType,
      message: req.body.message,
      createdAt: new Date()
    };

    console.log('Saving contact data:', contactData);

    // Try a more direct approach - save directly to the database
    try {
      // Use the model but save directly to ensure all fields are included
      const result = await mongoose.connection.db.collection('contacts').insertOne(contactData);
      console.log('Contact saved directly to DB:', result);
      
      // Send email notifications if Resend API key is configured
      if (process.env.RESEND_API_KEY) {
        try {
          // Determine if we're in development mode
          const isDevelopment = process.env.NODE_ENV !== 'production';
          
          // 1. Send notification to admin
          console.log('Sending admin notification email to business@growmint.net');
          const adminEmailResult = await resend.emails.send({
            from: "Growmint Contact <contact@growmint.net>",
            to: "business@growmint.net",
            subject: "New Contact Form Submission",
            html: createAdminEmailHTML(contactData),
          });
          
          console.log('Admin email response:', JSON.stringify(adminEmailResult));
          
          // 2. Send confirmation to user
          // In development, send to business@growmint.net but include user info in the subject
          // In production, send to the actual user
          const recipientEmail = isDevelopment ? 'business@growmint.net' : contactData.email;
          const emailSubject = isDevelopment 
            ? `[TEST] Thank You for Contacting GrowMint (would go to: ${contactData.email})` 
            : "Thank You for Contacting GrowMint";
          
          console.log(`Sending confirmation email to ${isDevelopment ? 'test email' : 'user'}: ${recipientEmail}`);
          
          const userEmailResult = await resend.emails.send({
            from: "Growmint <contact@growmint.net>",
            to: recipientEmail,
            subject: emailSubject,
            html: createUserEmailHTML(contactData),
            // Only add BCC in production mode
            ...(isDevelopment ? {} : { bcc: "business@growmint.net" }),
          });
          
          console.log('User email response:', JSON.stringify(userEmailResult));
        } catch (emailError) {
          console.error('Error sending emails:', emailError);
          // Continue execution even if email sending fails
        }
      }

      res.status(201).json({
        message: 'Message sent successfully', 
        success: true, 
        data: contactData
      });
    } catch (saveError) {
      console.error('Error saving to database:', saveError);
      res.status(500).json({
        success: false, 
        message: `Database save error: ${saveError.message}`
      });
    }
  } catch(error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false, 
      message: `Contact Controller: ${error.message}`
    });
  }
}

// Create admin notification email HTML
function createAdminEmailHTML(data) {
  const { name, email, phone, company, projectType, message } = data;
  
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6ebf1; border-radius: 5px; }
          h1 { color: #4CAF50; font-size: 24px; margin-bottom: 20px; }
          .divider { border-top: 1px solid #e6ebf1; margin: 20px 0; }
          .field { margin: 10px 0; }
          .field strong { display: inline-block; min-width: 80px; }
          .message { background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 5px; }
          .footer { font-style: italic; color: #666; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Contact Form Submission</h1>
          <div class="divider"></div>
          <div class="field"><strong>Name:</strong> ${name}</div>
          <div class="field"><strong>Email:</strong> ${email}</div>
          <div class="field"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
          <div class="field"><strong>Company:</strong> ${company || 'Not provided'}</div>
          <div class="field"><strong>Project:</strong> ${projectType || 'Not provided'}</div>
          <div class="field"><strong>Message:</strong></div>
          <div class="message">${message}</div>
          <div class="divider"></div>
          <div class="footer">This email was sent from the GrowMint website contact form.</div>
        </div>
      </body>
    </html>
  `;
}

// Create confirmation email for the user
function createUserEmailHTML(data) {
  const { name } = data;
  
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e6ebf1; border-radius: 5px; }
          h1 { color: #4CAF50; font-size: 24px; margin-bottom: 20px; }
          .divider { border-top: 1px solid #e6ebf1; margin: 20px 0; }
          p { margin: 10px 0; line-height: 1.5; }
          .footer { font-style: italic; color: #666; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You for Contacting GrowMint</h1>
          <div class="divider"></div>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
          <p>Our team typically responds within 24-48 business hours.</p>
          <div class="divider"></div>
          <p>Best regards,</p>
          <p><strong>The GrowMint Team</strong></p>
          <div class="footer">This is an automated confirmation email. Please do not reply to this message.</div>
        </div>
      </body>
    </html>
  `;
}