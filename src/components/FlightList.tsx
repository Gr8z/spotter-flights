import React from 'react'
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Box,
  Chip,
  Avatar,
} from '@mui/material'
import { Flight } from '../types/flight'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import dayjs from 'dayjs'

interface FlightListProps {
  flights: Flight[]
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h5' gutterBottom>
        Available Flights ({flights.length})
      </Typography>
      {flights.map((flight) => (
        <Paper
          key={flight.id}
          elevation={2}
          sx={{
            p: 3,
            mb: 2,
            '&:hover': {
              boxShadow: 6,
              cursor: 'pointer',
            },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  sx={{ width: 24, height: 24, mr: 1 }}
                  variant='square'
                />
                <Typography variant='subtitle1'>
                  {flight.legs[0].carriers.marketing[0].name}
                </Typography>
              </Box>
              <Typography variant='caption' color='text.secondary'>
                Flight {flight.legs[0].carriers.marketing[0].alternateId}
                {flight.legs[0].segments[0].flightNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FlightTakeoffIcon sx={{ mr: 1 }} />
                    <Typography variant='body1'>
                      {dayjs(flight.legs[0].departure).format('HH:mm')}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    {flight.legs[0].origin.city} (
                    {flight.legs[0].origin.displayCode})
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', px: 2 }}>
                  <Typography variant='caption' color='text.secondary'>
                    {Math.floor(flight.legs[0].durationInMinutes / 60)}h{' '}
                    {flight.legs[0].durationInMinutes % 60}m
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Chip
                    label={`${flight.legs[0].stopCount} ${
                      flight.legs[0].stopCount === 1 ? 'stop' : 'stops'
                    }`}
                    size='small'
                    color={
                      flight.legs[0].stopCount === 0 ? 'success' : 'default'
                    }
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FlightLandIcon sx={{ mr: 1 }} />
                    <Typography variant='body1'>
                      {dayjs(flight.legs[0].arrival).format('HH:mm')}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    {flight.legs[0].destination.city} (
                    {flight.legs[0].destination.displayCode})
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant='h6' color='primary'>
                  {flight.price.formatted}
                </Typography>
                {flight.tags?.includes('cheapest') && (
                  <Typography variant='caption' color='success.main'>
                    Cheapest flight
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}

export default FlightList
