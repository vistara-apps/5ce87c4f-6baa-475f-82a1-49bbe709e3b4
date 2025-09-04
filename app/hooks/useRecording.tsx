'use client';

import { useState, useRef, useCallback } from 'react';

interface RecordingState {
  isRecording: boolean;
  audioBlob: Blob | null;
  error: string | null;
}

export const useRecording = () => {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    audioBlob: null,
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false // For now, just audio recording
      });

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setState(prev => ({
          ...prev,
          isRecording: false,
          audioBlob,
        }));

        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setState(prev => ({
        ...prev,
        isRecording: true,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to start recording. Please check microphone permissions.',
      }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [state.isRecording]);

  return {
    ...state,
    startRecording,
    stopRecording,
  };
};
