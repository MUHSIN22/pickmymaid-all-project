// import react
import { useCallback } from "react";
import { toast } from "react-toastify";
const config: Record<string, { color: string }> = {
  success: {
    color: "#10b981",
  },
  error: {
    color: "#ef4444",
  },
  warning: {
    color: "#f59e0b",
  },
  info: {
    color: "#3b82f6",
  },
};
export default function useCustomToast() {
  const showToast = useCallback(
    (
      title?: string,
      message?: string,
      status?: "success" | "error" | "warning" | "info"
    ) => {
      toast(
        <div
          style={{ backgroundColor: config[status as string].color }}
          className={`sm:w-full w-[90%] mx-auto rounded-[10px] sm:rounded-[0px] sm:mx-0 sm:my-0 my-2 h-full p-2 text-white`}
        >
          <h2 className="font-bold">{title}</h2>
          <p>{message}</p>
        </div>
      );
    },
    []
  );

  return showToast;
}
