import React, { useState } from 'react';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import ProductList from './components/ProductList/ProductList';
import Sidebar from './components/Sidebar/Sidebar';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme/customTheme';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ productName: '', inStock: false, category: '' });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth={false} sx={{ padding: 0,  backgroundColor: customTheme.palette.background.default }}>
        <NavigationPanel toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} applyFilters={applyFilters} />
        <ProductList filters={filters} />
      </Container>
    </ThemeProvider>
  );
};

export default App;