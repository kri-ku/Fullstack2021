let timer

const notificationReducer = (state = '', action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'RESET_NOTIFICATION':
    return ''
  default:
    return state
  }

}

export const setNotification = (notification) => {
  return async dispatch => {
    if (notification !== '') {
      clearTimeout(timer)
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 5000)
  }
}

export default notificationReducer