import ProfileItem from '@/components/ProfileItem';
import ResumeItem from '@/components/ResumeItem';
import { cn } from '@/utils';

export default function Stepper({
  icon,
  variant,
  title,
  values,
  className,
}: {
  icon: string;
  variant: 'profile' | 'resume';
  title?: string;
  values: {
    title: string;
    value: string;
    subTitle?: string;
    type?: 'obfuscated';
  }[];
  className?: string;
}) {
  return (
    <ul className={cn('relative list-none', className)}>
      <li className="flex items-center pb-10 border-l-[2px] border-gray-200">
        <i
          className={cn(
            'flex icofont text-white rounded-full -ml-[21px] items-center justify-center text-2xl w-10 h-10 bg-accent',
            icon,
          )}
        ></i>
        {title ? <h3 className="text-xl font-medium ml-3">{title}</h3> : null}
      </li>
      {values.map(({ title, value, ...data }) => {
        return variant === 'profile' ? (
          <ProfileItem
            key={title}
            title={title}
            type={data.type}
            value={value}
          />
        ) : (
          <ResumeItem
            key={title}
            title={title}
            subTitle={data.subTitle}
            value={value}
          />
        );
      })}
    </ul>
  );
}
