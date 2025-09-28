import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { useApp } from '@/contexts/AppContext';
import { 
  Sprout, 
  Factory, 
  FlaskConical, 
  ShieldCheck, 
  BarChart3, 
  QrCode,
  ArrowRight,
  Leaf,
  Globe,
  Users
} from 'lucide-react';

export default function HomePage() {
  const { batches, farmers, blockchainRecords, language } = useApp();

  const translations = {
    en: {
      title: 'Pramana',
      subtitle: 'Blockchain-Based Ayurvedic Herb Traceability',
      description: 'Complete transparency from farm to consumer with offline-first capabilities',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      features: 'System Features',
      portals: 'Access Portals',
      stats: 'System Statistics',
      farmerPortal: 'Farmer Portal',
      farmerDesc: 'Record herb collections with offline capabilities',
      processorPortal: 'Processor Portal', 
      processorDesc: 'Manage processing steps and generate QR codes',
      labPortal: 'Lab Portal',
      labDesc: 'Submit test results and certifications',
      validationPortal: 'Validation Portal',
      validationDesc: 'Validate batches and anchor to blockchain',
      adminPortal: 'Admin Dashboard',
      adminDesc: 'Monitor system performance and generate reports',
      consumerPortal: 'Consumer Portal',
      consumerDesc: 'Verify product authenticity and trace origins',
      totalBatches: 'Total Batches',
      activeFarmers: 'Active Farmers',
      blockchainRecords: 'Blockchain Records',
      offlineFirst: 'Offline First',
      offlineDesc: 'Works without internet, syncs when connected',
      blockchainSecurity: 'Blockchain Security',
      blockchainDesc: 'Immutable records with cryptographic proof',
      multiLanguage: 'Multi-Language',
      multiLanguageDesc: 'English and Hindi support for all users',
      voiceInput: 'Voice Input',
      voiceDesc: 'Hands-free data entry for field workers'
    },
    hi: {
      title: 'प्रमाण',
      subtitle: 'ब्लॉकचेन-आधारित आयुर्वेदिक जड़ी-बूटी पता लगाना',
      description: 'ऑफ़लाइन-फर्स्ट क्षमताओं के साथ खेत से उपभोक्ता तक पूर्ण पारदर्शिता',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
      features: 'सिस्टम विशेषताएं',
      portals: 'पोर्टल तक पहुंच',
      stats: 'सिस्टम आंकड़े',
      farmerPortal: 'किसान पोर्टल',
      farmerDesc: 'ऑफ़लाइन क्षमताओं के साथ जड़ी-बूटी संग्रह रिकॉर्ड करें',
      processorPortal: 'प्रोसेसर पोर्टल',
      processorDesc: 'प्रसंस्करण चरणों का प्रबंधन करें और QR कोड जेनरेट करें',
      labPortal: 'प्रयोगशाला पोर्टल',
      labDesc: 'परीक्षण परिणाम और प्रमाणपत्र जमा करें',
      validationPortal: 'सत्यापन पोर्टल',
      validationDesc: 'बैचों को सत्यापित करें और ब्लॉकचेन में एंकर करें',
      adminPortal: 'प्रशासक डैशबोर्ड',
      adminDesc: 'सिस्टम प्रदर्शन की निगरानी करें और रिपोर्ट जेनरेट करें',
      consumerPortal: 'उपभोक्ता पोर्टल', 
      consumerDesc: 'उत्पाद प्रामाणिकता सत्यापित करें और मूल का पता लगाएं',
      totalBatches: 'कुल बैच',
      activeFarmers: 'सक्रिय किसान',
      blockchainRecords: 'ब्लॉकचेन रिकॉर्ड',
      offlineFirst: 'ऑफ़लाइन फर्स्ट',
      offlineDesc: 'इंटरनेट के बिना काम करता है, कनेक्ट होने पर सिंक करता है',
      blockchainSecurity: 'ब्लॉकचेन सुरक्षा',
      blockchainDesc: 'क्रिप्टोग्राफिक प्रूफ के साथ अपरिवर्तनीय रिकॉर्ड',
      multiLanguage: 'बहु-भाषा',
      multiLanguageDesc: 'सभी उपयोगकर्ताओं के लिए अंग्रेजी और हिंदी समर्थन',
      voiceInput: 'वॉयस इनपुट',
      voiceDesc: 'फील्ड वर्कर्स के लिए हैंड्स-फ्री डेटा एंट्री'
    }
  };

  const t = translations[language];

  const portals = [
    {
      path: '/farmer',
      title: t.farmerPortal,
      description: t.farmerDesc,
      icon: Sprout,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10'
    },
    {
      path: '/processor', 
      title: t.processorPortal,
      description: t.processorDesc,
      icon: Factory,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10'
    },
    {
      path: '/lab',
      title: t.labPortal,
      description: t.labDesc,
      icon: FlaskConical,
      color: 'text-chart-3', 
      bgColor: 'bg-chart-3/10'
    },
    {
      path: '/validation',
      title: t.validationPortal,
      description: t.validationDesc,
      icon: ShieldCheck,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      path: '/admin',
      title: t.adminPortal,
      description: t.adminDesc,
      icon: BarChart3,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10'
    },
    {
      path: '/consumer',
      title: t.consumerPortal,
      description: t.consumerDesc,
      icon: QrCode,
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: t.offlineFirst,
      description: t.offlineDesc
    },
    {
      icon: ShieldCheck,
      title: t.blockchainSecurity,
      description: t.blockchainDesc
    },
    {
      icon: Users,
      title: t.multiLanguage,
      description: t.multiLanguageDesc
    },
    {
      icon: Sprout,
      title: t.voiceInput,
      description: t.voiceDesc
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-1/5" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold">{t.title}</h1>
                <p className="text-xl text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.description}
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link href="/farmer">
                <Button size="lg" className="gap-2" data-testid="button-get-started">
                  {t.getStarted}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/consumer">
                <Button variant="outline" size="lg" data-testid="button-learn-more">
                  {t.learnMore}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Stats Section */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">{t.stats}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{batches.length}</div>
                <p className="text-muted-foreground">{t.totalBatches}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-chart-1 mb-2">{farmers.length}</div>
                <p className="text-muted-foreground">{t.activeFarmers}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-chart-2 mb-2">{blockchainRecords.length}</div>
                <p className="text-muted-foreground">{t.blockchainRecords}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">{t.features}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Portals Section */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">{t.portals}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link key={portal.path} href={portal.path}>
                  <Card className="h-full hover-elevate cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 ${portal.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${portal.color}`} />
                      </div>
                      <CardTitle className="text-left">{portal.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-left mb-4">{portal.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                        Access Portal
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}