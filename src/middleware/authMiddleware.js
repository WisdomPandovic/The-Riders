import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const tokenData = token.split(' ');
    if (tokenData.length !== 2 || tokenData[0] !== 'Bearer') {
      throw new Error('Invalid token format');
    }

    const decoded = jwt.verify(tokenData[1], SECRET_KEY);
    req.user = decoded;
    console.log('Decoded token:', decoded); // Debug log to check decoded token
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
      console.log('User role:', req.user ? req.user.role : 'No user'); // Debug log to check user role
      return res.status(403).json({ message: 'Access denied, admin role required' });
    }
    next();
  };