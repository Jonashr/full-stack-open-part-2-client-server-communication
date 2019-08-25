import React from 'react'

const Person = ({person}) => {
    console.log('Logging person:', person)
    return(
        <li>{person.name} {person.number}</li>
        
    )
}

export default Person