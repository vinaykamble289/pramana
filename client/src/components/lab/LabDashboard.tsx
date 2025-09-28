import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp, type LabResults } from '@/contexts/AppContext';
import { FlaskConical, TestTube, FileCheck, Upload, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LabDashboard() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [showTestForm, setShowTestForm] = useState(false);
  const [labResults, setLabResults] = useState({
    moisture: 0,
    pesticide: '',
    dnaAuthentication: '',
    status: 'passed' as 'passed' | 'failed'
  });
  
  const { batches, updateLabResults, language } = useApp();
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Laboratory Portal',
      processingBatches: 'Batches Ready for Testing',
      testResults: 'Test Results',
      addResults: 'Add Test Results',
      moisture: 'Moisture Content (%)',
      pesticide: 'Pesticide Analysis',
      dna: 'DNA Authentication',
      status: 'Test Status',
      passed: 'Passed',
      failed: 'Failed',
      submit: 'Submit Results',
      cancel: 'Cancel',
      noBatches: 'No batches ready for testing',
      waitingForProcessing: 'Waiting for batches to be processed',
      resultsSubmitted: 'Lab results submitted successfully',
      selectBatch: 'Select a batch to view test details',
      testCompleted: 'Testing completed',
      negative: 'Negative',
      positive: 'Positive',
      authentic: 'Authentic',
      contaminated: 'Contaminated'
    },
    hi: {
      title: 'प्रयोगशाला पोर्टल',
      processingBatches: 'परीक्षण के लिए तैयार बैच',
      testResults: 'परीक्षण परिणाम',
      addResults: 'परीक्षण परिणाम जोड़ें',
      moisture: 'नमी सामग्री (%)',
      pesticide: 'कीटनाशक विश्लेषण',
      dna: 'DNA प्रमाणीकरण',
      status: 'परीक्षण स्थिति',
      passed: 'पास',
      failed: 'फेल',
      submit: 'परिणाम जमा करें',
      cancel: 'रद्द करें',
      noBatches: 'परीक्षण के लिए कोई बैच तैयार नहीं',
      waitingForProcessing: 'बैचों के प्रसंस्करित होने की प्रतीक्षा',
      resultsSubmitted: 'प्रयोगशाला परिणाम सफलतापूर्वक जमा किए गए',
      selectBatch: 'परीक्षण विवरण देखने के लिए एक बैच चुनें',
      testCompleted: 'परीक्षण पूर्ण',
      negative: 'नकारात्मक',
      positive: 'सकारात्मक',
      authentic: 'प्रामाणिक',
      contaminated: 'दूषित'
    }
  };

  const t = translations[language];

  const processingBatches = batches.filter(b => b.status === 'processing' || b.status === 'tested');
  const selectedBatchData = selectedBatch ? batches.find(b => b.id === selectedBatch) : null;

  const handleSubmitResults = () => {
    if (!selectedBatch) return;
    
    const results: LabResults = {
      ...labResults,
      testedAt: new Date().toISOString()
    };
    
    updateLabResults(selectedBatch, results);
    
    setLabResults({
      moisture: 0,
      pesticide: '',
      dnaAuthentication: '',
      status: 'passed'
    });
    setShowTestForm(false);
    
    toast({
      title: t.resultsSubmitted,
      description: `Results for batch ${selectedBatch} have been recorded`
    });
  };

  const getStatusIcon = (status: 'passed' | 'failed') => {
    return status === 'passed' ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const getStatusColor = (status: 'passed' | 'failed') => {
    return status === 'passed' ? 'default' : 'destructive';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <FlaskConical className="w-8 h-8 text-chart-3" />
        <h1 className="text-3xl font-bold">{t.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Batches List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              {t.processingBatches}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {processingBatches.length === 0 ? (
              <div className="text-center py-8">
                <TestTube className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t.noBatches}</h3>
                <p className="text-muted-foreground">{t.waitingForProcessing}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {processingBatches.map((batch) => (
                  <div 
                    key={batch.id}
                    className={`p-4 border rounded-lg cursor-pointer hover-elevate ${
                      selectedBatch === batch.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedBatch(batch.id)}
                    data-testid={`batch-item-${batch.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{batch.species}</h3>
                      <Badge variant={batch.status === 'tested' ? 'default' : 'secondary'}>
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="mr-4">{batch.quantity}kg</span>
                      <span className="mr-4">{batch.quality}</span>
                      <span>{batch.farmerName}</span>
                    </div>
                    {batch.qrCode && (
                      <div className="text-xs text-muted-foreground mt-1">
                        QR: {batch.qrCode}
                      </div>
                    )}
                    {batch.labResults && (
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusIcon(batch.labResults.status)}
                        <span className="text-xs">{t.testCompleted}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                {t.testResults}
              </CardTitle>
              {selectedBatch && !selectedBatchData?.labResults && (
                <Button 
                  onClick={() => setShowTestForm(true)}
                  size="sm"
                  className="gap-2"
                  data-testid="button-add-results"
                >
                  <Upload className="w-4 h-4" />
                  {t.addResults}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedBatch ? (
              <div className="text-center py-8 text-muted-foreground">
                {t.selectBatch}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Batch Info */}
                {selectedBatchData && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">{selectedBatchData.species}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Batch ID: {selectedBatchData.id}</div>
                      <div>Farmer: {selectedBatchData.farmerName}</div>
                      <div>Quantity: {selectedBatchData.quantity}kg</div>
                      <div>Original Moisture: {selectedBatchData.moisture}%</div>
                    </div>
                  </div>
                )}

                {/* Test Results */}
                {selectedBatchData?.labResults ? (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        {getStatusIcon(selectedBatchData.labResults.status)}
                        <span className="font-medium">
                          Test Status: 
                          <Badge 
                            variant={getStatusColor(selectedBatchData.labResults.status) as any}
                            className="ml-2"
                          >
                            {selectedBatchData.labResults.status === 'passed' ? t.passed : t.failed}
                          </Badge>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Moisture Content:</span>
                          <div className="text-muted-foreground">
                            {selectedBatchData.labResults.moisture}%
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium">Pesticide Analysis:</span>
                          <div className="text-muted-foreground">
                            {selectedBatchData.labResults.pesticide}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium">DNA Authentication:</span>
                          <div className="text-muted-foreground">
                            {selectedBatchData.labResults.dnaAuthentication}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium">Tested Date:</span>
                          <div className="text-muted-foreground">
                            {new Date(selectedBatchData.labResults.testedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No test results available yet
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Test Results Modal */}
      {showTestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>{t.addResults}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="moisture">{t.moisture}</Label>
                <Input
                  id="moisture"
                  type="number"
                  step="0.1"
                  value={labResults.moisture}
                  onChange={(e) => setLabResults(prev => ({ 
                    ...prev, 
                    moisture: parseFloat(e.target.value) || 0 
                  }))}
                  data-testid="input-moisture"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pesticide">{t.pesticide}</Label>
                <Select
                  value={labResults.pesticide}
                  onValueChange={(value) => setLabResults(prev => ({ ...prev, pesticide: value }))}
                >
                  <SelectTrigger data-testid="select-pesticide">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Negative">{t.negative}</SelectItem>
                    <SelectItem value="Positive">{t.positive}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dna">{t.dna}</Label>
                <Select
                  value={labResults.dnaAuthentication}
                  onValueChange={(value) => setLabResults(prev => ({ ...prev, dnaAuthentication: value }))}
                >
                  <SelectTrigger data-testid="select-dna">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Authentic">{t.authentic}</SelectItem>
                    <SelectItem value="Contaminated">{t.contaminated}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{t.status}</Label>
                <Select
                  value={labResults.status}
                  onValueChange={(value: 'passed' | 'failed') => setLabResults(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger data-testid="select-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passed">{t.passed}</SelectItem>
                    <SelectItem value="failed">{t.failed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleSubmitResults}
                  className="flex-1"
                  data-testid="button-submit-results"
                >
                  {t.submit}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTestForm(false)}
                  className="flex-1"
                  data-testid="button-cancel-results"
                >
                  {t.cancel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}