import { connectDB } from '@/dbConfig/dbConfig.js';
import User from '@/models/user.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { email, password, username } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });
    
    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email 
          ? 'Email already exists' 
          : 'Username already exists'
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user with explicit default values
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: true, // Auto-verify for now, you can implement email verification later
      money: 0,
      profit: 0,
      transactions: []
    });
    
    // Explicitly set presentmoney field
    newUser.presentmoney = 0;
    
    // Log the user object before saving
    console.log('New user before save:', {
      money: newUser.money,
      presentmoney: newUser.presentmoney,
      profit: newUser.profit,
      hasTransactions: Array.isArray(newUser.transactions)
    });
    
    // Save the user to the database
    await newUser.save();
    
    // Force set the values if they're still undefined
    if (newUser.money === undefined) {
      newUser.money = 0;
    }
    
    if (newUser.presentmoney === undefined) {
      newUser.presentmoney = 0;
    }
    
    if (newUser.profit === undefined) {
      newUser.profit = 0;
    }
    
    if (!Array.isArray(newUser.transactions)) {
      newUser.transactions = [];
    }
    
    // Save again if needed
    if (newUser.money === undefined || newUser.presentmoney === undefined || newUser.profit === undefined || !Array.isArray(newUser.transactions)) {
      await newUser.save();
    }
    
    // Verify the saved user has the financial fields
    const savedUser = await User.findById(newUser._id).lean();
    console.log('Saved user financial data:', {
      money: savedUser.money,
      presentmoney: savedUser.presentmoney,
      profit: savedUser.profit,
      hasTransactions: Array.isArray(savedUser.transactions)
    });
    
    // Use the savedUser data to ensure we're returning the actual values from the database
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        money: newUser.money || 0, // Ensure default value if still undefined
        presentmoney: newUser.presentmoney || 0, // Ensure default value if still undefined
        profit: newUser.profit || 0, // Ensure default value if still undefined
        transactions: Array.isArray(newUser.transactions) ? newUser.transactions : []
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
