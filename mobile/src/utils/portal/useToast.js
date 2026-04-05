import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}



