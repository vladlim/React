import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Pagination, Grid, Typography, Box } from '@mui/material';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  image: string;
}

interface ProductListProps {
  filters: {
    productName: string;
    inStock: boolean;
    category: string;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: 'Товар 1',
    description: 'Описание товара 1',
    category: 'Категория 1',
    quantity: 10,
    unit: 'шт.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Товар 2',
    description: 'Описание товара 2',
    category: 'Категория 2',
    quantity: 20,
    unit: 'шт.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'MacBook 16',
    description: 'MacBook — ультратонкие ноутбуки от Apple, которые отличаются стильным дизайном и высокой производительностью.',
    category: 'Ноутбуки',
    quantity: 20,
    unit: 'шт.',
    image: 'https://via.placeholder.com/150',
  },
];

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = products;

      if (filters.productName) {
        const regex = new RegExp(filters.productName, 'i');
        updatedProducts = updatedProducts.filter(product => regex.test(product.name));
      }

      if (filters.inStock) {
        updatedProducts = updatedProducts.filter(product => product.quantity > 0);
      }

      if (filters.category) {
        updatedProducts = updatedProducts.filter(product => product.category === filters.category);
      }

      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [filters]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      sx={{
        minHeight: '94vh', 
        minWidth: '96vh',
        marginLeft: '50vw', 
        transform: 'translateX(-50%)', 
        fontSize: '1.5rem',
        width: '80%',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Список товаров
      </Typography>
      <Grid container spacing={10} justifyContent="center">
        {currentProducts.map((product) => (
          <Grid item xs={12  } sm={6} md={4} key={product.id}>
            <Box maxWidth="600px" width="100%">
              <ProductCard product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box marginTop="20px" display="flex" justifyContent="center" width="100%">
        <Pagination 
          count={Math.ceil(filteredProducts.length / itemsPerPage)} 
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductList;
