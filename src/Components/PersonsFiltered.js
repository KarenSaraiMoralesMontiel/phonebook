import React from 'react'
import PersonData from './PersonData'

const PersonsFiltered = ({personsFiltered}) => {
    return (
        <div>
            {personsFiltered.map(x=> {
                    console.log(x.name)
                    return (
                        <PersonData key={x.id} person={x} />
                    )
                })}
        </div>
    )
}

export default PersonsFiltered
    