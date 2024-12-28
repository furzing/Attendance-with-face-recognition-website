import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AttendancePage from "./pages/AttendancePage";
import StudentsPage from "./pages/StudentsPage";
import ReportsPage from "./pages/ReportsPage";
import CoursesPage from "./pages/CoursesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/:role" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/attendance"
            element={
              <AuthGuard>
                <AttendancePage />
              </AuthGuard>
            }
          />
          <Route
            path="/students"
            element={
              <AuthGuard>
                <StudentsPage />
              </AuthGuard>
            }
          />
          <Route
            path="/reports"
            element={
              <AuthGuard>
                <ReportsPage />
              </AuthGuard>
            }
          />
          <Route
            path="/courses"
            element={
              <AuthGuard>
                <CoursesPage />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;