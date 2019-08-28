import React, { useState, useEffect } from 'react'
import Filter from './Component/Filter'
import PersonForm from './Component/PersonForm'
import Persons from './Component/Persons'
import personService from './Services/personService'

const App = () => {

  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

  const [ searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialResponse => {
        console.log(initialResponse)
        setPersons(initialResponse)
      })
  }, [])


 const handleNameChange = (event) => {
    setNewName(event.target.value)
 }

 const handleSearchNameChange = (event) => {
  setSearchName(event.target.value)
}

 const handleNumberChange = (event) => {
   setNewNumber(event.target.value)
  }

  const deletePerson = (event) => {
    if(window.confirm('Would you like to delete this person ? ')) {
      event.preventDefault()
      const array = [...persons]
      const index = array.findIndex(a => a.id == event.target.value)
      array.splice(index, 1)
      personService
        .deletePerson(event.target.value)
          .then(returnedPerson => {
            setPersons(array)
          })
    }

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

     personService
      .create(nameObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
      })
    
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
       <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App