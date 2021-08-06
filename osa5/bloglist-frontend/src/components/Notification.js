import React from 'react'

const Notification = ({ message, type }) => {

  if (type === 'rejected') {
    return (
      <div className='rejected'>
        {message}
      </div>
    )
  } else if (type === 'accepted') {
    return (
      <div className='accepted'>
        {message}
      </div>

    )

  } else {
    return null
  }
}

export default Notification