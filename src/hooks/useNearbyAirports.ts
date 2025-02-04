import { useQuery } from '@tanstack/react-query'
import { getNearbyAirports } from '../services/flightService'

interface Coordinates {
  latitude: number
  longitude: number
}

export const useNearbyAirports = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: ['nearbyAirports', coordinates?.latitude, coordinates?.longitude],
    queryFn: () =>
      coordinates
        ? getNearbyAirports(coordinates.latitude, coordinates.longitude)
        : Promise.resolve([]),
    enabled: !!coordinates,
    staleTime: 30 * 60 * 1000, // Consider data fresh for 30 minutes
    gcTime: 60 * 60 * 1000, // Keep data in cache for 1 hour
  })
}
