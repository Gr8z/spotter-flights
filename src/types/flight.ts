export interface Flight {
  id: string
  price: {
    raw: number
    formatted: string
  }
  legs: Array<{
    id: string
    origin: {
      id: string
      name: string
      displayCode: string
      city: string
      country: string
    }
    destination: {
      id: string
      name: string
      displayCode: string
      city: string
      country: string
    }
    durationInMinutes: number
    stopCount: number
    departure: string
    arrival: string
    carriers: {
      marketing: Array<{
        id: number
        name: string
        alternateId: string
        logoUrl: string
      }>
    }
    segments: Array<{
      id: string
      flightNumber: string
      departure: string
      arrival: string
      durationInMinutes: number
      marketingCarrier: {
        id: number
        name: string
        alternateId: string
      }
    }>
  }>
  tags: string[]
}

export interface FlightSearchResponse {
  status: boolean
  timestamp: number
  data: {
    itineraries: Flight[]
    context: {
      status: string
      totalResults: number
    }
  }
}

export interface Airport {
  skyId: string
  entityId: string
  name: string
  city: string
  country: string
}

export interface SearchParams {
  originSkyId: string
  originEntityId: string
  destinationSkyId: string
  destinationEntityId: string
  departureDate: string
  returnDate?: string
  adults?: number
  currency?: string
}

export interface ApiResponse {
  data: Flight[]
  status: string
  message?: string
}

export interface AirportApiResponse {
  status: boolean
  timestamp: number
  data: Array<{
    skyId: string
    entityId: string
    presentation: {
      title: string
      suggestionTitle: string
      subtitle: string
    }
  }>
}

export interface NearbyAirportsResponse {
  status: boolean
  timestamp: number
  data: {
    current: {
      skyId: string
      entityId: string
      presentation: {
        title: string
        suggestionTitle: string
        subtitle: string
      }
      navigation: {
        entityId: string
        entityType: string
        localizedName: string
        relevantFlightParams: {
          skyId: string
          entityId: string
          flightPlaceType: string
          localizedName: string
        }
      }
    }
    nearby: Array<{
      skyId: string
      entityId: string
      presentation: {
        title: string
        suggestionTitle: string
        subtitle: string
      }
      navigation: {
        entityId: string
        entityType: string
        localizedName: string
        relevantFlightParams: {
          skyId: string
          entityId: string
          flightPlaceType: string
          localizedName: string
        }
      }
    }>
  }
}
