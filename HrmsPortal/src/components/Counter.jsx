import React ,{useReducer}from 'react'
import { useNavigate } from 'react-router-dom'


const initialcount=0

const reducer=(state,action)=>{
    switch(action){
        case 'increment':
            return state+1
        case 'decrement':
            return state-1
        case 'reset':
            return initialcount
        default:
            return state
    }
}
const Counter = () => {

    const [count,dispatch]=useReducer(reducer,initialcount)
  return (
    <div className='m-3'>
        Count - {count}<br/>
      <button onClick={()=>{dispatch('increment')}} className='bg-slate-400 text-black px-4 py-2 rounded m-5'>increment</button><br/>
      <button onClick={()=>{dispatch('decrement')}} className='bg-slate-400 text-black px-4 py-2 rounded m-5'>decrement</button><br/>
      <button onClick={()=>{dispatch('reset')}} className='bg-slate-400 text-black px-4 py-2 rounded m-5'>reset</button>
    </div>
  )
}

export default Counter
