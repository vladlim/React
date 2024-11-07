import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const products = [
  {
    name: 'Товар 1',
    description: 'Описание товара 1',
    category: 'Категория 1',
    quantity: 10,
    unit: 'шт.',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Товар 2',
    description: 'Описание товара 2',
    category: 'Категория 2',
    quantity: 20,
    unit: 'шт.',
    imageUrl: ''
  },
  {
    name: 'MacBook 16',
    description: 'MacBook — ультратонкие ноутбуки от Apple, которые отличаются стильным дизайном и высокой производительностью. Новое поколение процессоров на архитектуре ARM гарантирует стабильную и плавную работу устройства при выполнении различных задач',
    category: 'Ноутбуки',
    quantity: 20,
    unit: 'шт.',
    imageUrl: '../../src/assets/MacBook.jpg'
  }
];

const ProductList: React.FC = () => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
