import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface WidgetContextType {
  showWidget: boolean;
  openWidget: () => void;
  closeWidget: () => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

const AUTH_API =
  import.meta.env.VITE_AUTH_API?.replace(/\/auth$/, "") ||
  "http://localhost:5000/api";

export function WidgetProvider({ children }: { children: ReactNode }) {
  const [showWidget, setShowWidget] = useState(false);
  const { user } = useAuth();

  const logAgentUsage = (agentType: string) => {
    if (!user?.email) return;
    fetch(`${AUTH_API}/agent-usage/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        userName: user.name,
        agentType,
      }),
    }).catch((err: unknown) => {
      console.warn("[WidgetContext] Failed to log agent usage:", err);
    });
  };

  const openWidget = () => {
    console.log("[WidgetContext] Opening widget");
    setShowWidget(true);
    logAgentUsage("web");
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
