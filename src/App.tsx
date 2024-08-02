import { useWeather } from './useWeather'

function App() {
  const {
    city,
    weather,
    error,
    inputRef,
    handleChange,
    handleClearForm,
    getWeather
  } = useWeather()

  return (
    <div className='w-full h-screen flex flex-col items-center gap-4 justify-center'>
      <h1 className='text-4xl font-bold'>Weather App</h1>
      <form onSubmit={getWeather} className='w-96 flex justify-between gap-2'>
        <div className='relative flex-1'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={handleChange}
            className='border border-slate-800 px-4 py-2 rounded'
          />
          {city && (
            <button
              className='absolute top-2 right-2'
              onClick={handleClearForm}
              type='button'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
        <button
          type='submit'
          className='bg-slate-800 w-40 text-white px-4 py-2 rounded'
        >
          Get Weather
        </button>
      </form>

      {error && <p className='text-red-400'>{error}</p>}

      {weather && (
        <div className='w-96'>
          <h2 className='text-xl font-bold'>{weather.name}</h2>
          <hr className='h-0.5 my-2 bg-slate-800' />
          <table className='w-full table-auto'>
            <tbody>
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
