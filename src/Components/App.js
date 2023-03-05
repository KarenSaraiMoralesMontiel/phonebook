import React, {useState, useEffect} from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import PersonsFiltered from './PersonsFiltered'
import axios from "axios"

axios
.get('http://localhost:3001/persons')
.then(response => {
  const persons = response.data
  console.log(persons)
})
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState({name: '', number: ''})
  const [newFilter, setNewFilter] = useState('')
  useEffect( () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log("Entrand al then")
      setPersons(response.data)
    })
  }, [])
  const repeated = persons.some((element) => element.name.toUpperCase() === newName.name.toUpperCase()) 
  //Add person function
 const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    console.log(repeated)
    const PersonObject = {
      id: persons.length + 1,
      name: newName.name ,
      number: newName.number}
    newName.name === '' || newName.number === '' ? alert('Both values are nedeed') :
    repeated ? alert(`${newName.name} is already added to the phonebook`) : 
    setPersons(persons.concat(PersonObject))
    setNewName({name: '', number: ''}) 
  }

  const handleNotChangeName = (event) => {
    console.log(event.target)
    setNewName({...newName, name: event.target.value})
  }
  const handleNotChangeNumber = (event) => {
    console.log(event.target)
    setNewName({...newName, number: event.target.value})
  } 
  const handleFilter = (event) => {
    console.log(event.target)
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
      <Filter handleFilter={handleFilter}/>
      <h2>add a New one</h2>
      <PersonForm
       addPerson={addPerson}
        newName={newName}
        handleNotChangeName={handleNotChangeName}
        handleNotChangeNumber={handleNotChangeNumber}/>
      <h2>Numbers</h2>
      <PersonsFiltered personsFiltered={personsFiltered}/>
    </div>
  )
}

export default App