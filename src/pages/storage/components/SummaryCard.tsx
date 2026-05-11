export function SummaryCard({
  icon,
  count,
  label,
  color,
}: {
  icon: string;
  count: number;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-lilas-bg/50 p-6 rounded-md flex flex-col items-center gap-2 border border-gray-100">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${color} font-bold`}
      >
        {icon}
      </div>
      <span className="text-2xl font-bold">{count} Itens</span>
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
}
