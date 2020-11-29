import React from 'react'
import Header from './Header'
import Content from './Content'
import NumberOfExercises from './NumberOfExercises'

const Course = ({course}) => {
    return(
        <div>
          <Header courseName={course.name} />
          <Content courseParts={course.parts} />
          <NumberOfExercises parts={course.parts} />
        </div>
    )
}

export default Course