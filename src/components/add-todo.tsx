import React from "react";
import type { TodoItem } from "../interface/todo";

// interface
interface setOpenModalProps {
  setOpenModal: (isOpen: boolean) => void;
  setTodos: (todos: TodoItem[]) => void;
  todos: TodoItem[];
  note: string;
  setNote: (e: string) => void;
  mode: boolean;
  editingId: number;
  setEditingId: (id: number) => void;
}
const AddTodo: React.FC<setOpenModalProps> = ({
  setOpenModal,
  setTodos,
  todos,
  note,
  setNote,
  mode,
  editingId,
  setEditingId,
}) => {
  const handleAddTodo = () => {
    if (note.trim() === "") return;

    if (editingId) {
      const restTodo = todos.filter((todo) => todo.id !== editingId);
      setTodos([
        ...restTodo,
        {
          id: editingId,
          text: note,
          completed: false,
        },
      ]);

      setEditingId(0);
      setNote("");
    } else {
      setTodos([
        ...todos,
        {
          id: Math.random() * 2,
          text: note,
          completed: false,
        },
      ]);
    }

    //Close Add-Todo Modal
    setOpenModal(false);
    setNote("");
  };
  return (
    <>
      {/* ================ Add New Note Modal ================ */}
      <div className="absolute bg-black/50 h-full w-full flex items-center justify-center">
        <div className="bg-white h-1/3 w-[90%] sm:w-[500px] rounded-xl p-5 relative">
          <h1 className="text-xl font-semibold text-center ">NEW NOTE</h1>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Input your note..."
            className={`w-full  p-2 mt-5 outline-0 border border-[#6C63FF] rounded ${
              mode && "text-black"
            }`}
          />
          <div className="absolute bottom-5 flex justify-between w-[91%] ">
            <button
              className="border  border-[#6C63FF] py-1 px-5 rounded text-[#6C63FF] cursor-pointer hover:scale-105 duration-500"
              onClick={() => setOpenModal(false)}
            >
              CANCEL
            </button>
            <button
              className="bg-[#6C63FF] py-1 px-5 rounded text-white cursor-pointer hover:bg-[#534CC2]"
              onClick={handleAddTodo}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
