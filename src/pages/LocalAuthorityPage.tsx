import React, { type FC, useState } from 'react';
import LocalAuthorityForm from '../components/LocalAuthorityForm';
import LocalAuthorityList from '../components/LocalAuthorityList';

const LocalAuthorityPage: FC = () => {
    const [responses, setResponses] = useState<any[]>([]);

    const handleDataFetch = (data: any) => {
        setResponses(prevResponses => [...prevResponses, data]);
    };

    const handleRemoveResponse = (index: number) => {
        setResponses(prevResponses => prevResponses.filter((_, i) => i !== index));
    };

    const handleClearAll = () => {
        setResponses([]); // Clears all responses
    };

    // Derive `submitted` from the length of `responses`
    const submitted = responses.length > 0;

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-white to-slate-100">
            <div className="w-1/4 bg-gradient-to-r from-slate-100 to-slate-200 p-5 shadow-md">
                <LocalAuthorityForm onDataFetch={handleDataFetch} />
            </div>
            <LocalAuthorityList
                submitted={submitted} 
                onClearAll={handleClearAll} 
                responses={responses} 
                onRemoveResponse={handleRemoveResponse} 
            />
        </div>
    );
};

export default LocalAuthorityPage;
