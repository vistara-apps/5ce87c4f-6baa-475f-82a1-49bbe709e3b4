'use client';

import React from 'react';
import { Mic, MicOff, Circle } from 'lucide-react';
import { useRecording } from '../hooks/useRecording';
import { useGeolocation } from '../hooks/useGeolocation';
import { IncidentRecord } from '../types';

interface RecordingButtonProps {
  variant?: 'active' | 'inactive';
  onRecordingComplete?: (record: IncidentRecord) => void;
}

export const RecordingButton = ({ 
  variant = 'inactive', 
  onRecordingComplete 
}: RecordingButtonProps) => {
  const { isRecording, audioBlob, error, startRecording, stopRecording } = useRecording();
  const location = useGeolocation();

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  // Handle recording completion
  React.useEffect(() => {
    if (audioBlob && !isRecording) {
      const record: IncidentRecord = {
        recordId: Date.now().toString(),
        userId: 'current-user', // Would come from auth context
        timestamp: new Date(),
        location: {
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
          address: location.address || undefined,
        },
        audioBlob,
      };
      onRecordingComplete?.(record);
    }
  }, [audioBlob, isRecording, location, onRecordingComplete]);

  if (variant === 'inactive') {
    return (
      <button
        onClick={handleToggleRecording}
        disabled={!!error}
        className={`
          w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold transition-all
          ${error 
            ? 'bg-red-500/20 text-red-400 cursor-not-allowed' 
            : isRecording 
              ? 'bg-red-500 recording-pulse' 
              : 'bg-accent hover:bg-accent/90'
          }
        `}
      >
        {error ? (
          <MicOff className="w-8 h-8" />
        ) : isRecording ? (
          <Circle className="w-8 h-8 fill-current" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </button>
    );
  }

  return (
    <div className="text-center">
      <button
        onClick={handleToggleRecording}
        disabled={!!error}
        className={`
          w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold transition-all mb-3
          ${error 
            ? 'bg-red-500/20 text-red-400 cursor-not-allowed' 
            : isRecording 
              ? 'bg-red-500 recording-pulse' 
              : 'bg-accent hover:bg-accent/90 hover:scale-105'
          }
        `}
      >
        {error ? (
          <MicOff className="w-10 h-10" />
        ) : isRecording ? (
          <Circle className="w-10 h-10 fill-current" />
        ) : (
          <Mic className="w-10 h-10" />
        )}
      </button>
      
      <div className="text-center">
        {error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : isRecording ? (
          <p className="text-red-400 text-sm animate-pulse">Recording... Tap to stop</p>
        ) : (
          <p className="text-text-secondary text-sm">Tap to start recording</p>
        )}
      </div>
    </div>
  );
};
