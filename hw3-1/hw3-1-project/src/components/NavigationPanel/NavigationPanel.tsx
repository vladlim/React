import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

interface NavigationPanelProps {
  toggleSidebar: () => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fffff' }}>
      <Toolbar>
        <Button color="inherit" onClick={toggleSidebar}>
          ☰
        </Button>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        </Typography>
        <nav>
          <Button color="inherit">Товары</Button>
          <Button color="inherit">Склады</Button>
          <Button color="inherit">О системе</Button>
          <Button color="inherit">Личная страница</Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationPanel;
