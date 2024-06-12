import { useState } from "react";

export default function ToDo(){
    const [todo, setTodo] = useState('');

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  
    function addTodo(){
        if (todo === '') {
            return;
        }
        if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify([]));
        }
        var todoItems = JSON.parse(localStorage.getItem("todos"));
        var id = null;
        try{id = todoItems[todoItems.length - 1].id + 1;}
        catch{id = 1;}
  
        todoItems.push({
                "id": id,
                "todo": todo
            }
        );
        setTodos(todoItems);
        localStorage.setItem('todos', JSON.stringify(todoItems));
        setTodo('');
    }
    function deleteTodo(item){
        var todoItems = JSON.parse(localStorage.getItem("todos"));
        var newItems = todoItems.filter((i) => i.id !== item.id);
        setTodos(newItems);
        localStorage.setItem('todos', JSON.stringify(newItems));
    }
    function clearTodo(){
        localStorage.setItem('todos', JSON.stringify([]));
        setTodos([]);
    }

    const [editMode, seteditMode] = useState()
    function toggleEdit(id){
        if (editMode === id){
            seteditMode(null);
            confirmEdit(id);
        } else {
            setEditValue('');
            seteditMode(id);
        }
    }
    
    const [editValue, setEditValue] = useState('');
    function confirmEdit(item){
        var todoItems = JSON.parse(localStorage.getItem("todos"));
        if (editValue === '') return;
        var newItems = todoItems.map((i) => {
            if (i.id === item){
                i.todo = editValue;
            }
            return i;
        });
        setTodos(newItems);
        localStorage.setItem('todos', JSON.stringify(newItems));
        setEditValue('');
    }

    
    return (
        <div className='h-screen flex justify-center items-center flex-shrink-0'>
            <div className='xl:w-3/5 md:w-4/5 lg:w-4/5 sm:w-full'>
                <div className='border rounded-xl'>
                <div className=' bg-purple-300 p-2 flex justify-center rounded-t-xl'>
                    <h1 className='text-3xl font-semibold'>ToDo-List</h1>
                </div>
                
                <div className='h-96 overflow-y-scroll'>

                {todos.map((item) =>{
                    return (
                        <div key={item.id} className='flex justify-between bg-purple-100 p-2 m-2 rounded-xl'>
                            <p className={`text-3xl py-1 ${editMode === item.id ? "hidden" : ""}`}>{item.todo}</p>
                            <input type="text" className={`p-1 ${editMode === item.id ? "" : "hidden"}`} value={editValue} onChange={(e)=>setEditValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && toggleEdit(item.id) }></input>
                            <div>
                                <button className="bg-blue-300 mr-3 rounded-xl text-3xl py-1 px-3 font-light active:bg-blue-400 active:text-blue-900 duration-75" onClick={(e) => toggleEdit(item.id)}>Edit</button>
                                <button className='bg-red-300 mr-3 rounded-xl text-3xl py-1 px-3 font-light active:bg-red-400 active:text-red-900 duration-75' onClick={(e) => deleteTodo(item)}>Delete</button>
                            </div>
                        </div>
                    );
                })}

                </div>
                
                <div className=' bg-purple-300 p-2 flex justify-center rounded-b-xl mt-2'>
                    <input type='text' className='ml-5 mr-3 p-1 rounded-md focus:bg-gray-100 focus:outline-none' value={todo} onKeyDown={(e) => e.key === 'Enter' && addTodo()} required onChange={(e) => setTodo(e.target.value)} placeholder='Add ToDo'/>
                    <button className='mr-10 ml-5 bg-blue-300 rounded-xl py-1 px-3 font-semibold active:bg-blue-400 active:text-blue-900 duration-75' onClick={addTodo}>Add</button>
                    <button className='bg-red-300 rounded-xl py-1 px-3 font-semibold active:bg-red-400 active:text-red-900 duration-75' onClick={clearTodo}>Clear</button>
                </div>
                </div>
            </div>
        </div>
    )
}