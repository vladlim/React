const API_URL = "http://localhost:5000/api";

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
};

export const createProduct = async (product: {
  name: string;
  description: string;
  category: string; 
  stock: number;
  price: number;
  image?: string;  
}) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка при добавлении товара");
  }
  return await response.json();
};

export const updateProduct = async (id: string, product: any) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка при обновлении товара");
  }
  return await response.json();
};

export const deleteProduct = async (id: string) => {
  await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  return await response.json();
};

export const createCategory = async (category: { name: string }) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return await response.json();
};

export const updateCategoryAPI = async (id: string, category: { name: string }) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return await response.json();
};

export const deleteCategory = async (id: string) => {
  await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
};
