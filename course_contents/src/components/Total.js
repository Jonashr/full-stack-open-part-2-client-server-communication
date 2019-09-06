import React from 'react'

const Total = ({parts}) => {

    const totalAmountExercises = () => parts.reduce((sum, part) => {
        return sum + part.exercises 
    }, 0)

    return(
        <div>Total number of exercises: {totalAmountExercises()}</div>
    )
}

export default Total