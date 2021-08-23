const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter

        default: return state
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter: filter
    }
}

export const showAll = () => {
    return {
        type: 'SET_FILTER',
        filter: 'ALL'
    }
}

export default filterReducer