import React from "react"

const appContext = React.createContext(null)



const store = {
  state:{user:{name:'yuyuan',age:18}},
  setState : (newState)=>{
    store.state = newState
    store.listener.map(fn=>fn(store.state))
  },
  listener : [],
  addListener : (fn)=>{
    store.listener.push(fn)
    return ()=>{
      const index = store.listener.indexOf(fn)
      store.listener.splice(index,1)
    }
  }
}

const Provider = ({store,children})=>{
  return <appContext.Provider value={store}>{children}</appContext.Provider>
}

const App = ()=>{
  return <Provider store={store}>
    <大儿子></大儿子>
    <二儿子></二儿子>
    <幺儿子></幺儿子>
  </Provider>
}

const 大儿子 = ()=> <div>大儿子:<User></User></div>
const 二儿子 = ()=> <div>二儿子:<UserModifier></UserModifier></div>
const 幺儿子 = ()=> <div>幺儿子</div>

const reducer = (state,{type,action})=>{
  if(type==='updateState'){
    return {...state,user:{...state,...action}}
  }else{
    return state
  }
}


const connect = (selector,mapToDispatchProps)=>(Component)=>{
  const Wrapper =(props)=>{
    const {state,setState} = store
    const dispatch = (args)=>{
      setState(reducer(state,args))
    }
    const data = selector ? selector(state) : {state}
    const dispatchers = mapToDispatchProps ? mapToDispatchProps(dispatch) : dispatch
    const [,update] = React.useState()
    React.useEffect(()=>{store.addListener(()=>update({}))},[])
   
    return <Component {...props} {...data} {...dispatchers}></Component>
  }
  return Wrapper
}


const User = connect((state)=>{return {user : state.user}})(({user})=> {
  return <div>user:{user.name}</div>
})

const UserModifier = connect(
  (state)=>{return {user : state.user}},
  (dispatch)=>{
  return {stateChange:(attrs)=>{dispatch({type:'updateState',action:attrs})}}}
  )(({user,stateChange}) => 
  {
  // const {state,setState} = React.useContext(appContext)
  const onChange = (e)=>{
    stateChange({name:e.target.value})
  }
  return <div>change:<input placeholder={user.name} onChange={onChange}></input></div>
})

export default App