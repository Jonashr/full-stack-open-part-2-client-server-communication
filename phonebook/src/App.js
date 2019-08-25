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
  console.log('button clicked', event.target);
  console.log('new names value:', newName)
  const nameObject = {
    name: newName
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