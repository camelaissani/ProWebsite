export default function TextareaField({
  id,
  title,
  required,
}: {
  id: string;
  title: string;
  required?: boolean;
}) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 text-sm text-gray-600">
        {title}
      </label>

      <textarea
        rows={5}
        id={id}
        name={id}
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
        required={!!required}
      ></textarea>
    </div>
  );
}
