// src/features/landfills/hooks/useLandfillDetails.ts
import { useQuery } from "@tanstack/react-query";
import { apiLandfillsRepository } from "../data/apiRepository";

export function useLandfillDetails(landfillId: string | null, versionId?: number | null) {
  const { data: details, isLoading } = useQuery({
    queryKey: ["landfill-details", landfillId, versionId],
    queryFn: () => apiLandfillsRepository.getDetails(landfillId!, versionId),
    enabled: !!landfillId
  })
  return { details, isLoading };
}