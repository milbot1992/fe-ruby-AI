interface SelectLocalAuthorityProps {
    localAuthority: string;
    availableAreas: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectLocalAuthority({
    localAuthority,
    availableAreas,
    onChange,
}:SelectLocalAuthorityProps) {
    return (
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
}