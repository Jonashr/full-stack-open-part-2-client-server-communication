import React from 'react'

const Filter = ({ setSearchName}) => {
  return (
    <div>
      <input onChange={({ target }) => setSearchName(target.value) } />
  </div>
    )
}

export default Filter