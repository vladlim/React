import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, createCategory, updateCategoryAPI, deleteCategory } from '../../api';

export interface Category {
  _id: string;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const loadCategories = createAsyncThunk('categories/load', async (_, { rejectWithValue }) => {
  try {
    return await fetchCategories();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addCategory = createAsyncThunk(
  'categories/add',
  async (category: { name: string }, { rejectWithValue }) => {
    try {
      return await createCategory(category);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCategory = createAsyncThunk(
  'categories/edit',
  async ({ id, category }: { id: string; category: Category }, { rejectWithValue }) => {
    try {
      return await updateCategoryAPI(id, category);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCategory = createAsyncThunk('categories/remove', async (id: string, { rejectWithValue }) => {
  try {
    await deleteCategory(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(removeCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
