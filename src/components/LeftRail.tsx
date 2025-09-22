import axios from 'axios';
import fileDownload from 'js-file-download';
import Image from 'next/image';
import { useCallback } from 'react';
import ProfileCard from '@/components/cards/ProfileCard';
import IconButton from '@/components/IconButton';
import Pane from '@/components/Pane';
import { useProfile } from '@/providers/ProfileProvider';
import { cn } from '@/utils';

export default function LeftRail({ className }: { className?: string }) {
  const profile = useProfile();

  const onClick = useCallback(
    async (e: React.MouseEvent) => {
      if (!profile?.cvUrl) {
        return;
      }
      const res = await axios.get(profile.cvUrl, {
        responseType: 'blob',
      });

      fileDownload(res.data, `${profile?.name}.pdf`);

      e.preventDefault();
    },
    [profile?.cvUrl, profile?.name],
  );

  return (
    <Pane className={cn('px-4 max-md:px-4 pb-6', className)}>
      <div className="max-w-md mx-auto md:mx-0">
        <h1 className="text-lg font-bold uppercase mt-4 text-center md:text-left">
          {profile?.name}
        </h1>
        <div className="text-xs text-gray-500 text-center md:text-left">
          {profile?.slogan}
        </div>
        {profile?.pictureUrl ? (
          <div className="mt-2 clip-img">
            <Image
              src={profile?.pictureUrl}
              alt="My picture"
              height={profile?.pictureSizePx}
              width={profile?.pictureSizePx}
              layout="responsive"
            />
          </div>
        ) : null}
        <ProfileCard />
        <div className="flex justify-center items-center mt-8">
          <IconButton
            title="Download Cv"
            icon="icofont-download"
            onClick={onClick}
          />
        </div>
      </div>
    </Pane>
  );
}
