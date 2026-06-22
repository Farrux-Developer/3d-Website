import Scene from '@/components/Scene';

export default function Home() {
  return (
    <main className="w-full h-screen relative bg-neutral-950">
      <Scene />
      
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 p-8 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tighter text-white">
          QUANTUM <span className="text-blue-500">CORE</span>
        </h1>
        <p className="text-white/50 max-w-sm mt-4 leading-relaxed text-sm">
          Interact with the components to view system status, material properties, and power draw telemetry.
        </p>
      </div>
    </main>
  );
}
