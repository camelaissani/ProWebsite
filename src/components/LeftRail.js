import { useCallback, useContext } from 'react';

import axios from 'axios';
import fileDownload from 'js-file-download';
import IconButton from './IconButton';
import Image from 'next/image';
import Pane from './Pane';
import ProfileContext from './ProfileContext';
import Stepper from './Stepper';

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
      className="ml-7 -mt-5"
    />
  );
}

export default function LeftRail() {
  const profile = useContext(ProfileContext);

  const onClick = useCallback(
    async (e) => {
      const res = await axios.get(profile.cvUrl, {
        responseType: 'blob',
      });

      fileDownload(res.data, `${profile.name}.pdf`);

      e.preventDefault();
    },
    [profile.cvUrl, profile.name]
  );

  return (
    <Pane className="px-4 max-md:px-4 pb-6">
      <h1 className="text-lg font-bold uppercase mt-4">{profile.name}</h1>
      <div className="text-xs text-gray-500">{profile.title}</div>
      <div className="mt-2 clip-img">
        <Image
          src={profile.pictureUrl}
          alt="Me at SF"
          height={profile.pictureSizePx}
          width={profile.pictureSizePx}
          layout="responsive"
        />
      </div>
      <ProfileCard />
      <div className="flex justify-center items-center mt-8">
        <IconButton
          title="Download Cv"
          icon="icofont-download"
          onClick={onClick}
        />
      </div>
    </Pane>
  );
}
