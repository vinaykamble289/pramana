import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { BarChart3, TrendingUp, Package, FileText, Download, Users, MapPin, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { batches, farmers, blockchainRecords, language } = useApp();
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Admin Dashboard',
      kpis: 'Key Performance Indicators',
      totalHarvested: 'Total Harvested',
      totalValidated: 'Total Validated',
      totalExported: 'Total Exported',
      activeFarmers: 'Active Farmers',
      harvestByRegion: 'Harvest by Region',
      complianceOverTime: 'Compliance Over Time',
      speciesDistribution: 'Species Distribution',
      generateReport: 'Generate Sustainability Report',
      reportGenerated: 'Sustainability report generated',
      downloadReport: 'Download report from your downloads folder',
      kilograms: 'kg',
      farmers: 'farmers',
      batches: 'batches',
      kerala: 'Kerala',
      karnataka: 'Karnataka',
      tamilnadu: 'Tamil Nadu',
      january: 'Jan',
      february: 'Feb',
      march: 'Mar',
      april: 'Apr',
      may: 'May',
      june: 'Jun'
    },
    hi: {
      title: 'प्रशासक डैशबोर्ड',
      kpis: 'मुख्य प्रदर्शन संकेतक',
      totalHarvested: 'कुल फसल',
      totalValidated: 'कुल सत्यापित',
      totalExported: 'कुल निर्यातित',
      activeFarmers: 'सक्रिय किसान',
      harvestByRegion: 'क्षेत्र के अनुसार फसल',
      complianceOverTime: 'समय के साथ अनुपालन',
      speciesDistribution: 'प्रजाति वितरण',
      generateReport: 'स्थिरता रिपोर्ट जेनरेट करें',
      reportGenerated: 'स्थिरता रिपोर्ट जेनरेट की गई',
      downloadReport: 'अपने डाउनलोड फोल्डर से रिपोर्ट डाउनलोड करें',
      kilograms: 'किग्रा',
      farmers: 'किसान',
      batches: 'बैच',
      kerala: 'केरल',
      karnataka: 'कर्नाटक',
      tamilnadu: 'तमिलनाडु',
      january: 'जन',
      february: 'फर',
      march: 'मार',
      april: 'अप्र',
      may: 'मई',
      june: 'जून'
    }
  };

  const t = translations[language];

  // Calculate KPIs
  const totalHarvested = batches.reduce((sum, batch) => sum + batch.quantity, 0);
  const totalValidated = batches.filter(b => ['validated', 'processing', 'tested', 'completed'].includes(b.status)).length;
  const totalExported = batches.filter(b => b.status === 'completed').length;
  const activeFarmers = farmers.length;

  // Mock data for charts - todo: remove mock functionality
  const harvestByRegionData = [
    { region: t.kerala, quantity: 245, batches: 12 },
    { region: t.karnataka, quantity: 189, batches: 8 },
    { region: t.tamilnadu, quantity: 156, batches: 6 }
  ];

  const complianceData = [
    { month: t.january, compliance: 85, validated: 12, total: 14 },
    { month: t.february, compliance: 92, validated: 11, total: 12 },
    { month: t.march, compliance: 88, validated: 15, total: 17 },
    { month: t.april, compliance: 95, validated: 19, total: 20 },
    { month: t.may, compliance: 90, validated: 18, total: 20 },
    { month: t.june, compliance: 94, validated: 16, total: 17 }
  ];

  const speciesData = [
    { name: 'Ashwagandha', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Turmeric', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Ginger', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Tulsi', value: 12, color: 'hsl(var(--chart-4))' },
    { name: 'Others', value: 8, color: 'hsl(var(--chart-5))' }
  ];

  const handleGenerateReport = () => {
    // Mock report generation
    toast({
      title: t.reportGenerated,
      description: t.downloadReport
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-chart-4" />
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        <Button 
          onClick={handleGenerateReport}
          className="gap-2"
          data-testid="button-generate-report"
        >
          <FileText className="w-4 h-4" />
          {t.generateReport}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalHarvested}</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHarvested.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">{t.kilograms}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalValidated}</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalValidated}</div>
            <p className="text-xs text-muted-foreground">{t.batches}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalExported}</CardTitle>
            <Download className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExported}</div>
            <p className="text-xs text-muted-foreground">{t.batches}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.activeFarmers}</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFarmers}</div>
            <p className="text-xs text-muted-foreground">{t.farmers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Harvest by Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t.harvestByRegion}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={harvestByRegionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'quantity' ? `${value}kg` : `${value} batches`,
                    name === 'quantity' ? 'Quantity' : 'Batches'
                  ]}
                />
                <Bar dataKey="quantity" fill="hsl(var(--chart-1))" />
                <Bar dataKey="batches" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Species Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t.speciesDistribution}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t.complianceOverTime}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'compliance' ? `${value}%` : `${value} batches`,
                  name === 'compliance' ? 'Compliance Rate' : 
                  name === 'validated' ? 'Validated' : 'Total'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={3}
                dot={{ r: 6 }}
              />
              <Bar dataKey="validated" fill="hsl(var(--chart-2))" opacity={0.3} />
              <Bar dataKey="total" fill="hsl(var(--chart-3))" opacity={0.2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Blockchain Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {blockchainRecords.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No blockchain activity yet
            </div>
          ) : (
            <div className="space-y-3">
              {blockchainRecords.slice(0, 5).map((record) => (
                <div 
                  key={record.id} 
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      Blockchain Anchor: {record.batchIds.length} batches
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {record.blockchainHash.slice(0, 32)}...
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {new Date(record.timestamp).toLocaleDateString()}
                    </Badge>
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