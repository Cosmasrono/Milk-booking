// lib/toast.ts
import toast from 'react-hot-toast';

export const sendSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    duration: 3000, // Duration in milliseconds
  });
};