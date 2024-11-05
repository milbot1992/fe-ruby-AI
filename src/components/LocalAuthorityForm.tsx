import React, { useState, useEffect } from 'react';
import { fetchLocalAuthorityData, fetchAvailableOptions } from '../api';

const LocalAuthorityForm: React.FC<{ onDataFetch: (data: any) => void }> = ({ onDataFetch }) => {
    const [localAuthority, setLocalAuthority] = useState<string>('');
    const [indicator, setIndicator] = useState<string>('');
    const [availableAreas, setAvailableAreas] = useState<string[]>([]);
    const [availableIndicators, setAvailableIndicators] = useState<string[]>([]);
    const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
    const [highlighted, setHighlighted] = useState<boolean>(false);

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

    const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalAuthority(e.target.value);
    };

    const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIndicator(e.target.value);
    };

    const handleIndicatorAdd = () => {
        if (indicator && !selectedIndicators.includes(indicator)) {
            setSelectedIndicators((prev) => [...prev, indicator]);
            setIndicator('');
        }
    };

    const handleRemoveIndicator = (ind: string) => {
        setSelectedIndicators((prev) => prev.filter(i => i !== ind));
    };

    const handleSubmit = async () => {
        if (!localAuthority || selectedIndicators.length === 0) return;

        try {
            // Fetch data for each selected indicator
            const fetchDataPromises = selectedIndicators.map(ind => fetchLocalAuthorityData(localAuthority, ind));
            const dataResults = await Promise.all(fetchDataPromises);
            dataResults.forEach(data => onDataFetch(data));

            // Highlight selected indicators after generating
            setHighlighted(true);
            setTimeout(() => {
                setSelectedIndicators([]); // Clear the indicators
                setHighlighted(false); // Reset the highlight state
            }, 1000); // Highlight for 1 second
        } catch (error) {
            console.error('Error fetching data:', error);
            onDataFetch(null);
        }
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-xl font-bold mb-4 text-gray-800">Select Local Authority:</h1>
            <select 
                value={localAuthority} 
                onChange={handleAreaChange} 
                className="border rounded-lg px-4 py-2 mb-4 w-80"
                aria-label="Select Local Authority"
            >
                <option value="">Select an area</option>
                {availableAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>

            <select 
                value={indicator} 
                onChange={handleIndicatorChange}
                className="border rounded-lg px-4 py-2 mb-4 w-80"
                aria-label="Add an Indicator"
            >
                <option value="">Add an indicator</option>
                {availableIndicators.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                ))}
            </select>

            <button 
                onClick={handleIndicatorAdd} 
                className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mb-4"
                aria-label="Add Indicator"
            >
                Add Indicator
            </button>

            <div className="flex flex-wrap mb-4 space-x-2">
                {selectedIndicators.map(ind => (
                    <div 
                        key={ind} 
                        className={`rounded-lg px-3 py-1 shadow-sm relative ${highlighted ? 'bg-yellow-300 border-2 border-yellow-500' : 'bg-gray-100'}`}
                    >
                        {ind}
                        <button 
                            onClick={() => handleRemoveIndicator(ind)} 
                            className="ml-2 text-red-500"
                            aria-label={`Remove ${ind} indicator`}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2"
                aria-label="Generate Data"
            >
                Generate
            </button>
        </div>
    );
};

export default LocalAuthorityForm;
