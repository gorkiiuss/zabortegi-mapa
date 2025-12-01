// src/features/landfills/hooks/useLandfills.ts
import { useLandfillsStore } from "../state/landfillsStore";

export function useLandfills() {
  const landfills = useLandfillsStore((s) => s.landfills);
  const loading = useLandfillsStore((s) => s.loading);
  const error = useLandfillsStore((s) => s.error);

  return { landfills, loading, error };
}
