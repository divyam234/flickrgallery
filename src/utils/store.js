import React, { createContext, useReducer } from 'react'

const store = createContext()

const { Provider } = store

const StateProvider = ({ children }) => {

  const darkState = typeof window !== "undefined" ? 
  JSON.parse(window.localStorage.getItem('darkMode')) : true

  const initialState = { query: '',modal:{open:false,data:{}}
  ,darkMode: darkState == null ? true : darkState}

  const [state, dispatch] = useReducer((state, action) => {

    switch (action.type) {
      case 'CHANGE_QUERY':
        return {...state,query: action.payload }

      case 'OPEN_MODAL':
         return {...state,modal:{...state.modal,open:true}}

      case 'CLOSE_MODAL':
          return {...state,modal:{...state.modal,open:false}}

      case 'POPULATE_MODAL':
        return {...state,modal:{...state.modal,data:action.payload}}

      case 'TOGGLE_DARKMODE':
          window.localStorage.setItem('darkMode', !state.darkMode)
          return {...state,darkMode: !state.darkMode}

      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }