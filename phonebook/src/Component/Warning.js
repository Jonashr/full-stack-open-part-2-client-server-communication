import React from 'react'

const Warning = ({message}) => {
    const warningStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 25
    }
    
    if(message === null) {
        return null
    }

    return(
        <div style={warningStyle}>
            {message}
        </div>
    )

}

export default Warning