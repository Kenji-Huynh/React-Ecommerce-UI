import React from 'react';
import { useCart } from '../contexts/CartContext';
import './CartIcon.css';

const CartIcon = ({ onClick }) => {
  const { getCartItemsCount } = useCart();
  const itemCount = getCartItemsCount();

  // Debug log
  console.log("Cart Items Count:", itemCount);

  return (
    <button className="cart-icon" onClick={onClick}>
      <span className="cart-symbol">🛒</span>
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </button>
  );
};

export default CartIcon;