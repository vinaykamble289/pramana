import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { ShieldCheck, Clock, CheckCircle, XCircle, Hash, Blocks, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ValidationDashboard() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  
  const { 
    batches, 
    validationQueue, 
    blockchainRecords, 
    validateBatch, 
    generateMerkleRoot, 
    anchorToBlockchain,
    language 
  } = useApp();
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Validation & Blockchain Portal',
      validationQueue: 'Validation Queue',
      blockchainExplorer: 'Blockchain Explorer',
      pendingBatches: 'Pending Validation',
      validate: 'Validate',
      generateMerkle: 'Generate Merkle Root',
      anchorBlockchain: 'Anchor to Blockchain',
      validated: 'Validated',
      failed: 'Failed',
      noPending: 'No batches pending validation',
      noRecords: 'No blockchain records yet',
      batchValidated: 'Batch validated successfully',
      merkleGenerated: 'Merkle root generated',
      anchored: 'Anchored to blockchain',
      geoCheck: 'Geo-fencing Check',
      seasonalCheck: 'Seasonal Check',
      qualityCheck: 'Quality Check',
      blockHash: 'Block Hash',
      timestamp: 'Timestamp',
      merkleRoot: 'Merkle Root',
      batchCount: 'Batches'
    },
    hi: {
      title: 'सत्यापन और ब्लॉकचेन पोर्टल',
      validationQueue: 'सत्यापन कतार',
      blockchainExplorer: 'ब्लॉकचेन एक्सप्लोरर',
      pendingBatches: 'सत्यापन लंबित',
      validate: 'सत्यापित करें',
      generateMerkle: 'मर्कल रूट जेनरेट करें',
      anchorBlockchain: 'ब्लॉकचेन में एंकर करें',
      validated: 'सत्यापित',
      failed: 'असफल',
      noPending: 'कोई बैच सत्यापन लंबित नहीं',
      noRecords: 'अभी तक कोई ब्लॉकचेन रिकॉर्ड नहीं',
      batchValidated: 'बैच सफलतापूर्वक सत्यापित',
      merkleGenerated: 'मर्कल रूट जेनरेट किया गया',
      anchored: 'ब्लॉकचेन में एंकर किया गया',
      geoCheck: 'जियो-फेंसिंग जांच',
      seasonalCheck: 'मौसमी जांच',
      qualityCheck: 'गुणवत्ता जांच',
      blockHash: 'ब्लॉक हैश',
      timestamp: 'टाइमस्टैम्प',
      merkleRoot: 'मर्कल रूट',
      batchCount: 'बैच'
    }
  };

  const t = translations[language];

  const pendingBatches = batches.filter(b => b.status === 'pending');
  const validatedBatches = batches.filter(b => b.status === 'validated' && !b.merkleRoot);
  const merkleReadyBatches = batches.filter(b => b.merkleRoot && !b.blockchainHash);

  const handleValidate = (batchId: string) => {
    // Mock validation checks
    const checks = ['geo-fencing', 'seasonal', 'quality'];
    const randomCheck = checks[Math.floor(Math.random() * checks.length)];
    
    validateBatch(batchId);
    
    toast({
      title: t.batchValidated,
      description: `Batch ${batchId} passed ${randomCheck} validation`
    });
  };

  const handleGenerateMerkle = () => {
    if (validatedBatches.length === 0) return;
    
    const batchIds = validatedBatches.map(b => b.id);
    generateMerkleRoot(batchIds);
    
    toast({
      title: t.merkleGenerated,
      description: `Generated for ${batchIds.length} batches`
    });
  };

  const handleAnchorToBlockchain = (merkleRoot: string) => {
    const batchesWithMerkle = batches.filter(b => b.merkleRoot === merkleRoot);
    const batchIds = batchesWithMerkle.map(b => b.id);
    
    anchorToBlockchain(merkleRoot, batchIds);
    
    toast({
      title: t.anchored,
      description: `Merkle root anchored with ${batchIds.length} batches`
    });
  };

  const getValidationIcon = (type: string) => {
    switch (type) {
      case 'geo-fencing': return <Globe className="w-4 h-4" />;
      case 'seasonal': return <Clock className="w-4 h-4" />;
      case 'quality': return <ShieldCheck className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">{t.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validation Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {t.pendingBatches}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingBatches.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t.noPending}</h3>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingBatches.map((batch) => (
                  <div 
                    key={batch.id}
                    className="p-3 border rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{batch.species}</span>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Farmer: {batch.farmerName}</div>
                      <div>Quantity: {batch.quantity}kg</div>
                      <div>Location: {batch.gpsLat.toFixed(4)}, {batch.gpsLng.toFixed(4)}</div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleValidate(batch.id)}
                      data-testid={`button-validate-${batch.id}`}
                    >
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      {t.validate}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Merkle Root Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Merkle Root Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {validatedBatches.length} validated batches ready for Merkle root generation
              </div>
              
              {validatedBatches.length > 0 && (
                <div className="space-y-2">
                  {validatedBatches.slice(0, 3).map((batch) => (
                    <div key={batch.id} className="p-2 bg-muted/50 rounded text-sm">
                      <div className="font-medium">{batch.species}</div>
                      <div className="text-xs text-muted-foreground font-mono">{batch.id}</div>
                    </div>
                  ))}
                  {validatedBatches.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{validatedBatches.length - 3} more batches
                    </div>
                  )}
                </div>
              )}
              
              <Button 
                className="w-full"
                onClick={handleGenerateMerkle}
                disabled={validatedBatches.length === 0}
                data-testid="button-generate-merkle"
              >
                <Hash className="w-4 h-4 mr-2" />
                {t.generateMerkle}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Anchoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Blocks className="w-5 h-5" />
              Blockchain Anchoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {merkleReadyBatches.length > 0 ? (
                <div className="space-y-3">
                  {/* Group by merkle root */}
                  {Array.from(new Set(merkleReadyBatches.map(b => b.merkleRoot))).map((merkleRoot) => {
                    const batchesForRoot = merkleReadyBatches.filter(b => b.merkleRoot === merkleRoot);
                    return (
                      <div key={merkleRoot} className="p-3 border rounded-lg">
                        <div className="text-xs text-muted-foreground mb-2">
                          {batchesForRoot.length} batches
                        </div>
                        <div className="font-mono text-xs mb-3 truncate">
                          {merkleRoot}
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleAnchorToBlockchain(merkleRoot!)}
                          data-testid={`button-anchor-${merkleRoot}`}
                        >
                          <Blocks className="w-3 h-3 mr-1" />
                          {t.anchorBlockchain}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No Merkle roots ready for anchoring
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Blocks className="w-5 h-5" />
            {t.blockchainExplorer}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {blockchainRecords.length === 0 ? (
            <div className="text-center py-8">
              <Blocks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t.noRecords}</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {blockchainRecords.map((record) => (
                <div 
                  key={record.id} 
                  className="p-4 border rounded-lg hover-elevate"
                  data-testid={`blockchain-record-${record.id}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">{t.blockHash}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate">
                        {record.blockchainHash}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">{t.merkleRoot}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate">
                        {record.merkleRoot}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">{t.timestamp}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(record.timestamp).toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">{t.batchCount}</div>
                      <div className="text-xs text-muted-foreground">
                        {record.batchIds.length} batches
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-xs text-muted-foreground">
                      Batch IDs: {record.batchIds.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}