import mongoose from 'mongoose';
import contactModel from '../../models/contact.model.js';
import { resend } from '../../lib/resend.js';

// Create admin notification email HTML
function createAdminEmailHTML(data) {
  const { name, email, phone, company, projectType, message } = data;
  
  return `
    <html>
      <head>
        <style>
          body { font-family: 'Georgia', serif; margin: 0; padding: 0; color: #333; background-color: #f9f9f9; }
          .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
          .header { background-color: #2c3e50; padding: 25px; text-align: center; }
          .logo { font-family: 'Times New Roman', serif; color: #ffffff; font-size: 28px; letter-spacing: 1px; font-weight: bold; }
          .content { padding: 30px 40px; }
          h1 { color: #2c3e50; font-size: 26px; margin-bottom: 25px; font-weight: normal; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
          .divider { border-top: 1px solid #e0e0e0; margin: 25px 0; }
          .field { margin: 15px 0; font-size: 16px; line-height: 1.6; }
          .field strong { display: inline-block; min-width: 100px; color: #2c3e50; }
          .message { background-color: #f9f9f9; padding: 20px; border-left: 4px solid #2c3e50; margin-top: 10px; line-height: 1.6; }
          .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #777; font-size: 14px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">GROWMINT</div>
          </div>
          <div class="content">
            <h1>New Contact Form Submission</h1>
            <div class="field"><strong>Name:</strong> ${name}</div>
            <div class="field"><strong>Email:</strong> ${email}</div>
            <div class="field"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
            <div class="field"><strong>Company:</strong> ${company || 'Not provided'}</div>
            <div class="field"><strong>Project:</strong> ${projectType || 'Not provided'}</div>
            <div class="field"><strong>Message:</strong></div>
            <div class="message">${message}</div>
          </div>
          <div class="footer">
            This email was sent from the GrowMint website contact form.<br>
            &copy; ${new Date().getFullYear()} GrowMint. All rights reserved.
          </div>
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
          body { font-family: 'Georgia', serif; margin: 0; padding: 0; color: #333; background-color: #f9f9f9; }
          .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
          .header { background-color: #2c3e50; padding: 25px; text-align: center; }
          .logo { font-family: 'Times New Roman', serif; color: #ffffff; font-size: 28px; letter-spacing: 1px; font-weight: bold; }
          .content { padding: 30px 40px; }
          h1 { color: #2c3e50; font-size: 26px; margin-bottom: 25px; font-weight: normal; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
          .divider { border-top: 1px solid #e0e0e0; margin: 25px 0; }
          p { margin: 15px 0; font-size: 16px; line-height: 1.8; color: #444; }
          .signature { margin-top: 30px; }
          .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #777; font-size: 14px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">GROWMINT</div>
          </div>
          <div class="content">
            <h1>Thank You for Contacting GrowMint</h1>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to GrowMint. We have received your message and appreciate your interest in our services.</p>
            <p>Our team of experts is reviewing your request and will get back to you as soon as possible with a personalized response. We typically respond within 24-48 business hours.</p>
            <p>If you have any urgent questions in the meantime, please don't hesitate to contact us directly.</p>
            <div class="signature">
              <p>Warm regards,</p>
              <p><strong>The GrowMint Team</strong></p>
            </div>
          </div>
          <div class="footer">
            This is an automated confirmation email. Please do not reply to this message.<br>
            &copy; ${new Date().getFullYear()} GrowMint. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
}

// Main API handler
export default async function handler(req, res) {
  // Log the request method to help debug the 405 issue
  console.log('Request method:', req.method);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    console.log('Received form data:', req.body);

    // Create contact document with explicit field assignment
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      company: req.body.company || '',
      projectType: req.body.projectType || '',
      message: req.body.message || '',
      createdAt: new Date()
    };
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields' 
      });
    }
    
    console.log('Saving contact data:', contactData);
    
    try {
      // FIRST APPROACH: Save directly to MongoDB collection (more reliable)
      const result = await mongoose.connection.db.collection('contacts').insertOne(contactData);
      console.log('Contact saved directly to DB:', result);
      
      // SECOND APPROACH: Try to use Mongoose model as backup (if first approach fails)
      // This is just for redundancy and can be removed if causing issues
      try {
        const newContact = new contactModel(contactData);
        await newContact.save();
      } catch (modelError) {
        console.log('Mongoose model save failed, but direct DB insert succeeded:', modelError);
        // We can ignore this error since we already saved to the DB directly
      }
      
      // After successful DB save, try to send emails
      const emailResults = { admin: null, user: null, errors: [] };
      
      // Determine if we're in development mode
      // const isDevelopment = process.env.NODE_ENV !== 'production';
      
      // Try to send admin notification email
      try {
        console.log('Sending admin notification email to business@growmint.net');
        const adminEmailResult = await resend.emails.send({
          from: "Growmint Contact <contact@growmint.net>",
          to: "business@growmint.net",
          subject: "New Contact Form Submission",
          html: createAdminEmailHTML(contactData),
        });
        
        console.log('Admin email response:', JSON.stringify(adminEmailResult));
        emailResults.admin = adminEmailResult.data?.id || 'No ID returned';
      } catch (adminError) {
        console.error('Error sending admin email:', adminError);
        emailResults.errors.push(`Admin email: ${adminError.message}`);
      }
      
      // Try to send user confirmation email
      try {
        // In development, send to business@growmint.net but include user info in the subject
        // In production, send to the actual user
        const recipientEmail = contactData.email;
        const emailSubject = "Thank You for Contacting GrowMint";
        
        console.log(`Sending confirmation email to ${recipientEmail}`);
        
        const userEmailResult = await resend.emails.send({
          from: "Growmint <contact@growmint.net>",
          to: recipientEmail,
          subject: emailSubject,
          html: createUserEmailHTML(contactData)
          // Removed BCC to admin as requested
        });
        
        console.log('User email response:', JSON.stringify(userEmailResult));
        emailResults.user = userEmailResult.data?.id || 'No ID returned';
      } catch (userError) {
        console.error('Error sending user email:', userError);
        emailResults.errors.push(`User email: ${userError.message}`);
      }
      
      // Return success response regardless of email sending status
      return res.status(201).json({
        success: true, 
        message: 'Message sent successfully',
        data: { 
          id: result.insertedId.toString(),
          emailsSent: {
            admin: emailResults.admin ? true : false,
            user: emailResults.user ? true : false
          }
        }
      });
    } catch (saveError) {
      console.error('Error saving to database:', saveError);
      return res.status(500).json({
        success: false, 
        message: `Database save error: ${saveError.message}`
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false, 
      message: `Server error: ${error.message}`
    });
  }
}