import CloseBtn from "./CloseBtn";

const DropDown = ({ showHeader = true, width, position, bgColor = "#111", children, header, setIsOpen }) => {
  switch (position) {
    case "right":
      position = "top-0 left-full translate-x-0.5";
      break;
    case "left":
      position = "top-0 right-full -translate-x-0.5";
      break;
    case "bottom-center":
      position = "top-full left-0 right-0 translate-y-0.5";
      break;
    case "bottom-right":
      position = "top-full right-0 translate-y-0.5";
      break;
    case "bottom-left":
      position = "top-full left-0 translate-y-0.5";
      break;
    case "top-center":
      position = "bottom-full left-0 right-0 -translate-y-0.5";
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
      style={{ width }}
      className={`dropdown absolute z-40 flex flex-col rounded-xl shadow-[5px_5px_7px_rgba(0,0,0,0.3)] ${position}`}>
      {showHeader && (
        <div 
          style={{ backgroundColor: bgColor }}
          className="flex items-center justify-between px-2.5 py-1 rounded-t-xl">
          <h1 className="text-md text-center py-1 text-white">{header}</h1>
          <CloseBtn onClick={() => setIsOpen(false)} />
        </div>
      )}

      {children}
    </div>
  );
};

export default DropDown;
