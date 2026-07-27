import { useState, useCallback } from 'react';

let idCounter = 0;

/**
 * useToast — returns { toasts, toast, removeToast }
 *
 * Usage:
 *   const { toasts, toast, removeToast } = useToast();
 *   toast.success('Saved!');
 *   toast.error('Something went wrong', 'Please try again.');
 *   toast.info('FYI', 'Some neutral info.');
 *
 * Then render: <Toast toasts={toasts} removeToast={removeToast} />
 */
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type, title, message, duration = 4000) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const toast = {
    success: (title, message, duration) => addToast('success', title, message, duration),
    error: (title, message, duration) => addToast('error', title, message, duration),
    info: (title, message, duration) => addToast('info', title, message, duration),
  };

  return { toasts, toast, removeToast };
};

export default useToast;
