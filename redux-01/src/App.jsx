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
const 幺儿子 = () => {
  console.log('幺儿子执行了',Math.random()); 
  return <section>幺儿子</section>}



const UserModifier = connect()(({children,appState,dispatch}) => {
  const onChange = (e)=>{
    dispatch({type:'updateState',payload:{name:e.target.value}})
  }
  return <div>
    <span>{children}</span>
    <input placeholder={appState.user.name} onChange={onChange}></input>
  </div>
})
const User = connect(appState=>{return {user:appState.user}})(({user}) => {
  return  <div>User:{user.name}</div>

})

export default App