import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// GET /api/dramas
export function useDramas() {
  return useQuery({
    queryKey: [api.dramas.list.path],
    queryFn: async () => {
      const res = await fetch(api.dramas.list.path);
      if (!res.ok) throw new Error("Failed to fetch dramas");
      // Validate using the schema from routes
      const result = api.dramas.list.responses[200].parse(await res.json());
      return result.data.book; // Return the array of dramas directly for easier usage
    },
  });
}
