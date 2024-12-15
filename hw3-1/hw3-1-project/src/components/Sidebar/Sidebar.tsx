import React, { useState } from 'react';
import { Drawer, TextField, FormControlLabel, Checkbox, Select, MenuItem, IconButton, Button, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  applyFilters: (filters: Filters) => void;
}

interface Filters {
  productName: string;
  inStock: boolean;
  category: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, applyFilters }) => {
  const [productName, setProductName] = useState<string>('');
  const [inStock, setInStock] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');

  const handleSearch = () => {
    const filters: Filters = {
      productName: productName,
      inStock: inStock,
      category: category,
    };
    applyFilters(filters);
    toggleSidebar();
  };

  const handleReset = () => {
    setProductName('');
    setInStock(false);
    setCategory('');
    applyFilters({ productName: '', inStock: false, category: '' });
  };

  return (
    <>
      <IconButton onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Drawer 
        variant="temporary" 
        anchor="left" 
        open={isOpen} 
        onClose={toggleSidebar}
        PaperProps={{
          sx: { width: '450px' }
        }}
      >
        <div className="sidebar-content" style={{ padding: '16px' }}>
          <h3>Фильтры</h3>
          <TextField 
            label="Поиск по названию" 
            variant="outlined" 
            fullWidth 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={inStock} 
                onChange={(e) => setInStock(e.target.checked)} 
              />
            } 
            label="Только в наличии" 
          />
          <Select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            displayEmpty 
            fullWidth 
            variant="outlined"
          >
            <MenuItem value="">
              <em>Все категории</em>
            </MenuItem>
            <MenuItem value="Категория 1">Категория 1</MenuItem>
            <MenuItem value="Категория 2">Категория 2</MenuItem>
            <MenuItem value="Ноутбуки">Ноутбуки</MenuItem>
          </Select>
          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Применить
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Сбросить
            </Button>
          </Stack>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
