import React from 'react'
import Country from './Country'

const Countries = ({countries, displayedCountries, showCountry}) => {
    console.log(countries.length)
    const countriesNotDisplayed = countries.filter(c=> !displayedCountries.includes(c))
    console.log(countriesNotDisplayed)

    if(countries.length === 1) {
        return(
            <Country key={countries[0].name}
                     country={countries[0]}
                     toggle={true}
                     />
        )
    } else if(countries.length > 10) {
        return <div>Too many matches, specify another filter.</div>
    } else {
        return(
            <div>
                {displayedCountries.map(country =>
                               <Country key={country.name}
                               country={country}
                               toggle={true}
                               showCountry={showCountry}
                               /> 
                               )}

                {countriesNotDisplayed.map(country =>
                    <Country key={country.name}
                             country={country}
                             toggle={false}
                             showCountry={showCountry} />
                    )
                }    
            </div>
        )
    }
}

export default Countries