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
    <Card
      className={`flex flex-col justify-center items-center space-y-2 rounded-full w-32 h-32 max-lg:w-24 max-lg:h-24 border-none text-gray-700 ${
        valueColors[index % valueColors.length]
      } animate-zoom-out`}
    >
      <i className={`icofont ${logo} text-5xl max-lg:text-4xl`}></i>
      <h4 className="text-sm max-lg:text-xs text-center font-medium">
        {title}
      </h4>
    </Card>
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
      <section className="pb-4 px-10 max-md:px-4">
        <Title>About me</Title>
        <p className="mt-8">{profile.intro}</p>
      </section>
      <section className="py-4 px-10 max-md:px-4">
        <Title>My values</Title>

        <div className="grid md:grid-cols-4 sm:grid-cols-1 lg:gap-8 max-md:gap-4 mt-8">
          {profile.values.map(({ name, logo }, index) => (
            <div key={name} className="flex justify-center items-center">
              <CardValue title={name} logo={logo} index={index} />
            </div>
          ))}
        </div>
      </section>
      <section className="py-4 px-10 max-md:px-4">
        <div className="flex space-x-20 max-md:flex-col max-md:space-x-0">
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
          <div className="w-full max-md:mt-8">
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
