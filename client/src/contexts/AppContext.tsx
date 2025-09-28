import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import localforage from 'localforage';

// Types for the application state
export type Language = 'en' | 'hi';

export interface Batch {
  id: string;
  farmerId: string;
  farmerName: string;
  species: string;
  quantity: number;
  moisture: number;
  quality: string;
  gpsLat: number;
  gpsLng: number;
  collectionDate: string;
  status: 'pending' | 'validated' | 'processing' | 'tested' | 'completed';
  qrCode?: string;
  merkleRoot?: string;
  blockchainHash?: string;
  timestamp?: string;
  processingSteps?: ProcessingStep[];
  labResults?: LabResults;
}

export interface ProcessingStep {
  id: string;
  step: string;
  description: string;
  completedAt: string;
  files?: string[];
}

export interface LabResults {
  moisture: number;
  pesticide: string;
  dnaAuthentication: string;
  status: 'passed' | 'failed';
  testedAt: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  phone: string;
  certifications: string[];
}

export interface ValidationQueue {
  id: string;
  batchId: string;
  type: 'geo-fencing' | 'seasonal' | 'quality';
  status: 'pending' | 'passed' | 'failed';
  submittedAt: string;
}

export interface BlockchainRecord {
  id: string;
  merkleRoot: string;
  blockchainHash: string;
  timestamp: string;
  batchIds: string[];
}

interface AppContextType {
  // State
  language: Language;
  isOffline: boolean;
  batches: Batch[];
  farmers: Farmer[];
  validationQueue: ValidationQueue[];
  blockchainRecords: BlockchainRecord[];
  
  // Actions
  setLanguage: (lang: Language) => void;
  setOffline: (offline: boolean) => void;
  addBatch: (batch: Omit<Batch, 'id'>) => void;
  updateBatch: (id: string, updates: Partial<Batch>) => void;
  addProcessingStep: (batchId: string, step: ProcessingStep) => void;
  updateLabResults: (batchId: string, results: LabResults) => void;
  validateBatch: (batchId: string) => void;
  generateMerkleRoot: (batchIds: string[]) => void;
  anchorToBlockchain: (merkleRoot: string, batchIds: string[]) => void;
  syncData: () => Promise<void>;
  generateSMSPayload: (batch: Batch) => string;
}

const AppContext = createContext<AppContextType | null>(null);

// Mock data - todo: remove mock functionality
const mockFarmers: Farmer[] = [
  {
    id: 'farmer1',
    name: 'Ramesh Kumar',
    location: 'Kerala, India',
    phone: '+91-9876543210',
    certifications: ['Organic', 'Fair Trade']
  },
  {
    id: 'farmer2', 
    name: 'Priya Sharma',
    location: 'Karnataka, India',
    phone: '+91-9876543211',
    certifications: ['Organic']
  }
];

const mockBatches: Batch[] = [
  {
    id: 'batch1',
    farmerId: 'farmer1',
    farmerName: 'Ramesh Kumar',
    species: 'Ashwagandha',
    quantity: 50,
    moisture: 12.5,
    quality: 'Premium',
    gpsLat: 10.8505,
    gpsLng: 76.2711,
    collectionDate: '2024-01-15',
    status: 'validated',
    qrCode: 'PRAM-ASH-001-2024',
    processingSteps: [
      {
        id: 'step1',
        step: 'Drying',
        description: 'Sun-dried for 7 days',
        completedAt: '2024-01-20'
      }
    ]
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isOffline, setOffline] = useState(false);
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [farmers] = useState<Farmer[]>(mockFarmers);
  const [validationQueue, setValidationQueue] = useState<ValidationQueue[]>([]);
  const [blockchainRecords, setBlockchainRecords] = useState<BlockchainRecord[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedBatches = await localforage.getItem<Batch[]>('pramana-batches');
        if (savedBatches) {
          setBatches(savedBatches);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save batches to localStorage whenever they change
  useEffect(() => {
    localforage.setItem('pramana-batches', batches);
  }, [batches]);

  const addBatch = (batch: Omit<Batch, 'id'>) => {
    const newBatch: Batch = {
      ...batch,
      id: `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setBatches(prev => [...prev, newBatch]);
    console.log('Batch added:', newBatch.id);
  };

  const updateBatch = (id: string, updates: Partial<Batch>) => {
    setBatches(prev => prev.map(batch => 
      batch.id === id ? { ...batch, ...updates } : batch
    ));
    console.log('Batch updated:', id);
  };

  const addProcessingStep = (batchId: string, step: ProcessingStep) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId 
        ? { ...batch, processingSteps: [...(batch.processingSteps || []), step] }
        : batch
    ));
    console.log('Processing step added to batch:', batchId);
  };

  const updateLabResults = (batchId: string, results: LabResults) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId 
        ? { ...batch, labResults: results, status: 'tested' }
        : batch
    ));
    console.log('Lab results updated for batch:', batchId);
  };

  const validateBatch = (batchId: string) => {
    // Mock validation logic
    const validationItem: ValidationQueue = {
      id: `val_${Date.now()}`,
      batchId,
      type: 'quality',
      status: 'passed',
      submittedAt: new Date().toISOString()
    };
    
    setValidationQueue(prev => [...prev, validationItem]);
    updateBatch(batchId, { status: 'validated' });
    console.log('Batch validated:', batchId);
  };

  const generateMerkleRoot = (batchIds: string[]) => {
    // Mock Merkle root generation
    const merkleRoot = `merkle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    batchIds.forEach(id => {
      updateBatch(id, { merkleRoot });
    });
    
    console.log('Merkle root generated:', merkleRoot);
  };

  const anchorToBlockchain = (merkleRoot: string, batchIds: string[]) => {
    // Mock blockchain anchoring
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const timestamp = new Date().toISOString();
    
    const record: BlockchainRecord = {
      id: `block_${Date.now()}`,
      merkleRoot,
      blockchainHash,
      timestamp,
      batchIds
    };
    
    setBlockchainRecords(prev => [...prev, record]);
    
    batchIds.forEach(id => {
      updateBatch(id, { blockchainHash, timestamp });
    });
    
    console.log('Anchored to blockchain:', blockchainHash);
  };

  const syncData = async () => {
    // Mock sync operation
    console.log('Syncing data to server...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Data synced successfully');
  };

  const generateSMSPayload = (batch: Batch) => {
    // Mock SMS payload generation
    const payload = `PRAM:${batch.id}:${batch.species}:${batch.quantity}kg:${batch.quality}:${batch.gpsLat},${batch.gpsLng}`;
    console.log('SMS payload generated:', payload);
    return payload;
  };

  const value: AppContextType = {
    language,
    isOffline,
    batches,
    farmers,
    validationQueue,
    blockchainRecords,
    setLanguage,
    setOffline,
    addBatch,
    updateBatch,
    addProcessingStep,
    updateLabResults,
    validateBatch,
    generateMerkleRoot,
    anchorToBlockchain,
    syncData,
    generateSMSPayload
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}