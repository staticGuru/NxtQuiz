import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  Cross2Icon,
  CheckIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';

type ToastType = 'success' | 'warning' | 'error';

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');

  const showToast = (message: string, type: ToastType) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const typeStyles = {
    success: 'bg-green-100 text-green-900',
    warning: 'bg-yellow-100 text-yellow-900',
    error: 'bg-red-100 text-red-900',
  };

  const typeIcons = {
    success: <CheckIcon className="h-5 w-5 text-green-900" />,
    warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-900" />,
    error: <ExclamationTriangleIcon className="h-5 w-5 text-red-900" />,
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastPrimitive.Provider swipeDirection="right">
        <ToastPrimitive.Root
          className={`fixed bottom-0 right-0 m-6 flex w-96 items-center space-x-4 rounded-lg p-4 shadow-lg ${typeStyles[type]}`}
          open={open}
          onOpenChange={setOpen}
        >
          {typeIcons[type]}
          <ToastPrimitive.Title className="font-medium">
            {message}
          </ToastPrimitive.Title>
          <ToastPrimitive.Close>
            <Cross2Icon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col space-y-3 p-6 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
