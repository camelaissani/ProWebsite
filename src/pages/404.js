import AnimatedBackground from '../components/AnimatedBackground';

export default function Custom404() {
  return (
    <div className="bg-black fixed t-0 h-full w-full">
      <AnimatedBackground />
      <div className="fixed t-0 h-full w-full p-2 flex flex-col space-y-8 justify-center items-center text-zinc-200 shadow-zinc-100">
        <h1 className="text-7xl max-md:text-5xl font-bold text-shadow-sm">
          404
        </h1>
        <h2 className="text-xl max-md:text-sm font font-medium uppercase text-center max-w-sm text-shadow-lg">
          We are sorry, but the page you are looking for cannot be found.
        </h2>
      </div>
    </div>
  );
}

Custom404.pageName = '404';
