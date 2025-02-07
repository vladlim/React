import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export interface FilterValues {
  productName: string;
  nonZero: boolean;
  category: string;
}

interface SidebarMenuProps {
  collapsed?: boolean;
  onApplyFilters: (filters: FilterValues) => void;
  onResetFilters: () => void;
  onCloseSidebar: () => void;
}

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? 0 : 250,
  opacity: collapsed ? 0 : 1,
  padding: collapsed ? 0 : theme.spacing(2),
  boxSizing: 'border-box',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  flexShrink: 0,
  overflow: 'hidden',
  transition: 'width 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
}));

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  collapsed = false,
  onApplyFilters,
  onResetFilters,
  onCloseSidebar,
}) => {
  const theme = useTheme();
  const [productName, setProductName] = useState<string>('');
  const [nonZero, setNonZero] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');

  const categories = useSelector((state: RootState) => state.categories.categories);

  const applyFilters = () => {
    onApplyFilters({ productName, nonZero, category });
    onCloseSidebar();
  };

  const handleResetFilters = () => {
    setProductName('');
    setNonZero(false);
    setCategory('');
    onResetFilters();
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.secondary.main }}>
          Фильтры
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                    label="Название товара"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    InputLabelProps={{ style: { color: theme.palette.secondary.main } }}
                    InputProps={{
                        style: { 
                        color: '#e6b800', 
                        },
                        endAdornment: productName && (
                        <IconButton
                            onClick={() => setProductName('')}
                            size="small"
                            sx={{ color: theme.palette.secondary.main }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: theme.palette.secondary.main },
                        '&:hover fieldset': { borderColor: theme.palette.secondary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                        },
                    }}
                />
            <IconButton onClick={applyFilters} size="small" sx={{ color: theme.palette.secondary.main }}>
              <SearchIcon />
            </IconButton>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={nonZero}
                onChange={(e) => setNonZero(e.target.checked)}
                sx={{
                  color: theme.palette.secondary.main,
                  '&.Mui-checked': {
                    color: theme.palette.secondary.main,
                  },
                }}
              />
            }
            label="Только с ненулевым количеством"
            sx={{ color: theme.palette.secondary.main }}
          />

          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="category-label" sx={{ color: theme.palette.secondary.main }}>
              Категория товара
            </InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Категория товара"
              sx={{ color: theme.palette.secondary.main }}
            >
              <MenuItem value="" sx={{ color: theme.palette.text.primary }}>
                <em>Все категории</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name} sx={{ color: theme.palette.text.primary }}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={applyFilters} size="small" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main }}>
              Применить фильтры
            </Button>
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              size="small"
              sx={{ color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main }}
            >
              Сбросить фильтры
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </SidebarContainer>
  );
};

export default SidebarMenu;