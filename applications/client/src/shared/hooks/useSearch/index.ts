import { useMemo } from 'react';

export function useSearch<T>(data: T[] | null | undefined, query: string, getField: (item: T) => string): T[] {
  return useMemo(() => {
    if (!data || query.trim() === '') return data ?? [];

    const lowerQuery = query.toLowerCase();

    return data.filter((item) => getField(item).toLowerCase().includes(lowerQuery));
  }, [data, query]);
}
