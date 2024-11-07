import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <input type="text" placeholder="Поиск товара" />
        <label>
          <input type="checkbox" /> Товары на складе
        </label>
        <select>
          <option>Категория 1</option>
          <option>Категория 2</option>
          <option>Категория 3</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
