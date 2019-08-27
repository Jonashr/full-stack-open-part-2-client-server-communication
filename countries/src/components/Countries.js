import React from 'react'
import Country from './Country'

const Countries = ({countries}) => {

    if(countries.length === 1) {
        return(
            <Country key={countries[0].name}
                     country={countries[0]} />
        )
    } else {
        return(
             countries.map(country => 
                <div>{country.name}</div>)   
        )
    }
}

export default Countries