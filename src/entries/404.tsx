import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "../pages/NotFound.tsx";
import "../index.css";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <TooltipProvider>
      <NotFound />
    </TooltipProvider>
  </HelmetProvider>
);