import React from 'react'

const filteredPersons = (persons, searchName) => {
    persons.filter(person => person.name.includes(searchName))
}


const Filter = ({persons, searchName, handleSearchNameChange}) => {
    return (
    <div>
    <form onChange={filteredPersons(persons, searchName)}>
      <input value={searchName}
             onChange={handleSearchNameChange} />
    </form>
  </div>
    )
}

export default Filter