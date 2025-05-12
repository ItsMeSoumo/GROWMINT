import mongoose from 'mongoose';
import contactModel from '../../models/contact.model';
import { resend } from '../../lib/resend';

// Controller for database operations
const dbController = {
  async saveContact(contactData) {
    try {
      const newContact = new contactModel(contactData);
      const savedContact = await newContact.save();
      console.log('Contact saved to database:', savedContact._id);
      return { success: true, contactId: savedContact._id };
    } catch (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to save contact: ${error.message}`);
    }
  }
};

// Controller for email operations
const emailController = {
  // Create admin notification email HTML
  createAdminEmailHTML(data) {
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
  },
  
  // Create confirmation email for the user
  createUserEmailHTML(data) {
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
  },
  
  // Send emails to both admin and user
  async sendEmails(contactData) {
    const results = { admin: null, user: null, errors: [] };
    
    // Determine if we're in development mode
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    try {
      // 1. Send notification to admin
      console.log('Sending admin notification email to business@growmint.net');
      const adminEmailResult = await resend.emails.send({
        from: "Growmint Contact <contact@growmint.net>",
        to: "business@growmint.net",
        subject: "New Contact Form Submission",
        html: this.createAdminEmailHTML(contactData),
      });
      
      console.log('Admin email response:', JSON.stringify(adminEmailResult));
      results.admin = adminEmailResult.data?.id || 'No ID returned';
      console.log('Admin email sent:', results.admin);
    } catch (adminError) {
      console.error('Error sending admin email:', adminError);
      results.errors.push(`Admin email: ${adminError.message}`);
    }
    
    // Send user email in a separate try/catch to ensure it runs even if admin email fails
    try {
      // 2. Send confirmation to user
      
      // IMPORTANT: Resend in test mode only allows sending to your verified email
      // For production: Verify your domain at resend.com/domains and change the 'from' address
      // to use your verified domain (e.g., contact@growmint.net)
      
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
        html: this.createUserEmailHTML(contactData),
        // Only add BCC in production mode
        ...(isDevelopment ? {} : { bcc: "business@growmint.net" }),
      });
      
      console.log('User email response:', JSON.stringify(userEmailResult));
      results.user = userEmailResult.data?.id || 'No ID returned';
      
      if (isDevelopment) {
        console.log(`Test confirmation email sent to ${recipientEmail} (would go to ${contactData.email} in production)`);
      } else {
        console.log(`User confirmation email sent to ${recipientEmail}`);
      }
    } catch (userError) {
      console.error('Error sending user email:', userError);
      results.errors.push(`User email: ${userError.message}`);
    }
    
    return results;
  }
};

// Main API handler
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    // Extract form data from request body
    const { name, email, phone = '', company, projectType, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields' 
      });
    }
    
    // Prepare contact data
    const contactData = { name, email, phone, company, projectType, message };
    
    try {
      // 1. Save to database
      const dbResult = await dbController.saveContact(contactData);
      
      // 2. Send emails
      const emailResults = await emailController.sendEmails(contactData);
      
      // 3. Return success response
      return res.status(201).json({
        success: true, 
        message: 'Message sent successfully',
        data: { 
          id: dbResult.contactId,
          emailsSent: {
            admin: emailResults.admin ? true : false,
            user: emailResults.user ? true : false
          }
        }
      });
    } catch (error) {
      console.error('Operation error:', error);
      return res.status(500).json({
        success: false, 
        message: error.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false, 
      message: 'Server error occurred'
    });
  }
}