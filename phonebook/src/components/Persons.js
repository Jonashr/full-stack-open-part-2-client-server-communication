import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, setPersons, setNotification, searchName }) => {
  
  if(persons.length === 0 || !persons) {
    return null
  }

  const filteredPersons = persons.filter(person => person.name.includes(searchName))

  const deletePerson = async event =>  {
    if(window.confirm('Would you like to delete this person ? ')) {
      event.preventDefault()
      const id = event.target.value
      const currentPerson = persons.find(person => person.id=== id)

      try {
        const response = await personService.deletePerson(id)
        
        if(response.status === 204) {
          setPersons(persons.filter(person => person.id !== currentPerson.id))
          setNotification({
            message:`'${currentPerson.name}' was removed from the phonebook`,
            messageType: 'NOTIFICATION'}
          )
        }
      } catch(error) {
        setNotification({
          message:`Person already deleted from the server.`,
          messageType: 'WARNING'}
        )
      } finally {
        setTimeout(() => {
          setNotification({ message: '', messageType: '' })
         }, 5000)
      }
    }
  }

  return(
    filteredPersons.map(person =>
    <Person
      key={person.name}
      person={person}
      deletePerson={deletePerson} />
    )
  )
}

  export default Persons