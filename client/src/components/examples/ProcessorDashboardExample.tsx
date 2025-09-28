import ProcessorDashboard from '../processor/ProcessorDashboard';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '../ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export default function ProcessorDashboardExample() {
  return (
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <ProcessorDashboard />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  );
}