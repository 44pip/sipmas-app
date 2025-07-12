import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaTimesCircle,
  FaInfoCircle 
} from 'react-icons/fa';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'warning',
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  confirmButtonColor = 'primary'
}) => {
  if (!isOpen) return null;

  const dialogConfig = {
    warning: {
      icon: <FaExclamationTriangle className="text-yellow-500" size={24} />,
      bg: 'bg-yellow-50 border-yellow-200',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700'
    },
    success: {
      icon: <FaCheckCircle className="text-green-500" size={24} />,
      bg: 'bg-green-50 border-green-200',
      titleColor: 'text-green-800',
      messageColor: 'text-green-700'
    },
    error: {
      icon: <FaTimesCircle className="text-red-500" size={24} />,
      bg: 'bg-red-50 border-red-200',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700'
    },
    info: {
      icon: <FaInfoCircle className="text-blue-500" size={24} />,
      bg: 'bg-blue-50 border-blue-200',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700'
    }
  };

  const buttonConfig = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white'
  };

  const config = dialogConfig[type];
  const buttonClass = buttonConfig[confirmButtonColor];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 0.8
          }}
          className={`relative max-w-md w-full ${config.bg} border rounded-2xl shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <motion.div 
            className="p-6 border-b border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.6 }
                }}
              >
                {config.icon}
              </motion.div>
              <div className="flex-1">
                <motion.h3 
                  className={`text-lg font-bold ${config.titleColor}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {title}
                </motion.h3>
                <motion.p 
                  className={`text-sm mt-1 ${config.messageColor}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {message}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="p-6 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              {cancelText}
            </motion.button>
            <motion.button
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2.5 ${buttonClass} rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                y: -1
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              {confirmText}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog; 