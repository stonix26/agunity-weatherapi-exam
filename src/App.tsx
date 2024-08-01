import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'

interface Weather {
  name: string
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
  }[]
  wind: {
    speed: number
  }
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [error, setError] = useState('')

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string
  const mirrorCityState = useRef<string>(city)

  useEffect(() => {
    mirrorCityState.current = city
  }, [city])

  const getWeather = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${mirrorCityState.current}&appid=${API_KEY}&units=metric`
      )
      setWeather(response.data)
      setError('')
    } catch (err) {
      setError('City not found')
      setWeather(null)
    }
  }, [API_KEY])

  console.log({
    city,
    weather,
    error,
    mirrorCityState
  })

  return (
    <div className='w-full h-screen flex flex-col items-center gap-4 justify-center'>
      <h1 className='text-4xl font-bold'>Weather App</h1>
      <div className='w-96 flex justify-between gap-2'>
        <div className='relative flex-1'>
          <input
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={e => setCity(e.target.value)}
            className='border border-slate-800 px-4 py-2 rounded'
          />
          {city && (
            <button
              className='absolute top-3 right-2'
              onClick={() => {
                setCity('')
                setWeather(null)
                setError('')
              }}
            >
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z'
                  fill='currentColor'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={getWeather}
          className='bg-slate-800 w-40 text-white px-4 py-2 rounded'
        >
          Get Weather
        </button>
      </div>

      {error && <p className='text-red-400'>{error}</p>}

      {weather && (
        <div className='w-96'>
          <h2 className='text-xl font-bold'>{weather.name}</h2>
          <hr className='h-0.5 my-2 bg-slate-800' />
          <table className='w-full table-auto'>
            <tr>
              <td>Temperature</td>
              <td className='text-right'>{weather.main.temp}°C</td>
            </tr>
            <tr>
              <td>Weather</td>
              <td className='text-right'>{weather.weather[0].description}</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td className='text-right'>{weather.main.humidity}%</td>
            </tr>
            <tr>
              <td>Wind Speed</td>
              <td className='text-right'>{weather.wind.speed} m/s</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
