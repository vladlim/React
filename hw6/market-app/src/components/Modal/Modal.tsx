// src/components/Modal/Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { Product } from '../../models/Product';

interface ModalProps {
  product: Product;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ product, onClose }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            {product.image ? (
              <img src={product.image} alt={product.name} className={styles.image} />
            ) : (
              <div className={styles.placeholder}>Изображение отсутствует</div>
            )}
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{product.name}</h2>
            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}
            {product.category && (
              <p className={styles.category}>Категория: {product.category}</p>
            )}
            <p className={styles.quantity}>
              Количество: {product.quantity} {product.unit}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
