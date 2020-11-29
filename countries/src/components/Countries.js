import React from 'react'
import Country from './Country'

const Countries = ({countries, searchFilter}) => {
    const filteredCountries = countries.filter(country => country.name.includes(searchFilter))

    if(filteredCountries.length === 1) {
        return(
            <Country key={filteredCountries[0].name}
                     country={filteredCountries[0]}
                     showByDefault={true}
                     />
        )
    } else if(filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter.</div>
    } else {
        return(
            <div>
              { 
                filteredCountries.map(country => 
                  <Country 
                    key={country.name}
                    country={country}
                  />
                )
              }  
            </div>
        )
    }
}

export default Countries