import { useCallback, useEffect, useState } from 'react';

import AnimatedBackground from './AnimatedBackground';
import AppBar from './AppBar';
import axios from 'axios';
import Contact from '../pages/contact';
import getConfig from 'next/config';
import Home from '../pages';
import LeftRail from './LeftRail';
import Portfolio from '../pages/sideprojects';
import ProfileContext from './ProfileContext';
import Resume from '../pages/experience';
import { useVisitTracker } from './hooks';
import Welcome from './Welcome';

const {
  publicRuntimeConfig: { PROFILE_URL },
} = getConfig();

function shouldShowWelcome() {
  const prevWelcomeTimestamp = localStorage.getItem('welcomeTimestamp');
  const curWelcomeTimestamp = Date.now();

  if (prevWelcomeTimestamp) {
    const delta = curWelcomeTimestamp - prevWelcomeTimestamp;
    if (delta <= 0.2 * 60 * 1000) {
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
  useVisitTracker();

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
      <div className="max-md:hidden">
        <AnimatedBackground />
        <div className="flex space-x-5 my-16 mx-auto max-w-6xl ">
          <div className="md:w-1/3 lg:w-1/4">
            <LeftRail />
          </div>
          <div className="md:w-2/3 lg:w-3/4">
            <div className="flex flex-col space-y-5">
              <AppBar />
              <main>{children}</main>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col space-y-6 mt-6 mx-4">
        <LeftRail />
        <Home />
        <Resume />
        <Portfolio />
        <Contact />
      </div>
      {showWelcome && <Welcome onComplete={onWelcomeComplete} />}
    </ProfileContext.Provider>
  ) : null;
}
