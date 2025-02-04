import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Container,
  CircularProgress,
  Typography,
  Paper,
  Alert,
  Autocomplete,
  Grid,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { SearchParams, Airport } from '../types/flight'
import FlightList from './FlightList'
import { useFlightSearch } from '../hooks/useFlightSearch'
import { useAirportSearch } from '../hooks/useAirportSearch'
import { useNearbyAirports } from '../hooks/useNearbyAirports'

const FlightSearch: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [activeSearch, setActiveSearch] = useState<SearchParams | null>(null)
  const [searchParams, setSearchParams] = useState<SearchParams>({
    originSkyId: '',
    originEntityId: '',
    destinationSkyId: '',
    destinationEntityId: '',
    departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    returnDate: '',
    adults: 1,
    currency: 'AED',
  })

  const {
    airports,
    isLoading: isLoadingSearch,
    setSearchTerm: setAirportSearchTerm,
    setAirports,
  } = useAirportSearch()

  const { data: nearbyAirports, isLoading: isLoadingNearby } =
    useNearbyAirports(coordinates)

  const {
    data: flightResults,
    isLoading: isLoadingFlights,
    error: flightError,
  } = useFlightSearch(activeSearch)

  useEffect(() => {
    if (nearbyAirports?.length) {
      setAirports(nearbyAirports)
    }
  }, [nearbyAirports, setAirports])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  const handleSearch = () => {
    setActiveSearch(searchParams)
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Flight Search
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Autocomplete<Airport, false>
              options={airports}
              getOptionLabel={(option) => option.name}
              onInputChange={(_, value) => setAirportSearchTerm(value)}
              onChange={(_, value) =>
                setSearchParams((prev) => ({
                  ...prev,
                  originSkyId: value?.skyId || '',
                  originEntityId: value?.entityId || '',
                }))
              }
              isOptionEqualToValue={(option, value) =>
                option.skyId === value.skyId &&
                option.entityId === value.entityId
              }
              loading={isLoadingSearch || isLoadingNearby}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='From'
                  fullWidth
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoadingSearch || isLoadingNearby ? (
                          <CircularProgress color='inherit' size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete<Airport, false>
              options={airports}
              getOptionLabel={(option) => option.name}
              onInputChange={(_, value) => setAirportSearchTerm(value)}
              onChange={(_, value) =>
                setSearchParams((prev) => ({
                  ...prev,
                  destinationSkyId: value?.skyId || '',
                  destinationEntityId: value?.entityId || '',
                }))
              }
              isOptionEqualToValue={(option, value) =>
                option.skyId === value.skyId &&
                option.entityId === value.entityId
              }
              loading={isLoadingSearch || isLoadingNearby}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='To'
                  fullWidth
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoadingSearch || isLoadingNearby ? (
                          <CircularProgress color='inherit' size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Departure Date'
                value={dayjs(searchParams.departureDate)}
                minDate={dayjs()}
                onChange={(date) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    departureDate: date?.format('YYYY-MM-DD') || '',
                  }))
                }
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Return Date (Optional)'
                value={
                  searchParams.returnDate
                    ? dayjs(searchParams.returnDate)
                    : null
                }
                minDate={dayjs(searchParams.departureDate)}
                onChange={(date) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    returnDate: date?.format('YYYY-MM-DD') || '',
                  }))
                }
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={handleSearch}
              disabled={
                isLoadingFlights ||
                !searchParams.originSkyId ||
                !searchParams.originEntityId ||
                !searchParams.destinationSkyId ||
                !searchParams.destinationEntityId ||
                !searchParams.departureDate
              }
              fullWidth
            >
              {isLoadingFlights ? (
                <CircularProgress size={24} />
              ) : (
                'Search Flights'
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {flightError && (
        <Alert severity='error' sx={{ mt: 2, mb: 2 }}>
          {flightError instanceof Error
            ? flightError.message
            : 'An error occurred while searching flights. Please try again later.'}
        </Alert>
      )}

      {!isLoadingFlights &&
        flightResults?.data &&
        flightResults.data.length === 0 && (
          <Alert severity='info' sx={{ mt: 2, mb: 2 }}>
            No flights found for your search criteria. Please try different
            dates or airports.
          </Alert>
        )}

      {flightResults?.data && flightResults.data.length > 0 && (
        <FlightList flights={flightResults.data} />
      )}
    </Container>
  )
}

export default FlightSearch
