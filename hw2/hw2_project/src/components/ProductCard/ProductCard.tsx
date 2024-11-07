import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, category, quantity, unit, imageUrl }) => {
  const shortenedDescription = description.length > 100 ? description.slice(0, 100) + '...' : description;

  return (
    <div className="product-card">
      <div className="product-card-image">
        {imageUrl ? <img src={imageUrl} alt={name} /> : <span>Изображение отсутствует</span>}
      </div>
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{shortenedDescription}</p>
      <div className="product-details">
        <span>Категория: {category}</span>
        <span>Количество: {quantity} {unit}</span>
      </div>
    </div>
  );
};

export default ProductCard;
