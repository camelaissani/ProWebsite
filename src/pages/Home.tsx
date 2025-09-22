'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import ValueCard from '@/components/cards/ValueCard';
import Pane from '@/components/Pane';
import PercentageBar from '@/components/PercentageBar';
import Title from '@/components/Title';
import { useProfile } from '@/providers/ProfileProvider';
import { levelToWidth } from '@/utils';

export default function Home() {
  const profile = useProfile();
  const [introMd, setIntroMd] = useState<string | null>(null);

  useEffect(() => {
    async function loadMd() {
      try {
        const introUrl = new URL(profile?.intro || '');
        const response = await axios.get(introUrl.href);
        if (response.data) {
          setIntroMd(response.data);
        }
      } catch {
        setIntroMd(null);
      }
    }
    loadMd();
  }, [profile?.intro]);

  return profile ? (
    <Pane className="py-10">
      <section className="pb-4 px-10 max-md:px-4">
        <Title>About me</Title>
        <div className="mt-8 flex flex-col gap-4">
          {introMd ? <Markdown>{introMd}</Markdown> : (profile.intro ?? '')}
        </div>
      </section>
      <section className="py-4 px-10 max-md:px-4">
        <Title>My values</Title>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-8 max-md:gap-4 mt-8">
          {profile.values.map(({ name, logo }, index) => (
            <div key={name} className="flex justify-center items-center">
              <ValueCard title={name} logo={logo} index={index} />
            </div>
          ))}
        </div>
      </section>
      <section className="py-4 px-10 max-sm:px-4">
        <div className="flex space-x-20 max-sm:flex-col max-sm:space-x-0">
          <div className="w-full">
            <Title>Code skills</Title>
            <div className="mt-8">
              {profile.codeSkills.map(({ technology, level }) => {
                return (
                  <PercentageBar
                    key={technology}
                    title={technology}
                    className={levelToWidth(level)}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full max-sm:mt-8">
            <Title>Framework/Library skills</Title>
            <div className="mt-8">
              {profile.frameworkLibrarySkills.map(({ technology, level }) => {
                return (
                  <PercentageBar
                    key={technology}
                    title={technology}
                    className={levelToWidth(level)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Pane>
  ) : null;
}
