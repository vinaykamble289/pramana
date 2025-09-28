import LabDashboard from '../lab/LabDashboard';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '../ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export default function LabDashboardExample() {
  return (
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <LabDashboard />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  );
}