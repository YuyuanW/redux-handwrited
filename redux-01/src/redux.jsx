import React, {useState, useContext} from 'react'
import { useEffect } from 'react'

export const appContext = React.createContext(null)
export const store = {
  reducer:undefined,
  appState : {},
  setAppState : (newState)=>{
    store.appState = newState
    store.listener.map(fn=>fn(store.appState))
  },
  listener : [] ,
  addListener(fn){
    store.listener.push(fn)
    return ()=>{
      const index= store.listener.indexOf(fn)
      store.listener.splice(index,1)
    }
  }
}

export const createStore = (reducer,initState)=>{
  store.reducer = reducer
  store.appState = initState
  return store
}



export const connect = (selector,mapDispatchToProps) => (Component)=>{
    const Wrapper = (props)=>{
        const {appState,setAppState} = useContext(appContext)
        const [,update] = useState({})
        const dispatch = (action)=>{
          setAppState(store.reducer(appState,action))
        }
        const data = selector ?  selector(appState) : {appState}
        const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : dispatch 
        useEffect(()=>{
            store.addListener(()=>{update({})})
        },[])
        return <Component {...props}  {...data} {...dispatchers}  />
    } 
    return Wrapper
}
  

export const Provider = ({store,children})=>{
  return <appContext.Provider value={store}>{children}</appContext.Provider>
}