import { connectDB } from '@/dbConfig/dbConfig.js';
import User from '@/models/user.js';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';

// Controller functions
const getUserData = async (userId) => {
  await connectDB();
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    isVerified: user.isVerified,
    isAcceptingMessages: user.isAcceptingMessages,
    role: user.role,
    money: user.money || 0,
    presentmoney: user.presentmoney || 0,
    profit: user.profit || 0,
    transactions: user.transactions || [],
    createdAt: user.createdAt
  };
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
    // Get the session token and verify authentication
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const session = await getServerSession(req, res, authOptions);
    
    if (!token || !session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const userId = token.id;
    
    // Only handle GET requests to fetch user data
    if (req.method === 'GET') {
      const userData = await getUserData(userId);
      
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
