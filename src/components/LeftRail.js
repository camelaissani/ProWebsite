import Image from 'next/image';
import Pane from './Pane';
import ProfileContext from './ProfileContext';
import Stepper from './Stepper';
import { useContext } from 'react';

function ProfileCard() {
  const profile = useContext(ProfileContext);

  return (
    <Stepper
      icon="icofont-id-card"
      variant="profile"
      values={[
        { title: 'Name', value: profile.name },
        { title: 'Job', value: profile.job },
        {
          title: 'Email',
          type: 'obfuscated',
          value: profile.email,
        },
        { title: 'Location', value: profile.location },
      ]}
      className="ml-7 -mt-5 mb-4"
    />
  );
}

export default function LeftRail() {
  const profile = useContext(ProfileContext);

  return (
    <Pane className="p-4 pb-6">
      <h1 className="text-lg font-bold uppercase">{profile.name}</h1>
      <div className="text-xs text-gray-500">{profile.title}</div>
      <div className="mt-2 clip-img">
        <Image
          src={profile.pictureUrl}
          alt="Me at SF"
          height={profile.pictureSizePx}
          width={profile.pictureSizePx}
        />
      </div>
      <ProfileCard />
    </Pane>
  );
}
