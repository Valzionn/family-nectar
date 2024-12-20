import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DinnerPoll from "./pages/DinnerPoll";
import ShoppingList from "./pages/ShoppingList";
import Chores from "./pages/Chores";
import CalendarPage from "./pages/Calendar";
import TravelFund from "./pages/TravelFund";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/index" element={<ProtectedRoute> <Index /> </ProtectedRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="/dinner-poll" element={<ProtectedRoute> <DinnerPoll /> </ProtectedRoute>} />
          <Route path="/shopping-list" element={<ProtectedRoute> <ShoppingList /> </ProtectedRoute>} />
          <Route path="/chores" element={<ProtectedRoute> <Chores /> </ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute> <CalendarPage /> </ProtectedRoute>} />
          <Route path="/travel-fund" element={<ProtectedRoute> <TravelFund /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;