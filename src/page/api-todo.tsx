import React, { useEffect, useState } from "react";
import { deleteTodo, getTodo, patchTodo, postTodo } from "../api/routes";

import { PiPencilSimple } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";

interface todosProps {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const ApiTodo: React.FC = () => {
  const [todos, setTodos] = useState<todosProps[]>([]);
  const [pagination, setPagination] = useState(1);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // ===============================      lOAD/Pagination       ==========================
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getTodo(pagination);
      if (response) {
        setTodos(response.data);
      }
    };
    fetchPosts();
  }, [pagination]);

  // ===============================      post/patch Todo       ==========================
  const handlePostTodo = async (id?: number | undefined) => {
    if (note.trim() === "") {
      return;
    }

    //PATCH
    if (isEditing) {
      const prepareData = {
        title: note,
        completed: false,
      };

      const response = await patchTodo(prepareData, id);
      if (response) {
        console.log(response.data);
        alert("Updated Successfully ✅");
      }
    }
    //POST
    else {
      const prepareData = {
        userId: (Math.random() * 2) / 4,
        title: note,
        completed: false,
      };

      const response = await postTodo(prepareData);
      if (response) {
        console.log(response.data);
        alert("Added Successfully ✅");
      }
    }
    setModal(false);
    setIsEditing(false);
    setNote("");
  };

  // ===============================      Delete Todo        ==========================
  const handleDeleteTodo = async (id: number) => {
    const response = await deleteTodo(id);
    if (response) {
      console.log(response.data);
      alert("Deleted Successfully ✅");
    }
  };
  // ===============================      Update Todo        ==========================
  const handleEditTodo = async (id: number) => {
    setIsEditing(true);
    const editingTodo = todos.filter((todo) => todo.id === id);
    setNote(editingTodo[0].title);
    setModal(true);
  };

  // ===============================     isCompleted Function        ==========================
  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
        {todos.map((todo, index) => (
          <div className="w-[90%] sm:w-[80%] my-3" key={index}>
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
                  {todo.title}
                </p>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
                <PiPencilSimple
                  className="text-gray-400  hover:text-[#6C63FF] cursor-pointer"
                  onClick={() => handleEditTodo(todo.id)}
                />
                <RiDeleteBin5Line
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================== Pagination =========================== */}
      <div className="text-center flex justify-center items-center my-5">
        <ul className="flex flex-wrap justify-center items-center gap-4">
          {Array.from({ length: 10 }, (_, index) => index + 1).map(
            (num, index) => (
              <li
                key={index}
                className={`${
                  pagination == num ? "bg-blue-500" : ""
                } cursor-pointer bg-blue-200 p-2 rounded-full w-10 h-10 hover:bg-blue-400`}
                onClick={() => setPagination(num)}
              >
                {num}
              </li>
            )
          )}
        </ul>
      </div>

      {/* ================ Add New Todo Modal ================ */}
      <div
        className={` absolute bg-black/50  h-[180vh] sm:h-[150vh] w-full top-0 ${
          modal ? "flex" : "hidden"
        }  pt-80 justify-center`}
      >
        <div className="bg-white h-1/3 w-[90%] sm:w-[500px] rounded-xl p-5 relative">
          <h1 className="text-xl font-semibold text-center ">NEW NOTE</h1>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Input your note..."
            className={`w-full  p-2 mt-5 outline-0 border border-[#6C63FF] rounded `}
          />
          <div className="absolute bottom-5 flex justify-between w-[91%] ">
            <button
              className="border  border-[#6C63FF] py-1 px-5 rounded text-[#6C63FF] cursor-pointer hover:scale-105 duration-500"
              onClick={() => setModal(false)}
            >
              CANCEL
            </button>
            <button
              className="bg-[#6C63FF] py-1 px-5 rounded text-white cursor-pointer hover:bg-[#534CC2]"
              onClick={() => handlePostTodo()}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiTodo;
