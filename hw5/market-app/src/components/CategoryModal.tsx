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
import { Category } from '../features/categories/categorySlice';

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

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  initialData?: Category;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData ? initialData.name : '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName('');
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Название категории обязательно');
      return;
    }
  
    const newCategory: Category = initialData
      ? { ...initialData, name: name.trim() }
      : { _id: name.trim().toLowerCase().replace(/\s+/g, '-'), name: name.trim() };
  
    onSave(newCategory);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? 'Редактировать категорию' : 'Добавить категорию'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <StyledTextField
              label="Название категории"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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

export default CategoryModal;
