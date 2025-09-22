import { animated, useSpring } from 'react-spring';
import { cn } from '@/utils';

export default function AnimatedText({
  title,
  onComplete,
  className,
}: {
  title: string;
  onComplete: () => void;
  className?: string;
}) {
  const styles = useSpring({
    loop: false,
    opacity: 0,
    delay: 4000,
    from: { opacity: 1 },
    config: { duration: 1000 },
    onRest: onComplete,
  });

  return (
    <div
      className={cn(
        'fixed top-0 w-full h-full bg-[linear-gradient(45deg,_#2D2D2D_9%,_#000000_50%)]',
        className,
      )}
    >
      <animated.div
        className="flex flex-col justify-center items-center h-full"
        style={styles}
      >
        <div className="flex flex-col justify-center items-center h-full text-[#fafafa]">
          <div className="relative text-center">
            <h2 className="text-[3vw] font-extrabold text-[#2d2d2d]">
              {title}
            </h2>
            <div
              className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap animate-enlight"
              aria-hidden
            >
              <h2 className="text-[3vw] font-extrabold text-[#ffcc00] text-shadow-lg shadow-[#ffcc00]">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
