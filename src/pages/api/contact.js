import mongoose from 'mongoose';
import contactModel from '../../models/contact.model.js';
import { resend } from '../../lib/resend';

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
      message: req.body.message
    };
    
    console.log('Saving contact data:', contactData);
    
    // Try a more direct approach - save directly to the database
    try {
      // Use the model but save directly to ensure all fields are included
      const result = await mongoose.connection.db.collection('contact').insertOne(contactData);
      console.log('Contact saved directly to DB:', result);
      
      // Send email notification
      try {
        const { name, email, message } = contactData;
        
        // Create HTML email content
        const htmlContent = `
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
                <div class="field"><strong>Message:</strong></div>
                <div class="message">${message}</div>
                <div class="divider"></div>
                <div class="footer">This email was sent from the GrowMint website contact form.</div>
              </div>
            </body>
          </html>
        `;
        
        // Send email using Resend
        await resend.emails.send({
          from: "Growmint Contact <onboarding@resend.dev>",
          to: "business@growmint.net",
          subject: "New Contact Form Submission",
          html: htmlContent,
        });
        
        console.log('Email notification sent successfully');
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Error sending email notification:', emailError);
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