import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Category, addCategory, removeCategory, updateCategory } from '../features/categories/categorySlice';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryModal from '../components/CategoryModal';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  padding: theme.spacing(3),
  borderRadius: 8,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: '#e6b800',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const CategoryManagementPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Category | undefined>(undefined);

  const handleAddClick = () => {
    setEditData(undefined);
    setModalOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setEditData(category);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    dispatch(removeCategory(id));
  };

  const handleModalSave = (category: Category) => {
    if (editData) {
      dispatch(updateCategory(category));
    } else {
      dispatch(addCategory(category));
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <StyledPaper elevation={3}>
        <Stack spacing={2}>
          <Typography variant="h4" align="center" color="secondary">
            Управление категориями товаров
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton variant="contained" onClick={handleAddClick}>
              Добавить категорию
            </StyledButton>
          </Box>
          <StyledDivider />
          <List>
            {categories.map((cat) => (
              <ListItem
                key={cat.id}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton edge="end" onClick={() => handleEditClick(cat)}>
                      <EditIcon sx={{ color: 'gold' }} />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteClick(cat.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Stack>
                }
              >
                <StyledListItemText primary={cat.name} secondary={`ID: ${cat.id}`} />
              </ListItem>
            ))}
          </List>
        </Stack>
      </StyledPaper>
      <CategoryModal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        initialData={editData}
      />
    </Container>
  );
};

export default CategoryManagementPage;
