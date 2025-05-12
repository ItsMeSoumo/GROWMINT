import mongoose from 'mongoose';
import devModel from '../../models/dev.model.js';
import { resend } from '../../lib/resend.js';

// Create admin notification email HTML for dev inquiries
function createAdminEmailHTML(data) {
  const { name, email, phone, company, projectType, budget, message } = data;
  
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
          <h1>New Development Inquiry</h1>
          <div class="divider"></div>
          <div class="field"><strong>Name:</strong> ${name}</div>
          <div class="field"><strong>Email:</strong> ${email}</div>
          <div class="field"><strong>Phone:</strong> ${phone || 'Not provided'}</div>
          <div class="field"><strong>Company:</strong> ${company || 'Not provided'}</div>
          <div class="field"><strong>Project:</strong> ${projectType || 'Not provided'}</div>
          <div class="field"><strong>Budget:</strong> ${budget || 'Not provided'}</div>
          <div class="field"><strong>Message:</strong></div>
          <div class="message">${message}</div>
          <div class="divider"></div>
          <div class="footer">This email was sent from the GrowMint website development inquiry form.</div>
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
          <h1>Thank You for Your Development Inquiry</h1>
          <div class="divider"></div>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out about your development project. We have received your inquiry and will get back to you as soon as possible.</p>
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
    
    // Create contact document with explicit field assignment
    const devData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      company: req.body.company,
      projectType: req.body.projectType,
      budget: req.body.budget || '$10,000 - $50,000',
      message: req.body.message,
      createdAt: new Date()
    };
    
    console.log('Saving dev data:', devData);
    
    // Save to database using the dev model
    try {
      // Create a new dev model instance and save it
      const newDev = new devModel(devData);
      const savedDev = await newDev.save();
      console.log('Dev saved to database:', savedDev._id);
      
      // After successful DB save, try to send emails
      const emailResults = { admin: null, user: null, errors: [] };
      
      // Try to send admin notification email
      try {
        console.log('Sending admin notification email to business@growmint.net');
        const adminEmailResult = await resend.emails.send({
          from: "Growmint Contact <contact@growmint.net>",
          id: savedDev._id.toString(),
          to: "business@growmint.net",
          subject: "New Development Inquiry",
          html: createAdminEmailHTML(devData),
        });
        
        console.log('Admin email response:', JSON.stringify(adminEmailResult));
        emailResults.admin = adminEmailResult.data?.id || 'No ID returned';
      } catch (adminError) {
        console.error('Error sending admin email:', adminError);
        emailResults.errors.push(`Admin email: ${adminError.message}`);
      }
      
      // Try to send user confirmation email
      try {
        const recipientEmail = devData.email;
        const emailSubject = "Thank You for Your Development Inquiry";
        
        console.log(`Sending confirmation email to ${recipientEmail}`);
        
        const userEmailResult = await resend.emails.send({
          from: "Growmint <contact@growmint.net>",
          to: recipientEmail,
          subject: emailSubject,
          html: createUserEmailHTML(devData)
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
          ...devData,
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
      message: `Dev Controller: ${error.message}`
    });
  }
}