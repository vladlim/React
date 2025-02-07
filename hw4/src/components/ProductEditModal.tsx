import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Product } from '../models/Product';

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

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ open, onClose, product, onSave }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || '');
  const [quantity, setQuantity] = useState(String(product.quantity));
  const [price, setPrice] = useState(String(product.price));
  const [unit, setUnit] = useState(product.unit);
  const [image, setImage] = useState(product.image || '');

  useEffect(() => {
    setName(product.name);
    setDescription(product.description || '');
    setCategory(product.category || '');
    setQuantity(String(product.quantity));
    setPrice(String(product.price));
    setUnit(product.unit);
    setImage(product.image || '');
  }, [product]);

  const handleSave = () => {
    if (!name || !description || !category || !quantity || !price || !unit) {
      alert('Все поля обязательны для заполнения!');
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name,
      description,
      category,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      unit,
      image,
    };

    onSave(updatedProduct);
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Редактировать товар</DialogTitle>
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
            <StyledTextField
              label="Категория"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
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

export default ProductEditModal;
