import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(( { data }) => {
        setAllCountries(data)
      })
  }, [])

  return (
    <div>
      Find countries:
      <input value={searchFilter} onChange={({ target }) => setSearchFilter(target.value)} />
      <Countries
          countries={allCountries}
          searchFilter={searchFilter}
      />
    </div>
  )
}

export default App;
