import { Plus } from "@/assets/icons/icons";

const AddBtn = () => {
  return (
    <button className="bg-[#111] shadow-[3px_3px_5px_2px_rgba(0,0,0,0.4)] w-12 aspect-square rounded-full flex items-center justify-center absolute right-3 bottom-20 sm:hidden">
      <Plus className="w-8 h-8" stroke="#fff" />
    </button>
  );
};

export default AddBtn;
