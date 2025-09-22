export default function InputField({
  id,
  type,
  title,
  required,
}: {
  id: string;
  type: string;
  title: string;
  required?: boolean;
}) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm text-gray-600">
        {title}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        required={!!required}
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
      />
    </div>
  );
}
