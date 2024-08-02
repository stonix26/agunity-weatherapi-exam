import axios from 'axios'
import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string
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

export const useWeather = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [error, setError] = useState('')

  const mirrorCityState = useRef<string>(city)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    mirrorCityState.current = city
  }, [city])

  const getWeather = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${mirrorCityState.current}&APPID=${API_KEY}`
      )
      setWeather(response.data)
      setError('')
    } catch (err) {
      setError('City not found')
      setWeather(null)
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setCity(event.target.value)

  const handleClearForm = useCallback(
    (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
      event.stopPropagation()
      setCity('')
      setWeather(null)
      setError('')
      inputRef.current?.focus()
    },
    []
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClearForm(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClearForm])

  return {
    city,
    weather,
    error,
    inputRef,
    handleChange,
    handleClearForm,
    getWeather
  }
}
