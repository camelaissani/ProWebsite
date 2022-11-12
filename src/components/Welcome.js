import { animated, easings, useSpring } from 'react-spring';
import { useCallback, useContext, useState } from 'react';

import ProfileContext from './ProfileContext';

function AnimateText({ title, subTitle, onComplete }) {
  const styles = useSpring({
    loop: false,
    opacity: 0,
    delay: 4000,
    from: { opacity: 1 },
    config: { duration: 1000 },
    onRest: onComplete,
  });

  return (
    <div className="fixed top-0 w-full h-full bg-[linear-gradient(45deg,_#2D2D2D_9%,_#000000_50%)]">
      <animated.div
        className="flex flex-col justify-center items-center h-full"
        style={styles}
      >
        <div className="flex flex-col justify-center items-center h-full text-[#fafafa] uppercase">
          <h1 className="mb-[3vw] text-[2.4vw] uppercase font-semibold leading-6 tracking-widest">
            {title}
          </h1>
          <div className="relative text-center">
            <h2 className="text-[3.8vw] font-extrabold text-[#2d2d2d] text-shadow-custom">
              {subTitle}
            </h2>
            <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap animate-enlight">
              <h2 className="text-[3.8vw] font-extrabold text-[#ffcc00] text-shadow-lg shadow-[#ffcc00] ">
                {subTitle}
              </h2>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

function AnimateBackground({ onComplete }) {
  const styles = useSpring({
    loop: false,
    height: '0vh',
    from: { height: '100vh' },
    config: [{ duration: 1000, easing: easings.easeInOutCubic }],
    onRest: onComplete,
  });

  return (
    <>
      <animated.div
        className="fixed top-0 w-full h-full bg-[linear-gradient(45deg,_#2D2D2D_9%,_#000000_50%)]"
        style={styles}
      />
    </>
  );
}

export default function Welcome({ onComplete }) {
  const profile = useContext(ProfileContext);

  const [show, setShow] = useState(true);
  const [showSlideAnimation, setShowSlideAnimation] = useState(false);

  const onFinish = useCallback(() => {
    setShow(false);
    onComplete();
  }, [onComplete]);

  return show ? (
    !showSlideAnimation ? (
      <AnimateText
        title={`Hey there, I'm ${profile.name}`}
        subTitle={profile.title}
        onComplete={() => setShowSlideAnimation(true)}
      />
    ) : (
      <AnimateBackground onComplete={onFinish} />
    )
  ) : null;
}
