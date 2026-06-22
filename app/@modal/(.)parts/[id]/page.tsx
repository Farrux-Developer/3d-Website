import PartModal from '@/components/PartModal';

export default async function InterceptedPartModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PartModal id={id} />;
}
