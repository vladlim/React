import { verifyAccessToken } from './jwt';

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};