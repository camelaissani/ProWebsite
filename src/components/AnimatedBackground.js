const stars = [
  {
    id: 1,
    icon: 'icofont-star-alt-1',
    animate: 'animate-bubble-up-20',
  },
  { id: 2, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-40' },
  { id: 3, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-50' },
  { id: 4, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-30' },
  { id: 5, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-40' },
  { id: 7, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-20' },
  { id: 10, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-10' },
  { id: 12, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-50' },
  { id: 13, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-30' },
  { id: 14, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-40' },
  { id: 15, icon: 'icofont-star-alt-1', animate: 'animate-bubble-up-10' },
];

const meteors = [
  { id: 1, icon: 'icofont-meteor', animate: 'animate-meteor-60' },
  { id: 2, icon: 'icofont-meteor', animate: 'animate-meteor-20' },
  { id: 3, icon: 'icofont-meteor', animate: 'animate-meteor-50' },
  { id: 4, icon: 'icofont-meteor', animate: 'animate-meteor-30' },
  { id: 6, icon: 'icofont-meteor', animate: 'animate-meteor-20' },
  { id: 8, icon: 'icofont-meteor', animate: 'animate-meteor-40' },
  { id: 9, icon: 'icofont-meteor', animate: 'animate-meteor-50' },
  { id: 11, icon: 'icofont-meteor', animate: 'animate-meteor-30' },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 px-1">
      <div className="flex justify-between">
        {stars.map(({ id, icon, animate }) => (
          <div
            key={id}
            className={animate}
            style={{
              '--star-animation-delay': `-${Math.floor(Math.random() * 30)}s`,
            }}
          >
            <i
              className={`icofont ${icon} text-4xl text-gray-300 text-center`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {meteors.map(({ id, icon, animate }) => (
          <div
            key={id}
            className={animate}
            style={{
              '--meteor-animation-delay': `-${Math.floor(Math.random() * 30)}s`,
            }}
          >
            <i
              className={`icofont ${icon} text-4xl text-gray-300 text-center`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
