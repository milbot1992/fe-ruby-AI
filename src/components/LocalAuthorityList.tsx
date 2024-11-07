import LocalAuthorityCard from "./LocalAuthorityCard";

interface LocalAuthorityListProps {
    submitted: boolean;
    onClearAll: () => void;
    responses: any[];
    onRemoveResponse: (index:number) => void;
}

export default function LocalAuthorityList ({ submitted, onClearAll, responses, onRemoveResponse }: LocalAuthorityListProps) {
    return (
        <div className="flex-1 p-5">
                <div className="mt-8 space-y-4 w-full flex flex-col items-center">
                    {submitted ? (
                        <button 
                            className="mb-4 bg-red-400 text-white font-semibold rounded-lg px-4 py-2 transition-colors hover:bg-red-300"
                            onClick={onClearAll}
                        >
                            Clear All
                        </button>
                    ) : (
                        <div className="mb-4 text-gray-600">
                            Select an Area and an Indicator to view charts and commentary.
                        </div>
                    )}
                    <LocalAuthorityCard responses={responses} onRemoveResponse={onRemoveResponse} />
                </div>
            </div>
    )
}