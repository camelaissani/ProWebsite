import Card from '@/components/cards/Card';
import GhStar from '@/components/GhStar';

export default function ProjectCard({
  title,
  description,
  language,
  stars,
  href,
}: {
  title: string;
  description: string;
  language?: string;
  stars?: number;
  href: string;
}) {
  return (
    <Card className="h-48 space-y-1" href={href}>
      <div className="flex justify-between items-center rounded-t-md m-0 px-4 py-2">
        <span className="font-bold">{title}</span>
        {stars ? (
          <div className="flex items-center gap-0.5">
            <GhStar />
            <span className="text-sm">{stars}</span>
          </div>
        ) : null}
      </div>
      <div className="px-4 space-y-4">
        {language ? (
          <p className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent text-white">
            {language}
          </p>
        ) : null}
        <p className="text-sm">{description}</p>
      </div>
    </Card>
  );
}
