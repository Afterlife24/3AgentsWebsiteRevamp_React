import { createContext, useContext, useState, ReactNode } from "react";

interface WidgetContextType {
  showWidget: boolean;
  openWidget: () => void;
  closeWidget: () => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: ReactNode }) {
  const [showWidget, setShowWidget] = useState(false);

  const openWidget = () => {
    console.log("[WidgetContext] Opening widget");
    setShowWidget(true);
  };

  const closeWidget = () => {
    console.log("[WidgetContext] Closing widget");
    setShowWidget(false);
  };

  return (
    <WidgetContext.Provider value={{ showWidget, openWidget, closeWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidget() {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
}
