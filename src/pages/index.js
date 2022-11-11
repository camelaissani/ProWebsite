import { useContext, useEffect, useState } from 'react';

import Card from '../components/Card';
import Pane from '../components/Pane';
import ProfileContext from '../components/ProfileContext';
import Title from '../components/Title';
import { useComponentMounted } from '../components/hooks';

const valueColors = [
  'bg-green-200',
  'bg-red-200',
  'bg-blue-200',
  'bg-yellow-200',
];

function CardValue({ title, logo, index }) {
  return (
    <div className="flex flex-col items-center space-y-2 my-8 animate-zoom-out">
      <Card
        className={`flex justify-center items-center py-8 rounded-full w-28 h-28 border-none ${
          valueColors[index % valueColors.length]
        }`}
      >
        <i
          className={`icofont ${logo} text-5xl text-transparent bg-clip-text bg-gradient-to-br from-gray-600 to-gray-900`}
        ></i>
      </Card>
      <h4 className="text-sm font-medium">{title}</h4>
    </div>
  );
}

function PercentageBar({ title, className }) {
  const isMountedRef = useComponentMounted();

  // create a small delay to play the animation
  const [width, setWidth] = useState('w-0');
  useEffect(() => {
    const handle = setTimeout(() => {
      isMountedRef.current && setWidth(className);
    }, 250);

    return () => clearTimeout(handle);
  }, [className, isMountedRef]);

  return (
    <>
      <h4 className="font-medium text-xs">{title}</h4>
      <div className="mt-3 mb-5 h-1.5 w-full rounded bg-gray-200">
        <div
          className={`rounded bg-accent h-full transition-[width] ease-out duration-500 ${width}`}
        ></div>
      </div>
    </>
  );
}

function levelToWidth(level) {
  let width = '';
  switch (level) {
    case 'novice':
      width = 'w-1/4';
      break;
    case 'intermediate':
      width = 'w-2/4';
      break;
    case 'advanced':
      width = 'w-3/5';
      break;
    case 'expert':
      width = 'w-full';
      break;
    default:
      width = '';
  }
  return width;
}

export default function Home() {
  const profile = useContext(ProfileContext);

  return (
    <Pane className="py-10">
      <section className="pb-4 px-10">
        <Title>About me</Title>
        <p className="mt-8">{profile.intro}</p>
      </section>
      <section className="py-4 px-10">
        <Title>My values</Title>

        <div className="grid grid-cols-4 py-8">
          {profile.values.map(({ name, logo }, index) => (
            <CardValue key={name} title={name} logo={logo} index={index} />
          ))}
        </div>
      </section>
      <section className="py-4 px-10">
        <div className="flex space-x-20">
          <div className="w-1/2">
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
          <div className="w-1/2">
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
  );
}
