'use client';

import { useEffect, useState } from 'react';

export const useReadAloud = (blogText: string) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const populateVoiceList = () => {
      const voicesList = speechSynthesis.getVoices();
      setVoices(voicesList);
    };

    populateVoiceList();
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }, []);

  const startReading = (text: string, startIndex = 0) => {
    const utterance = new SpeechSynthesisUtterance(text.slice(startIndex));
    utterance.voice = speechSynthesis.getVoices()[selectedVoice];
    utterance.onend = () => {
      console.log('Reading complete');
    };
    speechSynthesis.speak(utterance);
  };

  const onPlayToggle = () => {
    // if it is playing, stop it.
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      return;
    }

    // if it is not playing, and has selection, start playing the selected text.
    const selectedText = window.getSelection()?.toString();
    if (selectedText && currentText === selectedText) {
      speechSynthesis.resume();
      return;
    }

    // if it is not playing, and selection is not equal to the text saved in state, play the selected text. Or start playing whole blogpost.
    const newText = selectedText ?? blogText;
    setCurrentText(newText);
    startReading(newText);
  };

  return { voices, setSelectedVoice, onPlayToggle };
};
