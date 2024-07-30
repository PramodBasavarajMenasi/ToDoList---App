import { useState,useEffect } from 'react'

import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  const toggleFinished =(e) => {
   setshowFinished(!showFinished)
  }
  


  useEffect(() => {
   let todostring=localStorage.getItem("todos");
   if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
   } 
  }, [])
  
 const savaTols=(params) => {
  localStorage.setItem("todos",JSON.stringify(todos))
   
 }
 

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>{
      return i.id===id;
    })

    setTodo(t[0].todo)
    let newTodos =todos.filter(i=>{
      return i.id !== id;
    })
    setTodos(newTodos)
savaTols();
  }

  const handleDelete=(e,id)=>{
    console.log(`the id is ${id}`)
    let index=todos.findIndex((item)=>{
      return item.id === id;
     })
     console.log(index)
      let newTodos =todos.filter(item=>{
        return item.id !==id
      })
     
      setTodos(newTodos)
      savaTols();
  }
  const handleAdd=()=>{
    setTodos([...todos,{id: uuidv4(), todo,isCompleted:false}])
    setTodo("")
    console.log(todos)
    savaTols();
   
  }
  const handleChange=(e)=>{

    setTodo(e.target.value)
  
  }
  const handlecheckbox= (e) => {
    console.log(e,e.target)
   let id=e.target.name;
   console.log(`the id is ${id}`)
   let index=todos.findIndex((item)=>{
    return item.id === id;
   })
   console.log(index)
    let newTodos =[...todos];
    newTodos[index].isCompleted= !newTodos[index].isCompleted;
    setTodos(newTodos)
    savaTols();
  }
  

  return (


    <>
    <Navbar/>
     <div className="md:container mx-3 md:mx-auto  my-5 rounded-xl p-5 bg-violet-100 min-h-[85vh] md:w-1/2 ">
  <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
      <div className="addTodo my-6 flex flex-col gap-2">
        <h2 className='text-xl font-bold'>Add a Todo</h2>
        <div className="flex">


        <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-md  p-1' />
        <button  onClick={handleAdd} disabled={todo.length<3} className='bg-violet-700 hover:bg-violet-950 mx-2 disabled:bg-violet-600  text-white text-md font-bold p-3  rounded-md py-1 '>Add</button>
        </div>      
      </div>
      <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
      <label className='mx-2' htmlFor="show">Show Finished</label>
      <div className='h-[1px] my-3 bg-slate-600  '></div>
     <h2 className='text-xl font-bold '>Your Todos</h2>

     <div className="todos">
      {todos.length===0 && <div className='m-5'>No Todos to Display</div>}
      {todos.map(item=>{

    
      return (showFinished || !item.isCompleted)&& <div key={item.id} className="todo flex w-full my-3 justify-between ">
       <div  className='flex gap-5  '> 
      <input   name={item.id} onChange={handlecheckbox} type="checkbox"  checked={item.isCompleted}  id=''/>
         <div  className={item.isCompleted?"line-through":""}><span className='break-all'>{item.todo}</span></div>
         </div>
         <div className="buttons flex h-full">
          <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-700 hover:bg-violet-950  text-white text-md font-bold p-3 mx-1 rounded-md py-1'><FaEdit /></button>
        <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-700 hover:bg-violet-950  text-white text-md font-bold p-3 mx-1 rounded-md py-1'><MdDelete /></button>
         </div>

      </div>
        })}
     </div>
     </div>
    </>
  )
}

export default App
