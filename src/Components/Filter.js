import React from 'react'

const Filter = ({handleFilter}) =>{
    return (
            <div>filter: <input onChange={handleFilter}/></div>
    )
}

export default Filter