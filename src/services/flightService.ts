import axios from 'axios'
import {
  SearchParams,
  ApiResponse,
  FlightSearchResponse,
  Airport,
  AirportApiResponse,
  NearbyAirportsResponse,
} from '../types/flight'

const API_HOST = 'sky-scrapper.p.rapidapi.com'
const API_KEY = import.meta.env.VITE_RAPID_API_KEY

const api = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1',
  headers: {
    'X-RapidAPI-Host': API_HOST,
    'X-RapidAPI-Key': API_KEY,
  },
})

// Search flights
export const searchFlights = async (
  params: SearchParams
): Promise<ApiResponse> => {
  try {
    const response = await api.get<FlightSearchResponse>(
      '/flights/searchFlights',
      {
        params: {
          originSkyId: params.originSkyId,
          originEntityId: params.originEntityId,
          destinationSkyId: params.destinationSkyId,
          destinationEntityId: params.destinationEntityId,
          date: params.departureDate,
          returnDate: params.returnDate,
          adult: params.adults || 1,
          currency: params.currency || 'AED',
          countryCode: 'AE',
          market: 'en-AE',
        },
      }
    )

    return {
      status: 'success',
      data: response.data.data.itineraries,
    }
  } catch (error) {
    console.error('Error searching flights:', error)
    return {
      status: 'error',
      data: [],
      message: 'Failed to fetch flight data. Please try again later.',
    }
  }
}

// Search for nearby airports
export const getNearbyAirports = async (
  lat: number,
  lon: number
): Promise<Airport[]> => {
  try {
    const response = await api.get<NearbyAirportsResponse>(
      '/flights/getNearByAirports',
      {
        params: {
          lat,
          lng: lon,
        },
      }
    )

    // Convert current airport to Airport type
    const currentAirport: Airport = {
      skyId: response.data.data.current.navigation.relevantFlightParams.skyId,
      entityId:
        response.data.data.current.navigation.relevantFlightParams.entityId,
      name: response.data.data.current.presentation.suggestionTitle,
      city: response.data.data.current.presentation.title,
      country: response.data.data.current.presentation.subtitle,
    }

    // Convert nearby airports to Airport type
    const nearbyAirports: Airport[] = response.data.data.nearby.map(
      (airport) => ({
        skyId: airport.navigation.relevantFlightParams.skyId,
        entityId: airport.navigation.relevantFlightParams.entityId,
        name: airport.presentation.suggestionTitle,
        city: airport.presentation.title,
        country: airport.presentation.subtitle,
      })
    )

    // Return current airport first, followed by nearby airports
    return [currentAirport, ...nearbyAirports]
  } catch (error) {
    console.error('Error fetching nearby airports:', error)
    return []
  }
}

// Search airports by query
export const searchAirports = async (query: string): Promise<Airport[]> => {
  try {
    const response = await api.get<AirportApiResponse>(
      '/flights/searchAirport',
      {
        params: { query },
      }
    )
    return response.data.data.map((airport) => ({
      skyId: airport.skyId,
      entityId: airport.entityId,
      name: airport.presentation.suggestionTitle,
      city: airport.presentation.title,
      country: airport.presentation.subtitle,
    }))
  } catch (error) {
    console.error('Error searching airports:', error)
    return []
  }
}
