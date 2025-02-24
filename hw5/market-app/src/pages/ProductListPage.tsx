import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductModal from "../components/ProductModal";
import { addProduct, loadProducts, Product, removeProduct } from "../features/products/productSlice";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FilterValues } from "../components/SidebarMenu/SideBarMenu";
import { useNavigate } from "react-router-dom";

interface ProductListPageProps {
  filters: FilterValues;
}

const StyledPage = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  color: theme.palette.secondary.main,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  width: "100%",
  maxWidth: "lg",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.secondary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "#e6b800",
  },
  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const ProductListPage: React.FC<ProductListPageProps> = ({ filters }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    let matches = true;
    if (filters.productName) {
      const re = new RegExp(filters.productName, "i");
      matches = matches && re.test(product.name);
    }
    if (filters.nonZero) {
      matches = matches && product.stock > 0;
    }
    if (filters.category) {
      matches = matches && product.category === filters.category;
    }
    return matches;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleDelete = (id: string) => {
    dispatch(removeProduct(id));
  };

  const handleCardClick = (product: Product) => {
    navigate(`/products/${product._id}`);
  };

  const handleAddProductClick = () => {
    setModalOpen(true);
  };

  const handleSaveProduct = async (newProduct: Omit<Product, "_id">) => {
    try {
      const productData = {
        ...newProduct,
        description: newProduct.description || "",
      };
      await dispatch(addProduct(productData));
      setModalOpen(false);
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <StyledPage>
      <StyledContainer>
        <StyledTypography variant="h4" gutterBottom>
          Список товаров
        </StyledTypography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <StyledButton variant="contained" onClick={handleAddProductClick}>
            Добавить товар
          </StyledButton>
        </Box>

        {loading ? (
          <Typography variant="h6">Загрузка...</Typography>
        ) : (
          <Grid container spacing={3} alignItems="stretch">
            {filteredProducts
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id} sx={{ display: "flex" }}>
                  <ProductCard
                    product={product}
                    onClick={handleCardClick}
                    onDelete={() => handleDelete(product._id)}
                  />
                </Grid>
              ))}
          </Grid>
        )}

        {totalPages > 1 && (
          <PaginationContainer>
            <StyledButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Предыдущая
            </StyledButton>

            <Typography variant="body1">
              Страница {currentPage} из {totalPages}
            </Typography>

            <StyledButton
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Следующая
            </StyledButton>
          </PaginationContainer>
        )}
      </StyledContainer>

      <ProductModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveProduct} 
      />
    </StyledPage>
  );
};

export default ProductListPage;
