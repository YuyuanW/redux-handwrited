import React from 'react'
import {appContext,connect,createStore,store} from './redux'
import { userConnect } from './connectToUser/userConnect/userConnect'

const App = () => {

  return (
    <appContext.Provider value={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => {
  console.log('大儿子执行了',Math.random()); 
  return <section>大儿子<User/></section>}
const 二儿子 = () => {
  console.log('二儿子执行了',Math.random()); 
  return <section>二儿子<UserModifier /></section>}
const 幺儿子 = connect(appState=>{return {group:appState.group}})(({group}) => {
  console.log('幺儿子执行了',Math.random()); 
  return <section>幺儿子<div>Group:{group.name}</div></section>}
)

const reducer = (state,{type,payload})=>{
    if(type==='updateState'){
      return {
        ...state,user:{
          ...state.user,...payload
        }
      }
    }
    else{
      return state
    }
}
const userState =  {
  user: {name: 'yuyuan', age: 18},
  group : {name:'hunan'}
}
createStore(reducer,userState)

const UserModifier = userConnect(({children,user,updateUser}) => {
  const onChange = (e)=>{
    updateUser({name:e.target.value})
  }
  return <div>
    <span>{children}</span>
    <input placeholder={user.name} onChange={onChange}></input>
  </div>
})
const User = userConnect(({user}) => {
  return  <div>User:{user.name}</div>
})

export default App