import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {
    
    if(countries.length === 1) {
        return(
            <Country key={countries[0].name}
                     country={countries[0]} />
        )
    } else if(countries.length > 10) {
        return <div>Too many matches, specify another filter.</div>
    } else {
        return(
             countries.map(country => 
                <div>{country.name}</div>)   
        )
    }
}

export default Countries