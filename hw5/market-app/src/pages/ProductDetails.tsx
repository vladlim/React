import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeProduct, editProduct } from '../features/products/productSlice';
import { Product } from '../models/Product';
import ProductEditModal from '../components/ProductEditModal';
import {
  Container,
  Button,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Stack,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Category } from '../features/categories/categorySlice';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  borderRadius: 8,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: '#e6b800',
  },
}));

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p._id === id)
  );
  const categories = useSelector((state: RootState) => state.categories.categories) as Category[];
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" color="secondary">
          Товар не найден
        </Typography>
      </Container>
    );
  }

  const categoryName = categories.find((cat) => cat._id === product.category)?.name || product.category;

  const handleDelete = () => {
    dispatch(removeProduct(product._id));
    navigate('/');
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    dispatch(editProduct({ id: product._id, product: updatedProduct }));
    setEditModalOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <StyledCard elevation={4}>
        <CardHeader
          title={
            <Typography variant="h5" component="div" color="secondary">
              {product.name}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle1" color="secondary">
              {categoryName}
            </Typography>
          }
          sx={{ pb: 0 }}
        />
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
        {product.image && (
          <CardMedia
            component="img"
            height="250"
            image={product.image}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2, color: 'secondary' }}>
            {product.description}
          </Typography>
          <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Typography variant="body2" color="secondary">
              <strong>Количество:</strong> {product.stock} шт.
            </Typography>
            <Typography variant="body2" color="secondary">
              <strong>Цена:</strong> {product.price} ₽
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <StyledButton variant="contained" onClick={handleEdit}>
              Редактировать товар
            </StyledButton>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Удалить товар
            </Button>
          </Stack>
        </CardContent>
      </StyledCard>
      
      {editModalOpen && (
        <ProductEditModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          product={product}
          onSave={handleUpdateProduct}
        />
      )}
    </Container>
  );
};

export default ProductDetails;
