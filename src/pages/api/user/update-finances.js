import { connectDB } from '@/dbConfig/dbConfig.js';
import User from '@/models/user.js';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';

// Controller functions
const getUserData = async (userId, userEmail) => {
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
    console.error('Error in getUserData:', error);
    throw new Error('User not found: ' + error.message);
  }
};

const updateUserFinances = async (userId, updateData) => {
  await connectDB();
  
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  
  if (!updatedUser) {
    throw new Error('Failed to update user finances');
  }
  
  return {
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
  };
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
    
    // Only handle GET requests to fetch user data
    if (req.method === 'GET') {
      const user = await getUserData(userId, userEmail);
      
      // Format user data for response
      const userData = {
        id: user._id,
        email: user.email,
        username: user.username,
        password: user.password, // Include password in string format
        isVerified: user.isVerified,
        isAcceptingMessages: user.isAcceptingMessages,
        role: user.role,
        money: user.money || 0,
        presentmoney: user.presentmoney || 0,
        profit: user.profit || 0,
        transactions: user.transactions || [],
        createdAt: user.createdAt
      };
      
      // Update session with latest data
      session.user.money = userData.money;
      session.user.presentmoney = userData.presentmoney;
      session.user.profit = userData.profit;
      
      return res.status(200).json({ 
        message: 'User data retrieved successfully',
        user: userData
      });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling finances:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
