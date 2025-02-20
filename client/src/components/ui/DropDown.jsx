import CloseBtn from "./CloseBtn";

const DropDown = ({ width, position, header, setIsOpen, children }) => {
  switch (position) {
    case "right":
      position = "top-0 left-full translate-x-0.5";
      break;
    case "left":
      position = "top-0 right-full -translate-x-0.5";
      break;
    case "bottom-right":
      position = "top-full right-0 translate-y-0.5";
      break;
    case "bottom-left":
      position = "top-full left-0 translate-y-0.5";
      break;
    case "top-left":
      position = "bottom-full left-0 -translate-y-0.5";
      break;
    case "top-right":
      position = "bottom-full right-0 -translate-y-0.5";
      break;
    default:
      position = "top-full left-0 translate-y-0.5";
      break;
  }

  return (
    <div 
      style={{ width: `${width}rem`}}
      className={`absolute z-10 flex flex-col rounded-xl ${position} bg-prim-black`}>
      <div className="flex items-center justify-between px-2.5 py-1 rounded-t-xl border-b border-drop-border bg-drop-header">
        <h1 className="text-lg text-center py-1 text-white">{header}</h1>
        <CloseBtn onClick={() => setIsOpen(false)} />
      </div>

      {children}
    </div>
  );
};

export default DropDown;
