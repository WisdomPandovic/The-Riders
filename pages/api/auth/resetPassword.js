// pages/api/auth/resetPassword.js
import bcrypt from 'bcrypt';
import User from '../../../src/models/user';
import connectToDatabase from '../../../lib/mongodb';
// import connectDB from '../../../lib/connectDB';

export default async function handler(req, res) {
  await connectToDatabase();
  // await connectDB(); 

  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
}