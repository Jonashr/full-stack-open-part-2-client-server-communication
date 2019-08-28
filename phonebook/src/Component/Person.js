import React from 'react'

const Person = ({person, deletePerson}) => {
    console.log('Logging person:', person, deletePerson)
    return(
        <div>
                {person.name} {person.number} 
                <button type="submit" value={person.id} onClick={deletePerson}>delete</button>
        </div>
    )
}

export default Person