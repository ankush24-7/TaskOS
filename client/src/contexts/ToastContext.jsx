import { Toaster, toast } from "sonner";
import { useEffect, useContext, useState, createContext } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      const { type, message } = toastMessage;
      if (type === "success") toast.success(message);
      else toast.error(message);
    }
  }, [toastMessage]);

  return (
    <ToastContext.Provider value={{ setToastMessage }}>
      {children}
      <Toaster richColors position="bottom-right" />
    </ToastContext.Provider>
  );
};
