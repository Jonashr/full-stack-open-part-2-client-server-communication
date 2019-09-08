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
      const array = [...persons]
      const index = array.findIndex(a => a.id == event.target.value)
      const person = persons[index]
      array.splice(index, 1)
      personService
        .deletePerson(event.target.value)
          .then(returnedPerson => {
            setPersons(array)
          setNotification({
              message:`'${person.name}' was removed from the phonebook`,
              messageType: 'NOTIFICATION'}
            )
          })

    }

  }

  const addPerson = (event) => {
    event.preventDefault()  
  
    const existingPerson = persons.filter(person => person.name === newName)

    const nameObject = {
      name: newName,
      number: newNumber
    }

    if(existingPerson.length > 0) {
      if(window.confirm((`${newName} is already added to the phonebook, replace the old number with a new one ?`))) {
        const ok = {
          message: 'ok',
          messageType: 'None'
        }

        personService
          .update(existingPerson[0].id, nameObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== existingPerson[0].id ? person : returnedPerson))
            setNotification({
               message:`${nameObject.name}' was added to the phonebook`,
               messageType: 'NOTIFICIATION'
              }
            )
            setTimeout(() => {
              setNotification({ message: '', messageType: ""})
            }, 5000)    
          }).catch(Error => {
            const warning = {
              message:  `Information about ${nameObject.name}' was already deleted from the server`,
              messageType: 'WARNING'
            }
            setNotification(
              warning
            )
            setTimeout(() => {
              setNotification({ message: '', messageType: "" })
            }, 5000)
            setPersons(persons.filter(p => p.id !== existingPerson[0].id))
          }) 
      } 
        return 
    }

     personService
      .create(nameObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotification({
              message:`'${nameObject.name}' was added to the phonebook`,
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