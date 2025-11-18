import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import JpgToExcelPage from "../pages/JpgToExcelPage.tsx";
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <JpgToExcelPage />
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);