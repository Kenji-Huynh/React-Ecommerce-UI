import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  // Thêm toast mới
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    return id;
  }, []);

  // Xóa toast theo id
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Xóa tất cả toast
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return { toasts, showToast, removeToast, clearToasts };
};