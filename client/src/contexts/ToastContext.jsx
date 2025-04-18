import { Toaster, toast } from "sonner";
import { useEffect, useContext, useState, createContext } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [position, setPosition] = useState("top-center");

  useEffect(() => {
    if (toastMessage) {
      const { type, message, position } = toastMessage;
      setPosition(position);
      if (type === "success") toast.success(message);
      else toast.error(message);
    }
  }, [toastMessage]);

  return (
    <ToastContext.Provider value={{ setToastMessage }}>
      {children}
      <Toaster richColors position={position} />
    </ToastContext.Provider>
  );
};
