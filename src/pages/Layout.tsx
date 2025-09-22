'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import AppBar from '@/components/AppBar';
import SpaceBackground from '@/components/backgounds/SpaceBackground';
import LeftRail from '@/components/LeftRail';
import Welcome from '@/components/Welcome';
import { useVisitTracker } from '@/hooks';
import Contact from '@/pages/Contact';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Resume from '@/pages/Resume';
import ProfileProvider from '@/providers/ProfileProvider';

function shouldShowWelcome() {
  const prevWelcomeTimestamp = Number(localStorage.getItem('welcomeTimestamp'));
  const curWelcomeTimestamp = Date.now();

  if (prevWelcomeTimestamp) {
    const delta = curWelcomeTimestamp - prevWelcomeTimestamp;
    if (delta <= 0.2 * 60 * 1000) {
      localStorage.setItem('welcomeTimestamp', String(curWelcomeTimestamp));
      return false;
    }
  }

  return true;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(false);
  useVisitTracker();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (shouldShowWelcome()) {
      setShowWelcome(true);
    }
  }, []);

  const onWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem('welcomeTimestamp', String(Date.now()));
  }, []);

  return (
    <ProfileProvider>
      {isMobile ? (
        <main className="flex flex-col gap-6 p-4">
          <article>
            <LeftRail />
          </article>
          <article>
            <Home />
          </article>
          <article>
            <Resume />
          </article>
          <article>
            <Portfolio />
          </article>
          <article>
            <Contact />
          </article>
        </main>
      ) : (
        <>
          <SpaceBackground />
          <div className="flex space-x-5 my-16 mx-auto max-w-6xl ">
            <div className="md:w-1/3 lg:w-1/4">
              <LeftRail className="sticky top-0 z-50" />
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <div className="flex flex-col space-y-5">
                <header>
                  <AppBar className="sticky top-0 z-50" />
                </header>
                <main>
                  <article>{children}</article>
                </main>
              </div>
            </div>
          </div>
        </>
      )}

      {showWelcome && <Welcome onComplete={onWelcomeComplete} />}
    </ProfileProvider>
  );
}
