import mongoose from 'mongoose';
import smmModel from '../../models/smm.model.js';
import { resend } from '../../lib/resend.js';

// Create admin notification email HTML for SMM inquiries
function createAdminEmailHTML(data) {
  const { name, email, phone, company, platforms, goals, message } = data;
  
  // Format platforms array as a list if it exists
  const platformsList = Array.isArray(platforms) && platforms.length > 0 
    ? platforms.map(p => `<li>${p}</li>`).join('') 
    : 'Not specified';
  
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
          ul { margin-top: 5px; margin-bottom: 5px; }
          .footer { font-style: italic; color: #666; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Social Media Marketing Inquiry</h1>
          <div class="divider"></div>
          <div class="field"><strong>Name:</strong> ${name}</div>
          <div class="field"><strong>Email:</strong> ${email}</div>
          <div class="field"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
          <div class="field"><strong>Company:</strong> ${company || 'Not provided'}</div>
          <div class="field"><strong>Platforms:</strong></div>
          <div class="message">
            ${typeof platformsList === 'string' ? platformsList : `<ul>${platformsList}</ul>`}
          </div>
          <div class="field"><strong>Goals:</strong></div>
          <div class="message">${goals || 'Not provided'}</div>
          <div class="field"><strong>Message:</strong></div>
          <div class="message">${message || 'Not provided'}</div>
          <div class="divider"></div>
          <div class="footer">This email was sent from the GrowMint website SMM inquiry form.</div>
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
          <h1>Thank You for Your Social Media Marketing Inquiry</h1>
          <div class="divider"></div>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out about your social media marketing needs. We have received your inquiry and will get back to you as soon as possible.</p>
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
    
    // Create SMM form data document with explicit field assignment
    const smmData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      company: req.body.company || '',
      platforms: req.body.platforms || [],
      goals: req.body.goals || '',
      message: req.body.message || '',
      createdAt: new Date()
    };
    
    console.log('Saving SMM data:', smmData);
    
    // Try a more direct approach - save directly to the database
    try {
      // Use the model but save directly to ensure all fields are included
      // Create a new smm model instance and save it
      const newSmm = new smmModel(smmData);
      const savedSmm = await newSmm.save();
      console.log('SMM data saved to database:', savedSmm._id);
      
      // After successful DB save, try to send emails
      const emailResults = { admin: null, user: null, errors: [] };
      
      // Try to send admin notification email
      try {
        console.log('Sending admin notification email to business@growmint.net');
        const adminEmailResult = await resend.emails.send({
          from: "Growmint Contact <contact@growmint.net>",
          to: "business@growmint.net",
          subject: "New Social Media Marketing Inquiry",
          html: createAdminEmailHTML(smmData),
        });
        
        console.log('Admin email response:', JSON.stringify(adminEmailResult));
        emailResults.admin = adminEmailResult.data?.id || 'No ID returned';
      } catch (adminError) {
        console.error('Error sending admin email:', adminError);
        emailResults.errors.push(`Admin email: ${adminError.message}`);
      }
      
      // Try to send user confirmation email
      try {
        const recipientEmail = smmData.email;
        const emailSubject = "Thank You for Your Social Media Marketing Inquiry";
        
        console.log(`Sending confirmation email to ${recipientEmail}`);
        
        const userEmailResult = await resend.emails.send({
          from: "Growmint <contact@growmint.net>",
          to: recipientEmail,
          subject: emailSubject,
          html: createUserEmailHTML(smmData)
        });
        
        console.log('User email response:', JSON.stringify(userEmailResult));
        emailResults.user = userEmailResult.data?.id || 'No ID returned';
      } catch (userError) {
        console.error('Error sending user email:', userError);
        emailResults.errors.push(`User email: ${userError.message}`);
      }
      
      res.status(201).json({
        message: 'Message sent successfully', 
        success: true, 
        data: {
          ...smmData,
          emailsSent: {
            admin: emailResults.admin ? true : false,
            user: emailResults.user ? true : false
          }
        }
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
      message: `SMM Controller: ${error.message}`
    });
  }
}