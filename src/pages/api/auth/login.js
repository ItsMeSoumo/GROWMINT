import { connectDB } from '@/dbConfig/dbConfig.js';
import User from '@/models/user.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    console.log(`Login attempt for email: ${email}`);
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    console.log(`User found with email: ${email}`);
    console.log(`Stored password hash length: ${user.password.length}`);
    
    // Compare passwords with detailed logging
    try {
      console.log(`Comparing provided password with stored hash`);
      const isMatch = await bcrypt.compare(password, user.password);
      
      console.log(`Password match result: ${isMatch}`);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // If we reach here, password matched
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          isVerified: user.isVerified
        }
      });
    } catch (compareError) {
      console.error('Password comparison error:', compareError);
      return res.status(500).json({ message: 'Error comparing passwords', error: compareError.message });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
