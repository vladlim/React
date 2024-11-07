import React, { useState } from 'react';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './components/ProductList/ProductList';
import './App.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavigationPanel toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Sidebar isCollapsed={!isSidebarOpen} />
        <ProductList />
      </div>
    </>
  );
};

export default App;
