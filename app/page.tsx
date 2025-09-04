'use client';

import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { GuideCard } from './components/GuideCard';
import { RecordingButton } from './components/RecordingButton';
import { ShareButton } from './components/ShareButton';
import { LanguageSelector } from './components/LanguageSelector';
import { useGeolocation } from './hooks/useGeolocation';
import { guides, getGuideByStateAndLanguage } from './data/guides';
import { IncidentRecord } from './types';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('guides');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [incidents, setIncidents] = useState<IncidentRecord[]>([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  
  const location = useGeolocation();

  const currentGuide = getGuideByStateAndLanguage('general', language);

  const handleRecordingComplete = (record: IncidentRecord) => {
    setIncidents(prev => [record, ...prev]);
    setActiveTab('incidents');
  };

  const renderGuidesTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Know Your Rights</h2>
        <p className="text-text-secondary">
          Essential legal information for police interactions
        </p>
      </div>

      <LanguageSelector
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {location.loading && (
        <div className="card text-center">
          <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-text-secondary">Getting your location...</p>
        </div>
      )}

      {location.error && (
        <div className="card bg-yellow-500/10 border-yellow-500/20">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-yellow-400">
              Location access denied. Showing general information.
            </p>
          </div>
        </div>
      )}

      <GuideCard guide={currentGuide} />

      <div className="card bg-accent/10 border-accent/20">
        <h3 className="font-medium text-accent mb-2">Emergency Scripts</h3>
        <div className="space-y-2 text-sm">
          <p><strong>English:</strong> "I am exercising my right to remain silent"</p>
          <p><strong>Español:</strong> "Estoy ejerciendo mi derecho a permanecer en silencio"</p>
        </div>
      </div>
    </div>
  );

  const renderRecordTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Record Incident</h2>
        <p className="text-text-secondary">
          Discreetly record audio during police interactions
        </p>
      </div>

      <div className="card text-center py-8">
        <RecordingButton 
          variant="active"
          onRecordingComplete={handleRecordingComplete}
        />
      </div>

      <div className="card bg-blue-500/10 border-blue-500/20">
        <h3 className="font-medium text-blue-400 mb-2">Recording Tips</h3>
        <ul className="text-sm space-y-1 text-blue-300">
          <li>• Keep your phone secure and accessible</li>
          <li>• Announce you are recording if safe to do so</li>
          <li>• Record the entire interaction</li>
          <li>• Note badge numbers and patrol car details</li>
        </ul>
      </div>

      {location.latitude && location.longitude && (
        <div className="card">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Current Location</span>
          </div>
          <p className="text-xs text-text-secondary">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );

  const renderIncidentsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Incident History</h2>
        <p className="text-text-secondary">
          Your recorded interactions and summaries
        </p>
      </div>

      {incidents.length === 0 ? (
        <div className="card text-center py-8">
          <Clock className="w-12 h-12 text-text-secondary mx-auto mb-3" />
          <p className="text-text-secondary">No incidents recorded yet</p>
          <button
            onClick={() => setActiveTab('record')}
            className="btn-primary mt-4"
          >
            Start Recording
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.recordId} className="card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">
                    {incident.timestamp.toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {incident.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-text-secondary">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>
                      {incident.location.latitude?.toFixed(4)}, {incident.location.longitude?.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
              
              <ShareButton incident={incident} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'guides':
        return renderGuidesTab();
      case 'record':
        return renderRecordTab();
      case 'incidents':
        return renderIncidentsTab();
      default:
        return renderGuidesTab();
    }
  };

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      variant="stickyHeader"
    >
      {renderActiveTab()}
    </AppShell>
  );
}
