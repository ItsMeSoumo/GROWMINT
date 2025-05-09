import mongoose from 'mongoose';
import contactModel from '../../models/contact.model.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB if not connected
    console.log('[DEBUG] Mongoose readyState before connect:', mongoose.connection.readyState);
    if (mongoose.connection.readyState !== 1) {
      // Make sure you have a MONGODB_URI in your .env file
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('[DEBUG] Mongoose connected! readyState:', mongoose.connection.readyState);
    } else {
      console.log('[DEBUG] Mongoose already connected. readyState:', mongoose.connection.readyState);
    }
    
    const newContact = new contactModel(req.body);      
    try {
      const savedContact = await newContact.save();
      console.log('Contact saved successfully:', savedContact);
      res.status(201).json({
        message: 'Message sent successfully', 
        success: true, 
        data: newContact
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