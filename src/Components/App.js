import React, {useState} from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import PersonsFiltered from './PersonsFiltered'

const App = () => {
    const [persons, setPersons] = useState([
      { id: 1,
        name: 'Arto Hellas',
        number: '232323232323'},
        { id: 2,
          name: 'Tomias Evans',
          number: '232323232323'}
    ])
    const [newName, setNewName]= useState({name: '', number: ''})
    const [newFilter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        console.log(event.target)
        const repeated = persons.some((element) => element.name.toUpperCase() === newName.name.toUpperCase()) 
        console.log(repeated)
        const PersonObject = {
          id: persons.length + 1,
          name: newName.name ,
          number: newName.number}
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
    .toLocaleLowerCase()
    .indexOf(newFilter.toLocaleLowerCase())> -1)

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