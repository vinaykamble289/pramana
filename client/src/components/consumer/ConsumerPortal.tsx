import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { QrCode, MapPin, User, Factory, FlaskConical, ShieldCheck, Calendar, CheckCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ConsumerPortal() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const { batches, farmers, language } = useApp();
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Consumer Verification Portal',
      subtitle: 'Verify Authenticity & Trace Origins',
      searchPlaceholder: 'Enter QR code or Batch ID',
      search: 'Search',
      clear: 'Clear',
      notFound: 'Product not found',
      checkInput: 'Please check your QR code or batch ID',
      provenanceBundle: 'Provenance Bundle',
      collectionDetails: 'Collection Details',
      farmerProfile: 'Farmer Profile',
      processingSteps: 'Processing Journey',
      labCertification: 'Lab Certification',
      blockchainProof: 'Blockchain Proof',
      species: 'Species',
      quantity: 'Quantity',
      quality: 'Quality Grade',
      collectionDate: 'Collection Date',
      location: 'Collection Location',
      moisture: 'Moisture Content',
      farmerId: 'Farmer ID',
      farmerName: 'Farmer Name',
      farmerLocation: 'Location',
      phone: 'Phone',
      certifications: 'Certifications',
      processingStep: 'Processing Step',
      completedDate: 'Completed',
      testResults: 'Test Results',
      testDate: 'Test Date',
      pesticideTest: 'Pesticide Analysis',
      dnaAuth: 'DNA Authentication',
      testStatus: 'Status',
      blockchainHash: 'Blockchain Hash',
      merkleRoot: 'Merkle Root',
      timestamp: 'Anchored',
      verified: 'Verified',
      authentic: 'Authentic Product',
      traceabilityComplete: 'Full traceability verified from farm to consumer'
    },
    hi: {
      title: 'उपभोक्ता सत्यापन पोर्टल',
      subtitle: 'प्रामाणिकता सत्यापित करें और मूल का पता लगाएं',
      searchPlaceholder: 'QR कोड या बैच ID दर्ज करें',
      search: 'खोजें',
      clear: 'साफ करें',
      notFound: 'उत्पाद नहीं मिला',
      checkInput: 'कृपया अपना QR कोड या बैच ID जांचें',
      provenanceBundle: 'मूल बंडल',
      collectionDetails: 'संग्रह विवरण',
      farmerProfile: 'किसान प्रोफाइल',
      processingSteps: 'प्रसंस्करण यात्रा',
      labCertification: 'प्रयोगशाला प्रमाणपत्र',
      blockchainProof: 'ब्लॉकचेन प्रमाण',
      species: 'प्रजाति',
      quantity: 'मात्रा',
      quality: 'गुणवत्ता ग्रेड',
      collectionDate: 'संग्रह तिथि',
      location: 'संग्रह स्थान',
      moisture: 'नमी सामग्री',
      farmerId: 'किसान ID',
      farmerName: 'किसान का नाम',
      farmerLocation: 'स्थान',
      phone: 'फोन',
      certifications: 'प्रमाणपत्र',
      processingStep: 'प्रसंस्करण चरण',
      completedDate: 'पूर्ण',
      testResults: 'परीक्षण परिणाम',
      testDate: 'परीक्षण तिथि',
      pesticideTest: 'कीटनाशक विश्लेषण',
      dnaAuth: 'DNA प्रमाणीकरण',
      testStatus: 'स्थिति',
      blockchainHash: 'ब्लॉकचेन हैश',
      merkleRoot: 'मर्कल रूट',
      timestamp: 'एंकर्ड',
      verified: 'सत्यापित',
      authentic: 'प्रामाणिक उत्पाद',
      traceabilityComplete: 'खेत से उपभोक्ता तक पूर्ण पता लगाने की पुष्टि'
    }
  };

  const t = translations[language];

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    
    // Search by QR code or batch ID
    let foundBatch = batches.find(b => 
      b.qrCode === searchInput.trim() || 
      b.id === searchInput.trim() ||
      b.id.includes(searchInput.trim())
    );
    
    if (foundBatch) {
      const farmer = farmers.find(f => f.id === foundBatch.farmerId);
      setSearchResult({ batch: foundBatch, farmer });
      
      toast({
        title: t.verified,
        description: t.authentic
      });
    } else {
      setSearchResult(null);
      toast({
        title: t.notFound,
        description: t.checkInput,
        variant: "destructive"
      });
    }
  };

  const handleClear = () => {
    setSearchInput('');
    setSearchResult(null);
  };

  const getMockLocation = (lat: number, lng: number) => {
    // Mock location names for demo - todo: remove mock functionality
    const locations = {
      '10.85': 'Kochi, Kerala',
      '12.97': 'Bangalore, Karnataka', 
      '13.08': 'Chennai, Tamil Nadu'
    };
    
    const latKey = lat.toFixed(2);
    return locations[latKey as keyof typeof locations] || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'tested': return 'default';
      case 'processing': return 'secondary';
      case 'validated': return 'default';
      case 'pending': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <QrCode className="w-8 h-8 text-chart-5" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{t.subtitle}</p>
      </div>

      {/* Search Section */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">{t.searchPlaceholder}</Label>
              <Input
                id="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="PRAM-ASH-001-2024 or batch_123..."
                className="text-center"
                data-testid="input-search"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSearch}
                className="flex-1 gap-2"
                disabled={!searchInput.trim()}
                data-testid="button-search"
              >
                <QrCode className="w-4 h-4" />
                {t.search}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClear}
                data-testid="button-clear"
              >
                {t.clear}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResult && (
        <div className="space-y-6">
          {/* Verification Banner */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-xl font-bold text-green-800 dark:text-green-400">
                    {t.authentic}
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    {t.traceabilityComplete}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{t.provenanceBundle}</h2>
            <Badge 
              variant={getStatusColor(searchResult.batch.status) as any}
              className="text-sm"
            >
              Status: {searchResult.batch.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Collection Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t.collectionDetails}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t.species}:</span>
                    <div className="text-muted-foreground">{searchResult.batch.species}</div>
                  </div>
                  <div>
                    <span className="font-medium">{t.quantity}:</span>
                    <div className="text-muted-foreground">{searchResult.batch.quantity}kg</div>
                  </div>
                  <div>
                    <span className="font-medium">{t.quality}:</span>
                    <div className="text-muted-foreground">{searchResult.batch.quality}</div>
                  </div>
                  <div>
                    <span className="font-medium">{t.moisture}:</span>
                    <div className="text-muted-foreground">{searchResult.batch.moisture}%</div>
                  </div>
                  <div>
                    <span className="font-medium">{t.collectionDate}:</span>
                    <div className="text-muted-foreground">{searchResult.batch.collectionDate}</div>
                  </div>
                  <div>
                    <span className="font-medium">{t.location}:</span>
                    <div className="text-muted-foreground">
                      {getMockLocation(searchResult.batch.gpsLat, searchResult.batch.gpsLng)}
                    </div>
                  </div>
                </div>

                {/* Mock Map Preview */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    Collection Site: {searchResult.batch.gpsLat.toFixed(6)}, {searchResult.batch.gpsLng.toFixed(6)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Farmer Profile */}
            {searchResult.farmer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t.farmerProfile}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-medium">{searchResult.farmer.name}</h3>
                    <p className="text-sm text-muted-foreground">{searchResult.farmer.location}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">{t.farmerId}:</span>
                      <div className="text-muted-foreground font-mono">{searchResult.farmer.id}</div>
                    </div>
                    <div>
                      <span className="font-medium">{t.phone}:</span>
                      <div className="text-muted-foreground">{searchResult.farmer.phone}</div>
                    </div>
                    <div>
                      <span className="font-medium">{t.certifications}:</span>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {searchResult.farmer.certifications.map((cert: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Processing Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  {t.processingSteps}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchResult.batch.processingSteps && searchResult.batch.processingSteps.length > 0 ? (
                  <div className="space-y-3">
                    {searchResult.batch.processingSteps.map((step: any, index: number) => (
                      <div key={step.id} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{step.step}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t.completedDate}: {new Date(step.completedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Factory className="w-8 h-8 mx-auto mb-2" />
                    <p>No processing steps recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lab Certification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5" />
                  {t.labCertification}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchResult.batch.labResults ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <Badge 
                        variant={searchResult.batch.labResults.status === 'passed' ? 'default' : 'destructive'}
                      >
                        {searchResult.batch.labResults.status === 'passed' ? 'Passed' : 'Failed'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">{t.moisture}:</span>
                        <div className="text-muted-foreground">{searchResult.batch.labResults.moisture}%</div>
                      </div>
                      <div>
                        <span className="font-medium">{t.pesticideTest}:</span>
                        <div className="text-muted-foreground">{searchResult.batch.labResults.pesticide}</div>
                      </div>
                      <div>
                        <span className="font-medium">{t.dnaAuth}:</span>
                        <div className="text-muted-foreground">{searchResult.batch.labResults.dnaAuthentication}</div>
                      </div>
                      <div>
                        <span className="font-medium">{t.testDate}:</span>
                        <div className="text-muted-foreground">
                          {new Date(searchResult.batch.labResults.testedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <FlaskConical className="w-8 h-8 mx-auto mb-2" />
                    <p>Lab certification pending</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Blockchain Proof */}
          {searchResult.batch.blockchainHash && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  {t.blockchainProof}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-400">
                      Immutably recorded on blockchain
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t.blockchainHash}:</span>
                      <div className="text-muted-foreground font-mono text-xs break-all">
                        {searchResult.batch.blockchainHash}
                      </div>
                    </div>
                    
                    {searchResult.batch.merkleRoot && (
                      <div>
                        <span className="font-medium">{t.merkleRoot}:</span>
                        <div className="text-muted-foreground font-mono text-xs break-all">
                          {searchResult.batch.merkleRoot}
                        </div>
                      </div>
                    )}
                    
                    {searchResult.batch.timestamp && (
                      <div>
                        <span className="font-medium">{t.timestamp}:</span>
                        <div className="text-muted-foreground">
                          {new Date(searchResult.batch.timestamp).toLocaleString()}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-medium">Verification:</span>
                      <div className="text-green-600 font-medium">✓ {t.verified}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Demo Instructions */}
      {!searchResult && (
        <Card className="max-w-2xl mx-auto bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Info className="w-8 h-8 mx-auto text-muted-foreground" />
              <h3 className="font-medium">Demo Instructions</h3>
              <p className="text-sm text-muted-foreground">
                Try searching with: "PRAM-ASH-001-2024" or "batch1" to see the full provenance bundle
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}