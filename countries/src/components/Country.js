import axios from 'axios'
import React, { useState } from 'react'

const Country = ({ country, showByDefault = false }) => {
    const [showDetails, setShowDetails] = useState(showByDefault)
    const [ capitalWeather, setCapitalWeather] = useState(null)
    const API_KEY = process.env.REACT_APP_API_KEY

    console.log('API_KEY', API_KEY)
  
    const toggleCountryDetails = () => {
        setShowDetails(!showDetails)
        showWeatherForCapital()
    }

    const showWeatherForCapital = async () => {
      const weatherData = await axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`)
      setCapitalWeather(weatherData.data.current)
    }

  
    if(showDetails) {
        return(
            <div>
                <h3>{country.name} 
                  <button onClick={toggleCountryDetails}>hide</button>
                </h3>
                <div>Capital: {country.capital}</div>
                { capitalWeather &&
                  <div>Temperature: {capitalWeather.temperature}
                    <div>
                      <img src={capitalWeather.weather_icons[0]} alt={capitalWeather.weather_descriptions} />
                    </div>
                  </div>
                }
                <div>Population: {country.population}</div>
                <h2>Languages</h2>
                { country.languages.map(language => 
                  <div key={language.name}>{language.name}</div>)
                }
                <img src={country.flag} alt='Flag' width='200px' height='100px'/>

            </div>
        )
    } else {
        return(
            <div>{country.name} 
              <button onClick={() => toggleCountryDetails()}>Show</button>
            </div>
        )
    }

} 

export default Country