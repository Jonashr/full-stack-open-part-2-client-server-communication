import React, { useState } from 'react'
import Person from './Component/Person'



const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

  const [ searchName, setSearchName] = useState('')

  const filterPerson = (name) => {
    persons.filter(person => person.name.includes(name))
  }

 const handleNameChange = (event) => {
    setNewName(event.target.value)
 }

 const handleSearchNameChange = (event) => {
  setSearchName(event.target.value)
}

 const handleNumberChange = (event) => {
   setNewNumber(event.target.value)
 }

 const rows = () =>
  persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  const rowsFilter = () => {
    const filteredPersons = persons.filter(person => person.name.includes(searchName))
    return(
      filteredPersons.map(person =>
      <Person
        key={person.name}
        person={person} />
      )
    )
  }

 const addPerson = (event) => {
  event.preventDefault()  

  const isNewName = persons.filter(person => person.name === newName)

  const nameObject = {
    name: newName,
    number: newNumber
  }

  console.log('Name exists?', isNewName)

  if(isNewName.length > 0) {
    return alert(`${newName} is already added to the phonebook`)
  }

  setPersons(persons.concat(nameObject))   
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <form onChange={filterPerson}>
          <input value={searchName}
                 onChange={handleSearchNameChange} />
        </form>
      </div>

      <form onSubmit={addPerson}>
        <div>
          name:
            <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number:
            <input value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
        </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {rowsFilter( )}
        </ul>
      </div>
    </div>
  )
}

export default App