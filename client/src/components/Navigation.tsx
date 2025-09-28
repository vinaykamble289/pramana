import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useTheme } from './ThemeProvider';
import {
  Sprout,
  Factory,
  FlaskConical,
  ShieldCheck,
  BarChart3,
  QrCode,
  Sun,
  Moon,
  Languages,
  Wifi,
  WifiOff,
  Menu,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  { path: '/farmer', label: 'Farmer', labelHi: 'किसान', icon: Sprout, color: 'bg-chart-1' },
  { path: '/processor', label: 'Processor', labelHi: 'प्रोसेसर', icon: Factory, color: 'bg-chart-2' },
  { path: '/lab', label: 'Lab', labelHi: 'प्रयोगशाला', icon: FlaskConical, color: 'bg-chart-3' },
  { path: '/validation', label: 'Validation', labelHi: 'सत्यापन', icon: ShieldCheck, color: 'bg-primary' },
  { path: '/admin', label: 'Admin', labelHi: 'प्रशासक', icon: BarChart3, color: 'bg-chart-4' },
  { path: '/consumer', label: 'Consumer', labelHi: 'उपभोक्ता', icon: QrCode, color: 'bg-chart-5' },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, isOffline, setOffline } = useApp();
  const { theme, toggleTheme } = useTheme();

  const translations = {
    en: {
      title: 'Pramana',
      subtitle: 'Ayurvedic Herb Traceability',
      offline: 'Offline Mode',
      online: 'Online Mode'
    },
    hi: {
      title: 'प्रमाण',
      subtitle: 'आयुर्वेदिक जड़ी-बूटी पता लगाना',
      offline: 'ऑफ़लाइन मोड',
      online: 'ऑनलाइन मोड'
    }
  };

  const t = translations[language];

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">{t.title}</h1>
              <p className="text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              const label = language === 'hi' ? item.labelHi : item.label;
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Status and Controls */}
          <div className="flex items-center gap-2">
            {/* Offline Status */}
            <Badge 
              variant={isOffline ? "destructive" : "secondary"}
              className="gap-1 cursor-pointer hover-elevate"
              onClick={() => setOffline(!isOffline)}
              data-testid="button-offline-toggle"
            >
              {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              <span className="hidden sm:inline">
                {isOffline ? t.offline : t.online}
              </span>
            </Badge>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              data-testid="button-language-toggle"
            >
              <Languages className="w-4 h-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                const label = language === 'hi' ? item.labelHi : item.label;
                
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button 
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                      data-testid={`nav-mobile-${item.label.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}