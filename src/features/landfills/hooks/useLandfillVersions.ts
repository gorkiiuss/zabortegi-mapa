// src/features/landfills/hooks/useLandfillVersions.ts

import { useQuery } from "@tanstack/react-query";
import { apiLandfillsRepository } from "../data/apiRepository";

export function useLandfillVersions(landfillId: string | null) {
  const { data: versions, isLoading } = useQuery({
    queryKey: ["landfill-versions", landfillId],
    queryFn: () => apiLandfillsRepository.getVersions(landfillId!),
    enabled: !!landfillId,
    select: (allVersions) =>
      allVersions.filter(
        (v) => v.status !== "PENDING" && v.versionNumber !== 0
      )
  });
  return { versions, isLoading };
}