import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast configuration
export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  style: {
    background: '#0d0d0d',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    fontFamily: '"Barlow Condensed", Arial, sans-serif',
  },
};

// Toast helper functions
export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        borderLeft: '3px solid #10b981',
      },
    });
  },
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        borderLeft: '3px solid #cc0000',
      },
    });
  },
  info: (message) => {
    toast.info(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        borderLeft: '3px solid #3b82f6',
      },
    });
  },
  warning: (message) => {
    toast.warning(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        borderLeft: '3px solid #f59e0b',
      },
    });
  },
};
