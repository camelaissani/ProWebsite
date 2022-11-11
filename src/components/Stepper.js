function ProfileItem({ title, value, type }) {
  let beforeAt;
  let afterAt;
  if (type === 'obfuscated') {
    const reverseValue = value.split('').reverse().join('').replace(/YY/g, '.');
    [beforeAt, afterAt] = reverseValue.split('ZZ');
  }

  return (
    <li className="border-l-[2px] last-of-type:border-0 -mt-[7px] last-of-type:ml-[2px] border-gray-200 pt-0 pr-0 pb-6 pl-4 last-of-type:pb-0">
      <div className="-ml-[22px] mt-[7px] bg-white float-left rounded-full border-accent border-2 w-[10px] h-[10px]"></div>
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

function ResumeItem({ title, subTitle, value }) {
  return (
    <li className="block border-l-[2px] last-of-type:border-0 -mt-[7px] last-of-type:ml-[2px] border-gray-200 pt-0 pr-0 pb-6 pl-4 last-of-type:pb-0">
      <div className="-ml-[22px] mt-[7px] bg-white float-left rounded-full border-accent border-2 w-[10px] h-[10px]"></div>
      <h4 className="font-medium">{title}</h4>
      <div className="text-gray-600 text-sm py-2">{subTitle}</div>
      <p className="text-gray-500 text-sm">{value}</p>
    </li>
  );
}

export default function Stepper({ icon, variant, title, values, className }) {
  return (
    <ul className={`relative list-none ${className}`}>
      <li className="flex items-center pb-10 border-l-[2px] border-gray-200">
        <i
          className={`flex icofont ${icon} text-white rounded-full -ml-[21px] items-center justify-center text-2xl w-10 h-10 bg-accent`}
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
