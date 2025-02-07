import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
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
import { removeProduct, updateProduct } from '../features/products/productSlice';
import { Product } from '../models/Product';
import ProductEditModal from '../components/ProductEditModal';

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
  const productId = Number(id);
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === productId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleDelete = () => {
    dispatch(removeProduct(product.id));
    navigate('/');
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
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
              {product.category}
            </Typography>
          }
          sx={{ pb: 0 }}
        />
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
        {product.image && (
          <CardMedia
            component="img"
            height="350"
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
              <strong>Количество:</strong> {product.quantity} {product.unit}
            </Typography>
            <Typography variant="body2" color="secondary">
              <strong>Цена:</strong> {product.price}
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
