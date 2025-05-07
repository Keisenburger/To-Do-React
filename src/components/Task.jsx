import { useState } from "react";

const Task = (props) => {
  const isDone = props.status === "active" ? false : true;

  const [isChecked, setIsChecked] = useState(isDone);

  return (
    <div
      key={props.id}
      className="flex justify-between w-full bg-[#F9FAFB] items-center  p-[16px] text-sm h-[62px] rounded-md  dark:bg-[#212121] dark:text-white  transition duration-800 ease-linear"
    >
      <div className="flex gap-[10px] items-center">
        <input
          type="checkbox"
          className="w-5 h-5 border dark: border-[#6B7280] dark:bg-[#2563EB]  transition duration-800 ease-linear"
          onClick={() => {
            props.toggleStatus(props.id);
            setIsChecked(!isChecked);
          }}
          checked={isChecked}
        />
        <p className={isChecked === true ? " line-through" : ""}>
          {props.text}
        </p>
      </div>
      <button
        onClick={() => props.deleteTask(props.id)}
        className=" text-[#EF4444] bg-[#FEF2F2] px-3 py-[6px] rounded-md dark:bg-[#452b2b] dark:text-[#FCA5A5]  transition duration-800 ease-linear"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
