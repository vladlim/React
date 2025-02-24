import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { Product } from '../../models/Product';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Category } from '../../features/categories/categorySlice';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onClick: (product: Product) => void;
}

const HoverCard = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  borderRadius: 8,
  border: '2px solid gold',
  transition: 'transform 0.3s, border-color 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#e6b800',
  },
}));

const TruncatedText = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.secondary.main,
}));

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onClick }) => {
  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  const categoryName = categories.find((cat) => cat._id === product.category)?.name || product.category;

  return (
    <Tooltip title={product.description || ''} arrow>
      <HoverCard onClick={() => onClick(product)}>
        <CardHeader
          title={
            <Typography variant="h6" color="secondary">
              {product.name}
            </Typography>
          }
          subheader={
            <TruncatedText variant="subtitle2">
              {product.category ? `Категория: ${categoryName}` : ''}
            </TruncatedText>
          }
          action={
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product._id);
              }}
              sx={{ color: 'gold' }}
            >
              <DeleteIcon />
            </IconButton>
          }
          sx={{ padding: 1 }}
        />
        {product.image ? (
          <CardMedia
            component="img"
            height="150"
            image={product.image}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              height: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <Typography variant="subtitle1" color="secondary">
              Изображение отсутствует
            </Typography>
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <TruncatedText variant="body2">{product.description}</TruncatedText>
          <Typography variant="body2" sx={{ mt: 1 }} color="secondary">
            <strong>Количество:</strong> {product.stock} шт.
          </Typography>
          <Typography variant="body2" color="secondary">
            <strong>Цена:</strong> {product.price} ₽
          </Typography>
        </CardContent>
      </HoverCard>
    </Tooltip>
  );
};

export default ProductCard;
