'use client';

import { useCallback, useState } from 'react';
import AnimatedText from '@/components/AnimatedText';
import UnveilingBackground from '@/components/backgounds/UnveilingBackground';
import { useProfile } from '@/providers/ProfileProvider';

export default function Welcome({ onComplete }: { onComplete: () => void }) {
  const profile = useProfile();

  const [show, setShow] = useState(true);
  const [showSlideAnimation, setShowSlideAnimation] = useState(false);

  const onFinish = useCallback(() => {
    setShow(false);
    onComplete();
  }, [onComplete]);

  return show && profile ? (
    !showSlideAnimation ? (
      <AnimatedText
        title={`Hi there, I'm ${profile.name}`}
        onComplete={() => setShowSlideAnimation(true)}
        className="z-50"
      />
    ) : (
      <UnveilingBackground onComplete={onFinish} className="z-50" />
    )
  ) : null;
}
