import React from 'react'

const Notification = ({message, messageType}) => {
    const notification = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 25
    }

    const warning = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 25
    }
    
    if(message === null || messageType === null) {
        console.log(message, messageType)
        return null
    }


    if(messageType === 'WARNING') {
        console.log('Warning style.')
        return(<div style={warning}>
            {message}
        </div>
        )
    }

    return(
        <div style={notification}>
            {message}
        </div>
    )

}

export default Notification