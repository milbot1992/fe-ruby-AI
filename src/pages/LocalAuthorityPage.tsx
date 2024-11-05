import React, { useState } from 'react';
import LocalAuthorityForm from '../components/LocalAuthorityForm';
import BarChartComponent from '../components/BarChartComponent';

const LocalAuthorityPage: React.FC = () => {
    const [responses, setResponses] = useState<any[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false); // State to track if the form is submitted

    const handleDataFetch = (data: any) => {
        setResponses(prevResponses => [...prevResponses, data]);
        setSubmitted(true); // Set submitted to true when data is fetched
    };

    const handleRemoveResponse = (index: number) => {
        setResponses(prevResponses => prevResponses.filter((_, i) => i !== index));
    };

    const handleClearAll = () => {
        setResponses([]); // Clear all responses
        setSubmitted(false); // Reset submitted state to false
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-white to-slate-100">
            <div className="w-1/4 bg-gradient-to-r from-slate-100 to-slate-200 p-5 shadow-md">
                <LocalAuthorityForm onDataFetch={handleDataFetch} />
            </div>
            <div className="flex-1 p-5">
                <div className="mt-8 space-y-4 w-full flex flex-col items-center">
                    {submitted ? (
                        <button 
                            className="mb-4 bg-red-400 text-white font-semibold rounded-lg px-4 py-2 transition-colors hover:bg-red-300"
                            onClick={handleClearAll}
                        >
                            Clear All
                        </button>
                    ) : (
                        <div className="mb-4 text-gray-600">
                            Select an Area and an Indicator to view charts and commentary.
                        </div>
                    )}
                    {responses.map((response, index) => (
                        <div key={index} className="relative bg-white max-w-[95%] rounded-lg shadow-xl p-4 transition-transform transform hover:scale-105 border border-gray-200">
                            <button 
                                className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition-colors"
                                onClick={() => handleRemoveResponse(index)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-semibold text-gray-800">{response['Area Name']}</h2>
                            <h3 className="text-lg font-medium text-gray-700">{response['Indicator Name']}</h3>
                            <div className="mt-4 flex">
                                <div className="flex-1 pr-4">
                                    <ul className="list-none text-gray-700 pl-5 mt-2">
                                        {response['GPT Commentary'].split('\n').map((item: string, i: number) => {
                                            const trimmedItem = item.trim();
                                            const isBullet = trimmedItem.startsWith('- ');
                                            return (
                                                <li 
                                                    key={i} 
                                                    className={`pl-2 ${isBullet ? 'list-disc' : 'list-none'}`}
                                                    style={{ textAlign: 'left', paddingTop: isBullet ? '0' : '10px', marginLeft: isBullet ? '0' : '-20px' }} 
                                                >
                                                    {isBullet ? trimmedItem.replace(/^\s*-\s+/, '') : trimmedItem}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="flex-none w-1/3 h-80">
                                    <BarChartComponent
                                        value={response['Data Points']['Value']}
                                        lowerCI={response['Data Points']['Lower CI 95.0 limit']}
                                        upperCI={response['Data Points']['Upper CI 95.0 limit']}
                                        indicatorName={response['Indicator Name']}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LocalAuthorityPage;
