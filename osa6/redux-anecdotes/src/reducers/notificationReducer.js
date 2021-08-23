let timer

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_MESSAGE':
            return action.message
        case 'RESET_MESSAGE':
            const mes = ''
            return mes

        default: return state
    }
}

export const setNotification = (message, time) => {


    return async dispatch => {

        if (message !== '') {
            clearTimeout(timer)
        }

        dispatch({
            type: 'CHANGE_MESSAGE',
            message: message
        })

        timer = setTimeout(() => {
            dispatch({
                type: 'RESET_MESSAGE'
            })
        }, time)



    }

}


export default notificationReducer