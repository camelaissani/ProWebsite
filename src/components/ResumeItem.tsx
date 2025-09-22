export default function ResumeItem({
  title,
  subTitle,
  value,
}: {
  title: string;
  subTitle?: string;
  value: string;
}) {
  return (
    <li className="block border-l-[2px] last-of-type:border-0 -mt-[7px] last-of-type:ml-[2px] border-gray-200 pt-0 pr-0 pb-6 pl-4 last-of-type:pb-0">
      <div className="-ml-[22px] mt-[6px] bg-white float-left rounded-full border-accent border-2 w-[10px] h-[10px]"></div>
      <h4 className="font-medium">{title}</h4>
      <div className="text-gray-600 text-sm py-2">{subTitle}</div>
      <p className="text-gray-500 text-sm">{value}</p>
    </li>
  );
}
