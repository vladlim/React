import React, { useState } from 'react';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import SidebarMenu, { FilterValues } from './components/SidebarMenu/SideBarMenu';
import AppRoutes from './AppRoutes';
import { Box } from '@mui/material';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    productName: '',
    nonZero: false,
    category: '',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setIsSidebarOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({ productName: '', nonZero: false, category: '' });
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavigationPanel onToggleSidebar={toggleSidebar} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <SidebarMenu
          collapsed={!isSidebarOpen}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          onCloseSidebar={handleCloseSidebar}
        />
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <AppRoutes filters={filters} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
