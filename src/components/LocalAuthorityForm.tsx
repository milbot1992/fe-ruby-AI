import React, { useState, useEffect, useRef } from 'react';
import { fetchLocalAuthorityData, fetchAvailableOptions } from '../api';

interface LocalAuthorityFormProps {
    onDataFetch: (data: any) => void;
}

const LocalAuthorityForm: React.FC<LocalAuthorityFormProps> = ({ onDataFetch }) => {
    const [localAuthority, setLocalAuthority] = useState<string>('');
    const [availableAreas, setAvailableAreas] = useState<string[]>([]);
    const [availableIndicators, setAvailableIndicators] = useState<string[]>([]);
    const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
    const [highlighted, setHighlighted] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const options = await fetchAvailableOptions();
                setAvailableAreas(options['Area Names']);
                setAvailableIndicators(options['Indicator Names']);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        loadOptions();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalAuthority(e.target.value);
    };

    const toggleIndicator = (indicator: string) => {
        setSelectedIndicators((prev) => 
            prev.includes(indicator) 
                ? prev.filter((i) => i !== indicator) 
                : [...prev, indicator]
        );
    };

    const handleSubmit = async () => {
        if (!localAuthority || selectedIndicators.length === 0) return;

        try {
            const fetchDataPromises = selectedIndicators.map((ind) =>
                fetchLocalAuthorityData(localAuthority, ind)
            );
            const dataResults = await Promise.all(fetchDataPromises);
            dataResults.forEach(data => onDataFetch(data));

            setHighlighted(true);
            setTimeout(() => {
                setSelectedIndicators([]);
                setHighlighted(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching data:', error);
            onDataFetch(null);
        }
    };

    return (
        <div className="flex flex-col items-start p-5 w-full h-full">
            <h1 className="text-xl mb-4 text-gray-800">Select Local Authority:</h1>
            <SelectLocalAuthority
                localAuthority={localAuthority}
                availableAreas={availableAreas}
                onChange={handleAreaChange}
            />
            <IndicatorDropdown
                availableIndicators={availableIndicators}
                selectedIndicators={selectedIndicators}
                toggleIndicator={toggleIndicator}
                dropdownRef={dropdownRef}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
            />
            <SelectedIndicators 
                selectedIndicators={selectedIndicators}
                highlighted={highlighted}
                setSelectedIndicators={setSelectedIndicators}
            />
            <SubmitButton onClick={handleSubmit} />
        </div>
    );
};

const SelectLocalAuthority: React.FC<{
    localAuthority: string;
    availableAreas: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ localAuthority, availableAreas, onChange }) => (
    <select 
        value={localAuthority} 
        onChange={onChange} 
        className="border rounded-lg px-4 py-2 mb-4 w-full max-w-xs" 
        aria-label="Select Local Authority"
    >
        <option value="">Select an area</option>
        {availableAreas.map((area) => (
            <option key={area} value={area}>{area}</option>
        ))}
    </select>
);

const IndicatorDropdown: React.FC<{
    availableIndicators: string[];
    selectedIndicators: string[];
    toggleIndicator: (indicator: string) => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
    dropdownOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ availableIndicators, selectedIndicators, toggleIndicator, dropdownRef, dropdownOpen, setDropdownOpen }) => (
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

const SelectedIndicators: React.FC<{
    selectedIndicators: string[];
    highlighted: boolean;
    setSelectedIndicators: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedIndicators, highlighted, setSelectedIndicators }) => (
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

const SubmitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button 
        onClick={onClick} 
        className="bg-purple-400 text-white font-semibold rounded-lg px-4 py-2 transition-colors hover:bg-purple-300"
        aria-label="Submit Form"
    >
        Submit
    </button>
);

export default LocalAuthorityForm;
