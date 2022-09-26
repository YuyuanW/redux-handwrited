import React from 'react'
import {appContext,connect,store} from './redux'


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


const UserModifier = connect(appState=>{return {user:appState.user}},
  dispatch=>{return {updateUser:(attrs)=>dispatch({type:'updateState',payload:attrs})}
})(({children,user,updateUser}) => {
  const onChange = (e)=>{
    updateUser({name:e.target.value})
  }
  return <div>
    <span>{children}</span>
    <input placeholder={user.name} onChange={onChange}></input>
  </div>
})
const User = connect(appState=>{return {user:appState.user}})(({user}) => {
  return  <div>User:{user.name}</div>
})

export default App