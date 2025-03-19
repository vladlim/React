import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import styles from './NavigationPanel.module.css';

interface NavigationPanelProps {
  onToggleSidebar: () => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <nav className={styles.nav} style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}>
      <ul className={styles.navList}>
        <li
          className={styles.navItem}
          title="Открыть/закрыть боковое меню"
          onClick={onToggleSidebar}
          style={{ color: theme.palette.secondary.main }}
        >
          ☰
        </li>
        <li
          className={styles.navItem}
          onClick={() => navigate('/')}
          style={{ color: theme.palette.secondary.main }}
        >
          Товары
        </li>
        <li
          className={styles.navItem}
          onClick={() => navigate('/categories')}
          style={{ color: theme.palette.secondary.main }}
        >
          Категории
        </li>
        <li
          className={styles.navItem}
          onClick={() => navigate('/profile')}
          style={{ color: theme.palette.secondary.main }}
        >
          Личная страница пользователя
        </li>
      </ul>
    </nav>
  );
};

export default NavigationPanel;