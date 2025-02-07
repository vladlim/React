import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice'; 
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

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    if (!name || !description || !category || !quantity || !price || !unit) {
      alert('Все поля обязательны для заполнения!');
      return;
    }
    const newProduct: Product = {
      id: Date.now(),
      name,
      description,
      category,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      unit,
      image: image || '',
    };

    dispatch(addProduct(newProduct));
    onClose();
    setName('');
    setDescription('');
    setCategory('');
    setQuantity('');
    setPrice('');
    setUnit('');
    setImage('');
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

export default ProductModal;
