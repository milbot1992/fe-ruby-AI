import React, { type FC, useState, useEffect, useRef } from 'react';
import { fetchLocalAuthorityData, fetchAvailableOptions } from '../api';

import SelectedIndicators from './SelectedIndicators';
import SelectLocalAuthority from './SetLocalAuthority';
import IndicatorDropdown from './IndicatorDropdown';
import SubmitButton from './SubmitButton';

interface LocalAuthorityFormProps {
    onDataFetch: (data: any) => void;
}

export default function LocalAuthorityForm({ onDataFetch }: LocalAuthorityFormProps) {
    const [localAuthority, setLocalAuthority] = useState<string>('');
    const [availableAreas, setAvailableAreas] = useState<string[]>([]);
    const [availableIndicators, setAvailableIndicators] = useState<string[]>([]);
    const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
    const [highlighted, setHighlighted] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);  // Track if the form has been submitted
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
        setSelectedIndicators((prev) => {
            const updatedIndicators = prev.includes(indicator)
                ? prev.filter((i) => i !== indicator)
                : [...prev, indicator];
            return updatedIndicators;
        });
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
            setIsSubmitted(true);  // Set form as submitted
            
            setTimeout(() => {
                 // Save the current list of selected indicators
                setSelectedIndicators([]);
                setHighlighted(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching data:', error);
            onDataFetch(null);
        }
    };

    const handleClearAll = () => {
        setSelectedIndicators([]);
        setIsSubmitted(false);  // Reset form submission state
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
}
