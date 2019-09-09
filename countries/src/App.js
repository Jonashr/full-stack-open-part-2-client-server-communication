import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/Country'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchCountry] = useState('')
  const [displayedCountries, setDisplayedCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryNameChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const showCountry = (event) => {
    event.preventDefault()
    const countryIsDisplayed = displayedCountries.filter(country => country.name === event.target.value)
    console.log("Country is displayed", countryIsDisplayed, event.target.value)
    if(countryIsDisplayed.length > 0) {
      const copy = [...displayedCountries]
      const indexOfDisplayedCountry = displayedCountries.findIndex(c => c.name === event.target.value)
      copy.splice(indexOfDisplayedCountry, 1)
      console.log("Index of displayed conutry", indexOfDisplayedCountry)
      setDisplayedCountries(copy)
      // console.log('Displayed countries splice', displayedCountries)
    } else {
      const countryList = countries.filter(filterCountries => filterCountries.name == event.target.value)
      const country = countryList[0]
      setDisplayedCountries(displayedCountries.concat(country))
      // console.log('Displayed countries after concatinating', displayedCountries)
    }
  }

  console.log("Displayed countries;", displayedCountries)

  const filterCountries = countries.filter(country => country.name.includes(searchedCountry))

  const filteredCountries = () => countries.filter(country => country.name.includes(searchedCountry))


  return (
    <div>
      Find countries:
      <form onChange={filteredCountries}>
        <input value={searchedCountry}
          onChange={handleCountryNameChange} />
      </form>
      <Countries
          countries={filterCountries}
          displayedCountries={displayedCountries}
          showCountry={showCountry}
        />
    </div>
  )
}

export default App;
