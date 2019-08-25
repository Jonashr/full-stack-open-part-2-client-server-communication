import React, { useState } from 'react'
import Person from './Component/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

 const handleNameChange = (event) => {
    setNewName(event.target.value)
 }

 const rows = () => 
  persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

 const addName = (event) => {
  event.preventDefault()  

  const isNewName = persons.filter(person => person.name === newName)

  const nameObject = {
    name: newName
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
      <form onSubmit={addName}>
        <div>
          name:
            <input value={newName}
            onChange={handleNameChange} />
            <button type="submit">add</button>
        </div>
        </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {rows()}
        </ul>
      </div>
    </div>
  )
}

export default App