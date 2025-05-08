import mongoose from 'mongoose';
import contactModel from '../../models/contact.model.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      // Check for MongoDB URI
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        console.error('MONGODB_URI environment variable is not set');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error: Database connection string not provided'
        });
      }
      
      // Connect to MongoDB
      try {
        await mongoose.connect(mongoUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (connError) {
        console.error('MongoDB connection error:', connError);
        return res.status(500).json({
          success: false,
          message: 'Failed to connect to database. Please try again later.'
        });
      }
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