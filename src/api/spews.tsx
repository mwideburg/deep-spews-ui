import { authenticatedFetch } from "./auth";

export const fetchTrends = async () => {
    const response = await authenticatedFetch(`${process.env.REACT_APP_AWS_DOMAIN}/trends`);
    if (!response.ok) {
      throw new Error('Failed to fetch trends');
    }
    return response.json();
  };
  
  export const fetchSummary = async (id: string) => {
    const response = await authenticatedFetch(`${process.env.REACT_APP_AWS_DOMAIN}/summary/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch summary');
    }
    return response.json();
  };
  
  export const fetchSnippets = async (id: string) => {
    const response = await authenticatedFetch(`${process.env.REACT_APP_AWS_DOMAIN}/snippets/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch snippets');
    }
    return response.json();
  };