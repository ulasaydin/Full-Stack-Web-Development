import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationClass, setNotificationClass] = useState('notification');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showNotification = (message, styleClass = 'notification') => {
    setNotification(message)
    setNotificationClass(styleClass)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, person)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            showNotification(`Updated ${returnedPerson.name}`, 'notification')
          })
          .catch(error => {
            showNotification(`Information of ${newName} has already been removed from the server`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
          setNewName('')
          setNewNumber('')  
      }
    
    } else {
      personService.create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${returnedPerson.name}`, 'notification')
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const isConfirmed = window.confirm(`Delete ${person.name}?`)
    if (isConfirmed) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`, 'error')
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} styleClass={notificationClass} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={deletePerson}/>
    </div>
  )
}

export default App