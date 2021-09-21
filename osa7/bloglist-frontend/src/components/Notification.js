import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message.class === 'rejected') {
    return (
      <div className='rejected'>
        {message.text}
      </div>
    )
  } else if (message.class === 'accepted') {
    return (
      <div className='accepted'>
        {message.text}
      </div>

    )

  } else {
    return null
  }
}

export default Notification