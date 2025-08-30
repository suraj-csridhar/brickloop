import * as React from "react"
import { toast } from "sonner";

const useToast = () => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (newToast) => {
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const updateToast = (id, newProps) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, ...newProps } : toast))
    );
  };

  return {
    toasts,
    toast: {
      add: addToast,
      remove: removeToast,
      update: updateToast,
    },
  };
};

export { useToast };