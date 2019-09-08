import React, { useState, useEffect } from 'react'
import Filter from './Component/Filter'
import PersonForm from './Component/PersonForm'
import Persons from './Component/Persons'
import personService from './Services/personService'
import Notification from './Component/Notification'

const App = () => {

  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

  const [ searchName, setSearchName] = useState('')

  const [ notification, setNotification] = useState({message: '', messageType: ''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialResponse => {
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
      const newPersonArray = [...persons]
      const indexOfDeletedPerson = persons.findIndex(p => p.name === event.target.value)
      const personToBeDeleted = persons[indexOfDeletedPerson]
      newPersonArray.splice(indexOfDeletedPerson, 1)

      personService
        .deletePerson(personToBeDeleted.id)
          .then(returnedPerson => {
            setPersons(newPersonArray)
          setNotification({
              message:`'${personToBeDeleted.name}' was removed from the phonebook`,
              messageType: 'NOTIFICATION'}
            )
          })

    }

  }

  const addPerson = (event) => {
    event.preventDefault()  
  
    const existingPerson = persons.filter(person => person.name === newName)

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    // Filter check if the person already exists, if so ask the user if she wishes to replace the number or not.
    // No validation whether the number is the same as before or if it has been changed, but this could easily be added.

    if(existingPerson.length > 0) {
      if(window.confirm((`${newName} is already added to the phonebook, replace the old number with a new one ?`))) {
        personService
          .update(existingPerson[0].id, newPersonObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== existingPerson[0].id ? person : returnedPerson))
            setNotification({
               message:`${newPersonObject.name}' was added to the phonebook`,
               messageType: 'NOTIFICIATION'
              }
            )
            setTimeout(() => {
              setNotification({ message: '', messageType: ""})
            }, 5000)    
          }).catch(Error => {
  
            setNotification({
              message:  `Information about ${newPersonObject.name}' was already deleted from the server`,
              messageType: 'WARNING'
              }
            )
            setTimeout(() => {
              setNotification({ message: '', messageType: "" })
            }, 5000)
            setPersons(persons.filter(p => p.id !== existingPerson[0].id))
          }) 
      } 
        return 
    }

    // Add to the list if does not exist already

     personService
      .create(newPersonObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotification({
              message:`'${newPersonObject.name}' was added to the phonebook`,
              messageType: 'NOTIFICATION'}
            )
            setTimeout(() => {
              setNotification({message: '', messageType:''})
            }, 5000)      
          })
  }
 
 const filteredPersons = persons.filter(person => person.name.includes(searchName))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} messageType={notification.messageType} />
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