import React from 'react'

const Country = ({country}) => {
    return(
        <div>
            <h3>{country.name}</h3>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <h2>Languages</h2>
                {country.languages.map(language => 
                    <li>{language.name}</li>)}
            {console.log(country.flag)}
            <img src={country.flag} alt='Flag here.' width='100px' height='100px'/>
        </div>

    )
}

export default Country