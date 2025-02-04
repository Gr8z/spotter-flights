import { useQuery } from '@tanstack/react-query'
import { SearchParams } from '../types/flight'
import { searchFlights } from '../services/flightService'

export const useFlightSearch = (params: SearchParams | null) => {
  return useQuery({
    queryKey: ['flights', params],
    queryFn: () => searchFlights(params!),
    enabled:
      !!params &&
      !!params.originSkyId &&
      !!params.originEntityId &&
      !!params.destinationSkyId &&
      !!params.destinationEntityId &&
      !!params.departureDate,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
    retry: 1, // Only retry once on failure
  })
}
