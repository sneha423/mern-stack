import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo,UpdateTodo } from "../Features/todo/todoSlice";
function Todos() {
  const todos = useSelector((state) => state.todo.todos); //holds array
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = (id) => {
    dispatch(UpdateTodo({ id, newText: editText }));
    setEditId(null);
    setEditText("");
  };
  return (
    <>
      {/* <div>Todos</div>
    {todos.map((todo)=>(
        <li key={todo.id}>{todo.text}
        <button onClick={()=>dispatch.removeTodo(todo.id)}></button>
        </li>
    ))} */}

      <div>Todos</div>
      <div className="text-xl font-bold text-white mb-2">Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
          >
            {editId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="text-black px-2 py-1 rounded w-full mr-2"
              />
            ) : (
              <div className="text-white w-full">{todo.text}</div>
            )}

            <div className="flex gap-2">
              {editId === todo.id ? (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  ✅
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  ✏️
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
