'use client';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ProfileType } from '@/types';

const ProfileContext = createContext<ProfileType | undefined>(undefined);

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_PROFILE_URL ?? '',
        );
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    }
    fetchProfile();
  }, []);

  return ready && profile ? (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  ) : null;
}

export const useProfile = () => useContext(ProfileContext);
