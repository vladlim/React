import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { generateAccessToken, generateRefreshToken } from '../auth/jwt';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const validPassword = await user.comparePassword(password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({ token: refreshToken, user: user._id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.cookie('refreshToken', refreshToken, { httpOnly: true });

  res.json({ message: 'Logged in successfully' });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(400).json({ error: 'No refresh token provided' });

  await RefreshToken.deleteOne({ token: refreshToken });

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.json({ message: 'Logged out successfully' });
};