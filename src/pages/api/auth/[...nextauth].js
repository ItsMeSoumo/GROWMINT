import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { connectDB } from "@/dbConfig/dbConfig.js"
import bcrypt from "bcryptjs"
import User from "@/models/user.js"

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }
        
        await connectDB();
        
        try {
          // Find user by email only (not username) to simplify login process
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Email not verified. Please verify your email first.");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          
          // Ensure money, presentmoney, and profit are set to 0 if they don't exist
          if (user.money === undefined) {
            user.money = 0;
            await user.save();
          }
          
          if (user.presentmoney === undefined) {
            user.presentmoney = 0;
            await user.save();
          }
          
          if (user.profit === undefined) {
            user.profit = 0;
            await user.save();
          }
          
          // Return only necessary user data
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            isAcceptingMessages: user.isAcceptingMessages,
            role: user.role,
            money: user.money,
            presentmoney: user.presentmoney,
            profit: user.profit,
            transactions: user.transactions || []
          };
        } catch (error) {
          console.log("NextAuth authorize error:", error);
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.money = user.money || 0;
        token.presentmoney = user.presentmoney || 0;
        token.profit = user.profit || 0;
        token.transactions = user.transactions || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          isVerified: token.isVerified,
          isAcceptingMessages: token.isAcceptingMessages,
          username: token.username,
          email: token.email,
          role: token.role,
          money: token.money || 0,
          presentmoney: token.presentmoney || 0,
          profit: token.profit || 0,
          transactions: token.transactions || []
        };
      }
      return session;
    }
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})