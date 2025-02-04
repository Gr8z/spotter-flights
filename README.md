# Spotter Flights

[![Deploy to GitHub Pages](https://github.com/Gr8z/spotter-flights/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gr8z/spotter-flights/actions/workflows/deploy.yml)

A responsive flight search application built with React, inspired by Google Flights. This project was created as a technical interview task for Spotter.AI.

## Demo

Visit the live demo at: https://gr8z.github.io/spotter-flights/

## Features

- Search flights between different cities
- Select departure and return dates
- View flight prices, durations, and airlines
- Responsive design for all screen sizes
- Modern UI with Material Design

## Technologies Used

- React
- TypeScript
- Vite
- Material-UI
- Sky Scrapper API (RapidAPI)
- Day.js

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your RapidAPI key:
   ```
   VITE_RAPID_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── services/      # API services
  ├── types/         # TypeScript interfaces
  └── App.tsx        # Main application component
```

## API Integration

This project uses the Sky Scrapper API from RapidAPI for flight data. You'll need to subscribe to the API and get an API key from RapidAPI to use this application.

## License

MIT
