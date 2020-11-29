import React from 'react'

const NumberOfExercises = ({parts}) => {

    const totalAmountExercises = () => parts.reduce((sum, part) => {
        return sum + part.exercises 
    }, 0)

    return(
        <p><strong>Total number of exercises: {totalAmountExercises()}</strong></p>
    )
}

export default NumberOfExercises