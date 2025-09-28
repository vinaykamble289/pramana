import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { Factory, Package, QrCode, Plus, FileUp, Download, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/hooks/use-toast';

export default function ProcessorDashboard() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [showProcessingForm, setShowProcessingForm] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [processingDescription, setProcessingDescription] = useState('');
  const [mockFiles, setMockFiles] = useState<string[]>([]);
  
  const { batches, addProcessingStep, updateBatch, language } = useApp();
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Processor Portal',
      validatedBatches: 'Validated Batches Ready for Processing',
      processingSteps: 'Processing Steps',
      addStep: 'Add Processing Step',
      step: 'Processing Step',
      description: 'Description',
      files: 'Upload Files',
      generateQR: 'Generate QR Code',
      downloadQR: 'Download QR',
      noBatches: 'No validated batches available',
      waitingForBatches: 'Waiting for batches to be validated',
      stepAdded: 'Processing step added successfully',
      qrGenerated: 'QR code generated for batch',
      mockFile: 'Mock file uploaded:',
      drying: 'Drying',
      grinding: 'Grinding', 
      packaging: 'Packaging',
      quality_check: 'Quality Check'
    },
    hi: {
      title: 'प्रोसेसर पोर्टल',
      validatedBatches: 'प्रसंस्करण के लिए तैयार सत्यापित बैच',
      processingSteps: 'प्रसंस्करण चरण',
      addStep: 'प्रसंस्करण चरण जोड़ें',
      step: 'प्रसंस्करण चरण',
      description: 'विवरण',
      files: 'फाइलें अपलोड करें',
      generateQR: 'QR कोड जेनरेट करें',
      downloadQR: 'QR डाउनलोड करें',
      noBatches: 'कोई सत्यापित बैच उपलब्ध नहीं',
      waitingForBatches: 'बैचों के सत्यापित होने की प्रतीक्षा',
      stepAdded: 'प्रसंस्करण चरण सफलतापूर्वक जोड़ा गया',
      qrGenerated: 'बैच के लिए QR कोड जेनरेट किया गया',
      mockFile: 'मॉक फाइल अपलोड की गई:',
      drying: 'सुखाना',
      grinding: 'पीसना',
      packaging: 'पैकेजिंग',
      quality_check: 'गुणवत्ता जांच'
    }
  };

  const t = translations[language];

  const validatedBatches = batches.filter(b => b.status === 'validated' || b.status === 'processing');
  const selectedBatchData = selectedBatch ? batches.find(b => b.id === selectedBatch) : null;

  const handleAddProcessingStep = () => {
    if (!selectedBatch || !processingStep) return;
    
    const step = {
      id: `step_${Date.now()}`,
      step: processingStep,
      description: processingDescription,
      completedAt: new Date().toISOString(),
      files: mockFiles.length > 0 ? mockFiles : undefined
    };
    
    addProcessingStep(selectedBatch, step);
    updateBatch(selectedBatch, { status: 'processing' });
    
    setProcessingStep('');
    setProcessingDescription('');
    setMockFiles([]);
    setShowProcessingForm(false);
    
    toast({
      title: t.stepAdded,
      description: `${processingStep} step added to batch ${selectedBatch}`
    });
  };

  const handleGenerateQR = (batchId: string) => {
    const qrCode = `PRAM-${batchId.slice(-8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    updateBatch(batchId, { qrCode, status: 'completed' });
    
    toast({
      title: t.qrGenerated,
      description: `QR Code: ${qrCode}`
    });
  };

  const handleMockFileUpload = () => {
    const mockFileName = `processing_doc_${Date.now()}.pdf`;
    setMockFiles(prev => [...prev, mockFileName]);
    
    toast({
      title: t.mockFile,
      description: mockFileName
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Factory className="w-8 h-8 text-chart-2" />
        <h1 className="text-3xl font-bold">{t.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Validated Batches List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t.validatedBatches}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {validatedBatches.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t.noBatches}</h3>
                <p className="text-muted-foreground">{t.waitingForBatches}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {validatedBatches.map((batch) => (
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
                      <Badge variant={batch.status === 'processing' ? 'secondary' : 'default'}>
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="mr-4">{batch.quantity}kg</span>
                      <span className="mr-4">{batch.quality}</span>
                      <span>{batch.farmerName}</span>
                    </div>
                    {batch.processingSteps && (
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">
                          {batch.processingSteps.length} processing step(s)
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Processing Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5" />
                {t.processingSteps}
              </CardTitle>
              {selectedBatch && (
                <Button 
                  onClick={() => setShowProcessingForm(true)}
                  size="sm"
                  className="gap-2"
                  data-testid="button-add-step"
                >
                  <Plus className="w-4 h-4" />
                  {t.addStep}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedBatch ? (
              <div className="text-center py-8 text-muted-foreground">
                Select a batch to view processing details
              </div>
            ) : (
              <div className="space-y-4">
                {/* Batch Info */}
                {selectedBatchData && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">{selectedBatchData.species}</h3>
                    <div className="text-sm text-muted-foreground">
                      <div>Batch ID: {selectedBatchData.id}</div>
                      <div>Farmer: {selectedBatchData.farmerName}</div>
                      <div>Quantity: {selectedBatchData.quantity}kg</div>
                    </div>
                  </div>
                )}

                {/* Processing Steps */}
                {selectedBatchData?.processingSteps && selectedBatchData.processingSteps.length > 0 ? (
                  <div className="space-y-3">
                    {selectedBatchData.processingSteps.map((step, index) => (
                      <div key={step.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{step.step}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Completed: {new Date(step.completedAt).toLocaleDateString()}
                        </div>
                        {step.files && (
                          <div className="mt-2">
                            {step.files.map((file, i) => (
                              <Badge key={i} variant="outline" className="mr-1 text-xs">
                                {file}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No processing steps added yet
                  </div>
                )}

                {/* QR Code Generation */}
                {selectedBatchData && (
                  <div className="border-t pt-4">
                    {selectedBatchData.qrCode ? (
                      <div className="text-center space-y-4">
                        <div className="inline-block p-4 bg-white rounded-lg border">
                          <QRCodeSVG value={selectedBatchData.qrCode} size={128} />
                        </div>
                        <div className="space-y-2">
                          <p className="font-mono text-sm">{selectedBatchData.qrCode}</p>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            {t.downloadQR}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Button 
                          onClick={() => handleGenerateQR(selectedBatch)}
                          className="gap-2"
                          data-testid="button-generate-qr"
                        >
                          <QrCode className="w-4 h-4" />
                          {t.generateQR}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Processing Step Modal */}
      {showProcessingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>{t.addStep}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="step">{t.step}</Label>
                <Input
                  id="step"
                  value={processingStep}
                  onChange={(e) => setProcessingStep(e.target.value)}
                  placeholder="e.g., Drying, Grinding, Packaging"
                  data-testid="input-processing-step"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">{t.description}</Label>
                <Textarea
                  id="description"
                  value={processingDescription}
                  onChange={(e) => setProcessingDescription(e.target.value)}
                  placeholder="Describe the processing step..."
                  data-testid="input-step-description"
                />
              </div>

              <div className="space-y-2">
                <Label>{t.files}</Label>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleMockFileUpload}
                    className="gap-2"
                    data-testid="button-upload-file"
                  >
                    <FileUp className="w-4 h-4" />
                    Upload Document
                  </Button>
                </div>
                {mockFiles.length > 0 && (
                  <div className="space-y-1">
                    {mockFiles.map((file, i) => (
                      <Badge key={i} variant="outline">{file}</Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleAddProcessingStep}
                  className="flex-1"
                  disabled={!processingStep}
                  data-testid="button-save-step"
                >
                  Add Step
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowProcessingForm(false)}
                  className="flex-1"
                  data-testid="button-cancel-step"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}