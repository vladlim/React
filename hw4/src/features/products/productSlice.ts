
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/Product';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      id: 1,
      name: 'Товар 1',
      description: 'Очень длинное описание товара 1, которое может не помещаться в карточке и должно быть обрезано.',
      category: 'Электроника',
      quantity: 10,
      unit: 'шт.',
      image: 'https://via.placeholder.com/300x200',
      price: 100,
    },
    {
      id: 2,
      name: 'Товар 2',
      description: 'Описание товара 2.',
      category: 'Одежда',
      quantity: 5,
      unit: 'шт.',
      price: 200,
    },
    {
      id: 3,
      name: 'Товар 3',
      description: 'Описание товара 3 с длинным текстом, которое должно быть ограничено в карточке, но полное описание видно в модальном окне.',
      category: 'Продукты питания',
      quantity: 20,
      unit: 'кг',
      image: 'https://via.placeholder.com/300x200',
      price: 300,
    },
    {
        id: 4,
        name: 'Товар 1',
        description: 'Очень длинное описание товара 1, которое может не помещаться в карточке и должно быть обрезано.',
        category: 'Электроника',
        quantity: 10,
        unit: 'шт.',
        image: 'https://via.placeholder.com/300x200',
        price: 100,
      },
      {
        id: 5,
        name: 'Товар 2',
        description: 'Описание товара 2.',
        category: 'Одежда',
        quantity: 5,
        unit: 'шт.',
        price: 200,
      },
      {
        id: 6,
        name: 'Товар 3',
        description: 'Описание товара 3 с длинным текстом, которое должно быть ограничено в карточке, но полное описание видно в модальном окне.',
        category: 'Продукты питания',
        quantity: 20,
        unit: 'кг',
        image: 'https://via.placeholder.com/300x200',
        price: 300,
      },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
