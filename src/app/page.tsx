import ParticlesBackground from '@/components/ParticlesBackground';
import Draggable3DElements from '@/components/Draggable3DElements';
// import DiagonalParticles from "@/components/DiagonalParticles";

export default function Home() {
  return (
      <div className="relative h-screen w-screen bg-black text-center flex items-center justify-center">

          <ParticlesBackground />
          <div className="absolute z-10">
              <button
                  className="inline-flex h-7 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000000,45%,#1e2631,55%,#000000)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors cursor-auto">
                  Sandesh Apparala
              </button>
              {/*<div className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full flex items-center space-x-2 shadow-lg">*/}
              {/*    <span className="text-lg">🔥</span>*/}
              {/*    <span className="text-LG font-semibold tracking-wide">Crafting Unique Solutions for Every Space and Brand</span>*/}
              {/*</div>*/}

              <h1 className="tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white text-4xl md:text-5xl lg:text-7xl font-semibold max-w-8xl mx-auto text-center mt-6 relative z-10 py-3">COMING
                  SOON</h1>
          </div>
          <Draggable3DElements/>
      </div>
  );
}
