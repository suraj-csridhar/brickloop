import { Toaster as ToastPrimitives } from "./toast";
import { cn } from "../../lib/utils";
import { toast } from "sonner";
import React from "react";
import { useToast } from "./use-toast";

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastPrimitives.Provider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <ToastPrimitives.Root key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastPrimitives.Title>{title}</ToastPrimitives.Title>}
              {description && (
                <ToastPrimitives.Description>
                  {description}
                </ToastPrimitives.Description>
              )}
            </div>
            {action}
            <ToastPrimitives.Close />
          </ToastPrimitives.Root>
        );
      })}
      <ToastPrimitives.Viewport />
    </ToastPrimitives.Provider>
  );
};

export { Toaster };