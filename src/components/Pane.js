export default function Pane({ className, children }) {
  return (
    <div className={`bg-white rounded-md border-[#e9e8e5] border ${className}`}>
      {children}
    </div>
  );
}
