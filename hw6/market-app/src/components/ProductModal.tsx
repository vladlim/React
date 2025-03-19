import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Product } from "../models/Product";
import { Category } from "../features/categories/categorySlice";

const API_URL = "http://localhost:5000/api"; 

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.secondary.main,
    '& fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.9)' },
    '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: '#e6b800', 
  },
}));

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newProduct: Omit<Product, "_id">) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState('');
  
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (open) {
      fetch(`${API_URL}/categories`)
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error('Ошибка загрузки категорий:', err));
    }
  }, [open]);

  const handleSave = () => {
    if (!name || !description || !categoryName || !quantity || !price) {
      alert("Все поля обязательны!");
      return;
    }
    
    const selectedCategory = categories.find((cat) => cat.name === categoryName);
    if (!selectedCategory) {
      alert("Выберите корректную категорию");
      return;
    }
  
    const newProduct = {
      name,
      description: description || "",
      category: selectedCategory._id, 
      stock: parseInt(quantity, 10),
      price: parseFloat(price),
      image: image || "",
    };
  
    onSave(newProduct);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Добавить товар</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <StyledTextField
              label="Название товара"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              label="Описание"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="category-select-label" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Категория
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={categoryName}
                label="Категория"
                onChange={(e) => setCategoryName(e.target.value)}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.7)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.9)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <StyledTextField
              label="Количество"
              fullWidth
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <StyledTextField
              label="Цена"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <StyledTextField
              label="Единица измерения"
              fullWidth
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <StyledTextField
              label="Изображение (URL)"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'white' }}>
          Отмена
        </Button>
        <StyledButton variant="contained" onClick={handleSave}>
          Сохранить
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ProductModal;
