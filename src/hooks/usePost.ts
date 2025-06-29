import { useState } from 'react';
import { dataService } from '../api/dataService';

interface PostState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  postData: (endpoint: string, payload: any) => Promise<void>;
}

export function usePost<T = unknown>(): PostState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (endpoint: string, payload: any): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await dataService.post<T>(endpoint, payload);
      setData(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}
