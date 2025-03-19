import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../api";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  image?: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const loadProducts = createAsyncThunk("products/load", async () => {
  const products = await fetchProducts();
  const transformed = products.map((p: any) => ({
    ...p,
    category:
      typeof p.category === "object" && p.category !== null
        ? p.category._id
        : p.category,
  }));
  return transformed;
});

export const addProduct = createAsyncThunk("products/add", async (product: Omit<Product, "_id">) => {
  return await createProduct(product);
});

export const removeProduct = createAsyncThunk("products/remove", async (id: string) => {
  await deleteProduct(id);
  return id;
});

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, product }: { id: string; product: Product }) => {
    const updated = await updateProduct(id, product);
    return {
      ...updated,
      category:
        typeof updated.category === "object" && updated.category !== null
          ? updated.category._id
          : updated.category,
    };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки товаров";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
