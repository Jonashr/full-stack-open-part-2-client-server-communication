import React from 'react'
import PersonsService from '../services/persons'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNotification, setNewName, setNewNumber }) => {

  const addPerson = async event => {
    event.preventDefault()  
  
    const existingPerson = persons.find(person => person.name === newName)

    const person = {
      name: newName,
      number: newNumber
    }

    if(existingPerson) {
      if(window.confirm((`${newName} is already added to the phonebook, replace the old number with a new one ?`))) {
        return updatePerson(existingPerson.id, person)
      } else {
        return 
      }
    }
    setNewName('')
    setNewNumber('')
    try {
      const response = await PersonsService.create(person)
      setNotification({
        message:`'${person.name}' was added to the phonebook`,
        messageType: 'NOTIFICATION'}
      )
      setPersons([...persons, response])
    } catch(error) {
      console.log('Error', error.response)
      setNotification({ message: error.response.data.error, messageType: 'WARNING' })
    } finally {
      setTimeout(() => {
       setNotification({ message: '', messageType: '' })
      }, 5000)

    }
  }

  
  const updatePerson = async (existingPersonId, newPersonObject) => { 
    try {
      await PersonsService.update(existingPersonId, newPersonObject)
      setPersons(persons.filter(person => person.id !== existingPersonId))
      setNotification({
         message:`${newPersonObject.name}' contact information was updated`,
        messageType: 'NOTIFICIATION'
      })
      setNewName('')
      setNewNumber('')
    } catch(error) {
      setNotification({
        message: 'Error occured when attempting to update users phone number',
        messageType: 'WARNING'
     })
    } finally {
      setTimeout(() => {
        setNotification({ message: '', messageType: '' })
       }, 5000)    }
  }

  
  return(
      <form onSubmit={addPerson}>
      <div>
        name:
          <input value={newName}
          onChange={({ target }) => setNewName(target.value)} />
      </div>
      <div>
        number:
          <input value={newNumber} type='number'
          onChange={({ target}) => setNewNumber(target.value) } />
      </div>
      <button type="submit">add</button>
      </form>
  )
}

export default PersonForm