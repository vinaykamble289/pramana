import AdminDashboard from '../admin/AdminDashboard';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '../ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export default function AdminDashboardExample() {
  return (
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <AdminDashboard />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  );
}