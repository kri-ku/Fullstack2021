import React from 'react'
import { connect } from 'react-redux'
import { setFilter, showAll } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        if (event.target.value === '') {
            props.showAll()
        } else {
            props.setFilter(event.target.value)
        }
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter
            <input
                onChange={handleChange}
                name='filterable'></input>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }

}

const mapDispatchToProps = {
    setFilter,
    showAll
}

const connectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)

export default connectedFilter
