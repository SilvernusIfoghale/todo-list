import React, { useState } from "react";

import { BsFillPlusCircleFill } from "react-icons/bs";
import Todo from "./components/todo";
import type { TodoItem } from "./interface/todo";
import AddTodo from "./components/add-todo";
import Header from "./components/header";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [mode, setMode] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div
      className={`flex justify-center  ${
        mode && "dark:bg-black h-screen  dark:text-white"
      } `}
    >
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
  );
};

export default App;
