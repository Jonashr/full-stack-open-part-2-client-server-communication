import React from 'react'

const Total = ({parts}) => {
    console.log('Total : ', parts)
        
    const totalAmountExercises = () => parts.reduce((sum, part) => {
        console.log(sum)
        return sum + part.exercises 
    }, 0)

    console.log('Totes amount of exercises', totalAmountExercises)

    return(
        <div>Total number of exercises: {totalAmountExercises()}</div>
    )
}

export default Total