interface SearchResultProps {
  title: string;
  source: string;
  date: string;
  preview: string;
}

export function SearchResult({ title, source, date, preview }: SearchResultProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">•</span>
        <span className="text-sm text-gray-500">{source}</span>
        <span className="text-sm text-gray-500">•</span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600 line-clamp-2">{preview}</p>
    </div>
  );
} 