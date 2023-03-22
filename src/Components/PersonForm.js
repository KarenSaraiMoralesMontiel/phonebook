import React from 'react'

const PersonForm = ({
 addPerson,
  newName,
  handleNotChangeName,
  handleNotChangeNumber
  }) => {
  return(
    <form onSubmit={addPerson} >
      <div> name: <input value={newName.name} onChange={handleNotChangeName}/> </div>
      <div>number: <input value={newName.number} onChange={handleNotChangeNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)
}

export default PersonForm