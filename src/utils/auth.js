import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcryptjs
 * @param {string} password - The plain text password to hash
 * @param {number} saltRounds - Number of salt rounds (default: 10)
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password to compare
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - True if passwords match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    // Log details for debugging
    console.log(`Password comparison:
      - Plain password length: ${password.length}
      - Hashed password length: ${hashedPassword.length}
    `);
    
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

/**
 * Check if a string is a valid bcrypt hash
 * @param {string} hash - The string to check
 * @returns {boolean} - True if it's a valid bcrypt hash, false otherwise
 */
export const isValidBcryptHash = (hash) => {
  // bcrypt hashes start with $2a$, $2b$, or $2y$ and are typically 60 characters long
  const bcryptPattern = /^\$2[aby]\$\d+\$.{53}$/;
  return bcryptPattern.test(hash);
};

/**
 * Debug password comparison issues
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password from the database
 */
export const debugPasswordComparison = async (password, hashedPassword) => {
  console.log('=== Password Debug Information ===');
  console.log(`Plain password: ${password}`);
  console.log(`Hashed password: ${hashedPassword}`);
  console.log(`Is valid bcrypt hash: ${isValidBcryptHash(hashedPassword)}`);
  
  try {
    // Create a new hash of the same password for comparison
    const newHash = await hashPassword(password);
    console.log(`New hash of same password: ${newHash}`);
    console.log(`New hash is valid: ${isValidBcryptHash(newHash)}`);
    
    // Try comparing with both the original hash and the new hash
    const matchesOriginal = await bcrypt.compare(password, hashedPassword);
    const matchesNew = await bcrypt.compare(password, newHash);
    
    console.log(`Matches original hash: ${matchesOriginal}`);
    console.log(`Matches new hash: ${matchesNew}`);
    
    return {
      isValidHash: isValidBcryptHash(hashedPassword),
      matchesOriginal,
      matchesNew
    };
  } catch (error) {
    console.error('Error in debug password comparison:', error);
    return {
      error: error.message,
      isValidHash: isValidBcryptHash(hashedPassword),
      matchesOriginal: false,
      matchesNew: false
    };
  }
};
