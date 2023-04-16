import React, {useState, useEffect} from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import PersonData from './PersonData'
import Notification from './Notification'
import personsServices from '../Services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState({name: '', number: ''})
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [number, setNumber] = useState(0)

  useEffect(()=> {
    personsServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  
  //Add person function
 const addPerson = (event) => {
    event.preventDefault()
    //console.log(event.target)

    const personObject = {
      name: newName.name ,
      number: newName.number}

    const repeated = (persons.some((element) => element.name.toLocaleUpperCase() === personObject.name.toLocaleUpperCase()) && personObject.number !== '')
    
    if (repeated && window.confirm(`Do you wish to update ${personObject.name} ?`)) {

      const person = persons.find(x => x.name.toUpperCase() === personObject.name.toUpperCase())
      setMessage(`Updated ${person.name} number`)
      setNumber(2)
      setTimeout(()=> {
        setNumber(0)
        }, 5000)
      const person2 = {...person, number: personObject.number}

      personsServices
      .update(person.id, person2)
      .then(response => {
        setPersons(persons.map(x => x.id !== person.id ? x: response))
      })

    .catch(error => {
      setPersons(persons.filter(x => x.id !== person.id))
      setMessage(`Information of ${person.name} has been deleted from the servers`)
      setNumber(1)
      setTimeout(()=> {
        setNumber(0)
        }, 5000)
      })
    } 

    else if (personObject.number === '' || personObject.name === '' ) {
      setMessage(`Insufficient Data`)
      setNumber(1)
      setTimeout(()=> {
        setNumber(0)
      }, 5000)

      
    }
    else {
      personsServices
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        
      })
      setMessage(`Added ${personObject.name}`)
      setNumber(2)
      setTimeout(()=> {
        setNumber(0)
      }, 5000)
    }
    
      setNewName({name: '', number: ''}) 
  }

  const deleteNumber = (id) => {

    const person = persons.find(x => x.id === id)
    const persons2 = persons.filter(x => x.id !== id)
    if (window.confirm(`Delete ${person.name} ?` )) {
      personsServices
    .remove(id)
    .then(response => {
      setPersons(persons2)
    })
    .catch(error => {
      setPersons(persons.filter(x => x.id !== person.id))
      setMessage(`Information of ${person.name} has been deleted from the servers`)
      setNumber(1)
      setTimeout(()=> {
        setNumber(0)
        }, 5000)
    })
    setMessage(`${person.name} deleted`)
    setNumber(2)
    setTimeout(()=> {
      setNumber(0)
    }, 5000)
    }
     }

  const handleNotChangeName = (event) => {
    //console.log(event.target)
    setNewName({...newName, name: event.target.value})
  }
  const handleNotChangeNumber = (event) => {
    //console.log(event.target)
    setNewName({...newName, number: event.target.value})
  } 
  const handleFilter = (event) => {
    //console.log(event.target)
    setNewFilter(event.target.value)
  }

  const personsFiltered = 
    newFilter === '' ? persons : 
    persons.filter(
      (x) => x.name
        .toLocaleUpperCase()
        .indexOf(newFilter.toLocaleUpperCase())>-1)
  
  return (
    <div>
      <h2> PhoneBook</h2>
      <Notification message={message} number={number}/>
      {console.log(message)}
      <Filter handleFilter={handleFilter}/>
      <h2>add a New one</h2>
      <PersonForm
       addPerson={addPerson}
        newName={newName}
        handleNotChangeName={handleNotChangeName}
        handleNotChangeNumber={handleNotChangeNumber}/>
      <h2>Numbers</h2>
      {personsFiltered.map(x=> {
                   // console.log(x.name)
                    return (
                        <PersonData 
                          key={x.id} 
                          person={x} 
                          deleteNumber={() => deleteNumber(x.id)}/>
                    )
                })}
    </div>
  )
}

export default App