import React from "react";

const PersonData = ({person, deleteNumber}) => {
return ( 
    <div>
    <p> {person.name} {person.number} {' '}
    <button 
        key={person.id} 
        onClick={deleteNumber}> 
        delete
    </button>
    </p>
    </div>
    )
}

export default PersonData