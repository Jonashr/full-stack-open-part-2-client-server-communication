import React from 'react'

const Notification = ({message, messageType}) => {    
    if(message === '' || messageType === '') {
        return null
    }

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


  if(messageType === 'WARNING') {
    return(
      <div style={warning}>
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