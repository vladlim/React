import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  unit: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title={product.description} placement="top" arrow>
        <Card onClick={handleOpenDialog} sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {product.quantity} {product.unit}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {product.category}
            </Typography>
          </CardContent>
        </Card>
      </Tooltip>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{product.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{product.description}</Typography>
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.name}
          />
          <Typography variant="body2" color="textSecondary">
            {product.quantity} {product.unit}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {product.category}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
