import React from 'react'

const Notification = ({message}) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 25
    }
    
    if(message === null) {
        return null
    }

    return(
        <div style={notificationStyle}>
            {message}
        </div>
    )

}

export default Notification