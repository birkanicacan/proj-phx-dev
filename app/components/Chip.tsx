interface ChipProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-sm font-medium transition-colors
        ${selected 
          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }
      `}
    >
      {label}
    </button>
  );
} 