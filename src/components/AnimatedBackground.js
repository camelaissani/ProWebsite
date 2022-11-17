import { useEffect, useState } from 'react';

const STARS = [...Array(200).keys()].map((id, index) => {
  const max = 1;
  const min = 0.4;
  const randomItem = Math.random() * (max - min) + min;
  const offScreen = !!(index % 2);

  const size = Math.floor(randomItem * 15) / 10;
  const opacity = Math.floor(randomItem * 10) / 10;
  const duration = Math.floor((1 / randomItem) * 150);
  const posX = Math.floor(Math.random() * 100);
  const posY = Math.floor(Math.random() * 100 + (offScreen ? 100 : 0));

  return {
    id: `star-${id}`,
    size,
    offScreen,
    className: offScreen ? 'star animate-star' : 'star animate-initial-star',
    style: {
      '--bg-animation-item-pos-X': `${posX}vw`, // used style for position as tailwindcss does not accept
      '--bg-animation-item-pos-Y': `${posY}vh`, // to pass them in the React className props
      '--bg-animation-item-size': `${size}rem`,
      '--bg-animation-item-opacity': opacity,
      '--bg-animation-duration': `${duration}s`,
    },
    icon: 'icofont-star-alt-1',
  };
});

const METEORS = [...Array(10).keys()].map((id, index) => {
  const max = 1;
  const min = 0.4;
  const randomItem = Math.random() * (max - min) + min;
  const offScreen = !!(index % 2);

  const size = Math.floor(randomItem * 22) / 10;
  const opacity = Math.floor(randomItem * 10) / 10;
  const duration = Math.floor((1 / randomItem) * 20);
  const posX = Math.floor(Math.random() * 100 + (offScreen ? 100 : 0));
  const posY = Math.floor(Math.random() * 100 * (offScreen ? -1 : 1));

  return {
    id: `meteor-${id}`,
    size,
    offScreen,
    className: offScreen
      ? 'meteor animate-meteor'
      : 'meteor animate-initial-meteor',
    style: {
      '--bg-animation-item-pos-X': `${posX}vw`, // used style for position as tailwindcss does not accept
      '--bg-animation-item-pos-Y': `${posY}vh`, // to pass them in the React className props
      '--bg-animation-item-size': `${size}rem`,
      '--bg-animation-item-opacity': opacity,
      '--bg-animation-duration': `${duration}s`,
    },
    icon: 'icofont-meteor',
  };
});

const SPACE_ITEMS = [...STARS, ...METEORS]
  // sort to add bigger stars last in the dom
  .sort(({ size: s1 }, { size: s2 }) => (s1 < s2 ? -1 : s1 === s2 ? 0 : 1));

export default function AnimatedBackground() {
  const [spaceItems, setSpaceItems] = useState([]);

  useEffect(() => {
    // useState/useEffect to not break SSR
    setSpaceItems(SPACE_ITEMS);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 px-1">
      {spaceItems.map(({ id, className, style, icon }) => (
        <div key={id} className={className} style={style}>
          <i className={`icofont ${icon} text-gray-300`} />
        </div>
      ))}
    </div>
  );
}
