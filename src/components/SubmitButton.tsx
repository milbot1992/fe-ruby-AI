export default function SubmitButton({ onClick }: { onClick: () => void }) {
    return (
        <button 
            onClick={onClick} 
            className="bg-purple-400 text-white font-semibold rounded-lg px-4 py-2 transition-colors hover:bg-purple-300"
            aria-label="Submit Form"
        >
            Submit
        </button>
    );
}