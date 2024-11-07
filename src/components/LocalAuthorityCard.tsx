import BarChartComponent from "./BarChartComponent";

interface LocalAuthorityCardProps {
    responses: any[];
    onRemoveResponse: (index:number) => void;
}

export default function LocalAuthorityCard ({responses, onRemoveResponse}: LocalAuthorityCardProps) {
    return (
        <div>
            {responses.map((response, index) => (
                <div key={index} className="relative bg-white max-w-[95%] rounded-lg shadow-xl p-4 transition-transform transform hover:scale-103 border border-gray-200">
                    <button 
                        className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={() => onRemoveResponse(index)}
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
    )
}