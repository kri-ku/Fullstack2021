import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../src/index.css'
import { Provider } from 'react-redux'
import store from './store'

store.subscribe(() => {
  //console.log('store', store.getState().blogs)
  window.localStorage.setItem('blogs', JSON.stringify(store.getState().blogs))
  //console.log('localstorage',JSON.parse(window.localStorage.getItem('blogs')))
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))