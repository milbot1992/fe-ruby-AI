import React, { useState } from 'react';
import LocalAuthorityForm from '../components/LocalAuthorityForm';
import BarChartComponent from '../components/BarChartComponent';

const LocalAuthorityPage: React.FC = () => {
    const [responses, setResponses] = useState<any[]>([]);

    const handleDataFetch = (data: any) => {
        setResponses(prevResponses => [...prevResponses, data]);
    };

    const handleRemoveResponse = (index: number) => {
        setResponses(prevResponses => prevResponses.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-b from-blue-200 to-blue-100 p-5 overflow-auto">
            <LocalAuthorityForm onDataFetch={handleDataFetch} />
            <div className="mt-8 w-4/5 space-y-4">
                {responses.map((response, index) => (
                    <div key={index} className="relative bg-white rounded-lg shadow-lg p-4">
                        <button 
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleRemoveResponse(index)}
                        >
                            X
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">{response['Area Name']}</h2>
                        <h3 className="text-lg font-semibold text-gray-700">{response['Indicator Name']}</h3>
                        <div className="mt-4 flex">
                            <div className="flex-1 pr-4">
                                <h4 className="font-semibold text-gray-600">Commentary:</h4>
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
                            <div className="flex-none w-2/6 h-80">
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
    );
};

export default LocalAuthorityPage;
