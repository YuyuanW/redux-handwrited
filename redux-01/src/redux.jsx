import React, {useState, useContext} from 'react'
import { useEffect } from 'react'

export const appContext = React.createContext(null)
let appState = undefined
let reducer = undefined
let listener = []
const  setAppState =  (newState)=>{
  appState = newState
  listener.map(fn=>fn(appState))
}
export const store = {
  getState : ()=>{
    return appState
  },
  dispatch : (action)=>{
    setAppState(reducer(appState,action))
  },
  addListener(fn){
    listener.push(fn)
    return ()=>{
      const index= listener.indexOf(fn)
      listener.splice(index,1)
    }
  }
}

export const createStore = (_reducer,initState)=>{
  reducer = _reducer
  appState = initState
  return store
}

const changed = (oldState, newState) => {
  let changed = false
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true
    }
  }
  return changed
}


export const connect = (selector,mapDispatchToProps) => (Component)=>{
    const Wrapper = (props)=>{
        // const {appState,setAppState} = useContext(appContext)
        const [,update] = useState({})
        
        const data = selector ?  selector(appState) : {appState}
        const dispatchers = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : store.dispatch 
        useEffect(()=>{
            store.addListener(()=>{
              const newData = selector ? selector(appState) : {appState}
              if(changed(data,newData)){
                update({})
              }
          })
        },[selector])
        return <Component {...props}  {...data} {...dispatchers}  />
    } 
    return Wrapper
}
  

export const Provider = ({store,children})=>{
  return <appContext.Provider value={store}>{children}</appContext.Provider>
}