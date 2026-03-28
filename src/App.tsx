import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { LanguageProvider } from "./app/contexts/LanguageContext";
import { WidgetProvider, useWidget } from "./app/contexts/WidgetContext";
import Home from "./app/pages/Home";
import About from "./app/pages/About";
import AIAssistants from "./app/pages/AIAssistants";
import AdditionalServices from "./app/pages/AdditionalServices";

// Lazy load the LiveKitWidget
const LiveKitWidget = lazy(() => import("./app/components/LiveKitWidget"));

// Simple loading component
const SimpleLoadingSpinner = () => (
  <div className="fixed bottom-4 right-4 w-64 h-72 md:w-72 md:h-80 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
    <div className="text-blue-500 text-sm">Loading agent...</div>
  </div>
);

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for agent navigation events
    const handleAgentNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ url: string }>;
      const url = customEvent.detail.url;

      console.log("[App] Received agent navigation event:", url);

      // Use React Router navigate to avoid page reload
      // This keeps the LiveKit connection alive
      navigate(url);
    };

    window.addEventListener("agent-navigate", handleAgentNavigate);
    console.log("[App] Agent navigation listener registered");

    return () => {
      window.removeEventListener("agent-navigate", handleAgentNavigate);
      console.log("[App] Agent navigation listener removed");
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/ai-assistants" element={<AIAssistants />} />
      <Route path="/solutions" element={<AdditionalServices />} />
    </Routes>
  );
}

function AppContent() {
  const { showWidget, closeWidget } = useWidget();

  return (
    <>
      <AppRoutes />
      {/* Widget at app level - persists across all routes */}
      {showWidget && (
        <Suspense fallback={<SimpleLoadingSpinner />}>
          <LiveKitWidget onClose={closeWidget} />
        </Suspense>
      )}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WidgetProvider>
        <AppContent />
      </WidgetProvider>
    </LanguageProvider>
  );
}

export default App;
