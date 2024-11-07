interface IndicatorDropdownProps {
    availableIndicators: string[];
    selectedIndicators: string[];
    toggleIndicator: (indicator: string) => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
    dropdownOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IndicatorDropdown({
    availableIndicators,
    selectedIndicators,
    toggleIndicator,
    dropdownRef,
    dropdownOpen,
    setDropdownOpen,
}: IndicatorDropdownProps) {
    return (
        <div className="relative mb-4 w-full" ref={dropdownRef}>
            <button 
                onClick={() => setDropdownOpen((prev) => !prev)} 
                className="border rounded-lg px-4 py-2 w-full max-w-xs bg-white flex justify-between items-center" 
                aria-label="Select Indicators"
            >
                <span>Select Indicators</span>
                <span>{selectedIndicators.length} selected</span>
            </button>

            {dropdownOpen && (
                <div className="absolute z-10 bg-white border rounded-lg shadow-lg w-full mt-1 max-h-60 overflow-auto">
                    {availableIndicators.map((ind) => (
                        <label key={ind} className="flex items-center p-2 text-sm hover:bg-gray-200">
                            <input 
                                type="checkbox" 
                                checked={selectedIndicators.includes(ind)} 
                                onChange={() => toggleIndicator(ind)} 
                                className="mr-2"
                            />
                            {ind}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}