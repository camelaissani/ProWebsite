export default function IconButton({
  title,
  icon,
  type = '',
  disabled = false,
  className,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`rounded-full bg-accent py-1.5 px-6 text-sm transition delay-150 ease-in ${
        !disabled ? 'hover:bg-accent-light' : 'bg-gray-300 text-gray-500'
      }  text-white font-medium ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center space-x-2 ">
        <div>{title}</div>
        <i className={`text-xl icofont ${icon}`}></i>
      </div>
    </button>
  );
}
