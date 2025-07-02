import React, { useState } from "react";
import { Routes, Route, Link } from "react-router";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Todo from "./components/todo";
import type { TodoItem } from "./interface/todo";
import AddTodo from "./components/add-todo";
import Header from "./components/header";
import ApiTodo from "./page/api-todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [mode, setMode] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <Routes>
      <Route path="/todo" element={<ApiTodo />} />
      <Route
        path="/"
        element={
          <div
            className={`flex justify-center  ${
              mode && "dark:bg-black h-screen  dark:text-white"
            } `}
          >
            <Link to="/todo">
              <button className="text-lg font-semibold absolute rounded right-1 top-1 py-1 px-2 border-2 border-[#534CC2] cursor-pointer hover:bg-[#534CC2] hover:text-white active:bg-[#6C63FF]">
                API Todo <span>→</span>
              </button>
            </Link>
            <div className="w-[90%] md:w-[60%] flex flex-col items-center max-w-screen h-[calc(100vh-50px)] relative pt-10">
              {/*  title  */}

              <h1 className="text-2xl font-bold ">TODO LIST</h1>

              {/* ================ search | Sort | Light/Dark Mode ================ */}
              <Header
                onModeChange={setMode}
                mode={mode}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
              />
              {/* ================ todo items  ================ */}
              <Todo
                todos={todos}
                setTodos={setTodos}
                setOpenModal={setOpenModal}
                note={note}
                setNote={setNote}
                setEditingId={setEditingId}
                filter={filter}
                search={search}
              />

              {/* ================ add icon  ================ */}
              <div onClick={() => setOpenModal(!openModal)}>
                <BsFillPlusCircleFill className="text-[#6C63FF] text-3xl absolute bottom-5 right-0 cursor-pointer hover:scale-105 duration-500 hover:text-[#534CC2]" />
              </div>
            </div>

            {/* ================ Add New Note Modal  ================ */}
            {openModal && (
              <AddTodo
                setOpenModal={setOpenModal}
                setTodos={setTodos}
                todos={todos}
                note={note}
                setNote={setNote}
                mode={mode}
                editingId={editingId}
                setEditingId={setEditingId}
              />
            )}
          </div>
        }
      />
    </Routes>
  );
};

export default App;
