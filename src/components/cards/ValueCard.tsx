import Card from '@/components/cards/Card';

const valueColors = [
  'bg-green-200',
  'bg-yellow-200',
  'bg-blue-200',
  'bg-red-200',
];

export default function ValueCard({
  title,
  logo,
  index,
}: {
  title: string;
  logo: string;
  index: number;
}) {
  return (
    <Card
      className={`flex flex-col justify-center items-center space-y-2 rounded-full w-32 h-32 max-lg:w-24 max-lg:h-24 border-none text-gray-700 ${
        valueColors[index % valueColors.length]
      } animate-zoom-out`}
    >
      <i className={`icofont ${logo} text-5xl max-lg:text-4xl`}></i>
      <h4 className="text-sm max-lg:text-xs text-center font-medium">
        {title}
      </h4>
    </Card>
  );
}
