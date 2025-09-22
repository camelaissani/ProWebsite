import { animated, easings, useSpring } from 'react-spring';
import { cn } from '@/utils';

export default function UnveilingBackground({
  onComplete,
  className,
}: {
  onComplete: () => void;
  className?: string;
}) {
  const styles = useSpring({
    loop: false,
    height: '0vh',
    from: { height: '100vh' },
    config: { duration: 1000, easing: easings.easeInOutCubic },
    onRest: onComplete,
  });

  return (
    <animated.div
      className={cn(
        'fixed top-0 w-full h-full bg-[linear-gradient(45deg,_#2D2D2D_9%,_#000000_50%)]',
        className,
      )}
      style={styles}
    />
  );
}
