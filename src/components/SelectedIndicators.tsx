interface SelectedIndicatorsProps {
    selectedIndicators: string[];
    highlighted: boolean;
    setSelectedIndicators: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SelectedIndicators({
    selectedIndicators,
    highlighted,
    setSelectedIndicators,
}: SelectedIndicatorsProps) {
    return (
        <div className="flex flex-wrap mb-4 space-x-2">
            {selectedIndicators.map((ind) => (
                <div 
                    key={ind} 
                    className={`rounded-lg px-3 py-1 shadow-md ${highlighted ? 'bg-blue-300' : 'bg-gray-200'} text-sm`} 
                    style={{ width: '150px', marginLeft: '0px', marginRight: '8px', marginBottom: '8px' }}  
                >
                    {ind}
                    <button 
                        onClick={() => setSelectedIndicators((prev) => prev.filter((i) => i !== ind))} 
                        className="ml-2 text-red-500 hover:text-red-700"
                        aria-label="Remove Indicator"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
}