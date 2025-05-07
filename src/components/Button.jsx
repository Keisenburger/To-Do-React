export const AddButton = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className="text-white bg-[#3C82F6] px-4 h-[40px] rounded-md  dark:bg-[#3B82F6]  transition duration-800 ease-linear"
    >
      {props.text}
    </button>
  );
};

export const FilterButton = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className={
        props.isActive === false
          ? "text-black bg-[#F3F4F6] px-3 h-[32px] rounded-md  dark:bg-[#374151]  transition duration-800 ease-linear"
          : "text-white bg-[#3C82F6] px-3 h-[32px] rounded-md  dark:bg-[#3B82F6]  transition duration-800 ease-linear"
      }
    >
      {props.text}
    </button>
  );
};
