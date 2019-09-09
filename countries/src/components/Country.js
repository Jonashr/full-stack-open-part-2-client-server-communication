import React from 'react'

const Country = ({country, toggle, showCountry, button}) => {
    if(toggle) {
        return(
            <div>
                <h3>{country.name}   {showCountry ? <button type="submit" value={country.name} onClick={showCountry}>hide</button> :
                 <div />
                }
                </h3>
                <div>Capital: {country.capital}</div>
                <div>Population: {country.population}</div>
                <h2>Languages</h2>
                    {country.languages.map(language => 
                        <li>{language.name}</li>)}
                {console.log(country.flag)}
                <img src={country.flag} alt='Flag here.' width='100px' height='100px'/>
            </div>  
            )
    } else {
        return(
            <div>{country.name} <button type="submit" value={country.name} onClick={showCountry}>show</button></div>
        )
    }

} 

export default Country