import React, { useState } from 'react'
import Person from './Component/Person'
import Filter from './Component/Filter'
import PersonForm from './Component/PersonForm'
import Persons from './Component/Persons'


const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

  const [ searchName, setSearchName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
 }

 const handleSearchNameChange = (event) => {
  setSearchName(event.target.value)
}

 const handleNumberChange = (event) => {
   setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()  
  
    const isNewName = persons.filter(person => person.name === newName)
  
    const nameObject = {
      name: newName,
      number: newNumber
    }
  
    if(isNewName.length > 0) {
      return alert(`${newName} is already added to the phonebook`)
    }
  
    setPersons(persons.concat(nameObject))   
  }
 
 const filteredPersons = persons.filter(person => person.name.includes(searchName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
       <Persons filteredPersons={filteredPersons}/>
      </div>
    </div>
  )
}

export default App