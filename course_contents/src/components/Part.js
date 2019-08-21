import React from 'react'

const Part = ({name, exercises}) => {
    console.log('Part : ' , name)
    return (
        <div>
            {name} {exercises}
        </div>
    )
}

export default Part