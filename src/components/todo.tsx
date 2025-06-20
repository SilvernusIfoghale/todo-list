import React from "react";
import emptyTodo from "/src/assets/empty.png";
import { PiPencilSimple } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import type { TodoItem } from "../interface/todo";

interface TodoProps {
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
  setOpenModal: (isOpen: boolean) => void;
  note: string;
  setNote: (e: string) => void;
  setEditingId: (id: number) => void;
  filter: string;
  search: string;
}
const Todo: React.FC<TodoProps> = ({
  todos,
  setTodos,
  setOpenModal,
  setNote,
  setEditingId,
  filter,
  search,
}) => {
  const filteredAndSearchedTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Complete" && todo.completed) ||
      (filter === "InComplete" && !todo.completed);
    const matchesSearch = search
      ? todo.text.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  // isCompleted Function
  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //Delete Todo item
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //Edit Todo item
  const handleEdit = (id: number) => {
    setEditingId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;
    setNote(todoToEdit.text);
    // Open the editing modal
    setOpenModal(true);
  };

  return (
    <>
      {/* ================ empty TODO  ================ */}
      {filteredAndSearchedTodos.length === 0 ? (
        <div className="mt-10">
          <img src={emptyTodo} alt="empty-todo" />
        </div>
      ) : (
        <>
          {/* ================ Todo list items ================ */}
          {filteredAndSearchedTodos.map((todo) => (
            <div className="w-[90%] sm:w-[80%] my-3" key={todo.id}>
              <div className="flex items-center justify-between gap-3 border-b pb-1 border-[#534CC2] group">
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={todo.completed}
                    onChange={() => handleCompleted(todo.id)}
                  />
                  <p
                    className={`${
                      todo.completed === true && "text-gray-400 line-through"
                    } font-semibold text-lg `}
                  >
                    {todo.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
                  <PiPencilSimple
                    className="text-gray-400  hover:text-[#6C63FF] cursor-pointer"
                    onClick={() => handleEdit(todo.id)}
                  />
                  <RiDeleteBin5Line
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(todo.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Todo;
