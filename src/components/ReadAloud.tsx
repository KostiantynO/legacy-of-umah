'use client';

import { useState } from 'react';

import { useReadAloud } from '@/hooks/useReadAloud';

import type { ChangeEvent } from 'react';

export const VoiceOption = ({
  id,
  name,
  lang,
  isDefault,
}: {
  id: string;
  name: string;
  lang: string;
  isDefault: boolean;
}) => (
  <option value={id}>
    {name} ({lang}) {isDefault ? '(default)' : ''}
  </option>
);

export const ReadAloud = ({ content }: { content: string }) => {
  const { voices, setSelectedVoice, onPlayToggle } = useReadAloud(content);

  const [showSelectVoice, setShowSelectVoice] = useState(false);

  const onClickToggleVoiceSelector = () => {
    setShowSelectVoice(prev => !prev);
  };

  const voicesList = voices.map((voice, id) => (
    <VoiceOption
      key={id}
      id={id.toString(10)}
      isDefault={voice.default}
      lang={voice.lang}
      name={voice.name}
    />
  ));

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(Number(e.target.value));
  };

  const showVoices = showSelectVoice ? (
    <label onChange={onClickToggleVoiceSelector}>
      Select Voice:
      <select onChange={onSelect}>{voicesList}</select>
    </label>
  ) : (
    <button
      className="h-8 w-12 rounded-lg border border-red-200"
      onClick={onClickToggleVoiceSelector}
      title="Select ReadAloud Language"
    >
      ≡
    </button>
  );

  const playPauseLabel = speechSynthesis.speaking ? '⏸' : '▶';

  return (
    <div className="bg-neutral-800 text-zinc-100">
      <div>
        <button
          className="h-8 w-12 rounded-lg border border-red-200"
          onClick={onPlayToggle}
          title="Read Aloud"
        >
          {playPauseLabel}
        </button>

        {showVoices}
      </div>
    </div>
  );
};
