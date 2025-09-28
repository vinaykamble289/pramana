import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { MapPin, Mic, Wifi, WifiOff, Send, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const collectionSchema = z.object({
  species: z.string().min(1, 'Species is required'),
  quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
  moisture: z.number().min(0).max(100, 'Moisture must be between 0-100%'),
  quality: z.string().min(1, 'Quality grade is required'),
  gpsLat: z.number().min(-90).max(90, 'Invalid latitude'),
  gpsLng: z.number().min(-180).max(180, 'Invalid longitude'),
  collectorId: z.string().min(1, 'Collector ID is required')
});

type CollectionFormData = z.infer<typeof collectionSchema>;

const herbSpecies = [
  'Ashwagandha', 'Turmeric', 'Ginger', 'Tulsi', 'Neem', 'Brahmi', 'Arjuna', 'Giloy'
];

const qualityGrades = [
  'Premium', 'Grade A', 'Grade B', 'Standard'
];

// Mock voice data for simulation - todo: remove mock functionality
const mockVoiceData = {
  species: 'Ashwagandha',
  quantity: 25.5,
  moisture: 12.3,
  quality: 'Premium',
  gpsLat: 10.8505,
  gpsLng: 76.2711,
  collectorId: 'COL001'
};

export default function CollectionForm() {
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const { addBatch, isOffline, language, syncData, generateSMSPayload } = useApp();
  const { toast } = useToast();

  const form = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      species: '',
      quantity: 0,
      moisture: 0,
      quality: '',
      gpsLat: 0,
      gpsLng: 0,
      collectorId: ''
    }
  });

  const translations = {
    en: {
      title: 'Herb Collection Form',
      species: 'Herb Species',
      quantity: 'Quantity (kg)',
      moisture: 'Moisture %',
      quality: 'Quality Grade',
      gps: 'GPS Location',
      collector: 'Collector ID',
      voiceInput: 'Voice Input',
      internetSync: 'Sync to Internet',
      smsSync: 'Generate SMS',
      submit: 'Record Collection',
      recording: 'Recording...',
      offlineMode: 'Offline Mode - Data saved locally',
      currentLocation: 'Get Current Location',
      latitude: 'Latitude',
      longitude: 'Longitude'
    },
    hi: {
      title: 'जड़ी-बूटी संग्रह फॉर्म',
      species: 'जड़ी-बूटी की प्रजाति',
      quantity: 'मात्रा (किग्रा)',
      moisture: 'नमी %',
      quality: 'गुणवत्ता ग्रेड',
      gps: 'GPS स्थान',
      collector: 'संग्रहकर्ता ID',
      voiceInput: 'वॉयस इनपुट',
      internetSync: 'इंटरनेट सिंक',
      smsSync: 'SMS जेनरेट करें',
      submit: 'संग्रह रिकॉर्ड करें',
      recording: 'रिकॉर्डिंग...',
      offlineMode: 'ऑफ़लाइन मोड - डेटा स्थानीय रूप से सहेजा गया',
      currentLocation: 'वर्तमान स्थान प्राप्त करें',
      latitude: 'अक्षांश',
      longitude: 'देशांतर'
    }
  };

  const t = translations[language];

  const simulateVoiceInput = () => {
    setIsVoiceRecording(true);
    
    // Simulate voice recording for 2 seconds
    setTimeout(() => {
      form.setValue('species', mockVoiceData.species);
      form.setValue('quantity', mockVoiceData.quantity);
      form.setValue('moisture', mockVoiceData.moisture);
      form.setValue('quality', mockVoiceData.quality);
      form.setValue('gpsLat', mockVoiceData.gpsLat);
      form.setValue('gpsLng', mockVoiceData.gpsLng);
      form.setValue('collectorId', mockVoiceData.collectorId);
      
      setIsVoiceRecording(false);
      toast({
        title: "Voice Input Complete",
        description: "Form filled with voice data"
      });
    }, 2000);
  };

  const getCurrentLocation = () => {
    // Mock GPS for demo - todo: remove mock functionality
    const mockLat = 10.8505 + (Math.random() - 0.5) * 0.01;
    const mockLng = 76.2711 + (Math.random() - 0.5) * 0.01;
    
    form.setValue('gpsLat', Number(mockLat.toFixed(6)));
    form.setValue('gpsLng', Number(mockLng.toFixed(6)));
    
    toast({
      title: "Location Retrieved",
      description: `Coordinates: ${mockLat.toFixed(6)}, ${mockLng.toFixed(6)}`
    });
  };

  const onSubmit = async (data: CollectionFormData) => {
    const batchData = {
      farmerId: 'farmer1', // todo: get from auth context
      farmerName: 'Current Farmer', // todo: get from auth context
      collectionDate: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      ...data
    };

    addBatch(batchData);
    
    if (isOffline) {
      toast({
        title: "Collection Recorded",
        description: "Data saved locally (offline mode)"
      });
    } else {
      setSyncStatus('syncing');
      try {
        await syncData();
        setSyncStatus('success');
        toast({
          title: "Collection Synced",
          description: "Data successfully uploaded to server"
        });
      } catch (error) {
        setSyncStatus('error');
        toast({
          title: "Sync Failed",
          description: "Data saved locally, will retry when online",
          variant: "destructive"
        });
      }
    }
    
    form.reset();
  };

  const handleInternetSync = async () => {
    setSyncStatus('syncing');
    try {
      await syncData();
      setSyncStatus('success');
      toast({
        title: "Sync Complete",
        description: "All offline data synced to server"
      });
    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Sync Failed",
        description: "Please check your internet connection",
        variant: "destructive"
      });
    }
  };

  const handleSMSSync = () => {
    const formData = form.getValues();
    if (formData.species && formData.quantity) {
      const batchData = {
        id: 'temp_batch',
        farmerId: 'farmer1',
        farmerName: 'Current Farmer',
        collectionDate: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        ...formData
      };
      
      const smsPayload = generateSMSPayload(batchData);
      toast({
        title: "SMS Payload Generated",
        description: `SMS: ${smsPayload}`
      });
    } else {
      toast({
        title: "Incomplete Data",
        description: "Please fill required fields first",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {t.title}
          </CardTitle>
          {isOffline && (
            <Badge variant="destructive" className="gap-1">
              <WifiOff className="w-3 h-3" />
              {t.offlineMode}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Species Selection */}
          <div className="space-y-2">
            <Label htmlFor="species">{t.species}</Label>
            <Select 
              value={form.watch('species')} 
              onValueChange={(value) => form.setValue('species', value)}
            >
              <SelectTrigger data-testid="select-species">
                <SelectValue placeholder="Select herb species" />
              </SelectTrigger>
              <SelectContent>
                {herbSpecies.map((species) => (
                  <SelectItem key={species} value={species}>
                    {species}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity and Moisture */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">{t.quantity}</Label>
              <Input
                id="quantity"
                type="number"
                step="0.1"
                {...form.register('quantity', { valueAsNumber: true })}
                data-testid="input-quantity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moisture">{t.moisture}</Label>
              <Input
                id="moisture"
                type="number"
                step="0.1"
                {...form.register('moisture', { valueAsNumber: true })}
                data-testid="input-moisture"
              />
            </div>
          </div>

          {/* Quality Grade */}
          <div className="space-y-2">
            <Label htmlFor="quality">{t.quality}</Label>
            <Select 
              value={form.watch('quality')} 
              onValueChange={(value) => form.setValue('quality', value)}
            >
              <SelectTrigger data-testid="select-quality">
                <SelectValue placeholder="Select quality grade" />
              </SelectTrigger>
              <SelectContent>
                {qualityGrades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* GPS Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t.gps}</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={getCurrentLocation}
                data-testid="button-gps-location"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {t.currentLocation}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="gpsLat" className="text-sm text-muted-foreground">{t.latitude}</Label>
                <Input
                  id="gpsLat"
                  type="number"
                  step="0.000001"
                  {...form.register('gpsLat', { valueAsNumber: true })}
                  data-testid="input-latitude"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gpsLng" className="text-sm text-muted-foreground">{t.longitude}</Label>
                <Input
                  id="gpsLng"
                  type="number"
                  step="0.000001"
                  {...form.register('gpsLng', { valueAsNumber: true })}
                  data-testid="input-longitude"
                />
              </div>
            </div>
          </div>

          {/* Collector ID */}
          <div className="space-y-2">
            <Label htmlFor="collectorId">{t.collector}</Label>
            <Input
              id="collectorId"
              {...form.register('collectorId')}
              placeholder="e.g., COL001"
              data-testid="input-collector-id"
            />
          </div>

          {/* Voice Input Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className={`gap-2 ${isVoiceRecording ? 'animate-pulse' : ''}`}
              onClick={simulateVoiceInput}
              disabled={isVoiceRecording}
              data-testid="button-voice-input"
            >
              <Mic className="w-5 h-5" />
              {isVoiceRecording ? t.recording : t.voiceInput}
            </Button>
          </div>

          {/* Sync Options */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleInternetSync}
              disabled={syncStatus === 'syncing'}
              className="flex-1 gap-2"
              data-testid="button-internet-sync"
            >
              <Wifi className="w-4 h-4" />
              {t.internetSync}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleSMSSync}
              className="flex-1 gap-2"
              data-testid="button-sms-sync"
            >
              <Smartphone className="w-4 h-4" />
              {t.smsSync}
            </Button>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full gap-2"
            disabled={syncStatus === 'syncing'}
            data-testid="button-submit-collection"
          >
            <Send className="w-4 h-4" />
            {t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}