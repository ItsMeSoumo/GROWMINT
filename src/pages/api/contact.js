import mongoose from 'mongoose';
import contactModel from '../../models/contact.model.js';

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