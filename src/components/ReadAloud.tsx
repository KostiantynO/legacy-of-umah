'use client';

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
}) =>
  `<option value="${id}">${name} (${lang}) ${
    isDefault ? '(default)' : ''
  }</option>`;

export const ReadAloud = ({ content }: { content: string }) => {
  const { voices, setSelectedVoice, onPlayToggle } = useReadAloud(content);

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

  const playPauseLabel = speechSynthesis.speaking ? '⏸ pause' : '▶ play';

  return (
    <div className="bg-neutral-800 text-zinc-100">
      <label>
        Select Voice:
        <select onChange={onSelect}>{voicesList}</select>
      </label>

      <div>
        <button onClick={onPlayToggle}>{playPauseLabel}</button>
      </div>
    </div>
  );
};
