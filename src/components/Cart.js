import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = ({ isOpen, onClose, showToast }) => {
  const { t } = useTranslation();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    if (showToast) {
      showToast(t('cart.removedFromCart', { productName }), 'info');
    }
  };

  const handleClearCart = () => {
    if (!hasItems) return;
    clearCart();
    if (showToast) {
      showToast(t('cart.clearedCart'), 'info');
    }
  };

  const handleCheckout = () => {
    if (!hasItems) {
      if (showToast) {
        showToast(t('cart.emptyCartWarning'), 'warning');
      }
      return;
    }
    
    if (showToast) {
      showToast(t('cart.checkoutSuccess'), 'success');
    }
    clearCart();
    onClose();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>{t('cart.title')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {!hasItems ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <p>{t('cart.empty')}</p>
              <p>{t('cart.emptyMessage')}</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.image || "/placeholder-image.jpg"} 
                        alt={item.name} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">{formatPrice(item.price)}</p>
                      
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                          disabled={(item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity || 1}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <p className="item-total">
                        {t('cart.total')}: {formatPrice(item.price * (item.quantity || 1))}
                      </p>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>{t('cart.total')}: {formatPrice(getTotalPrice())}</h3>
                </div>
                
                <div className="cart-actions">
                  <button className="clear-btn" onClick={handleClearCart}>
                    {t('cart.clearAll')}
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    {t('cart.checkout')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;