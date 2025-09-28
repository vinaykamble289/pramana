import Navigation from '../Navigation';
import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider } from '../ThemeProvider';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Navigation />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Navigation Example</h2>
          <p className="text-muted-foreground">
            The navigation bar includes portal links, theme toggle, language toggle, and offline status.
            Try clicking the different buttons to see the interactive functionality.
          </p>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}