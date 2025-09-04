export interface User {
  userId: string;
  fName: string;
  lName: string;
  location: string;
  preferredLanguage: 'en' | 'es';
  premiumStatus: boolean;
}

export interface Guide {
  guideId: string;
  title: string;
  content: string;
  state: string;
  language: 'en' | 'es';
}

export interface IncidentRecord {
  recordId: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  recordingUrl?: string;
  sharedSummary?: string;
  audioBlob?: Blob;
}
