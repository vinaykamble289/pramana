import ValidationDashboard from '../validation/ValidationDashboard';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '../ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export default function ValidationDashboardExample() {
  return (
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <ValidationDashboard />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  );
}