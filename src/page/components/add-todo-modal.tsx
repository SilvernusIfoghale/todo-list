import React from "react";

interface AddTodoModalProps {
  note: string;
  modal: boolean;
  setNote: (value: string) => void;
  setModal: (value: boolean) => void;
  handlePostTodo: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  note,
  modal,
  setNote,
  setModal,
  handlePostTodo,
}) => {
  return (
    <>
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

export default AddTodoModal;
