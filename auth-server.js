const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to users database file
const USERS_DB_PATH = path.join(__dirname, 'users.json');

// Initialize users database if it doesn't exist
if (!fs.existsSync(USERS_DB_PATH)) {
  fs.writeFileSync(USERS_DB_PATH, JSON.stringify({ users: [] }, null, 2));
}

// Helper function to read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return { users: [] };
  }
}

// Helper function to write users to file
function writeUsers(usersData) {
  try {
    fs.writeFileSync(USERS_DB_PATH, JSON.stringify(usersData, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return emailRegex.test(email);
}

// SIGNUP Route
app.post('/auth/signup', (req, res) => {
  console.log('Signup request received:', req.body);
  
  const { Fullname, Email, passwordd, name, email, password, fullName } = req.body;
  
  // Extract the actual values (handle multiple field name variations)
  const actualFullname = Fullname || name || fullName;
  const actualEmail = Email || email;
  const actualPassword = passwordd || password;
  
  console.log('Extracted values:', { actualFullname, actualEmail, actualPassword });
  
  // Validation
  if (!actualFullname || !actualEmail || !actualPassword) {
    console.log('Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'All fields are required (Fullname, Email, Password)'
    });
  }
  
  if (!isValidEmail(actualEmail)) {
    console.log('Invalid email format');
    return res.status(400).json({
      success: false,
      message: 'Please use a valid @gmail.com email address'
    });
  }
  
  if (actualPassword.length < 6) {
    console.log('Password too short');
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }
  
  // Read existing users
  const usersData = readUsers();
  
  // Check if user already exists
  const existingUser = usersData.users.find(user => 
    user.Email.toLowerCase() === actualEmail.toLowerCase()
  );
  
  if (existingUser) {
    console.log('User already exists');
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    Fullname: actualFullname,
    Email: actualEmail,
    passwordd: actualPassword, // In production, this should be hashed
    createdAt: new Date().toISOString()
  };
  
  // Add user to database
  usersData.users.push(newUser);
  
  if (writeUsers(usersData)) {
    console.log('User created successfully:', newUser.Email);
    
    // Return success response (don't send password back)
    const { passwordd: _, ...userResponse } = newUser;
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userResponse,
      token: `token_${newUser.id}` // Simple token for demo
    });
  } else {
    console.log('Error saving user');
    res.status(500).json({
      success: false,
      message: 'Error creating account. Please try again.'
    });
  }
});

// LOGIN Route
app.post('/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { Fullname, passwordd, username, password } = req.body;
  
  // Extract the actual values (handle multiple field name variations)
  const actualFullname = Fullname || username;
  const actualPassword = passwordd || password;
  
  console.log('Login attempt for:', actualFullname);
  
  // Validation
  if (!actualFullname || !actualPassword) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }
  
  // Read users
  const usersData = readUsers();
  
  // Find user by fullname
  const user = usersData.users.find(u => 
    u.Fullname.toLowerCase() === actualFullname.toLowerCase()
  );
  
  if (!user) {
    console.log('User not found:', actualFullname);
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
  
  // Check password (in production, compare hashed passwords)
  if (user.passwordd !== actualPassword) {
    console.log('Invalid password for user:', actualFullname);
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
  
  // Login successful
  console.log('Login successful for:', user.Email);
  const { passwordd: _, ...userResponse } = user;
  
  res.json({
    success: true,
    message: 'Login successful',
    user: userResponse,
    token: `token_${user.id}`
  });
});

// Get all users (for debugging - remove in production)
app.get('/auth/users', (req, res) => {
  const usersData = readUsers();
  const usersWithoutPasswords = usersData.users.map(({ passwordd, ...user }) => user);
  res.json(usersWithoutPasswords);
});

// Health check
app.get('/auth/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Authentication server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Authentication server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/auth/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/auth/users`);
});

module.exports = app;
