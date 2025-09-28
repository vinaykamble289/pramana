import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Package, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import CollectionForm from './CollectionForm';

export default function FarmerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const { batches, language } = useApp();

  const translations = {
    en: {
      title: 'Farmer Dashboard',
      newCollection: 'New Collection',
      recentBatches: 'Recent Collections',
      totalCollections: 'Total Collections',
      pendingValidation: 'Pending Validation',
      validated: 'Validated',
      viewForm: 'Start New Collection',
      backToDashboard: 'Back to Dashboard',
      noBatches: 'No collections yet',
      startCollecting: 'Start by recording your first herb collection'
    },
    hi: {
      title: 'किसान डैशबोर्ड',
      newCollection: 'नया संग्रह',
      recentBatches: 'हाल के संग्रह',
      totalCollections: 'कुल संग्रह',
      pendingValidation: 'सत्यापन लंबित',
      validated: 'सत्यापित',
      viewForm: 'नया संग्रह शुरू करें',
      backToDashboard: 'डैशबोर्ड पर वापस',
      noBatches: 'अभी तक कोई संग्रह नहीं',
      startCollecting: 'अपना पहला जड़ी-बूटी संग्रह रिकॉर्ड करके शुरुआत करें'
    }
  };

  const t = translations[language];

  const stats = {
    total: batches.length,
    pending: batches.filter(b => b.status === 'pending').length,
    validated: batches.filter(b => b.status === 'validated' || b.status === 'processing' || b.status === 'tested' || b.status === 'completed').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'validated': return 'default';
      case 'processing': return 'secondary';
      case 'tested': return 'default';
      case 'completed': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-3 h-3" />;
      case 'validated': 
      case 'processing':
      case 'tested':
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  if (showForm) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t.newCollection}</h1>
          <Button 
            variant="outline" 
            onClick={() => setShowForm(false)}
            data-testid="button-back-dashboard"
          >
            {t.backToDashboard}
          </Button>
        </div>
        <CollectionForm />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2"
          data-testid="button-new-collection"
        >
          <Package className="w-4 h-4" />
          {t.viewForm}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalCollections}</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time collections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.pendingValidation}</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.validated}</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.validated}</div>
            <p className="text-xs text-muted-foreground">Successfully validated</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Batches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {t.recentBatches}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {batches.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t.noBatches}</h3>
              <p className="text-muted-foreground mb-4">{t.startCollecting}</p>
              <Button 
                onClick={() => setShowForm(true)}
                data-testid="button-start-collecting"
              >
                {t.viewForm}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {batches.slice(0, 5).map((batch) => (
                <div 
                  key={batch.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                  data-testid={`batch-item-${batch.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{batch.species}</h3>
                      <Badge 
                        variant={getStatusColor(batch.status) as any}
                        className="gap-1"
                      >
                        {getStatusIcon(batch.status)}
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="mr-4">{batch.quantity}kg</span>
                      <span className="mr-4">{batch.quality}</span>
                      <span>{batch.collectionDate}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="font-mono text-xs">{batch.id}</div>
                    {batch.qrCode && (
                      <div className="text-xs">QR: {batch.qrCode}</div>
                    )}
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