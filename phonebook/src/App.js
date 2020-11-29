import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchName, setSearchName] = useState('')
  const [ notification, setNotification] = useState({ message: '', messageType: ''})
  
  useEffect(() => {
    PersonsService.getAll()
      .then(data => setPersons(data))
  }, [persons.length])
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchName={setSearchName} />
      <h2>Add a new</h2>
      <PersonForm 
        persons={persons} 
        newName={newName} 
        newNumber={newNumber}
        setPersons={setPersons}
        setNotification={setNotification}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <div>
       <Persons 
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
        searchName={searchName}
      />
      <Notification message={notification.message} messageType={notification.messageType} />
      </div>
    </div>
  )
}

export default App