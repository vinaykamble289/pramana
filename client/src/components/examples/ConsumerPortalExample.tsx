import ConsumerPortal from '../consumer/ConsumerPortal';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '../ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';

export default function ConsumerPortalExample() {
  return (
    <ThemeProvider>
      <AppProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <ConsumerPortal />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  );
}