import { useState } from "react";
import { FilterButton } from "./components/Button";
import { AddButton } from "./components/Button";
import Task from "./components/Task";
import tasks from "./mock/task";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(tasks);
  const [filteredData, setFilteredData] = useState(tasks);
  const [activeFilter, setActiveFilter] = useState([true, false, false]);
  const [taskStatus, setTaskStatus] = useState("all");

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const applyFilter = (taskData, status = taskStatus) => {
    if (status === "completed") {
      setFilteredData(taskData.filter((task) => task.status === "completed"));
    } else if (status === "active") {
      setFilteredData(taskData.filter((task) => task.status === "active"));
    } else {
      setFilteredData(taskData);
    }
  };

  const toggleStatus = (id) => {
    const changedData = data.map((task) => {
      if (task.id === id) {
        const isDone = task.status === "active" ? false : true;
        task.status = isDone ? "active" : "completed";
        return task;
      }
      return task;
    });
    setData(changedData);
    applyFilter(changedData);
  };

  const createTask = () => {
    const newTask = {
      id: Math.random(),
      text: inputValue,
      status: "active",
    };

    if (inputValue === "") {
      console.log(inputValue);

      alert("Enter a task first");
    } else {
      setData([...data, newTask]);
      setFilteredData([...data, newTask]);
      const taskData = [...data, newTask];
      setInputValue("");

      applyFilter(taskData);
    }
  };

  const deleteTask = (id) => {
    const filteredData = data.filter((task) => task.id !== id);

    if (window.confirm("Are you sure?")) {
      setData(filteredData);
      setFilteredData(filteredData);
      applyFilter(filteredData);
    }
  };

  const clearCompleted = () => {
    const filteredData = data.filter((task) => task.status === "active");
    if (window.confirm("Are you sure?")) {
      setData(filteredData);
      setFilteredData(filteredData);
      applyFilter(filteredData);
    }
  };

  const filterCompleted = () => {
    const filteredData = data.filter((task) => task.status === "completed");
    setFilteredData(filteredData);
    setActiveFilter([false, false, true]);
    setTaskStatus("completed");
  };

  const filterActive = () => {
    const filteredData = data.filter((task) => task.status === "active");
    setFilteredData(filteredData);
    setActiveFilter([false, true, false]);
    setTaskStatus("active");
  };

  const clearFilter = () => {
    setFilteredData(data);
    setActiveFilter([true, false, false]);
    setTaskStatus("all");
  };

  const completedCounter = data.filter(
    (task) => task.status === "completed"
  ).length;

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className="flex justify-center bg-[#F3F4F6] h-screen w-screen pt-[60px] dark:bg-[#0D0D0D]  transition duration-800 ease-linear
    "
      >
        <button
          className="absolute p-5 text-white bg-blue-600 rounded-lg right-20 top-20 dark:bg-neutral-700  transition duration-800 ease-linear"
          onClick={toggleDarkMode}
        >
          Change Mode
        </button>
        <div className="w-[377px] h-fit bg-white shadow-md rounded-[6px] py-6 px-4 flex flex-col items-center gap-5 dark:bg-[#1C1C1E]  transition duration-800 ease-linear">
          <p className="text-xl font-semibold text-center dark:text-white  transition duration-800 ease-linear">
            To-Do List
          </p>
          <div className="flex justify-between w-full gap-[6px]">
            <input
              type="text"
              className="w-full border border-[#71717A] px-4 py-2  bg-white rounded-md  dark:text-[#6B7280] dark:bg-[#1C1C1E]  transition duration-800 ease-linear"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
            <AddButton text="Add" handleClick={createTask} />
          </div>
          <div className="flex  w-full gap-[6px]">
            <FilterButton
              text="All"
              handleClick={clearFilter}
              isActive={activeFilter[0]}
            />

            <FilterButton
              text="Active"
              handleClick={filterActive}
              isActive={activeFilter[1]}
            />
            <FilterButton
              text="Completed"
              handleClick={filterCompleted}
              isActive={activeFilter[2]}
            />
          </div>
          {/* task */}
          {filteredData.map((task) => {
            return (
              <Task
                {...task}
                key={task.id}
                deleteTask={deleteTask}
                toggleStatus={toggleStatus}
              />
            );
          })}

          {/* task stat */}
          {data.length === 0 ? (
            <div className="flex justify-center  text-[#6B7280]">
              No tasks yet. Add one above!
            </div>
          ) : (
            <div className="pt-4 pb-1 border-t border-[#6B7280] text-sm flex justify-between w-full items-center">
              <p className="text-[#6B7280] dark:text-[#D1D5DB]  transition duration-800 ease-linear">
                {completedCounter} of {data.length} tasks completed
              </p>
              <button
                onClick={clearCompleted}
                className=" text-[#EF4444] bg-[#FEF2F2] px-3 py-[6px] rounded-md dark:text-[#F87171] dark:bg-[#1C1C1E]  transition duration-800 ease-linear"
              >
                Clear completed
              </button>
            </div>
          )}
          <p className="mt-5 text-xs text-[#6B7280] dark:text-[#9CA3AF]  transition duration-800 ease-linear">
            Powered by{" "}
            <a
              href="https://www.instagram.com/"
              className="text-[#3B73ED] dark:text-[#3B82F6]  transition duration-800 ease-linear"
              target="blank"
            >
              Pinecone academy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
