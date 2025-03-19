import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/marketDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Category = mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: null },
});
const Product = mongoose.model('Product', ProductSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  group: { type: String, enum: ['admin', 'user'], default: 'user' },
  avatar: { type: String, default: null },
});
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', UserSchema);

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
});
const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

const ACCESS_TOKEN_SECRET = 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret';

const generateAccessToken = (user) => {
  return jwt.sign(
    { username: user.username, email: user.email, group: user.group, avatar: user.avatar },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/api/auth/login', async (req, res) => {
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
});

app.post('/api/auth/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(400).json({ error: 'No refresh token provided' });

  await RefreshToken.deleteOne({ token: refreshToken });

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.json({ message: 'Logged out successfully' });
});

app.post('/api/categories', authenticateJWT, async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Название категории обязательно для заполнения' });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

app.get('/api/categories', authenticateJWT, async (_req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

app.put('/api/categories/:id', authenticateJWT, async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Название категории обязательно для заполнения' });
    }
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/categories/:id', authenticateJWT, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

app.post('/api/products', authenticateJWT, async (req, res, next) => {
  try {
    const { name, description, category, stock, price, image } = req.body;
    if (!name || !description || !category || stock === undefined || price === undefined) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Категория не найдена' });
    }
    const product = new Product({
      name,
      description,
      category,
      stock,
      price,
      image: image || null,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

app.get('/api/products', authenticateJWT, async (_req, res, next) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    next(error);
  }
});

app.get('/api/products/:id', authenticateJWT, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

app.put('/api/products/:id', authenticateJWT, async (req, res, next) => {
  try {
    const { name, description, category, stock, price, image } = req.body;
    if (!name || !description || !category || stock === undefined || price === undefined) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    const catExists = await Category.findById(category);
    if (!catExists) {
      return res.status(400).json({ error: 'Категория не найдена' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, stock, price, image },
      { new: true, runValidators: true }
    ).populate('category');
    if (!updatedProduct) return res.status(404).json({ error: 'Товар не найден' });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/products/:id', authenticateJWT, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json({ message: 'Товар удалён' });
  } catch (error) {
    next(error);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});