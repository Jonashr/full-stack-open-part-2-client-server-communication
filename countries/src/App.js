import React, { useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'


const App = ( )=> {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchCountry] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
      console.log(countries)
  }, [])

  const handleCountryNameChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const filteredCountries = () => countries.filter(country => country.name.includes(searchedCountry))

  console.log(filteredCountries())

  return (
    <div>
      Find countries:
      <form onChange={filteredCountries}>
        <input value={searchedCountry}
               onChange={handleCountryNameChange} />
      </form>
      <Countries countries={filteredCountries()} />
    </div>
  )
}

export default App;
