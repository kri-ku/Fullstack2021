import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    //const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState
    //console.log("STATE", state)

    deepFreeze(state)
    const newState = counterReducer(state, action)
    //console.log("NEW STATE", newState)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('good and bad are incremented', () => {
    const action = { type: 'GOOD' }
    const action2 = { type: 'BAD' }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    const finalState = counterReducer(newState, action2)

    expect(finalState).toEqual({
      good: 1,
      ok: 0,
      bad: 1
    })

  })

  test('reseting works', () => {
    const state = {
      good: 14,
      ok: 9,
      bad: 100
    }

    deepFreeze(state)
    const newState = counterReducer(state, {type: 'ZERO'})

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })

  })
})