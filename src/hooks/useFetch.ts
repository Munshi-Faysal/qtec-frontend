import { useState, useEffect, useCallback } from 'react';
import { dataService } from '../api/dataService'; // Adjust path if needed

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;  // add refetch here
}

export function useFetch<T = unknown>(endpoint: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0); // state to trigger reload

  const refetch = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    dataService
      .get<T>(endpoint)
      .then((response) => {
        setData(response.data);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, reloadFlag]); // reloadFlag triggers refetch

  return { data, loading, error, refetch };
}
