export const fetchLocalAuthorityData = async (localAuthority: string, indicatorName: string): Promise<any> => {
    const response = await fetch(`https://ruby-ai-59uig4c9e-millie-ellis-projects.vercel.app/local_authority/${localAuthority}?indicator_name=${encodeURIComponent(indicatorName)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchAvailableOptions = async (): Promise<any> => {
    const response = await fetch('https://ruby-ai-59uig4c9e-millie-ellis-projects.vercel.app/available_options');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
