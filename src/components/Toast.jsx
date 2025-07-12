import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaTimes,
  FaTimesCircle 
} from 'react-icons/fa';

// Create Toast Context
const ToastContext = createContext();

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message) => addToast(message, 'success');
  const showError = (message) => addToast(message, 'error');
  const showWarning = (message) => addToast(message, 'warning');
  const showInfo = (message) => addToast(message, 'info');

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const toastConfig = {
    success: {
      icon: <FaCheckCircle className="text-green-500" />,
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      accent: 'text-green-600',
      shadow: 'shadow-green-100'
    },
    error: {
      icon: <FaTimesCircle className="text-red-500" />,
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      accent: 'text-red-600',
      shadow: 'shadow-red-100'
    },
    warning: {
      icon: <FaExclamationTriangle className="text-yellow-500" />,
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      accent: 'text-yellow-600',
      shadow: 'shadow-yellow-100'
    },
    info: {
      icon: <FaInfoCircle className="text-blue-500" />,
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      accent: 'text-blue-600',
      shadow: 'shadow-blue-100'
    }
  };

  const config = toastConfig[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: -50, scale: 0.9, x: 100 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            mass: 0.8
          }}
          className={`max-w-sm w-full ${config.bg} border rounded-2xl shadow-lg ${config.shadow} backdrop-blur-sm`}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 flex items-start gap-3">
            <motion.div 
              className="flex-shrink-0 mt-0.5"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.6 }
              }}
            >
              {config.icon}
            </motion.div>
            <motion.div 
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className={`text-sm font-medium ${config.text}`}>
                {message}
              </p>
            </motion.div>
            <motion.button
              onClick={handleClose}
              className={`flex-shrink-0 p-1 rounded-full hover:bg-white/50 transition-all duration-300 ${config.accent}`}
              whileHover={{ 
                scale: 1.1,
                rotate: 90,
                backgroundColor: "rgba(255, 255, 255, 0.7)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              <FaTimes size={14} />
            </motion.button>
          </div>
          
          {/* Progress bar */}
          <motion.div
            className={`h-1 ${config.accent} rounded-b-2xl`}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast; 