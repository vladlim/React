import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/marketDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
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

const router = express.Router();

router.post('/categories', async (req, res, next) => {
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

router.get('/categories', async (_req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.put('/categories/:id', async (req, res, next) => {
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

router.delete('/categories/:id', async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

router.post('/products', async (req, res, next) => {
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

router.get('/products', async (_req, res, next) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/products/:id', async (req, res, next) => {
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

router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json({ message: 'Товар удалён' });
  } catch (error) {
    next(error);
  }
});

app.use('/api', router);

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
