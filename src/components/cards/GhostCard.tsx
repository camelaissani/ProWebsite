import Card from '@/components/cards/Card';

export default function GhostCard() {
  return (
    <Card className="h-48 px-4 py-2">
      <div className="flex flex-col space-y-6 py-1 animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-gray-300 rounded col-span-2"></div>
          <div className="h-2 bg-gray-300 rounded col-span-1"></div>
        </div>
        <div className="space-y-3">
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </Card>
  );
}
