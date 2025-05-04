import { useState, createContext, useContext, useEffect } from "react";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

// Create Authentication Context
export const AuthContext = createContext(null);

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('growmint_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user data");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('growmint_user', JSON.stringify(userData));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('growmint_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </AuthProvider>
  );
}
