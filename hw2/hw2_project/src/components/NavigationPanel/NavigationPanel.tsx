import React from 'react';
import './NavigationPanel.css';

interface NavigationPanelProps {
  toggleSidebar: () => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ toggleSidebar }) => {
  return (
    <nav className="navigation-panel">
      <button onClick={toggleSidebar} className="toggle-sidebar-button">☰</button>
      <ul className="navigation-list">
        <li><a href="#" className="nav-item">Товары</a></li>
        <li><a href="#" className="nav-item">Склады</a></li>
        <li><a href="#" className="nav-item">О системе</a></li>
        <li><a href="#" className="nav-item">Личная страница</a></li>
      </ul>
    </nav>
  );
};

export default NavigationPanel;
