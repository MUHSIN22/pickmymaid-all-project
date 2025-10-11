interface RadioCardProps {
    id: string;
    name: string;
    label: string;
    description?: string;
    value: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const RadioCard: React.FC<RadioCardProps> = ({
    id,
    name,
    label,
    description,
    value,
    checked,
    onChange,
  }) => {
    return (
      <label
        htmlFor={id}
        className="flex items-center gap-3 p-4 border-[2px] border-primary-300 rounded-xl cursor-pointer transition-shadow hover:shadow-sm"
      >
        {/* Hidden Radio */}
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
  
        {/* Circle indicator */}
        <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary-300 shrink-0">
          <span className="w-2 h-2 rounded-full bg-primary-300 scale-0 peer-checked:scale-100 transform transition-transform" />
        </span>
  
        {/* Content */}
        <div className="flex-1">
          <div className="font-medium text-gray-900">{label}</div>
          {description && (
            <div className="text-sm text-gray-500">{description}</div>
          )}
        </div>
  
        {/* Right-side check icon */}
        <svg
          className="w-5 h-5 text-primary-300 opacity-0 peer-checked:opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </label>
    );
  };
  
  export default RadioCard;