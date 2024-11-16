import Toast from "@/components/Toast";
import { IconNames } from "@/lib/icon";
import { ToastProps } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface ToastContextType {
  show: (settings: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType>({
  show: () => {},
});

export const useToast = () => {
  return useContext(ToastContext);
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    visible: false,
    message: "",
    icon: "" as IconNames,
    iconColor: "",
  });

  const show = (params: ToastProps) => {
    setState({
      visible: true,
      message: params.message,
      icon: params.icon as IconNames,
      iconColor: params.iconColor || "",
    });

    setTimeout(() => {
      setState({
        visible: false,
        message: "",
        icon: "" as IconNames,
        iconColor: "",
      });
    }, 1500);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <Toast
        visible={state.visible}
        message={state.message}
        icon={state.icon}
        iconColor={state.iconColor}
      />
      {children}
    </ToastContext.Provider>
  );
}
