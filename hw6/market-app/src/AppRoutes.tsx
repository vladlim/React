import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetails from './pages/ProductDetails';
import CategoryManagementPage from './pages/CategoryManagementPage';
import UserProfile from './pages/UserProfile';
import { FilterValues } from './components/SidebarMenu/SideBarMenu';

interface AppRoutesProps {
  filters: FilterValues;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ filters }) => {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage filters={filters} />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<CategoryManagementPage />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

export default AppRoutes;
