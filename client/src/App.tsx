import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import FarmerDashboard from "@/components/farmer/FarmerDashboard";
import ProcessorDashboard from "@/components/processor/ProcessorDashboard";
import LabDashboard from "@/components/lab/LabDashboard";
import ValidationDashboard from "@/components/validation/ValidationDashboard";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ConsumerPortal from "@/components/consumer/ConsumerPortal";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/farmer" component={FarmerDashboard} />
        <Route path="/processor" component={ProcessorDashboard} />
        <Route path="/lab" component={LabDashboard} />
        <Route path="/validation" component={ValidationDashboard} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/consumer" component={ConsumerPortal} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
