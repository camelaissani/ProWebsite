import { useCallback, useEffect, useState } from 'react';

import AnimatedBackground from './AnimatedBackground';
import AppBar from './AppBar';
import axios from 'axios';
import getConfig from 'next/config';
import LeftRail from './LeftRail';
import ProfileContext from './ProfileContext';
import Welcome from './Welcome';

const {
  publicRuntimeConfig: { PROFILE_URL },
} = getConfig();

function shouldShowWelcome() {
  const prevWelcomeTimestamp = localStorage.getItem('welcomeTimestamp');
  const curWelcomeTimestamp = Date.now();

  if (prevWelcomeTimestamp) {
    const delta = curWelcomeTimestamp - prevWelcomeTimestamp;
    if (delta <= 1 * 60 * 1000) {
      localStorage.setItem('welcomeTimestamp', curWelcomeTimestamp);
      return false;
    }
  }

  return true;
}

export default function Layout({ children }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(PROFILE_URL);
      setProfile(response.data);
      setReady(true);
    };

    if (shouldShowWelcome()) {
      setShowWelcome(true);
    }
    fetchProfile();
  }, []);

  const onWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem('welcomeTimestamp', Date.now());
  }, []);

  return ready ? (
    <ProfileContext.Provider value={profile}>
      <AnimatedBackground />
      <div className="flex space-x-7 my-16 mx-auto w-[1170px] ">
        <div className="w-1/4">
          <LeftRail />
        </div>
        <div className="w-3/4">
          <div className="flex flex-col space-y-10">
            <AppBar />
            <main>{children}</main>
          </div>
        </div>
      </div>
      {showWelcome && <Welcome onComplete={onWelcomeComplete} />}
    </ProfileContext.Provider>
  ) : null;
}
