import { useSearchParams, useRouter } from "next/navigation";

// Type for query object
interface QueryObject {
  [key: string]: string;
}

export const useQueries = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all query parameters as an object
  const getQueries = (): QueryObject => {
    return Object.fromEntries(searchParams.entries());
  };

  // Add or update a query parameter
  const addQueries = (key: string, value: string) => {
    const queries = getQueries();
    const newParams = new URLSearchParams({ ...queries, [key]: value });
    router.push(`?${newParams.toString()}`);
  };

  return { getQueries, addQueries };
};
