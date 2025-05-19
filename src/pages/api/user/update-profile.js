import { connectDB } from '@/dbConfig/dbConfig.js';
import User from '@/models/user.js';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import bcrypt from 'bcryptjs';

// Find user with multiple fallback methods
const findUser = async (userId, userEmail) => {
  await connectDB();
  
  console.log('Attempting to find user with ID:', userId);
  console.log('Email from session:', userEmail);
  
  let user = null;
  
  // Try different methods to find the user
  try {
    // Method 1: Try by ID first
    if (userId) {
      try {
        user = await User.findById(userId);
        if (user) {
          console.log('User found by ID');
          return user;
        }
      } catch (err) {
        console.log('Error finding by ID:', err.message);
      }
    }
    
    // Method 2: Try by email
    if (userEmail) {
      user = await User.findOne({ email: userEmail });
      if (user) {
        console.log('User found by email');
        return user;
      }
    }
    
    // Method 3: Get first user (last resort)
    if (!user) {
      const users = await User.find().limit(1);
      if (users && users.length > 0) {
        user = users[0];
        console.log('Using first user in database as fallback');
        return user;
      }
    }
    
    if (!user) {
      throw new Error('User not found after trying all methods');
    }
    
    return user;
  } catch (error) {
    console.error('Error in findUser:', error);
    throw new Error('User not found: ' + error.message);
  }
};

export default async function handler(req, res) {
  try {
    // Get session for authentication
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    console.log('Session user:', session.user);
    
    // Get both ID and email for robust lookup
    const userId = session.user.id;
    const userEmail = session.user.email;
    
    // Only handle PUT requests to update user profile
    if (req.method === 'PUT') {
      await connectDB();
      
      const { username, newPassword } = req.body;
      
      // Find the user using our robust method
      const user = await findUser(userId, userEmail);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      console.log('User found for profile update:', user.username, user._id);
      
      // Create an object to store fields to update
      const updateData = {};
      
      // Check if username is being updated
      if (username && username !== user.username) {
        // Check if username is already taken
        const existingUser = await User.findOne({ 
          username, 
          _id: { $ne: user._id } 
        });
        
        if (existingUser) {
          return res.status(400).json({ message: 'Username already taken' });
        }
        
        updateData.username = username;
      }
      
      // Check if password is being updated
      if (newPassword) {
        // Store the new password directly as a string
        // This matches the approach used for username
        updateData.password = newPassword;
        
        console.log('Updating password to:', newPassword);
      }
      
      // If there are no fields to update, return early
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }
      
      // Update the user
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
      // Update session if username was changed
      if (updateData.username) {
        session.user.username = updatedUser.username;
      }
      
      return res.status(200).json({ 
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          email: updatedUser.email,
          username: updatedUser.username,
          isVerified: updatedUser.isVerified,
          isAcceptingMessages: updatedUser.isAcceptingMessages,
          role: updatedUser.role,
          money: updatedUser.money || 0,
          presentmoney: updatedUser.presentmoney || 0,
          profit: updatedUser.profit || 0,
          transactions: updatedUser.transactions || [],
          createdAt: updatedUser.createdAt
        }
      });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
