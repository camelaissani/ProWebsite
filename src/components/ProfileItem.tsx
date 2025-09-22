export default function ProfileItem({
  title,
  value,
  type,
}: {
  title: string;
  value: string;
  type?: 'obfuscated';
}) {
  let beforeAt: string = '';
  let afterAt: string = '';
  if (type === 'obfuscated') {
    const reverseValue = value.split('').reverse().join('').replace(/YY/g, '.');
    [beforeAt, afterAt] = reverseValue.split('ZZ');
  }

  return (
    <li className="border-l-[2px] last-of-type:border-0 -mt-[7px] last-of-type:ml-[2px] border-gray-200 pt-0 pr-0 pb-6 pl-4 last-of-type:pb-0">
      <div className="-ml-[22px] mt-[1px] bg-white float-left rounded-full border-accent border-2 w-[10px] h-[10px]"></div>
      <p className="text-xs">
        <span className="font-medium">{title}: </span>
        <span className="text-gray-500 ">
          {type === 'obfuscated' ? (
            <>
              {beforeAt}
              <span className="before:content-['\0040']">{afterAt}</span>
            </>
          ) : (
            value
          )}
        </span>
      </p>
    </li>
  );
}
