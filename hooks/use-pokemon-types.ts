import { useQuery } from "@tanstack/react-query"
import { getTypeList } from "@/services/api"

export function useTypeList() {
  return useQuery({
    queryKey: ["type-list"],
    queryFn: getTypeList,
  })
}
