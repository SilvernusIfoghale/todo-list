import React, { useEffect, useState } from "react";
import {
  deleteTodo,
  getTodo,
  patchTodo,
  postTodo,
  putTodo,
} from "../api/routes";

import { PiPencilSimple } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddTodoModal from "./components/add-todo-modal";

interface todosProps {
  completed: boolean;
  _id: string;
  todo: string;
}

const ApiTodo: React.FC = () => {
  const [todos, setTodos] = useState<todosProps[]>([]);
  // const [pagination, setPagination] = useState(1);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | undefined>();

  // ===============================      lOAD/Pagination       ==========================

  const fetchPosts = async () => {
    const response = await getTodo();
    if (response) {
      const data = response.data.allTodos;
      setTodos(data);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // ===============================      post/patch Todo       ==========================
  const handlePostTodo = async () => {
    if (note.trim() === "") {
      return;
    }

    //PUT
    if (isEditing && isEditingId) {
      const prepareData = {
        todo: note,
        completed: false,
      };

      const response = await putTodo(prepareData, isEditingId);
      if (response) {
        fetchPosts();

        alert("Updated Successfully ✅");
      }
    }
    //POST
    else {
      const prepareData = {
        todo: note,
        completed: false,
      };

      const response = await postTodo(prepareData);
      if (response) {
        fetchPosts();

        alert("Added Successfully ✅");
      }
    }
    setModal(false);
    setIsEditing(false);
    setNote("");
  };

  // ===============================      Delete Todo        ==========================
  const handleDeleteTodo = async (id: string) => {
    const choice = confirm("Are you sure you want to delete this todo note?");
    if (choice) {
      const response = await deleteTodo(id);
      if (response) {
        fetchPosts();
        // console.log(response.data);
        alert("Deleted Successfully ✅");
      }
    }
  };
  // ===============================
  // ....................................................................... Update Todo        ==========================
  const handleEditTodo = async (id: string) => {
    setIsEditingId(id);
    setIsEditing(true);
    const editingTodo = todos.filter((todo) => todo._id === id);
    setNote(editingTodo[0].todo);
    setModal(true);
  };

  // ===============================     isCompleted Function        ==========================
  const handleCompleted = async (id: string, completed: boolean) => {
    setTodos(
      todos.map((item) =>
        item._id === id ? { ...item, completed: !item.completed } : item
      )
    );

    const prepareData = { completed: !completed };
    const response = await patchTodo(prepareData, id);
    if (response) {
      fetchPosts();
    }
  };

  return (
    <>
      <h1 className="mt-10 mb-5 text-center font-bold text-3xl shadow pb-2">
        TODO API 📝
      </h1>

      <div className="flex justify-center my-3">
        <button
          className="text-lg font-semibold  rounded right-1 top-1 py-1 px-2 border-2 border-[#534CC2] cursor-pointer hover:bg-[#534CC2] hover:text-white active:bg-[#6C63FF]"
          onClick={() => setModal(true)}
        >
          Add Todo <span>💭</span>
        </button>
      </div>
      {/* ===============================       Todos      ========================== */}
      <div className="flex flex-col items-center justify-center  ">
        {todos.map((item, index) => (
          <div className="w-[90%] sm:w-[80%] my-3" key={index}>
            <div className="flex items-center justify-between gap-3 border-b pb-1 border-[#534CC2] group">
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={item.completed}
                  onChange={() => handleCompleted(item._id, item.completed)}
                />
                <p
                  className={`${
                    item.completed === true && "text-gray-400 line-through"
                  } font-semibold text-lg `}
                >
                  {item.todo}
                </p>
              </div>
              <div className="flex items-center gap-3 lg:opacity-0 group-hover:opacity-100">
                <PiPencilSimple
                  className="text-gray-400  hover:text-[#6C63FF] cursor-pointer"
                  onClick={() => handleEditTodo(item._id)}
                />
                <RiDeleteBin5Line
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTodo(item._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================ Add New Todo Modal ================ */}
      <AddTodoModal
        note={note}
        modal={modal}
        setNote={setNote}
        setModal={setModal}
        handlePostTodo={handlePostTodo}
      />
    </>
  );
};

export default ApiTodo;
