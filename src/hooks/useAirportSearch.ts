import { useQuery } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import debounce from 'lodash-es/debounce'
import { searchAirports } from '../services/flightService'
import { Airport } from '../types/flight'

export const useAirportSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [manualAirports, setManualAirports] = useState<Airport[]>([])

  const { data: searchedAirports = [], isLoading } = useQuery({
    queryKey: ['airports', searchTerm],
    queryFn: () => searchAirports(searchTerm),
    enabled: searchTerm.length >= 2,
    staleTime: 10 * 60 * 1000, // Consider airport data fresh for 10 minutes
    gcTime: 60 * 60 * 1000, // Keep airport data in cache for 1 hour
    retry: 1,
  })

  // Debounce the search term update
  const debouncedSetSearchTerm = useCallback(
    (term: string) => {
      const debouncedFn = debounce((searchTerm: string) => {
        setSearchTerm(searchTerm)
        if (searchTerm.length >= 2) {
          setManualAirports([])
        }
      }, 300)
      debouncedFn(term)
    },
    [setSearchTerm, setManualAirports]
  )

  return {
    airports: searchTerm.length >= 2 ? searchedAirports : manualAirports,
    isLoading,
    searchTerm,
    setSearchTerm: debouncedSetSearchTerm,
    setAirports: setManualAirports,
  }
}
