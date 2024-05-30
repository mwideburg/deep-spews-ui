import { authenticatedFetch } from "./auth";

export const fetchTrends = async () => {
    const response = await authenticatedFetch(`https://s14bh1g6nl.execute-api.us-east-1.amazonaws.com/test/get-trends`);
    return response;
};

export const fetchSummary = async (id: string) => {
    const response = await authenticatedFetch(
        `https://s14bh1g6nl.execute-api.us-east-1.amazonaws.com/test/get-summary`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trendId: id }),
        }
    );
    console.log(response)
    return response
};

export const fetchSnippets = async (id: string) => {
    const response = await authenticatedFetch(`${process.env.REACT_APP_AWS_DOMAIN}/snippets/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch snippets');
    }
    return response.json();
};