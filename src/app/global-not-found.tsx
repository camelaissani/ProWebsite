import SpaceBackground from '@/components/backgounds/SpaceBackground';

export default function Custom404() {
  return (
    <html lang="en" translate="no">
      <body>
        <div className="bg-black fixed t-0 h-full w-full">
          <SpaceBackground />
          <div className="fixed t-0 h-full w-full p-2 flex flex-col space-y-8 justify-center items-center text-zinc-200 shadow-zinc-100">
            <h1 className="text-7xl max-md:text-5xl font-bold text-shadow-sm">
              404
            </h1>
            <h2 className="text-xl max-md:text-sm font font-medium uppercase text-center max-w-sm text-shadow-lg">
              Page not found
            </h2>
          </div>
        </div>
      </body>
    </html>
  );
}
