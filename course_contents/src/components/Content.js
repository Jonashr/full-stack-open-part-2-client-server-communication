import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    console.log('Content, parts: ', parts)

    const partRows = () => parts.map(part => 
        <Part 
            key={part.id}
            name={part.name}
            exercises={part.exercises}
        />
    )
    
    console.log('Log call to part rows: ', partRows())

    return(
        <div>
            {partRows()}
        </div>
    )
}

export default Content
