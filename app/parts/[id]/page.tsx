import Scene from '@/components/Scene';
import PartModal from '@/components/PartModal';

export default async function PartStandalonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="w-full h-screen relative">
      <Scene />
      <PartModal id={id} />
    </main>
  );
}
